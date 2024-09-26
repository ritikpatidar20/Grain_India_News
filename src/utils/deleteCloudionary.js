import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// cloudinary.config({ 
//     cloud_name: 'aakashkumar0', 
//     api_key: '161435316197184', 
//     api_secret: '1aCorlv1T81H9TIeAm7d5VdK_7M' // Click 'View Credentials' below to copy your API secret
// });
const getPublicIdFromUrl = (url) => {
    const parts = url.split('/');
    const publicId = parts.slice(parts.length - 1).join('/').split('.')[0];

    return publicId;
  };
cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});
const deleteOnCloudinary=async(localFilePath)=>{
    try{
    if(!localFilePath) return null;
    const publicid=getPublicIdFromUrl(localFilePath)
    console.log(publicid);
   const response=await cloudinary.uploader.destroy(publicid)
    return response;


}
catch(err){
    console.log(err);
    //fs.unlinkSync(localFilePath);//remove the locally saved temporary file as upload operation fail
    return null;
}
}
export {deleteOnCloudinary}



