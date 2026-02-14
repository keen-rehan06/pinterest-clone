import express from "express"
import {createPost} from "../controllers/post.controller.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js"
import upload from "../config/multer.config.js"

const app = express.Router()

app.post('/post',isLoggedIn,upload.single("image"),createPost);

export default app;