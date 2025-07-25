import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    email: String,
    rating: { type: Number, min: 1, max: 5 },
    message: String,
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
