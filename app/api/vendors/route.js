// /app/api/vendors/route.js
import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import Review from "@/models/Review";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo();
  const designers = await User.find({ role: "designer" }).select("name _id");
  return NextResponse.json(designers);
}

export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();

    // 🔁 Always return the correct vendor (even if already exists)
    let vendor = await User.findOne({ email: body.email });

    if (!vendor) {
      vendor = await User.create({
        name: body.name,
        email: body.email,
        role: "designer",
        profileImage: body.profileImage || "",
        location: body.location || "",
        phone: body.phone || "",
        bio: body.bio || "",
        skills: Array.isArray(body.skills) ? body.skills : [],
        portfolioImages: Array.isArray(body.portfolioImages) ? body.portfolioImages : [],
      });

      // ✅ Optional review
      if (
        body.reviewName &&
        body.reviewEmail &&
        body.reviewRating &&
        Number(body.reviewRating) >= 1 &&
        Number(body.reviewRating) <= 5
      ) {
        await Review.create({
          vendor: vendor._id,
          name: body.reviewName,
          email: body.reviewEmail,
          rating: Number(body.reviewRating),
          message: body.reviewMessage || "",
        });
      }
    }

    return NextResponse.json(vendor, { status: 201 });
  } catch (err) {
    console.error("POST /api/vendors error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
