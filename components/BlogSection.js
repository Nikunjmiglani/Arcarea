'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const categories = [
  'trending',
  'Bedroom Guides',
  'Living Room Guides',
  'Kids Room Guides',
  'Study Room Guides',
];

export default function BlogSection({ blogs }) {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log("Fetched blogs:", blogs);

  // Fix: Sanity returns categories as array, so we check if any match
  const filteredBlogs = blogs.filter((blog) =>
    blog.categories?.some((cat) => cat.title.toLowerCase() === activeCategory.toLowerCase())
  );

  const visibleBlogs = filteredBlogs.slice(currentIndex, currentIndex + 2);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, filteredBlogs.length - 2)
    );
  };

  const resetSlider = () => {
    setCurrentIndex(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Guides For Home Interiors
      </h2>

      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-8 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              resetSlider();
            }}
            className={`pb-2 text-base font-medium whitespace-nowrap transition ${
              activeCategory === category
                ? 'border-b-2 border-yellow-500 text-black'
                : 'text-gray-500'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Left Arrow */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
          >
            <FaChevronLeft />
          </button>
        )}

        {/* Cards */}
        <div className="flex space-x-6 overflow-hidden transition-all duration-500">
          {visibleBlogs.map((blog) => (
            <Link
              key={blog.slug.current}
              href={`/blog/${blog.slug.current}`}
              className="min-w-[300px] w-[300px] bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {blog.mainImage?.asset?.url ? (
                <div className="w-full h-40 relative">
                  <Image
                    src={blog.mainImage.asset.url}
                    alt={blog.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              ) : (
                <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {blog.author?.name || ''}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        {currentIndex + 2 < filteredBlogs.length && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
