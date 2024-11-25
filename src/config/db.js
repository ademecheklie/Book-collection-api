import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
const connectionString = process.env.MONGO_URI
const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ademecheklie78:8zvUKKsqTDDaEeRL@cluster0.3pztr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { autoIndex: true });
        console.log('Connected to mongoDB database');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
    }
};

export default connectToDB;
