import mongoose from 'mongoose';

const connectionString = "mongodb+srv://ademecheklie78:8zvUKKsqTDDaEeRL@cluster0.3pztr.mongodb.net/books?retryWrites=true&w=majority";

const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, { autoIndex: true });
        console.log('Connected to mongoDB database');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
    }
};

export default connectToDB;
