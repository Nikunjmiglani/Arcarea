'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function VendorProfilePage() {
  const { slug } = useParams();
  const [vendor, setVendor] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newReviewMessage, setNewReviewMessage] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/vendors/slug/${slug}`)
      .then(res => res.json())
      .then(data => {
        setVendor(data.vendor);
        setServices(data.services || []);
        setReviews(data.reviews || []);
      });
  }, [slug]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (vendor?.portfolioImages?.length > 6) {
        setCarouselIndex(prev => (prev + 6) % vendor.portfolioImages.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [vendor?.portfolioImages]);

  if (!vendor) return <p className="p-4">Loading...</p>;

  const handleBooking = async (e) => {
    e.preventDefault();
    const form = e.target;

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vendorId: vendor._id,
        rating: newRating,
        message: newReviewMessage,
        name: "Anonymous",
        email: "anon@example.com",
      }),
    });

    if (res.ok) {
      alert('Booking confirmed! Check your email.');
      form.reset();
    } else {
      alert('Error sending booking request. Try again.');
    }
  };

  const displayedImages = vendor.portfolioImages?.slice(carouselIndex, carouselIndex + 6) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-1 space-y-10">
<div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
  {/* Image Grid */}
  <div className="grid grid-cols-3 gap-1">
    {/* Left - Large image */}
    <div className="col-span-2 h-96 relative">
      <Image
        src={vendor.portfolioImages?.[0] || "/default1.jpg"}
        alt="Main"
        fill
        className="object-cover rounded-l-lg"
      />
    </div>

    {/* Right - Two stacked images */}
    <div className="flex flex-col gap-1">
      <div className="h-48 relative">
        <Image
          src={vendor.portfolioImages?.[1] || "/default2.jpg"}
          alt="Sub1"
          fill
          className="object-cover rounded-tr-lg"
        />
      </div>
      <div className="h-48 relative">
        <Image
          src={vendor.portfolioImages?.[2] || "/default3.jpg"}
          alt="Sub2"
          fill
          className="object-cover"
        />
        {vendor.portfolioImages?.length > 6 && (
          <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center rounded">
            <span className="text-lg font-semibold">
              +{vendor.portfolioImages.length - 6} More
            </span>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Info Section */}
  <div className="p-6 grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
    {/* Left Content (Vendor info + buttons) */}
    <div className="md:col-span-3 w-full">
      <h1 className="text-3xl font-extrabold text-gray-900">{vendor.name}</h1>
      <p className="text-lg text-gray-600 font-medium">{vendor.location}</p>

      {/* Tags and Info */}
      <div className="flex flex-wrap items-center gap-2 mt-2">
        <span className="bg-green-800 text-white px-3 py-1 text-xl font-bold rounded-xl">
          ★ {vendor.avgRating || "4.8"}
        </span>
        <span className="text-sm text-gray-700">
          ({vendor.reviewCount || reviews.length} Ratings)
        </span>

        <span className="bg-green-700 text-white px-3 rounded-full py-1 text-lg font-bold">
          ✓ Verified
        </span>

        <span className="bg-blue-500 text-white px-2 py-0.5 text-sm font-bold rounded">
          Interior Designers
        </span>
      </div>

      {/* Working Since & Status */}
      <p className="mt-2 text-lg font-bold text-green-700">
        {vendor.workingSince
          ? `Working Since ${new Date().getFullYear() - parseInt(vendor.workingSince)} Years`
          : ""}
      </p>
      <p className="text-sm text-gray-500 mt-1">
        <span className="text-green-600 font-semibold">Open</span> until 10:00 PM
      </p>

      {/* CTA Buttons */}
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={`tel:${vendor.phone || "08123846197"}`}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-lg font-bold rounded-full shadow flex items-center gap-2"
        >
          📞 {vendor.phone || "08123846197"}
        </a>

        <button
          onClick={() => {
            const form = document.getElementById("form");
            if (form) form.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-lg font-bold rounded-full shadow flex items-center gap-2"
        >
          ✉️ Enquire Now
        </button>
      </div>
    </div>

    {/* Right Content (Click to Rate) */}
    <div className="md:col-span-2 flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
      <p className="text-sm text-gray-700 font-medium">Click to Rate</p>
      <div className="flex gap-3 text-4xl text-gray-300 hover:text-yellow-400 cursor-pointer">
        {[...Array(5)].map((_, i) => (
          <button key={i} aria-label={`Rate ${i + 1} stars`}>
            ☆
          </button>
        ))}
      </div>
    </div>
  </div>
</div>




     {/* Photos / Portfolio */}
      <div>
        <h2 className="text-2xl mt-20 font-semibold mb-3">More Images</h2>
        <div className="flex overflow-x-auto gap-4 pb-2">
          {vendor.portfolioImages?.map((url, i) => (
            <Image
              key={i}
              src={url}
              alt={`Portfolio ${i + 1}`}
              width={300}
              height={200}
              className="rounded-lg object-cover border w-72 h-48 flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Business Statutory Details */}
<div className="bg-white p-6 rounded shadow space-y-6">
  <h2 className="text-2xl font-semibold mb-2">Business Statutory Details</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-sm text-gray-700">
    <div>
      <p className="text-gray-500">Legal Name</p>
      <p className="font-medium text-black">{vendor.legalName || vendor.name}</p>
    </div>
    <div>
      <p className="text-gray-500">Year of Establishment</p>
      <p className="font-medium text-black">{vendor.workingSince || '—'}</p>
    </div>
    <div>
      <p className="text-gray-500">No of Employees</p>
      <p className="font-medium text-black">{vendor.employeeRange || '—'}</p>
    </div>
    <div>
      <p className="text-gray-500">Turn Over</p>
      <p className="font-medium text-black">{vendor.turnover || '—'}</p>
    </div>
    <div>
      <p className="text-gray-500">GSTIN</p>
      <p className="font-medium text-black">{vendor.gstin || '—'}</p>
    </div>
  </div>

  {/* Type Section */}
  <div className="border-t pt-4">
    <p className="font-semibold text-lg flex items-center gap-2">
      ✔️ Type
    </p>
    <p className="text-gray-700 mt-1">{vendor.businessType || 'Building'}</p>
  </div>
</div>


      {/* Services */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Services Offered</h2>
        {services.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {services.map(service => (
              <div key={service._id} className="p-4 border rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-lg font-bold">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
                <p className="text-blue-600 font-semibold mt-2">Starting at ₹{service.price}</p>
                <button  onClick={() => {
    const form = document.getElementById("form");
    if (form) form.scrollIntoView({ behavior: "smooth" });
  }} className="mt-3 text-sm bg-blue-600 text-white px-3 py-1 rounded">Enquire</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No services available.</p>
        )}
      </div>

      {/* Reviews */}
      {reviews.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-3">Client Reviews</h2>
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review._id} className="p-4 border rounded bg-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold">{review.name}</p>
                  <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="text-gray-700">{review.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews & Ratings Summary */}
<div className="bg-white p-6 rounded shadow space-y-6">
  <h2 className="text-2xl font-semibold mb-4">Reviews & Ratings</h2>

  <div className="flex items-center gap-6">
    {/* Rating Box */}
    <div className="bg-green-700 text-white w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold">
      {(vendor.avgRating || 4.6).toFixed(1)}
    </div>

    {/* Rating Details */}
    <div>
      <p className="text-xl font-bold">{vendor.reviewCount || reviews.length} Ratings</p>
     
    </div>
  </div>

  {/* Start your Review */}
<div className="pt-6">
  <h3 className="text-xl font-medium mb-2">Start your Review</h3>

  {/* Star Rating Input */}
  <div className="flex gap-2 mb-3">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setNewRating(star)}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        className={`text-2xl w-12 h-12 rounded border transition ${
          (hoverRating || newRating) >= star ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </button>
    ))}
  </div>

  {/* Review Message Input */}
  <textarea
    placeholder="Write your review here..."
    className="w-full border p-2 rounded mb-3"
    rows={4}
    value={newReviewMessage}
    onChange={(e) => setNewReviewMessage(e.target.value)}
  />

  {/* Submit Button */}
  <button
    onClick={async () => {
      if (!newRating || !newReviewMessage) {
        alert("Please select a rating and write a review.");
        return;
      }

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendorId: vendor._id,
          rating: newRating,
          message: newReviewMessage,
          name: "Anonymous", // Replace with logged in user name if available
        }),
      });

      if (res.ok) {
        const addedReview = await res.json();
        setReviews(prev => [addedReview, ...prev]);
        setNewRating(0);
        setNewReviewMessage("");
        alert("Thanks for your feedback!");
      } else {
        alert("Something went wrong. Try again.");
      }
    }}
    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
  >
    Submit Review
  </button>
</div>

</div>


      {/* Quick Info */}
      <div className="bg-white p-4 rounded border shadow">
        <h2 className="text-xl font-semibold mb-3">Quick Information</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="bg-gray-200 px-3 py-1 rounded">🛠 Custom Furniture</span>
          <span className="bg-gray-200 px-3 py-1 rounded">🏡 Interior Design</span>
          <span className="bg-gray-200 px-3 py-1 rounded">🚚 Delivery Available</span>
          <span className="bg-gray-200 px-3 py-1 rounded">🛏 Modular Kitchen</span>
        </div>
      </div>

      {/* Booking Form */}
      <div id='form'>
        <h2 className="text-3xl font-bold mb-3">Request a Booking</h2>
        <form onSubmit={handleBooking} className="bg-gray-100 p-4 rounded space-y-3">
          <input name="name" required placeholder="Your Name" className="w-full border p-2 rounded" />
          <input name="email" type="email" required placeholder="Your Email" className="w-full border p-2 rounded" />
          <input name="phone" placeholder="Phone Number" className="w-full border p-2 rounded" />
          <textarea name="message" required placeholder="Describe your requirements" className="w-full border p-2 rounded" />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Request a Callback
          </button>
        </form>
      </div>

    </div>
  );
}

