import connectMongo from "@/lib/mongoose";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo();
  const services = await Service.find().populate("vendor", "name");
  return NextResponse.json(services);
}
