import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  price: Number,
  category: String, // interior, architecture, furniture
  images: [String]
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
