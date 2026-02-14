import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postText:{
        type:String,
        required:true,
    },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   },
    like:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        default:[]
    },
    date:{
        type:Date,
        default:Date.now()
    }
})