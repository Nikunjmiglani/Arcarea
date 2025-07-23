"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function VendorProfilePage() {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchVendor = async () => {
      const res = await fetch(`/api/vendors/${vendorId}`);
      const data = await res.json();
      setVendor(data.vendor);
      setServices(data.services);
    };
    fetchVendor();
  }, [vendorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, vendorId }),
    });

    if (res.ok) {
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  if (!vendor) return <div className="p-6">Loading vendor...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Profile */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
        <Image
          src={vendor.profileImage || "/vendor.jpg"}
          alt={vendor.name}
          width={160}
          height={160}
          className="rounded-full border object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{vendor.name}</h1>
          <p className="text-gray-600 mt-1">{vendor.location}</p>
          <p className="mt-2 text-gray-700">{vendor.bio || "No bio available."}</p>
          <div className="flex gap-2 flex-wrap mt-2">
            {vendor.skills?.map((skill, idx) => (
              <span key={idx} className="bg-gray-200 text-sm px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio (static for now, make dynamic later) */}
      <h2 className="text-2xl font-semibold mb-4">Portfolio</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {[1, 2, 3].map((i) => (
          <Image
            key={i}
            src={`/portfolio-${i}.jpg`}
            alt={`Portfolio ${i}`}
            width={400}
            height={300}
            className="rounded shadow"
          />
        ))}
      </div>

      {/* Services */}
      <h2 className="text-2xl font-semibold mb-4">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {services.map((service) => (
          <div key={service._id} className="p-4 border rounded shadow-sm bg-white">
            <h3 className="font-semibold">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
            <p className="mt-1 font-medium text-black">₹{service.price}</p>
          </div>
        ))}
      </div>

      {/* Booking Form */}
      <h2 className="text-2xl font-semibold mb-4">Request a Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Your Email"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone Number"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Your Requirements"
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Book Now
        </button>
        {status === "sent" && <p className="text-green-600">Booking sent!</p>}
        {status === "error" && <p className="text-red-600">Something went wrong.</p>}
      </form>
    </div>
  );
}

