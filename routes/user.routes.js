import express from "express";
import { createUser } from "../controllers/user.controller.js";

const app = express.Router();

app.get("/create",createUser);

export default app;