import connectMongo from "@/lib/mongoose";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

// GET: Fetch services
export async function GET(req) {
  await connectMongo();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const keyword = searchParams.get("q");

  const query = {};

  if (category && category !== "all") {
    query.category = category;
  }

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  const services = await Service.find(query).populate("vendor", "name");
  return NextResponse.json(services);
}

// ✅ POST: Create service
export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();

    const newService = new Service(body);
    await newService.save();

    return NextResponse.json({ message: "Service created" }, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
