import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import expressSession from "express-session"
import connectDb from "./db/connection.db.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import passport from "passport";

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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(expressSession({
        resave: false,
        saveUninitialized: false,
        secret: "secretKey"
   }))
app.use(passport.initialize());
app.use(passport.session())
passport.serializeUser(userRoutes.serializeUser())
passport.deserializeUser(userRoutes.deserializeUser())
app.use('/post', postRoutes)
app.use('/user', userRoutes);


app.get("/", function (req, res) {
    console.log("running");
    res.send("App is running!!");
})

app.listen(process.env.PORT, function () {
    console.log(`App is running on port ${process.env.PORT}`)
})
