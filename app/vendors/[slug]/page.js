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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {displayedImages.map((url, i) => (
            <div key={i} className="relative h-48">
              <Image
                src={url}
                alt={`Portfolio ${carouselIndex + i + 1}`}
                fill
                className="object-cover rounded"
              />
            </div>
          ))}
          {vendor.portfolioImages?.length > carouselIndex + 6 && (
            <div className="relative h-48 bg-black bg-opacity-60 text-white flex items-center justify-center rounded">
              <span className="text-lg font-semibold">+{vendor.portfolioImages.length - (carouselIndex + 6)} More</span>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <Image
              src={vendor.profileImage || '/default-profile.png'}
              alt={vendor.name}
              width={80}
              height={80}
              className="rounded-full object-cover border"
            />
            <div>
              <h1 className="text-2xl font-bold">{vendor.name}</h1>
              <p className="text-gray-500">{vendor.location}</p>
              <div className="flex items-center gap-2 mt-1 text-sm">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-medium">
                  {vendor.avgRating?.toFixed(1) || 'New on ArcArea'} ★
                </span>
                <span className="text-gray-600">
                  {vendor.reviewCount || reviews.length} Ratings
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded font-medium">✓ Verified</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Interior Designers</span>
              </div>
              <p className="text-green-600 mt-1 text-sm">{vendor.workingSince ? `${new Date().getFullYear() - parseInt(vendor.workingSince)} Years in Business` : ''}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-start md:items-end">
            <button
              onClick={() => {
                const form = document.getElementById("form");
                if (form) form.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              📩 Send Enquiry
            </button>
          </div>
        </div>
      </div>

     {/* Photos / Portfolio */}
      <div>
        <h2 className="text-2xl mt-20 font-semibold mb-3">More Service Images</h2>
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
        <h2 className="text-2xl font-semibold mb-3">Request a Booking</h2>
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

