// /models/User.js
import mongoose from "mongoose";
import slugify from "slugify"; // npm install slugify

const UserSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,

  role: {
    type: String,
    enum: ["user", "designer", "admin"],
    default: "user"
  },

  profileImage: String,
  portfolioImages: [String],

  phone: String,
  bio: String,
  skills: [String],
  workingSince: String,

  // ✅ Newly added fields
  location: String,                       // e.g. "Pan India" or "Delhi/Mumbai"
  projectType: [String],                  // e.g. ["Residential", "Commercial"]
  executionType: String,                  // e.g. "Turnkey" or "Consultancy"
  budgetRange: String,                    // e.g. "5L - 15L"
  turnaroundTime: String,                 // e.g. "1-3 months"

}, { timestamps: true });

// Auto-generate slug from name
UserSchema.pre("save", function (next) {
  if (this.isModified("name") || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
