import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../config/jwtToken.js";

export const signUpUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = await userModel.create({
      name,
      username,
      email,
      password: hash,
    });
    const newUser = await userModel.findById(user._id).select("-password");
    const token = generateToken(user);
    res.cookie("token", token);
    req.flash("success", "User Created Successfully!");
    res.redirect("/login")
  } catch (error) {
    console.log(error   )
    console.log(error.message)
    req.flash("error", "signup failed!");
    res.status(500).send({ message: `signUp failed!`, error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    bcrypt.compare(password, user.password, async function (err, result) {

      if (err){
        req.flash("error","Something went wrong");
        return res.redirect("/login");
      }

      if (!result){
        req.flash("error", "User and Password is Incorrect!");
        return res.redirect("/login");
      }

      const token = generateToken(user);
      res.cookie("token", token);

      req.flash("success", "Login Successfully!");
      res.redirect("/profile");   
    });

  } catch (error) {
    req.flash("error", "Login Failed!");
    res.redirect("/login");
  }
};

export const logoutUser = async (req, res) => {
    try {
          res.clearCookie("token")
          req.flash("success", "User Logout!");
    res.status(200).send({message:"User Logout Successfully!!"})
    } catch (error) {
      req.flash("error", "Logout Failed!");
        res.status(500).send({message:"Logout Failed!"})
    }
};

