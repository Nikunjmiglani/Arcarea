// /models/User.js
import mongoose from "mongoose";
import slugify from "slugify"; // npm install slugify

const UserSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "designer", "admin"], default: "user" },
  profileImage: String,
  location: String,
  phone: String,
  bio: String,
  skills: [String],
  portfolioImages: [String],

  
  workingSince: String, 
}, { timestamps: true });

UserSchema.pre("save", function (next) {
  if (this.isModified("name") || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
