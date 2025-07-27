// /app/api/search/route.js
import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import Service from "@/models/Service";
import Review from "@/models/Review";
import Booking from "@/models/Booking";
import Request from "@/models/Request";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify({ error: "Query parameter 'q' is required" }), { status: 400 });
  }

  await connectMongo();

  const regex = new RegExp(query, "i");

  const [users, services, reviews, bookings, requests] = await Promise.all([
    User.find({ name: regex }).select("name slug"),
    Service.find({ title: regex }).select("title _id"),
    Review.find({ name: regex }).select("name _id"),
    Booking.find({ name: regex }).select("name _id"),
    Request.find({ name: regex }).select("name _id"),
  ]);

  return new Response(JSON.stringify({
    users,
    services,
    reviews,
    bookings,
    requests,
  }));
}
