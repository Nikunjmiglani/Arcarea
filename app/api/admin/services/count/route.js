import connectMongo from "@/lib/mongoose";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo();
  const count = await Service.countDocuments();
  return NextResponse.json({ count });
}
