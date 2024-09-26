import mongoose from"mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const adminSchema=new mongoose.Schema({
userName:{
    type:String,
    required:true
},
fullName:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:[true,"password is required"]
},
refreshToken:{
  type:String,
}
},{timestamps:true});
adminSchema.pre('save',async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
 })
 adminSchema.methods.generateAccessToken=function(){
  return   jwt.sign({
       _id:this._id,
       email:this.email,
       userName:this.userName,
       fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
 )
 }
 adminSchema.methods.generateRefreshToken=function(){
   return jwt.sign({
       _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
 }
 adminSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
    }
export const admin= mongoose.model("admin",adminSchema)