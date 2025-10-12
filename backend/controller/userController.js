
import express from "express"
import User from "../models/user.js"
import { z} from "zod" // for validation 

import bcrypt from "bcryptjs" // for password hashing 
import {generateTockenAndSaveInCookies } from "../jwt/token.js"
const userSchema =z.object({
username:z.string().min(3,{message:"username atleast three charactor"}),
  email: z.email({ message: "invalid email address" }),
  password:z.string().min(5,{message:"password must be 5 charactors"})
})


 export const  signupController=async (req,res)=>{
  
    let {username,email,password} = req.body;
   const hashPassword = await bcrypt.hash(password,10)
   
 let newUser= new User({
    username:username,email:email,password:hashPassword
 });


 if(!email || !username || !password){
   return res.status(400).json({message:"all fields are required"})

 }

   let validateUser = userSchema.safeParse({email,username,password})
   console.log(validateUser)

   if (!validateUser.success) {
      const errorMSG = validateUser.error.issues.map((err) => err.message);
      return res.status(400).json({ errors: errorMSG });
    }

 let alreadyUser = await User.findOne({email})
    if(alreadyUser){
      return  res.status(400).json({message:"user already exists"})
    }

  const token =  generateTockenAndSaveInCookies(newUser._id,res)

 let savedUser = await newUser.save();
 res.status(201).json({message:"user sigedup",savedUser,token})

} 
// login
  
export const  loginController= async(req,res)=>{
    let {email,password}  = req.body;

    if(!email  || !password){
        return res.status(400).json({message:"all fields are required"})
    }   

  let user = await User.findOne({email}).select("+password")
  console.log(user)
  if(!user || !await(bcrypt.compare(password,user.password)))
  {
return res.status(400).json({message:"user not found please signup first"})
  }
  const token =  generateTockenAndSaveInCookies(user._id,res) // generating token 
res.status(200).json({message:"login successfully",user,token})
}

export const logoutController= (req,res)=>{
  try{
 res.clearCookie("jwt",{ // direct deleting token
      path:"/",
      
    });
  } catch(err){
    console.log(err)
    res.status(500).json({message:"loged out failed"})
  }
  
    res.status(200).json({message:"user loged out successfully"})
}