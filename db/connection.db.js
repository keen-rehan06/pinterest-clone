import mongoose from "mongoose";

const connectDB = async () => {
    try {
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
} catch (error) {
    console.log("Failed to connect to MongoDB:",error);
        process.exit(1);
}
} 

export default connectDB;