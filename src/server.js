import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
