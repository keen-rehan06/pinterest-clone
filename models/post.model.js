import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    postText:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    likes:[]    
},{timestamps:true})

const postModel = mongoose.model("post",postSchema);

export default postModel;