import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import Service from "@/models/Service";

export async function GET(request, { params }) {
  const { vendorId } = params;

  try {
    await connectMongo();

    const vendor = await User.findById(vendorId).lean();
    if (!vendor || vendor.role !== "designer") {
      return new Response(JSON.stringify({ error: "Vendor not found" }), { status: 404 });
    }

    const services = await Service.find({ vendorId }).lean();

    return new Response(
      JSON.stringify({ vendor, services }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching vendor:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
