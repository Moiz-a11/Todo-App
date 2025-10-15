
import express from  'express'
import dotenv from "dotenv"
import mongoose from "mongoose"
import todoRouters from "./routes/todo.route.js"
import userRouters from "./routes/user.route.js"
import cors from "cors" // for connecting frontend in backend
import cookieParser from  "cookie-parser"

const app = express();

app.use(express.json())
app.use(cookieParser())
dotenv.config()

const port = 9999;
const DB_URI = process.env.MONGODB_URI

app.use(cors({ // allow frontend backend requests
  origin:process.env.FRONTEND_URL, //frontend se request aayengi 
  credentials:true, //  for  allowing request
  methods:"GET,POST,PUT,DELETE",
  allowedHeaders:["Content-Type","Authorization"],
  
}))

app.use("/todo",todoRouters)
app.use("/user",userRouters)
// Start the server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});

try{
mongoose.connect(DB_URI)
.then(()=>{
console.log("connected")})
.catch((err) => console.error("MongoDB connection error:", err));
} catch(e){
  console.log(e)
}