import mongoose from "mongoose";
import { DB } from "../constant.js";
const connectionDB =async()=>{
    try{
   const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB}`)
    console.log(`connection sucessful ${connectionInstance}`)
    }
    catch(err){
        console.log(`error in mongoose connection ${err}`);
    }

}
export default connectionDB;