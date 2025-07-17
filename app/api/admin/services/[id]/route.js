import connectMongo from "@/lib/mongoose";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectMongo();
  const { id } = params;

  try {
    await Service.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
