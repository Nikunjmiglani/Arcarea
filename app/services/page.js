"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("all");
  const [keyword, setKeyword] = useState("");

  const fetchServices = async () => {
    let url = `/api/services?category=${category}`;
    if (keyword.trim() !== "") {
      url += `&q=${encodeURIComponent(keyword)}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, [category]); // fetch on category change

  const handleSearch = (e) => {
    e.preventDefault();
    fetchServices(); // trigger fetch on search
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Find Services</h2>

      {/* 🔍 Filter UI */}
      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Categories</option>
          <option value="interior">Interior Design</option>
          <option value="architecture">Architecture</option>
          <option value="furniture">Furniture Design</option>
        </select>

        <input
          type="text"
          placeholder="Search keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border px-3 py-2 rounded flex-1"
        />
        <button className="bg-black text-white px-4 py-2 rounded" type="submit">
          Search
        </button>
      </form>

      {/* 📦 Service List */}
      {services.length === 0 && <p>No services found.</p>}

      {
  services.map((service) => (
    <div
      key={service._id}
      className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 border"
    >
      <img
        src={service.image || "/placeholder.jpg"}
        alt={service.title}
        className="h-40 w-full object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
      <p className="text-gray-600 mb-1">{service.description}</p>
      <p className="text-gray-800 font-medium mb-1">₹{service.price}</p>
      <p className="text-sm italic text-gray-500 mb-2">
        By {service.vendorName}
      </p>
      <span className="inline-block bg-gray-200 text-gray-800 text-xs uppercase font-semibold px-2 py-1 rounded">
        {service.category}
      </span>
    </div>
  ))
}
    </div>
  );
}
