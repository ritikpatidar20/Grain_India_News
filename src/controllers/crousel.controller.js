import { crousel } from "../models/crousel.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResonse.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { deleteOnCloudinary} from "../utils/deleteCloudionary.js"
import { uploadOnCloudinary } from "../utils/cloudioanry.js";

const addCrousel=asyncHandler(async(req,res)=>{
    const crouselLocalPath = req.file.path;
    console.log(crouselLocalPath)
    if(!crouselLocalPath){
        throw new ApiError(400,"crousel image required");
    }
    const newurl=await uploadOnCloudinary(crouselLocalPath);
    if(!newurl){
        throw new ApiError(500,  "something went wrong while uploading the image") 
    }
    const newcrousel=await crousel.create({
       cImage:newurl.url
    })
    const Crousel=crousel.findOne(newcrousel._id);
    if(!Crousel){
        throw new ApiError(501,"something went wrong while uploading");
    }
    return res.status(200).json(
        new ApiResponse(200,{},"image added Successfully")
     ) 
 
})
const deleteCrousel=asyncHandler(async(req,res)=>{
    const id=req.query.id;
    const Crousel=await crousel.findById(id);
    if(!Crousel){
        throw new ApiError(402,"inavlid crousel Image or image not found");
    }
    console.log(Crousel)
     deleteOnCloudinary(Crousel.cImage);
    const res1=await crousel.deleteOne(Crousel._id);
    if(!res1){
        throw new ApiError(502,"something went wrong while deleting the image")
    }
    return res.status(200).json(
        new ApiResponse(200,{},"image deleted Successfully"))
})
const allCrousel=asyncHandler(async(req,res)=>{
const data=await crousel.find({});
if(!data){
    throw new ApiError(500,'unable to fetch the data');
}
console.log(data);
return res.status(200).json(
    new ApiResponse(200,{data},'all data return successfully')
)
})
export{addCrousel,deleteCrousel,allCrousel}