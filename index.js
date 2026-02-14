import express from "express"
import connectDb from "./db/db.js";
import userRoute from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv"
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
app.set("view engine","ejs")
app.use(cookieParser());
app.use("/",userRoute)

app.get("/",function(req,res){
    res.render("index")
})

app.get("/login",function(req,res){
    res.render("login")
})

app.get("/feed",function(req,res){
    res.render("feed")
})

app.listen(process.env.PORT,function(){
    console.log(`App is running on port ${process.env.PORT}`)
})