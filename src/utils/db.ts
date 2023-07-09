import mongoose from "mongoose";
const connectionUrl = "mongodb://localhost:27017/test_db";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI||connectionUrl);
        console.log(`MongoDB Connected`);
    } catch (err) {
        console.error('Error Encountered: ',err);
        process.exit(1);
    }
};
export default connectDB;