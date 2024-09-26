import { blog } from "../models/Blog.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResonse.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { deleteOnCloudinary} from "../utils/deleteCloudionary.js"
import {uploadOnCloudinary} from "../utils/cloudioanry.js"
import { Mongoose } from "mongoose";
const addBlog=asyncHandler(async(req,res)=>{
    const{heading,detail}=req.body;
    if(!heading){
        throw new ApiError(400,'heading is required');
    }
    let Image
    if (req.file ) {
        Image = req.file.path
    }
    console.log(Image)
    const uploadImage = await uploadOnCloudinary(Image);
   
    const blogee = await blog.create({
         heading,
         blogImage: uploadImage?.url || "",
        detail

    })
    const createdblog= await (blog.find(blogee._id))
    if (!createdblog) {
        throw new ApiError(500, 'something went wrong while creating the blog');
    }
    return res.status(200).json(
        new ApiResponse(200, createdblog, 'blog created successfully')
    )
})

const deletedBlog=asyncHandler(async(req,res)=>{
const id=req.query.id;
console.log(id);
const blogg=await blog.findById(id);
//console.log(blogg);
if(!blogg){
    throw new ApiError(401,"did not find the blog");
}
console.log(blogg.blogImage)
deleteOnCloudinary(blogg.blogImage);
const deletedBlog=await blog.deleteOne(blogg._id);
if(!deletedBlog){
    throw new ApiError(501,"something went wrong during deleting")
}
return res.status(200).json(
    new ApiResponse(200,{},"blog deleted Successfully")
)


})

const updateBlog=asyncHandler(async(req,res)=>{
    const {heading ,detail,prevString}=req.body;
    //console.log(heading);
    //console.log(detail);
    const id=req.query.id;
    const blogg=await blog.findById(id);
    console.log(blogg)
    if(!blogg){
        throw new ApiError(400,"invalid id || blog not found");
    }
    let Image
    if (req.file ) {
        Image = req.file.path
    }
    
    console.log(Image)
    const newurl= await uploadOnCloudinary(Image);
    blogg.heading=heading;
    blogg.detail=detail;
    if(newurl?.url)
     deleteOnCloudinary(blogg.blogImage);
    
    blogg.blogImage= newurl ?.url||prevString;
    blogg.save();
    
    return res.status(200).json(
         new ApiResponse(200,blogg,"blog updated sucessfully")
    )

})
const allBlog=asyncHandler(async(req,res)=>{
  const data= await blog.find({});
  if(!data){
    throw new ApiError(500,'internal server error,,..... data not fetched successfully');
  }
  console.log(data);
  return res.status(200).json(
    new ApiResponse(200,{data},'data fetched successfully')
  )
})
const singleBlog=asyncHandler(async(req,res)=>{
    const id=req.query.id;
    const blogg=await blog.findById(id);
    console.log(blogg._id)
    if(!blogg){
        throw new ApiError(400,"invalid id || blog not found");
    }
    return res.status(200).json(
        new ApiResponse(200,blogg,'blog found and returned successfully')
    )
})
export {addBlog,deletedBlog,updateBlog,allBlog,singleBlog}