import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo();

  try {
    const vendors = await User.find({ role: "designer" }).select("name _id");
    return NextResponse.json(vendors);
  } catch (err) {
    console.error("Error fetching vendors:", err);
    return NextResponse.json({ error: "Failed to fetch vendors" }, { status: 500 });
  }
}
