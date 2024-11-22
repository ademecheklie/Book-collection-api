import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();    

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
