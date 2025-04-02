require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Initialize models BEFORE routes
require("./models/about"); // This registers the model with Mongoose

// Then import routes
const aboutRoutes = require("./routes/aboutRoutes");

// Middleware
app.use(cors());
app.use(express.json());

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
app.use("/api/about", aboutRoutes);

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