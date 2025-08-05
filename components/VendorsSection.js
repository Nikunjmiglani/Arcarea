"use client";

import { useEffect, useState } from "react";
import VendorCardWithSlideshow from "@/components/VendorCardWithSlideshow";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function VendorSection() {
  const [vendors, setVendors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4; // show 4 at a time

  useEffect(() => {
    const fetchVendors = async () => {
      const res = await fetch("/api/vendors");
      const data = await res.json();
      setVendors(data);
    };

    fetchVendors();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + visibleCount, vendors.length - visibleCount)
    );
  };

  const visibleVendors = vendors.slice(currentIndex, currentIndex + visibleCount);

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold mb-6">Explore Our Designers</h1>

      {vendors.length ? (
        <>
          {/* Grid of visible vendors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleVendors.map((vendor) => (
              <VendorCardWithSlideshow key={vendor._id} vendor={vendor} />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full shadow-md ${
                currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"
              }`}
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex + visibleCount >= vendors.length}
              className={`p-2 rounded-full shadow-md ${
                currentIndex + visibleCount >= vendors.length
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      ) : (
        <p>Loading vendors...</p>
      )}
    </div>
  );
}
