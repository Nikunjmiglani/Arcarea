'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function VendorCard({ vendor }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images =
    vendor.portfolioImages?.length > 0
      ? vendor.portfolioImages
      : [vendor.profileImage || '/vendor.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const displayImage = images[currentImageIndex];

  return (
    <Link
      key={vendor._id}
      href={`/vendors/${vendor.slug}`}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 group"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 relative rounded-full overflow-hidden shadow-md mb-3">
          <Image
            key={displayImage}
            src={displayImage}
            alt={vendor.name}
            fill
            unoptimized
            className="object-cover transition-opacity duration-500"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-black">
          {vendor.name}
        </h3>

        <p className="text-sm text-gray-500">{vendor.location || 'Unknown Location'}</p>

        {/* ✅ Working Since */}
       <p className="text-sm text-gray-500">
  {vendor.workingSince
    ? `${new Date().getFullYear() - Number(vendor.workingSince)} years of experience`
    : 'Experience not available'}
</p>


        <div className="flex items-center justify-center mt-2 space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(vendor.avgRating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.567-.955L10 0l2.945 5.955 6.567.955-4.756 4.635 1.122 6.545z" />
            </svg>
          ))}
          <span className="ml-1 text-xs text-gray-600">
            ({vendor.reviewCount || 0})
          </span>
        </div>

        <p className="mt-3 text-sm text-gray-600 line-clamp-3">
          {vendor.bio || 'Experienced vendor providing top-quality interior solutions.'}
        </p>
      </div>
    </Link>
  );
}
