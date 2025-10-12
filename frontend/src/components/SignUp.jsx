import React from "react";
import {Link} from "react-router-dom"
import { useState } from "react";
import axios from "axios";

function SignUp() {  
const [username,setUserName] = useState("");
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

  const handleRegister= async(e)=>{
    e.preventDefault();
    try{
const {data} = await axios.post("http://localhost:9999/user/signup",{
  username,
  email,
  password,
},{
  withCredentials:true,
  headers:{
   "Content-Type": "application/json"
  }
})
console.log(data)
alert("user register successfully")
    } catch(error){
      console.log(error)
      alert("error") 
    }
    

  }
  return (

    <div className=" d-flex flex-column align-items-center justify-content-center signup-parent">
      <div className="d-flex flex-column align-items-center justify-content-center signupContainer w-100 rounded-3 shadow-lg bg-white">
        <h2 className="text-center fst-italic fw-bold">SignUp</h2>

        <form onSubmit={handleRegister} action="">
          {/* username */}

          <div  className="mb-3" >
            <label className="form-label mb-2 ms-2 fw-bold" htmlFor="">
              username
            </label>
            <input value={username}  onChange={(e)=>setUserName (e.target.value)} 
            placeholder=" Enter username" className="form-control" type="text" />
          </div>

          {/* email */}
          <div className="mb-3" >
            {" "}
            <label className="form-label mb-2 ms-2 fw-bold" htmlFor="">
              email
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
          <button type="submit" className="btn btn-primary">Singnup</button>
            <p className="text-bold text-center mt-3" >
          Already have an account? <Link  to="/Login" >Login</Link>
        </p>
        </form>

      </div>
    </div>
  );
}

export default SignUp;
