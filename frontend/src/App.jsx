
import React from "react"
import Home from "./components/Home"
import Login from "./components/Login"
import Logout from "./components/Logout"
import PageNotFound from "./components/pageNotFound"
import{ Routes ,Route } from "react-router-dom"
function App() {
 
  return(
    <div>
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/logout" element={<Logout/>}/>
         <Route path="*" element={<PageNotFound/>}/>
      </Routes>


    </div>
  )
}

export default App
