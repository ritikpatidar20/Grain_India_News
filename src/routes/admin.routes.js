import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
//import { registerUser,login,logout,getUser,changePassword
// } from "../controllers/usercontroller.js";
//import { verifyJwt } from "../middlewares/authenticate.middleware.js";
import { verifyJwt } from "../middlewares/authenticate.middleware.js";
import { login,logout,createAdmin,changePassword } from "../controllers/admin.controller.js";
const adminrouter=Router();
adminrouter.route("/createAdmin").post(verifyJwt,createAdmin)
adminrouter.route("/login").post(login);
adminrouter.route("/logout").post(verifyJwt,logout);
adminrouter.route("/changePassword").post(verifyJwt,changePassword);
export default adminrouter;
