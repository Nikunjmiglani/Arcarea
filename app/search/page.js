// app/search/page.jsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import connectMongo from "@/lib/mongoose";
import Service from "@/models/Service";
import User from "@/models/User";
import Review from "@/models/Review";

export const dynamic = "force-dynamic";

async function getSearchResults(query) {
  await connectMongo();

  const serviceResults = await Service.find({
    title: { $regex: query, $options: "i" },
  }).populate("vendor");

  const userResults = await User.find({
    name: { $regex: query, $options: "i" },
  });

  const reviewResults = await Review.find({
    message: { $regex: query, $options: "i" },
  }).populate("user");

  return {
    services: JSON.parse(JSON.stringify(serviceResults)),
    users: JSON.parse(JSON.stringify(userResults)),
    reviews: JSON.parse(JSON.stringify(reviewResults)),
  };
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.query || "";
  const location = searchParams?.location || "";

  if (!query) {
    return <p className="text-center py-10 text-xl">No query provided.</p>;
  }

  const results = await getSearchResults(query);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Search results for &quot;{query}&quot;:
      </h1>

      {/* Services Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Matching Services</h2>
        {results.services.length === 0 ? (
          <p className="text-gray-500">No matching services found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.services.map((service) => (
              <Link
                key={service._id}
                href={`/vendors/${service.vendor?.slug || service.vendor?._id}`}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <Image
                  src={service.image || "/default.jpg"}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{service.category}</p>
                  <p className="text-sm text-gray-600">
                    by {service.vendor?.name || "Unknown Vendor"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Users Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Matching Users</h2>
        {results.users.length === 0 ? (
          <p className="text-gray-500">No matching users found.</p>
        ) : (
          <ul className="space-y-2">
            {results.users.map((user) => (
              <li key={user._id}>
                <Link
                  href={`/vendors/${user.slug || user._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Matching Reviews</h2>
        {results.reviews.length === 0 ? (
          <p className="text-gray-500">No matching reviews found.</p>
        ) : (
          <ul className="space-y-4">
            {results.reviews.map((review) => (
              <li key={review._id} className="border-b pb-2">
                <p className="text-sm text-gray-700 mb-1">&quot;{review.message}&quot;</p>
                <p className="text-xs text-gray-500">
                  — {review.user?.name || "Anonymous"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
