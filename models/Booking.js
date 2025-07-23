// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
