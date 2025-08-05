import connectMongo from "@/lib/mongoose";
import slugify from "slugify";
import User from "@/models/User";
import Review from "@/models/Review";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();

    const vendors = await User.find({ role: "designer" }).lean();

    const enrichedVendors = await Promise.all(
      vendors.map(async (vendor) => {
        const reviews = await Review.find({ vendor: vendor._id });
        const reviewCount = reviews.length;
        const avgRating =
          reviewCount > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
            : 0;

        return {
          ...vendor,
          avgRating: Number(avgRating.toFixed(1)),
          reviewCount,
        };
      })
    );

    return NextResponse.json(enrichedVendors, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();

    let vendor = await User.findOne({ email: body.email });

    if (!vendor) {
      vendor = await User.create({
        name: body.name,
        email: body.email,
        role: "designer",
        slug: slugify(body.name),
        profileImage: body.profileImage || "",
        portfolioImages: Array.isArray(body.portfolioImages) ? body.portfolioImages : [],
        phone: body.phone || "",
        bio: body.bio || "",
        skills: Array.isArray(body.skills) ? body.skills : [],
        workingSince: body.workingSince || "",
        location: body.location || "",
        projectType: Array.isArray(body.projectType) ? body.projectType : [],
        executionType: body.executionType || "",
        budgetRange: body.budgetRange || "",
        turnaroundTime: body.turnaroundTime || "",
      });

      // Optional review at vendor creation
      if (
        body.reviewName &&
        body.reviewEmail &&
        body.reviewRating &&
        Number(body.reviewRating) >= 1 &&
        Number(body.reviewRating) <= 5
      ) {
        await Review.create({
          vendor: vendor._id,
          name: body.reviewName,
          email: body.reviewEmail,
          rating: Number(body.reviewRating),
          message: body.reviewMessage || "",
        });
      }
    }

    return NextResponse.json(vendor, { status: 201 });
  } catch (err) {
    console.error("POST /api/vendors error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
