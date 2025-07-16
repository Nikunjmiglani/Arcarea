import connectMongo from "@/lib/mongoose";
import Request from "@/models/Request";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongo();
  const body = await req.json();

  try {
    const request = await Request.create(body);
    return NextResponse.json({ success: true, request });
  } catch (err) {
    console.error("Error creating request:", err);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}
