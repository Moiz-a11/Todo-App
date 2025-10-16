import jwt from "jsonwebtoken"

export const authenticate = (req,res,next)=>{
    const token = req.cookies.jwt;
    console.log(token)
    // if(!token){
    //     return res.status(401).json({message:"Unauthorize"})
    // }

    // try{
    //   const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    //   console.log(decoded);

    // } catch(error){
    //     return res.status(401).json({message:" " + error.message})
    // }
    next();

}