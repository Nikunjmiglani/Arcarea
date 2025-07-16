"use client";
import { useEffect, useState } from "react";

export default function CreateServicePage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    vendor: "",
  });

  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      const res = await fetch("/api/vendors");
      const data = await res.json();
      setVendors(data);
    };
    fetchVendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Service created!");
      setForm({ title: "", description: "", price: "", category: "", subcategory: "", vendor: "" });
    } else {
      alert(data.error || "Error creating service");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category (e.g. Interior)"
          className="w-full border p-2 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Subcategory (e.g. 1BHK Interior Design)"
          className="w-full border p-2 rounded"
          value={form.subcategory}
          onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          value={form.vendor}
          onChange={(e) => setForm({ ...form, vendor: e.target.value })}
        >
          <option value="">-- Select Vendor (optional) --</option>
          {vendors.map((vendor) => (
            <option key={vendor._id} value={vendor._id}>
              {vendor.name} ({vendor.email})
            </option>
          ))}
        </select>

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
