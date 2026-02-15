import express from "express"
import {createPost,updateProfile} from "../controllers/post.controller.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js"
import upload from "../config/multer.config.js"

const app = express.Router()

app.post('/post',isLoggedIn,upload.single("image"),createPost);
app.post('/update',isLoggedIn,upload.single("dp"),updateProfile);

export default app;