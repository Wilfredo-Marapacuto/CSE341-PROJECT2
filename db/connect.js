const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const initDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB using Mongoose");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

module.exports = {
  initDb,
};