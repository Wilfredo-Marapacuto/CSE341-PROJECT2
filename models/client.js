const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address.",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required."],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required."],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required."],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "clients",
  }
);

module.exports = mongoose.model("Client", clientSchema);