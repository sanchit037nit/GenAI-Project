import {generateToken} from "../config/uteis.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup=async (req,res)=>{
    const {name,emailid,password} =req.body
    try{

        if(!name || !emailid || !password){
            return res.status(400).json(
                {success:false,message: "all fields required"})
        }
        if(password.length < 6){
            return res.status(400).json({success:false,message: "password must be atleast 6 characters"})
        }
        const user=await User.findOne({emailid})

        if(user){
            return res.status(400).json({success:false,message: "user already exists"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashpass=await bcrypt.hash(password,salt)

        const newuser=new User({
            name:name,emailid:emailid,password:hashpass
        })

        if(newuser){
            generateToken(newuser._id,res)
            await newuser.save();

            res.status(201).json({
                _id:newuser._id,
                name:newuser.name,
                emailid:newuser.emailid,
            })
        }
        else { res.status(400).json({ message: "Invalid user data" });
    }
  }
         catch (error) {
         console.log("error in signup controller",error.message)
         res.status(500).json({message: "internal server error"})
    }

};

export const login=async (req,res)=>{
    const { emailid, password} = req.body
    try{
        // console.log(typeof(emailid),typeof(password))
         const user=await User.findOne({emailid})
        //   console.log(user)
         if(!user){
            return res.status(400).json({message:"invalid credentials"})
         }
        const ispassc=await bcrypt.compare(String(password) ,user.password)

        if(!ispassc){
            return res.status(400).json({message:"invalid credentials"})
        }

        generateToken(user._id,res)
        
        res.status(200).json({
            _id:user._id,
            fullName:user.name,
            email:user.emailid,
        })
    }
    catch (error){
        console.log("error in login controller",error.message)
         res.status(500).json({message: "internal server error"})
    }
};

export const logout= (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logged out successfully"})
    }
    catch (error){
        console.log("error in logout controller",error.message)
        res.status(500).json({message: "internal server error"})
    }
}

export const checkauth =(req,res)=>{
    try {
res.status(200).json(req.user)
}
catch (error){
    console.log("error in checkauth controller",error.message)
    res.status(500).json({message: "internal server error"})
}
}

export const deleteaccount=async (req,res)=>{
    const {userid}=req.params
   
   try {
  
    if(!userid){
        return res.status(400).json({message: "user id is required"})
    }
    await User.findByIdAndDelete(userid)
    await Password.deleteMany({createdby:userid})
    res.status(200).json({message: "account deleted successfully"})
   } catch (error) {
    console.log("error in deleteaccount controller",error.message)
    res.status(400).json({message: "internal server error"})
   }
}

