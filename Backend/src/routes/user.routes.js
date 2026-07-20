import express from "express"
import { login,logout,signup,checkauth,deleteaccount } from "../controllers/authcontroller.js";
import { protectroute } from "../middlewares/authmiddleware.js"
import { loginLimiter , signupLimiter } from "../middlewares/ratelimiter.js"


const router = express.Router();

router.post("/signup",signupLimiter,signup)
router.post("/login",loginLimiter,login)
router.post("/logout",logout)
router.get("/check",protectroute,checkauth)
router.delete("/deleteaccount/:userid",protectroute,deleteaccount)

export default  router;