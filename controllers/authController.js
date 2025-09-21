const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
// generate JWT Token
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h'}
  );
};
// @desc   Signup a new user
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email is already taken' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        token: createToken(user) 
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc   Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password'); 

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
        message: 'User logged in successfully',
      _id: user._id,
      email: user.email,
      role: user.role,
      token: createToken(user)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};