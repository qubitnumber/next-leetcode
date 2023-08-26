import mongoose from "mongoose";

let isConnected = false;
const connectDB = async () => {
    mongoose.set("strictQuery", true);
    if (!process.env.MONGODB_URI) return console.log("Missing MongoDB URL");
    if (isConnected) {
        console.log("MongoDB connection already established");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI || '');
        isConnected = true;
        console.log(`MongoDB Connected`);
    } catch (err) {
        console.error('Error Encountered: ',err);
    }
};
export default connectDB;