"use client";

import { useEffect, useState } from "react";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const res = await fetch(`/api/admin/services/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setServices((prev) => prev.filter((s) => s._id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Vendor</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-t">
                <td className="p-2">{service.title}</td>
                <td className="p-2">₹{service.price}</td>
                <td className="p-2">{service.category}</td>
                <td className="p-2">{service.vendor?.name || "N/A"}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
