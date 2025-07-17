import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo();
  const count = await User.countDocuments();
  return NextResponse.json({ count });
}
