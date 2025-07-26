import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectMongo();

  const slug = params.slug; 
  const vendor = await User.findOne({ slug, role: "designer" });

  if (!vendor) {
    return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
  }

  const services = await Service.find({ vendor: vendor._id });

  return NextResponse.json({ vendor, services });
}
