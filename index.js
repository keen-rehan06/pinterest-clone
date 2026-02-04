import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connection.db.js"
 
dotenv.config("./.env");

(async () => {
    try {
        await connectDb()
        console.log("MongoDb Connected Successfully!!");
    } catch (error) {
        console.log("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
})();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", function (req, res) {
    console.log("running");
    res.send("App is running!!");
})

app.listen(process.env.PORT, function () {
    console.log(`App is running on port ${process.env.PORT}`)
})
