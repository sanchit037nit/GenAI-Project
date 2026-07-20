import mongoose from "mongoose";

const userschema=new mongoose.Schema(
 {
    name:{
        type:String,
        required:true,
        
    },
    emailid:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
        unique: true,
    },
 },
 {timestamps:true}
)

const user=mongoose.model("User",userschema)
export default user