import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      securityQuestions: [] // initialize empty, will be filled later
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      email: user.email // send email so frontend can use it
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );


    res.status(200).json({ message: "Login successful", token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// VERIFY SECURITY QUESTION (for forgot password)
export const verifySecurityAnswers = async (req, res) => {
  const { email, answers, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const stored = user.securityQuestions || [];

  // Compare answers
  const isValid = answers.every((ans, idx) =>
    stored[idx] && stored[idx].answer.toLowerCase() === ans.toLowerCase()
  );

  if (!isValid) return res.status(400).json({ message: "Incorrect answers" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
};