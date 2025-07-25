// /app/api/vendors/route.js
import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

// GET all designers (for dropdown)
export async function GET() {
  await connectMongo();
  const designers = await User.find({ role: "designer" }).select("name _id");
  return NextResponse.json(designers);
}

// POST: create a new designer/vendor with full details
export async function POST(req) {
  await connectMongo();
  const body = await req.json();

  // Prevent duplicates by email
  const existing = await User.findOne({ email: body.email });
  if (existing) return NextResponse.json(existing); // skip creation

  // Create new designer
  const newUser = await User.create({
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

  return NextResponse.json(newUser, { status: 201 });
}
