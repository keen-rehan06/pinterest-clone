import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";

export const createPost = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      res.send("User not found");
      req.flash("success", "User not found!");
    }
    if (!req.file) {
      res.status(400).send({ message: "no files were upload" });
    }
    const { postText, userId, image } = req.body;
    const post = await postModel.create({
      postText,
      userId: user._id,
      image: req.file.filename,
    });
    await user.posts.push(post._id)
    await user.save();
    console.log(user);
    console.log(user._id);
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};


export const updateProfile = async(req,res) => {
 try {
   const {name,username,description} = req.body;
  let updatedData = {
    name,
    username,
    description
  }
    if(req.file){
      updatedData.image = req.file.filename
    }

   await userModel.findOneAndUpdate({email:req.user.email,updatedData,new:true});
    res.redirect("/profile");
 } catch (error) {
  console.log(error);
    res.status(500).send("Server Error");
 }
}