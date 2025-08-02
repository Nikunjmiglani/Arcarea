"use client";

import { useEffect, useState } from "react";

export default function DelayedPopupForm() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000); // Show after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => setShowPopup(false);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={closePopup}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Book a Free Consultation
        </h2>
        <form
          action="https://formspree.io/f/mgvynjpo" // Replace this with your Formspree form ID
          method="POST"
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <textarea
            name="query"
            placeholder="Your Query"
            rows={3}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <select
            name="budget"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            required
          >
            <option value="">Estimated Budget</option>
            <option value="Below ₹1 Lakh">Below ₹1 Lakh</option>
            <option value="₹1 Lakh - ₹5 Lakh">₹1 Lakh - ₹5 Lakh</option>
            <option value="Above ₹5 Lakh">Above ₹5 Lakh</option>
          </select>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
