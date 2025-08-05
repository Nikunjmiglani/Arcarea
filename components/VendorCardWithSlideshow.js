'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function VendorCard({ vendor }) {
  const images = vendor.portfolioImages?.length
    ? vendor.portfolioImages
    : [vendor.profileImage || '/vendor.jpg'];

  const displayImage = images[0]; // Show only the first image

  console.log(vendor.name, vendor.avgRating, typeof vendor.avgRating);


  return (
    <Link
      href={`/vendors/${vendor.slug}`}
      className="bg-white rounded-xl hover:scale-[1.02] duration-200 border shadow-sm hover:shadow-md transition-all overflow-hidden max-w-sm"
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 pt-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {vendor.name}
        </h3>
        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
          {vendor.workingSince ? `Since ${vendor.workingSince}` : '—'}
        </span>
      </div>

      {/* Static Image */}
      <div className="w-full h-48 relative mt-3">
        {displayImage ? (
  <Image
    src={displayImage}
    alt={vendor.name}
    fill
    unoptimized
    className="object-cover transition-opacity duration-500"
  />
) : (
  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
    No image available
  </div>
)}

      </div>

      {/* Ratings and Bio */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-1">
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < Math.round(Number(vendor.avgRating || 0))
            ? 'text-yellow-400'
            : 'text-gray-300'
        }`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.567-.955L10 0l2.945 5.955 6.567.955-4.756 4.635 1.122 6.545z" />
      </svg>
    ))}
  </div>
  <span className="text-xs text-gray-600">
    ({vendor.reviewCount || 0})
  </span>
</div>


        <p className="text-sm text-gray-700 pb-4 line-clamp-3">
          {vendor.bio ||
            'Experienced vendor providing top-quality interior solutions.'}
        </p>
      </div>
    </Link>
  );
}
