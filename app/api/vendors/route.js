import connectMongo from "@/lib/mongoose";
import slugify from "slugify";
import User from "@/models/User";
import Review from "@/models/Review";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a single file to Cloudinary
 */
async function uploadToCloudinary(file, folder) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
  const uploaded = await cloudinary.uploader.upload(base64, { folder });
  return uploaded.secure_url;
}

/**
 * GET vendors list with review stats
 */
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

    return NextResponse.json(enrichedVendors, { status: 200 });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/**
 * POST - create a new vendor and assign to service
 */
export async function POST(req) {
  try {
    await connectMongo();

    const contentType = req.headers.get("content-type") || "";
    let data = {};
    let profileImageUrl = "";
    let portfolioImagesUrls = [];

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();

      // Vendor Fields
      data.name = form.get("name") || "";
      data.email = form.get("email") || "";
      data.phone = form.get("phone") || "";
      data.bio = form.get("bio") || "";
      data.skills = form.get("skills") ? JSON.parse(form.get("skills")) : [];
      data.workingSince = form.get("workingSince") || "";
      data.location = form.get("location") || "";
      data.projectType = form.get("projectType")
        ? JSON.parse(form.get("projectType"))
        : [];
      data.executionType = form.get("executionType") || "";
      data.budgetRange = form.get("budgetRange") || "";
      data.turnaroundTime = form.get("turnaroundTime") || "";

      // Review fields
      const reviewName = form.get("reviewName") || "";
      const reviewEmail = form.get("reviewEmail") || "";
      const reviewRating = Number(form.get("reviewRating") || 0);
      const reviewMessage = form.get("reviewMessage") || "";

      // Optional service values
      const serviceId = form.get("serviceId");
      const newServiceName = form.get("newServiceName");

      // Profile Image
      const profileImageFile = form.get("profileImage");
      if (profileImageFile && profileImageFile.name) {
        profileImageUrl = await uploadToCloudinary(
          profileImageFile,
          "vendors/profileImages"
        );
      }

      // Portfolio Images
      const portfolioImagesFiles = form.getAll("portfolioImages");
      for (let img of portfolioImagesFiles) {
        if (img && img.name) {
          const uploadedUrl = await uploadToCloudinary(
            img,
            "vendors/portfolioImages"
          );
          portfolioImagesUrls.push(uploadedUrl);
        } else if (typeof img === "string") {
          portfolioImagesUrls.push(img); // plain URLs
        }
      }

      data.review = { reviewName, reviewEmail, reviewRating, reviewMessage };
      data.serviceId = serviceId;
      data.newServiceName = newServiceName;
    } else {
      // Handle JSON
      const body = await req.json();
      data = body;

      profileImageUrl = body.profileImage || "";
      portfolioImagesUrls = body.portfolioImages || [];
    }

    // Check if vendor exists
    let vendor = null;

    if (data.existingVendorId) {
      vendor = await User.findById(data.existingVendorId);
    } else {
      vendor = await User.findOne({ email: data.email });

      if (!vendor) {
        vendor = await User.create({
          name: data.name,
          email: data.email,
          role: "designer",
          slug: slugify(data.name, { lower: true }),
          profileImage: profileImageUrl,
          portfolioImages: portfolioImagesUrls,
          phone: data.phone,
          bio: data.bio,
          skills: data.skills,
          workingSince: data.workingSince,
          location: data.location,
          projectType: data.projectType,
          executionType: data.executionType,
          budgetRange: data.budgetRange,
          turnaroundTime: data.turnaroundTime,
        });

        // Optional review creation
        if (
          data.review &&
          data.review.reviewName &&
          data.review.reviewEmail &&
          data.review.reviewRating >= 1 &&
          data.review.reviewRating <= 5
        ) {
          await Review.create({
            vendor: vendor._id,
            name: data.review.reviewName,
            email: data.review.reviewEmail,
            rating: data.review.reviewRating,
            message: data.review.reviewMessage,
          });
        }
      }
    }

    // ✅ Assign or create service
    if (data.serviceId) {
      const existingService = await Service.findById(data.serviceId);
      if (existingService && !existingService.vendor) {
        existingService.vendor = vendor._id;
        await existingService.save();
      }
    } else if (data.newServiceName) {
      await Service.create({
        name: data.newServiceName,
        vendor: vendor._id,
      });
    }

    return NextResponse.json({ success: true, vendor }, { status: 201 });
  } catch (err) {
    console.error("POST /api/vendors error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
