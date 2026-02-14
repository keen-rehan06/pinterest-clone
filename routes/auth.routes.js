import express from 'express'
import { signUpMiddleWare,loginMiddleWare,isLoggedIn } from '../middlewares/auth.middleware.js';
import { signUpUser,loginUser,logoutUser } from '../controllers/auth.controller.js';
const app = express.Router();

app.post("/signup",signUpMiddleWare,signUpUser);
app.post("/login",loginMiddleWare,loginUser);
app.get("/logout",isLoggedIn,logoutUser);

export default app;