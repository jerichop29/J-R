// controllers/authController.js
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 2. Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        type: user.type
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4. Send response
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        type: user.type
      }
    });

  } catch (err) {
    next(err);
  }
};