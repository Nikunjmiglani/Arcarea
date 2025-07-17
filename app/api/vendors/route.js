// /app/api/vendors/route.js
import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo();
  const designers = await User.find({ role: "designer" }).select("name _id");
  return NextResponse.json(designers);
}

export async function POST(req) {
  await connectMongo();
  const body = await req.json();

  const existing = await User.findOne({ email: body.email });
  if (existing) return NextResponse.json(existing); // avoid duplicates

  const newUser = await User.create({
    name: body.name,
    email: body.email,
    role: "designer",
  });

  return NextResponse.json(newUser, { status: 201 });
}

