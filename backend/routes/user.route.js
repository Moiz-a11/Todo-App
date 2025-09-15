
import express from "express"
import {loginController,signupController,logoutController} from "../controller/userController.js"
const router = express.Router()


router.post("/login",loginController)
router.post("/signup",signupController)
router.get("/logout",logoutController)

export  default router ;