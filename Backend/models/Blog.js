import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  content: { type: String },
  category: { type: String },
  tags: [String],
  cookingTime: { type: String },
  servings: { type: String },
  difficulty: { type: String },
  ingredients: [String],
  instructions: [String],
  tips: { type: String },
  author: { type: String },
  imageUrl: { type: String },
  rating: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
