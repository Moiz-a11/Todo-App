

import mongoose from "mongoose"


const userSchema = mongoose.Schema({

    username:{
        type:String,
        requiredL:true
    },
    email:{
        type:String,
         require:true,
         unique:true
    },
    password:{
        type: String,
        required:true,
        select:false,
    },
    token:{
        type:String,
    }

})

const User  = mongoose.model("User",userSchema)

export default User;