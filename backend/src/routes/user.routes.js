import { Router } from "express";
import {

    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    userQuery




} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/query").post(verifyJWT, userQuery)


//secured routes
router.route("/logout").post(verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)







export default router;
