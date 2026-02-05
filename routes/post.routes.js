import express from "express";
import {postController}  from "../controllers/post.controller.js";

const app = express.Router();

app.get("/createPost",postController);

export default app;