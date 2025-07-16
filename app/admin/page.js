"use client";

import { useState } from "react";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Interior",
    subcategory: "Residential Interior",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Service created successfully");
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "Interior",
        subcategory: "Residential Interior",
        image: "",
      });
    } else {
      alert("Error creating service");
    }
  };

  const subcategoriesMap = {
    Interior: ["Residential Interior", "Commercial Interior"],
    Architecture: ["Residential Architecture", "Landscape Architecture"],
    Furniture: ["Custom Furniture", "Modular Furniture"],
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add a New Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          {Object.keys(subcategoriesMap).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          {(subcategoriesMap[formData.category] || []).map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Create Service
        </button>
      </form>
    </div>
  );
}
