const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Portfolio")
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch(() => {
    console.log("Connection failed...");
  });