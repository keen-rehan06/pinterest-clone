import cookieParser from "cookie-parser";
import express from "express"

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",function(req,res){
    console.log("running");
    res.send("App is running!!");
})

app.listen(3000,function(){
    console.log("App is running on port 3000")
})
