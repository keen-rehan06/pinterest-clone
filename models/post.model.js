import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    postText:{
        type:String,
        required:true
    },
    likes:[]
},{timestamps:true})

const postModel = mongoose.model("post",postSchema);

export default postModel;