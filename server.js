import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(postRoutes);
app.use(userRoutes);

app.use(express.json());

const start = async () => {
    const connectDB = await mongoose.connect(process.env.MONGO_URI);

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
};

start();
