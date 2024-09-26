import mongoose from "mongoose"

// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"

const crouselSchema=new mongoose.Schema({
    cImage:{
        type:String,
        required:true
    }
},{timestamps:true})
export const crousel=mongoose.model("crousel",crouselSchema);