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
  const [newVendorData, setNewVendorData] = useState({
    name: "",
    email: "",
    profileImage: "",
    location: "",
    bio: "",
    skills: "",
    portfolioImages: "",
  });

  const subcategoriesMap = {
    Interior: ["Residential Interior", "Commercial Interior", "1BHK Interior Design", "Office Design", "Wall Panel Design", "Modular Kitchen"],
    Architecture: ["Residential Architecture", "Landscape Architecture"],
    Furniture: ["Custom Furniture", "Modular Furniture", "Bespoke Furniture"],
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

  const handleNewVendorChange = (e) => {
    const { name, value } = e.target;
    setNewVendorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let vendorId = formData.vendor;

    if (addNewVendor && newVendorData.name && newVendorData.email) {
      const res = await fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newVendorData,
          skills: newVendorData.skills.split(",").map((s) => s.trim()),
          portfolio: newVendorData.portfolioImages.split(",").map((url) => ({ image: url.trim() })),
        }),
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
      setNewVendorData({
        name: "",
        email: "",
        profileImage: "",
        location: "",
        bio: "",
        skills: "",
        portfolioImages: "",
      });
      setAddNewVendor(false);
    } else {
      alert("Error creating service");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
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
          <div className="space-y-2 bg-gray-50 p-4 rounded border mt-2">
            <input type="text" name="name" placeholder="Vendor Name" value={newVendorData.name} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
            <input type="email" name="email" placeholder="Vendor Email" value={newVendorData.email} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
            <input type="text" name="profileImage" placeholder="Vendor Profile Image URL" value={newVendorData.profileImage} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
            <input type="text" name="location" placeholder="Vendor Location" value={newVendorData.location} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
            <textarea name="bio" placeholder="Vendor Bio" value={newVendorData.bio} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
            <input type="text" name="skills" placeholder="Vendor Skills (comma separated)" value={newVendorData.skills} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
            <input type="text" name="portfolioImages" placeholder="Portfolio Image URLs (comma separated)" value={newVendorData.portfolioImages} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
          </div>
        )}

        <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Create Service
        </button>
      </form>
    </div>
  );
}
