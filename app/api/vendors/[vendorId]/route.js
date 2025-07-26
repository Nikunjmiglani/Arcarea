//app/api/vendors/[vendorid]/route.js
import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import Service from "@/models/Service";
import Review from "@/models/Review";

export async function GET(request, { params }) {
  const { vendorId } = params;

  try {
    await connectMongo();

    const vendor = await User.findById(vendorId).lean();
    if (!vendor || vendor.role !== "designer") {
      return new Response(JSON.stringify({ error: "Vendor not found" }), { status: 404 });
    }

    const services = await Service.find({ vendor: vendorId }).lean();
    const reviews = await Review.find({ vendor: vendorId }).lean(); // optional

    return new Response(
      JSON.stringify({ vendor, services, reviews }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching vendor:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
