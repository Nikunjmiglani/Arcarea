// /app/api/vendors/popular/route.js
import connectMongo from "@/lib/mongoose";
import Service from "@/models/Service";
import User from "@/models/User";
import Review from "@/models/Review";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo();

  // Get top 6 vendors by number of services
  const vendors = await Service.aggregate([
    { $match: { vendor: { $exists: true, $ne: null } } },
    { $group: { _id: "$vendor", serviceCount: { $sum: 1 } } },
    { $sort: { serviceCount: -1 } },
    { $limit: 6 },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "vendorData",
      },
    },
    { $unwind: "$vendorData" },
  ]);

  // Fetch and calculate reviews for each vendor
  const enrichedVendors = await Promise.all(
    vendors.map(async (vendor) => {
      const reviews = await Review.find({ vendor: vendor._id });
      const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;

      return {
        _id: vendor.vendorData._id,
        name: vendor.vendorData.name,
        profileImage: vendor.vendorData.profileImage || "",
        location: vendor.vendorData.location || "",
        bio: vendor.vendorData.bio || "",
        reviewCount: reviews.length,
        avgRating: avgRating,
      };
    })
  );

  return NextResponse.json(enrichedVendors);
}
