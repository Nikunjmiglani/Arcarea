// /app/api/vendors/route.js
import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo();
  const designers = await User.find({ role: "designer" }).select("_id name email");
  return NextResponse.json(designers);
}
