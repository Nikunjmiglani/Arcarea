"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Interior",
    subcategory: "Residential Interior",
    image: "",
    vendor: "",
  });

  const [vendors, setVendors] = useState([]);
  const [addNewVendor, setAddNewVendor] = useState(false);
  const [newVendorData, setNewVendorData] = useState({ name: "", email: "" });

  const subcategoriesMap = {
    Interior: ["Residential Interior", "Commercial Interior","1BHK Interior Design","Office Design","Wall Panel Design","Modular Kitchen"],
    Architecture: ["Residential Architecture", "Landscape Architecture"],
    Furniture: ["Custom Furniture", "Modular Furniture", "bespoke furniture"],
  };

  useEffect(() => {
    fetch("/api/vendors")
      .then((res) => res.json())
      .then((data) => setVendors(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVendorChange = (e) => {
    if (e.target.value === "add_new") {
      setAddNewVendor(true);
      setFormData((prev) => ({ ...prev, vendor: "" }));
    } else {
      setAddNewVendor(false);
      setFormData((prev) => ({ ...prev, vendor: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let vendorId = formData.vendor;

    // Create new vendor if needed
    if (addNewVendor && newVendorData.name && newVendorData.email) {
      const res = await fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVendorData),
      });
      const data = await res.json();
      vendorId = data._id;
    }

    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, vendor: vendorId }),
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
        vendor: "",
      });
      setNewVendorData({ name: "", email: "" });
      setAddNewVendor(false);
    } else {
      alert("Error creating service");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add a New Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" required />

        <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded">
          {Object.keys(subcategoriesMap).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select name="subcategory" value={formData.subcategory} onChange={handleChange} className="w-full border p-2 rounded">
          {(subcategoriesMap[formData.category] || []).map((sub) => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>

        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full border p-2 rounded" />

        <select value={formData.vendor || ""} onChange={handleVendorChange} className="w-full border p-2 rounded">
          <option value="">-- Select Vendor --</option>
          {vendors.map((v) => (
            <option key={v._id} value={v._id}>{v.name}</option>
          ))}
          <option value="add_new">+ Add New Vendor</option>
        </select>

        {addNewVendor && (
          <div className="space-y-2">
            <input type="text" placeholder="Vendor Name" value={newVendorData.name} onChange={(e) => setNewVendorData({ ...newVendorData, name: e.target.value })} className="w-full border p-2 rounded" />
            <input type="email" placeholder="Vendor Email" value={newVendorData.email} onChange={(e) => setNewVendorData({ ...newVendorData, email: e.target.value })} className="w-full border p-2 rounded" />
          </div>
        )}

        <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Create Service
        </button>
      </form>
    </div>
  );
}
