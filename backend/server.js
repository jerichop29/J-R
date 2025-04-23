require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const path = require('path');

// Then import routes
const authRoutes = require("./routes/authRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const skillRoutes = require("./routes/skillRoutes");
const projectRoutes = require("./routes/projectRoutes");
const memberRoutes = require("./routes/memberRoutes");


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


async function connectDB() {
  if (!MONGO_URL) {
    console.error("❌ MONGO_URL is missing in .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log("✅ MongoDB Connected");

  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
}

// Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/about", aboutRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/auth", authRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});