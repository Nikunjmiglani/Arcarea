"use client";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({
    vendor: "",
    title: "",
    description: "",
    price: "",
    category: "interior",
  });

  useEffect(() => {
  const getVendors = async () => {
    const res = await fetch("/api/users/vendors");
    const data = await res.json();
    console.log("Vendors:", data); // ✅ See what comes
    setVendors(data);
    if (data.length > 0) {
      setForm((prev) => ({ ...prev, vendor: data[0]._id }));
    }
  };
  getVendors();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.vendor) {
      alert("Please select a vendor");
      return;
    }

    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Service added!");
    } else {
      alert("Error adding service");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
      <select
        onChange={(e) => setForm({ ...form, vendor: e.target.value })}
        value={form.vendor}
        className="input"
      >
        <option value="">Select Vendor</option>
        {vendors.map((v) => (
          <option key={v._id} value={v._id}>
            {v.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Title"
        className="input"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        className="input"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        className="input"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />
      <select
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="input"
        value={form.category}
      >
        <option value="interior">Interior Design</option>
        <option value="architecture">Architecture</option>
        <option value="furniture">Furniture Design</option>
      </select>

      <button className="btn">Add Service</button>
    </form>
  );
}
