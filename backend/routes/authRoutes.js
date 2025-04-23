const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// POST /api/auth/login
router.post("/login", authController.login);

// Optional check
router.get("/", (req, res) => {
  res.json({ 
    status: "Authentication API working",
    endpoints: {
      login: "POST /login"
    }
  });
});

module.exports = router;
