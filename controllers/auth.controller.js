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
    res
      .status(201)
      .send({
        message: `User ${user.name} Account has been created successfully!`,
        data: newUser,
      });
  } catch (error) {
    console.log(error   )
    console.log(error.message)
    res.status(500).send({ message: `signUp failed!`, error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const newUser = await userModel.findById(user._id).select("-password");
    bcrypt.compare(password, user.password, async function (err, result) {
      if (err)
        return res.status(401).send({ message: `Something went wrong!`, err });
      if (!result)
        return res.status(500).send({ message: "Incorrect password!!" });
      const token = generateToken(user);
      res.cookie("token", token);
      res.render('profile')
    });
  } catch (error) {
    res.status(500).send({ message: `login failed!`, error });
  }
};

export const logoutUser = async (req, res) => {
    try {
          res.clearCookie("token")
    res.status(200).send({message:"User Logout Successfully!!"})
    } catch (error) {
        res.status(500).send({message:"Logout Failed!"})
    }
};
