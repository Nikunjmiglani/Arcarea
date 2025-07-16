import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  rating: Number,
  comment: String,
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
