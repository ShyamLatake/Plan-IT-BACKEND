import express from "express";
import cors from "cors";
import authRouter from './modules/authenticate.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the server' });
});

// Authentication Routes
app.use('/v1/authenticate', authRouter);

export default app;
