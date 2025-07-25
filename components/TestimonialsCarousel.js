'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Ms. Honey Rose',
    image: '/testimonials/honey.jpg',
    message: 'Finding a passionate professional to craft my...',
  },
  {
    name: 'Prannoy HS',
    image: '/testimonials/prannoy.jpg',
    message: 'Structured, organized and pleasant to deal with...',
  },
  {
    name: 'Mr. Suresh Chandran',
    image: '/testimonials/suresh.jpg',
    message: 'Working with Arcarea was such a wonderful...',
  },
  {
    name: 'Mr. Johnson Daniel',
    image: '/testimonials/johnson.jpg',
    message: 'Dear Arcarea team, we are well pleased...',
  },
  {
    name: 'Mr. Surendra N M & Family',
    image: '/testimonials/surendra.jpg',
    message: 'We are extremely satisfied with the service...',
  },
  {
    name: 'Ms. Radhika Sharma',
    image: '/testimonials/radhika.jpg',
    message: 'The team did an incredible job with our home...',
  },
  {
    name: 'Mr. Varun Mehta',
    image: '/testimonials/varun.jpg',
    message: 'Highly professional and on time delivery...',
  },
  {
    name: 'Mrs. Ayesha Khan',
    image: '/testimonials/ayesha.jpg',
    message: 'Truly impressed with the design and execution...',
  },
  {
    name: 'Mr. Deepak Verma',
    image: '/testimonials/deepak.jpg',
    message: 'Exceptional service and elegant results...',
  },
  {
    name: 'Ms. Sneha Iyer',
    image: '/testimonials/sneha.jpg',
    message: 'Very happy with the smooth project handover...',
  },
];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const groupSize = 5;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + groupSize) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentTestimonials = testimonials.slice(index, index + groupSize).length === groupSize
    ? testimonials.slice(index, index + groupSize)
    : [...testimonials.slice(index), ...testimonials.slice(0, groupSize - (testimonials.length - index))];

  return (
    <div className="w-full px-4 py-12 bg-white text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-20">
        <span className="text-purple-600">12000+</span> Satisfied Customers
      </h2>

      <div className="relative w-full max-w-7xl mx-auto h-[150px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 px-4"
          >
            {currentTestimonials.map((testimonial, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg ">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    “
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-purple-700">{testimonial.name}</h3>
                <p className="text-xs text-gray-600 mt-1 px-2">{testimonial.message}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
