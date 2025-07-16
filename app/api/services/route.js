// app/api/services/route.js
import connectMongo from "@/lib/mongoose";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectMongo();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const keyword = searchParams.get("q");

  const query = {};
  if (category && category !== "all") query.category = category;
  if (keyword) query.$or = [
    { title: { $regex: keyword, $options: "i" } },
    { description: { $regex: keyword, $options: "i" } }
  ];

  const services = await Service.find(query).populate("vendor", "name");
  return NextResponse.json(services);
}

export async function POST(req) {
  await connectMongo();
  const body = await req.json();
  let vendorId = body.vendor;

  if (!vendorId) {
    // Auto‑assign a random vendor
    const User = (await import("@/models/User")).default;
    const designers = await User.find({ role: "designer" });
    if (!designers.length) {
      return NextResponse.json({ error: "No designers found" }, { status: 400 });
    }
    vendorId = designers[Math.floor(Math.random() * designers.length)]._id;
  }

  try {
    const newService = await Service.create({ ...body, vendor: vendorId });
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating service" }, { status: 500 });
  }
}
