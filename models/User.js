import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "designer", "admin"], default: "user" },
  profileImage: String,
  location: String,
  phone: String,
  bio: String,
  skills: [String],
  portfolioImages: [String],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
