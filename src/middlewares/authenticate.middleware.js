// import { ApiError } from "../utils/apiError.js";
// import jwt from "jsonwebtoken";
// import { asyncHandler } from "../utils/asynHandler.js"
// import { admin } from "../models/admin.model.js";

//  const verifyJwt=asyncHandler(async(req,_,next)=>{
//     try {
//         console.log(req.cookies);
//         if(!(req.cookies.AccessToken)){
//             throw new ApiError(400,"user is not logged in there")
//         }
//         const accessToken=req.cookies?.AccessToken||req.header("Authorization")?.replace("Bearer ","");
//        // console.log(accessToken);
//         if(!accessToken){
//             throw new ApiError(400,"user is not logged in")
//         }
//         const decodedToken=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
//          if(!decodedToken){
//             throw new ApiError("something went wrong ")
//          }
//         const user=await admin.findById(decodedToken?._id).select("-password -refreshToken");
//         if(!user){
//             throw new ApiError(400,"unauthoriezed user");
//         }
//         req.user=user;
//         next()
    
//     } catch (error) {
//         throw new ApiError(500,error?.message||"inavlid user");
        
//     }
// })
// export {verifyJwt}
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asynHandler.js";
import { admin } from "../models/admin.model.js";

const verifyJwt = asyncHandler(async (req, _, next) => {
    try {
        // Extract the token from the Authorization header
        console.log(req.header("Authorization"));
        const authorizationHeader = req.header("Authorization");
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            throw new ApiError(400, "User is not logged in");
        }

        // Extract the token from the Authorization header
        const accessToken = authorizationHeader.replace("Bearer ", "");

        if (!accessToken) {
            throw new ApiError(400, "User is not logged in");
        }

        // Verify the token
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken) {
            throw new ApiError(400, "Something went wrong");
        }

        // Find the user based on the decoded token
        const user = await admin.findById(decodedToken?._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(400, "Unauthorized user");
        }

        // Attach the user to the request object
        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(500, error?.message || "Invalid user");
    }
});

export { verifyJwt };
