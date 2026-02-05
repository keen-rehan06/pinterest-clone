import mongoose from "mongoose";
import plm from "passport-local-mongoose"

const userSchema = new mongoose.Schema({
    name:{
     type:String,
     required:true
    },
    username:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"post"
        }
    ],
    dp:{
        type:String,
    }  
},{timestamps:true})

userSchema.plugin(plm)
const userModel = mongoose.model("user",userSchema);

export default userModel;