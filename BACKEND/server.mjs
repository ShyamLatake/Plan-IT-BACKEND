import express from "express";
import http from "http";
import cors from "cors";
import app from './src/api.mjs';

const server = express();
server.use(cors());

server.use(app);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the server' });
});

const PORT = process.env.PORT || 8080;

http.createServer(server).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
