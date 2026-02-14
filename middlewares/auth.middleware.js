import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const signUpMiddleWare = async (req,res,next) => {
  try {
    const { name, username, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) return res
  .status(402)
  .send({ message: "User Already Exist" });
  if (!name || !username || !email || !password)
    return res
      .status(402)
      .send({ message: "All fields are required", sucess: false });
      next()
  } catch (error) {
    res.status(500).send({message:"Server error: ",error})
  }
};

export const loginMiddleWare = async (req,res,next) => {
try {
        const {email, password } = req.body;
  const user = await userModel.findOne({ email });
  if(!user) return res.status(404).send({messgae:"user does not exist!",success:false});
  if(!email || !password) return res.status(401).send({messgae:"All fields are required!"});
  next()
} catch (error) {
    res.status(500).send({message:"Server error: ",error})
}
}

export const isLoggedIn = async (req,res,next) => {
try {
  const token = req.cookies.token;
  console.log(token)
  if(!token) return res.status(401).send({
    message: "Unauthorized! Please login first.",
        success: false,
      });
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded
    next()
} catch (error) {
   res.status(500).send({message:"something went wrong!!",success:false,error})
}
}