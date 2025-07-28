import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { verifySecurityAnswers, login, register } from "../controllers/authController.js";

const router = express.Router();

// Signup routerouter.post('/signup', register);
router.post('/signup', register);

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