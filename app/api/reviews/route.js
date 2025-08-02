// /app/api/reviews/route.js

import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose";
import Review from "@/models/Review";

export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();

    console.log("📥 Received review body:", body);

    // ✅ Use 'vendor' instead of 'vendorId'
    const { vendor, name, email, rating, message } = body;

    // ✅ Validate required fields (email is optional)
    if (!vendor || !name || !rating || !message) {
      console.warn("❌ Missing required fields:", { vendor, name, rating, message });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Validate MongoDB ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(vendor)) {
      console.warn("❌ Invalid vendor ID format:", vendor);
      return NextResponse.json({ error: "Invalid vendor ID format" }, { status: 400 });
    }

    // ✅ Create the review
    const review = await Review.create({
      vendor,
      name,
      email: email || "anon@arcarea.com", 
      rating: Number(rating),
      message,
    });

    console.log("✅ Review saved successfully:", review);

    return NextResponse.json(review, { status: 201 });
  } catch (err) {
    console.error("💥 Review POST Error:", err.stack || err.message);
    return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
  }
}
