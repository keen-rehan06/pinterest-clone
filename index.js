import express from "express"
import connectDb from "./db/db.js";
import userRoute from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv"
import session from "express-session"
import flash from "connect-flash"
import { isLoggedIn } from "./middlewares/auth.middleware.js";
import userModel from "./models/user.model.js";
import postRoute from "./routes/post.routes.js"
dotenv.config('./.env');

(async()=>{
    try {
        await connectDb();
        console.log("MongoDb connected Successfully!!")
    } catch (error) {
        console.log("MongoDb connection Failed:",error)
    }
})()
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json({}));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(session({
    secret:"secret-key",
    resave:false,
    saveUninitialized:false,
}))
app.use(flash())
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
app.use(cookieParser());
app.set("view engine","ejs")
app.use("/",userRoute)
app.use("/",postRoute)

app.get("/",function(req,res){
    res.render("index")
})

app.get("/login",function(req,res){
    res.render("login")
})

app.get("/feed",isLoggedIn,function(req,res){
    res.render("feed")
})

app.get("/profile",isLoggedIn,async function(req,res){
    const user = await userModel.findOne({email:req.user.email}).populate("posts")
    console.log(user);
    console.log(user.posts)
    res.render("profile",{
        error:req.flash("error"),
        success:req.flash("success"),
        user,
  })
})

app.get("/post",isLoggedIn, function(req,res){
    res.render("post")
})

app.listen(process.env.PORT,function(){
    console.log(`App is running on port ${process.env.PORT}`)
})