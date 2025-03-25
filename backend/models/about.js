const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: "About Me" },
    description: { type: String, required: true, default: "We are a dedicated group of IT students from City College of Calamba, passionate about web development. This website is our final project for Advanced Database Management Systems, showcasing our expertise in NoSQL database design and web application development using MongoDB. It features full CRUD (Create, Read, Update, Delete) operations, demonstrating dynamic and efficient data management in a web application." },
    cv: { type: Buffer, required: true, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", AboutSchema);