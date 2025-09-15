
import jwt from "jsonwebtoken"
export const generateTockenAndSaveInCookies = async(userId,res)=>{
let token =jwt.sign({userId},process.env.JWT_SECRATE_KEY,{
    expiresIn:"10d "

})
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        path:"/"
    })
        await  User.findByIdAndUpdate(userId,{token})
        return token;
}