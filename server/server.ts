import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes/routes.config';
import connectDB from './config/mongoose.config';
const app = express();
const port = 8000;
dotenv.config()
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();
routes(app)
app.listen(port, () => console.log(`Listening on port: ${port}`));
