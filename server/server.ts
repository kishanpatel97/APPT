import express from 'express';
import cors from 'cors';
import './routes/appt.routes';
import connectDB from './config/mongoose.config';
const app = express();
const port = 8000;
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

app.listen(port, () => console.log(`Listening on port: ${port}`));
