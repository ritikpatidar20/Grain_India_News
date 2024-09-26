import { admin } from "../models/admin.model.js";
import { asyncHandler } from "../utils/asynHandler.js";
import {ApiError} from "../utils/apiError.js";
import {ApiResponse} from "../utils//apiResonse.js"

const generateAccessAndRefereshTokens = async (user_id) => {
    try {
        const Admin = await admin.findById(user_id);

        const accessToken = Admin.generateAccessToken();
        // console.log(accessToken);
        const refreshToken = Admin.generateRefreshToken();
        Admin.refreshToken = refreshToken;
        await Admin.save({
            validateBeforeSave: false
        })
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "someThing went wrong while generating token");
    }

}
const createAdmin=asyncHandler(async(req,res)=>{
  const {userName,fullName,password,email} =req.body
  if ([fullName, password, userName, password].some((field) =>
    field?.trim() ===""
)) {
    throw new ApiError(400, "all fiels are required");
}

if(!fullName){
    throw new ApiError(400, " fullname is required");
}
if(!userName){
    throw new ApiError(400, " usernameis required");
}
if(!email){
    throw new ApiError(400, " email is required");
}
if(!password){
    throw new ApiError(400, " passwords required");
}
const existedUser = await admin.findOne({
    $or: [{ email }, { userName }]
})
if (existedUser) {
    throw new ApiError(400, 'user already exists')
}
const user = await admin.create({
    userName: userName.toLowerCase(),
    fullName,
    email,
    password

})
const createduser = await (admin.find(user._id).select(
    "-password -refreshToken"
))
if (!createduser) {
    throw new ApiError(500, 'something went wrong while registring the user');
}
return res.status(200).json(
    new ApiResponse(200, createduser, 'admin registered successfully')
)
})

// const login = asyncHandler(async (req, res) => {
//     const { username , password } = req.body
//     console.log(username);
//     console.log(password);
//     if (!username) {
//         throw new ApiError(400, "email or username required")
//     }
//     const email=username;
//     const userName=username;
//     const user = await admin.findOne({
//         $or: [{ email }, { userName }]
//     })
//     if (!user) {
//         throw new ApiError(401, "user does not exist")
//     }
//     const check =await user.isPasswordCorrect(password)
//     if (!check) {
//         throw new ApiError(400, "error wrong password");
//     }
//     const options = {
//         httpOnly: true,
//         secure: true
//     }
//     const cookieOptions = {
//         httpOnly: true,      // Ensures the cookie is accessible only by the web server (not JavaScript)
//         secure: true,        // Ensures the cookie is sent only over HTTPS connections
//         sameSite: 'None',    // Allows the cookie to be sent in cross-site contexts
//         path: '/',           // Makes the cookie available throughout the entire site
//     };
    
//     const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);
//     const logged_User = await admin.findById(user._id).select("-password -refreshToken")
//     return res.status(200).cookie("AccessToken", accessToken, cookieOptions)
//         .cookie("refreshToken", refreshToken, cookieOptions)
//         .json(
//             new ApiResponse(200, logged_User, "user logged in successfully")
//         )
// })

// const logout = asyncHandler(async (req, res) => {
//     const user = admin.findByIdAndUpdate(
//       req.user._id, {
//         $set: {
//             refreshToken: undefined
//         }
//     }, 
//     {
//         new: true
//     }
//     )
//     const options = {
//         httpOnly: true,
//         secure: true
//     }
//     const cookieOptions = {
//         httpOnly: true,
//         secure: true, // Ensure cookies are secure in production
//         sameSite: 'None', // Set to 'Lax' or 'Strict' based on your requirement
//         path: '/', // Cookie available on the entire site
//     };
//     return res.status(200).clearCookie("AccessToken", cookieOptions)
//         .clearCookie("refreshToken", cookieOptions)
//         .json(
//             new ApiResponse(200, {}, "user logged out successfully")
//         )

// })
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    
    if (!username) {
        throw new ApiError(400, "email or username required");
    }

    const email = username;
    const userName = username;
    
    const user = await admin.findOne({
        $or: [{ email }, { userName }]
    });

    if (!user) {
        throw new ApiError(401, "user does not exist");
    }

    const check = await user.isPasswordCorrect(password);
    
    if (!check) {
        throw new ApiError(400, "error wrong password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);
    const logged_User = await admin.findById(user._id).select("-password -refreshToken");

    // Send tokens in response body
    return res.status(200).json({
        accessToken,
        refreshToken,
        user: logged_User,
        message: "user logged in successfully"
    });
});

const logout = asyncHandler(async (req, res) => {
    // Update the user's refreshToken to undefined
   const user= await admin.findByIdAndUpdate(
        req.user._id,
        { $set: { refreshToken: undefined } },
        { new: true }
    );
    
if(!user){
    throw new ApiError(400,"user is not logged i");
}
    return res.status(200).json(
        new ApiResponse(200, {}, "User logged out successfully")
    );
});

const changePassword = asyncHandler(async (req, res) => {
    const {  oldPassword ,password} = req.body
   // console.log(password)
    if (!(password || oldPassword))
        throw new ApiError(400, "password and old password cannot be empty");

    const user = await admin.findById(req.user?._id);
    
    const validate = await user.isPasswordCorrect(oldPassword);
    if (!validate) {
        throw new ApiError(401, 'old passowrd is not correct')
    }
    user.password = password;
    user.save({ validateBeforeSave: false });
    return res.status(200).json(
        new ApiResponse(200, {}, "password changed successfully")
    )

})
export {
    createAdmin,
    login,
    logout,
    changePassword
};