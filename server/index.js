import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', goalRoutes); // IMPORTANT: no /goals prefix
app.use("/api/chat", chatRoutes);
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
