import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectMongo();
  const { id } = params;

  try {
    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
