const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [0, "Price cannot be negative."],
    },
    active: {
      type: Boolean,
      required: [true, "Active status is required."],
    },
  },
  {
    collection: "services",
  }
);

module.exports = mongoose.model("Service", serviceSchema);