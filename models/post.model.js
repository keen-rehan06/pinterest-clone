import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postText:{
        type:String,
        required:true,
    },
   user:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   }],
   image:{
    type:String,
    required:true
   },
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        default:[]
    }],
    date:{
        type:Date,
        default:Date.now()
    }
})

const postModel = new mongoose.model("post",postSchema);

export default postModel;