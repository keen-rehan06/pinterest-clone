import userModel from "../models/user.model.js";
import postModel from "../models/post.model.js"

export const postController = async(req,res) => {
    const users = await userModel.findOne({_id:"6983f3c85aaa6164dd9c449d"}).populate("post");
   const {postText,user} = req.query
   const post = await postModel.create({
    postText:"Hey! hello my name is rehan sheikh. How are you?",
    user:users._id,
   })
  users.post.push(post._id);
  await users.save();
  res.send(post);
}