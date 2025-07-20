"use client";
import Image from "next/image";
import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-white py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* 🖼️ Right Image Section */}
        <div className="hidden md:block relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/contactimg.webp"
            alt="Contact Us"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        {/* 📬 Contact Form Section */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow-lg w-full">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Let&#39;s Connect</h2>
          <p className="text-gray-600 mb-6">
            Have a project in mind or want to say hello? Fill the form below and we&#39;ll get back to you!
          </p>

          <form
            action="https://formspree.io/f/mgvynjpo" // 🔁 Replace with your Formspree ID
            method="POST"
            onSubmit={() => setSubmitted(true)}
            className="space-y-5"
          >
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Send Message
            </button>

            {submitted && (
              <p className="text-green-600 text-sm mt-2">
                ✅ Thank you! We&#39;ll get back to you soon.
              </p>
            )}
          </form>
        </div>

        {/* 🖼️ Image on small screen below form */}
        <div className="block md:hidden mt-10 relative w-full h-[300px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/contact-art.jpg"
            alt="Contact Visual"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
