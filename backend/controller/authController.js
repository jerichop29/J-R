const User = require("../models/user");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required"
      });
    }

    // Find user with exact username and password
    const user = await User.findOne({ username: username.trim(), password: password.trim() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    // Remove password before sending
    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      user: userData,
      message: "Login successful"
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
