import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js"

export const createPost = async (req,res) => {
    try {
        const postOwner = await userModel.findOne({email:req.user.email});
        if(!postOwner) {
            res.send("User not found");
            req.flash("success","User not found!");
        }

        const {postText,user,image} = req.body
       const post = await postModel.create({
             postText,
             user:postOwner._id,
             image:req.file.filename
        })
        console.log(post)
        res.redirect("/profile");
    } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
    }
}
