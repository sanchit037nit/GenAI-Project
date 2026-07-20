import jwt from "jsonwebtoken";
import user from "../models/user.model.js"

export const protectroute = async(req,res,next) =>{
  try{
      const token = req.cookies.jwt

    if(!token){
        return res.status(401).json({message:"unauthorized - no token provided"})
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET)

    if(!decoded){
        return res.status(401).json({message:"unauthorized - invalid token"})
    }
    
    const User=await user.findById(decoded.userId).select("-password")

    if(!User){
        return res.status(401).json({message:"user not found"})
    }

    req.User=User
    next()
   }
    catch (error){
        console.log("error in protecteroute",error.message)
        res.status(500).json({message: "error in protecteroute"})
    }
}