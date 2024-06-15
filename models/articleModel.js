const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  category: {
    type: String,
    enum: ["Food", "Education", "Business", "Positions"],
    required: [true, "Category is required"],
  },
  slug: {
    type: String,
    required: [true, "Slug is required"],
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Article", articleSchema);
