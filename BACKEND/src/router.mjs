import express from "express";
import cors from "cors";
import authController from './controllers/authController.mjs';
import eventController from './controllers/eventController.mjs'
 
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the server' });
});

// Authentication Routes
app.use('/v1/authenticate', authController);

app.use('/v1/events', eventController);

export default app;
