'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const categories = [
  'Trending',
  'Bedroom Guides',
  'Living Room Guides',
  'Kids Room Guides',
  'Study Room Guides',
];

export default function BlogSection({ blogs }) {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log('📦 All Blogs:', blogs);
    console.log('📌 Active Category:', activeCategory);
  }, [activeCategory, blogs]);

  // Filter blogs by active category
  const filteredBlogs = blogs.filter((blog) =>
    blog.categories?.some(
      (cat) => cat.title?.trim().toLowerCase() === activeCategory.trim().toLowerCase()
    )
  );

  const visibleBlogs = filteredBlogs.slice(currentIndex, currentIndex + 2);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 2, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 2, filteredBlogs.length - 2));
  };

  const resetSlider = () => {
    setCurrentIndex(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Guides For Home Interiors</h2>

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

        <div className='mb-10'>
          <h1 className='text-2xl font-mono'>Here are your guides:</h1>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500">
          {visibleBlogs.length > 0 ? (
            visibleBlogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="bg-white rounded-lg border shadow hover:shadow-md transition overflow-hidden"
              >
                {blog.image ? (
                  <div className="w-full h-48 relative">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {blog.description || blog.author?.name || ' '}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 col-span-2">No blogs available in this category.</p>
          )}
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

      {/* Pagination Dots */}
      {filteredBlogs.length > 2 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(filteredBlogs.length / 2) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * 2)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === i * 2 ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}
