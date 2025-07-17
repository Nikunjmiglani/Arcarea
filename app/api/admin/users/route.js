import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo();
  const users = await User.find().sort({ createdAt: -1 });
  return NextResponse.json(users);
}
