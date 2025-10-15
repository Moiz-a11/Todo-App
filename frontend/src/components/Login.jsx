import React from "react";

import { useState } from "react";
import {toast}  from "react-hot-toast"
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"


function Login() {  

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")


const navigateTo = useNavigate()
  const handleRegister= async(e)=>{
    e.preventDefault();

    try{
const {data} = await axios.post("http://localhost:9999/user/login",{
 
  email,
  password,

},{

  withCredentials:true,
  headers:{
   "Content-Type": "application/json"
  }
})
console.log(data)
 toast.success(data.message || " login successfull")

 setEmail("")
 setPassword("")
 navigateTo("/")

    } catch(error){
      console.log(error)
      toast.error(error.response.data.errors || "user Registration failed") 
      setEmail("")
    setPassword("")
    }
  
  }
  return (

    <div className=" d-flex flex-column align-items-center justify-content-center signup-parent">
      <div className="d-flex flex-column align-items-center justify-content-center signupContainer w-100 rounded-3 shadow-lg bg-white mt-5">
        <h2>Welcome In Todos</h2>
        <h2 className="text-center fst-italic fw-bold">SignUp</h2>

        <form onSubmit={handleRegister} action="">
         

          {/* email */}
          <div className="mb-3" >
            {" "}
            <label className="form-label mb-2 ms-2 fw-bold" htmlFor="">
              Email
            </label>
            <input placeholder="Enter email" value={email}  onChange={(e)=>setEmail (e.target.value)} 
             className="form-control" type="text" />
          </div>

          {/* password */}
          <div className="mb-3">
            {" "}
            <label className="form-label mb-2 ms-2 fw-bold" htmlFor="">
              Password
            </label>
            <input placeholder="Enter password" value={password}  onChange={(e)=>setPassword (e.target.value)} 
             className="form-control " type="password" />
          </div>
          <button type="submit" className="btn btn-primary ms-5">Login</button>
            <p className="text-bold text-center mt-3" >
          new User? <Link  to="/signup" >Signup</Link>
        </p>
        </form>

      </div>
    </div>
  );
}

export default Login;
