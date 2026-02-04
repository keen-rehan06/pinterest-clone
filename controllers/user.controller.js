import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const createUser = async(req,res) => {
    const { name,username,email,password } = req.query;
    const user = await userModel.create({
          name:"Rehan Sheikh",
          username:"keen_rehan06",
          email:"r@gmail.com",
          password:"123456789",
    })
    res.status(201).send(user);
}