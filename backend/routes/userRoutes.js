// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Add this new login endpoint
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find user with matching username and password
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid username or password" 
      });
    }

    // Successful login
    res.json({ 
      success: true,
      message: "Login successful",
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
});

// Keep your existing GET and PUT routes
router.get("/", async (req, res, next) => {
  // ... existing code ...
});

router.put("/:id", async (req, res, next) => {
  // ... existing code ...
});

module.exports = router;