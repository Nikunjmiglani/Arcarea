// /app/api/vendors/popular/route.js
import connectMongo from "@/lib/mongoose";
import Service from "@/models/Service";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo();

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
    {
      $project: {
        _id: "$vendorData._id",
        name: "$vendorData.name",
        email: "$vendorData.email",
        image: "$vendorData.image",
      },
    },
  ]);

  return NextResponse.json(vendors);
}
