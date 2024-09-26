import mongoose from "mongoose"
 const blogSchema =new mongoose.Schema({
    heading:{
        type:String,
        required:true,

    },
    detail:{
        type:String,
    },
    blogImage:{
       type:String
    }
 },{timestamps:true})
 export const blog=mongoose.model("blog",blogSchema);