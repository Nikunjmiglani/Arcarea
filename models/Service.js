// /models/Service.js
import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    category: String,
    subcategory: String,
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
