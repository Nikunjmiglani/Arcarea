'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function VendorProfilePage() {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!vendorId) return;

    fetch(`/api/vendors/${vendorId}`)
      .then(res => res.json())
      .then(data => {
        setVendor(data.vendor);
        setServices(data.services || []);
        setReviews(data.reviews || []);
      });
  }, [vendorId]);

  if (!vendor) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Vendor Profile Header */}
      <div className="flex items-center gap-6 mb-6">
        <Image
          src={vendor.profileImage || '/default-profile.png'}
          alt={vendor.name}
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{vendor.name}</h1>
          <p className="text-gray-600">{vendor.location}</p>
          <p className="text-sm mt-1">{vendor.bio}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {vendor.skills?.map(skill => (
              <span key={skill} className="bg-gray-200 px-2 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio */}
      <h2 className="text-xl font-semibold mb-2">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {vendor.portfolioImages?.map((url, i) => (
          <Image
            key={i}
            src={url}
            alt={`Portfolio ${i + 1}`}
            width={400}
            height={300}
            className="w-full h-60 object-cover rounded border"
          />
        ))}
      </div>

      {/* Services */}
      <h2 className="text-xl font-semibold mb-2">Services</h2>
      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {services.map(service => (
            <div key={service._id} className="p-4 border rounded">
              <h3 className="font-bold text-lg">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
              <p className="mt-1 text-blue-600 font-semibold">₹{service.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-6">No services available.</p>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2">Reviews</h2>
          <div className="space-y-3 mb-6">
            {reviews.map(review => (
              <div key={review._id} className="border p-3 rounded bg-gray-50">
                <p className="font-semibold">{review.name} ({review.rating}/5)</p>
                <p>{review.message}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Booking Form */}
      <h2 className="text-xl font-semibold mb-2">Request a Booking</h2>
     <form
  onSubmit={async (e) => {
    e.preventDefault();
    const form = e.target;
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value,
        vendorId: vendor._id,
      }),
    });

    if (res.ok) {
      alert('Booking confirmed! Check your email.');
      form.reset();
    } else {
      alert('Error sending booking request. Try again.');
    }
  }}
>
  <input name="name" required placeholder="Your Name" className="w-full border p-2 rounded" />
  <input name="email" type="email" required placeholder="Your Email" className="w-full border p-2 rounded" />
  <input name="phone" placeholder="Phone Number" className="w-full border p-2 rounded" />
  <textarea name="message" required placeholder="Describe your requirements" className="w-full border p-2 rounded" />
  <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
    Send Request
  </button>
</form>

    </div>
  );
}