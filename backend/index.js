

import express from  'express'
import dotenv from "dotenv"
import mongoose from "mongoose"
import todoRouters from "./routes/todo.route.js"
import userRouters from "./routes/user.route.js"
import cors from "cors" // for connecting frontend in backend
const app = express();
const port = 3000;
app.use(express.json())
dotenv.config()
const DB_URI = process.env.MONGODB_URI

app.use(cors({
  origin:process.env.FRONTEND_URL,
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
console.log(
"connected"
)
} catch(e){
  console.log(e)
}
