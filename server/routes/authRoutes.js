import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { verifySecurityAnswers, login } from "../controllers/authController.js";

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', email: newUser.email });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save Security Questions
router.put('/security-question', async (req, res) => {
  const { email, securityQuestions } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { securityQuestions },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Security questions updated successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route (added)
router.post('/login', login);

// Forgot password verify
router.post('/verify-security-answers', verifySecurityAnswers);

export default router;