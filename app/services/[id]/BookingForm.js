"use client";
import { useState } from "react";

export default function BookingForm({ serviceId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, service: serviceId }),
    });

    if (res.ok) {
      alert("Request sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      alert("Error submitting request.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-3 border p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">Request this service</h3>
      
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Your Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <textarea
        className="w-full border px-3 py-2 rounded"
        placeholder="Message..."
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button className="bg-black text-white px-4 py-2 rounded" type="submit">
        Send Request
      </button>
    </form>
  );
}
