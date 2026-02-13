import express from "express"
import connectDb from "./db/db.js";
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

app.get("/",function(req,res){
    res.send("Hello world!")
})

app.listen(process.env.PORT,function(){
    console.log(`App is running on port ${process.env.PORT}`)
})