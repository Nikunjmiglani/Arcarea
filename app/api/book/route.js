import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectMongo from "@/lib/mongoose";
import Booking from "@/models/Booking";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectMongo();

    const { name, email, phone, message, vendorId } = await req.json();

    // Save booking to DB
    await Booking.create({ name, email, phone, message, vendor: vendorId });

    // Fetch vendor info
    const vendor = await User.findById(vendorId);
    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    // Configure Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = [
      {
        // To Customer
        to: email,
        subject: "Your Booking with ArcArea Vendor is Confirmed",
        text: `Hi ${name},

Your booking with ${vendor.name} is confirmed.

📍 Vendor Details:
Name: ${vendor.name}
Phone: ${vendor.phone || "N/A"}
Email: ${vendor.email}
Location: ${vendor.location || "Not Provided"}

Thank you for using ArcArea!`,
      },
      {
        // To Vendor
        to: vendor.email,
        subject: "New Booking Received on ArcArea",
        text: `Hi ${vendor.name},

You have received a new booking from:

👤 Customer Details:
Name: ${name}
Phone: ${phone}
Email: ${email}

📩 Message:
${message}

Please contact the customer and proceed accordingly.

Regards,  
ArcArea Team`,
      },
      {
        // To Admin
        to: "admin@arcarea.com",
        subject: "New Booking on ArcArea",
        text: `New booking details:

Customer Name: ${name}
Customer Phone: ${phone}
Customer Email: ${email}

Vendor: ${vendor.name}
Vendor Email: ${vendor.email}
Vendor Location: ${vendor.location}

Message: ${message}`,
      },
    ];

    for (const mail of mailOptions) {
      await transporter.sendMail({
        from: `"ArcArea" <${process.env.EMAIL_USER}>`,
        ...mail,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
