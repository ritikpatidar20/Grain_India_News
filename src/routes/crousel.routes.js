import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
//import { registerUser,login,logout,getUser,changePassword
// } from "../controllers/usercontroller.js";
//import { verifyJwt } from "../middlewares/authenticate.middleware.js";
import { verifyJwt } from "../middlewares/authenticate.middleware.js";
import { login,logout,createAdmin,changePassword } from "../controllers/admin.controller.js";
import { addBlog, deletedBlog, updateBlog } from "../controllers/blog.controller.js";
import { addCrousel, allCrousel, deleteCrousel } from "../controllers/crousel.controller.js";
const crouselrouter=Router();
crouselrouter.route("/").get(allCrousel);
crouselrouter.route("/addCrousel").post(verifyJwt,upload.single(
    'cImage'),addCrousel);
crouselrouter.route("/deleteCrousel").delete(verifyJwt,deleteCrousel)
export default crouselrouter;
