import mongoose from "mongoose";

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
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    dp:{
        type:String,
        default:"https://media.istockphoto.com/id/1212674064/photo/one-man-on-busy-city-street-at-night-long-exposure-with-blurred-motion.webp?a=1&b=1&s=612x612&w=0&k=20&c=S3uDlS7G6wZrwYixJUh391aVIEMotrDMEf7u_-zzjzs="
    },
    description:{
        type:String,
        default:"description"
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }]
},{timestamps:true})

const userModel = new mongoose.model("user",userSchema);

export default userModel