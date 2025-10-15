
import React from "react"
import Home from "./components/Home"
import Login from "./components/Login"
import Logout from "./components/Logout"
import PageNotFound from "./components/pageNotFound"
import{ Routes ,Route } from "react-router-dom"
import SignUp  from "./components/SignUp"
import {Toaster} from "react-hot-toast" // for dispalying messages
const token =localStorage.getItem("jwt") // token which is in local storage
function App() {
 
  return(
    <div>
      <Routes>
         <Route path="/" element={ token?<Home/>:<Navigate to={"/login"}/> }/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<SignUp/>}/>
         <Route path="/logout" element={<Logout/>}/>
         <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <Toaster/>

    </div>
  )
}

export default App
