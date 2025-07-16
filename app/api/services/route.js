import connectMongo from "@/lib/mongoose";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

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
