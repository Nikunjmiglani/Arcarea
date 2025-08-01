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
    workingSince: "",

    // New: Review fields
    reviewName: "",
    reviewEmail: "",
    reviewRating: "",
    reviewMessage: "",
  });

  const subcategoriesMap = {
    Interior: [
      "Residential Interior",
      "Commercial Interior",
      "1BHK Interior Design",
      "Office Design",
      "Wall Panel Design",
      "Modular Kitchen",
    ],
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

    // Create new vendor if needed
    if (addNewVendor && newVendorData.name && newVendorData.email) {
     const res = await fetch("/api/vendors", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: newVendorData.name,
    email: newVendorData.email,
    profileImage: newVendorData.profileImage,
    location: newVendorData.location,
    bio: newVendorData.bio,
    skills: newVendorData.skills.split(",").map((s) => s.trim()),
    portfolioImages: newVendorData.portfolioImages.split(",").map((url) => url.trim()),

    // ✅ FIXED: Include this
    workingSince: newVendorData.workingSince,

    // Review fields
    reviewName: newVendorData.reviewName,
    reviewEmail: newVendorData.reviewEmail,
    reviewRating: newVendorData.reviewRating,
    reviewMessage: newVendorData.reviewMessage,
  }),
});



      const data = await res.json();
      vendorId = data._id;

      // ✅ Submit review for new vendor
      if (
        newVendorData.reviewName &&
        newVendorData.reviewEmail &&
        newVendorData.reviewRating
      ) {
        await fetch("/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vendor: vendorId,
            name: newVendorData.reviewName,
            email: newVendorData.reviewEmail,
            rating: Number(newVendorData.reviewRating),
            message: newVendorData.reviewMessage || "",
          }),
        });
      }
    }

    // Create service
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
  workingSince: "",
  reviewName: "",
  reviewEmail: "",
  reviewRating: "",
  reviewMessage: "",
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

        {/* New Vendor Form */}
       {addNewVendor && (
  <div className="space-y-2 bg-gray-50 p-4 rounded border mt-2">
    <h2 className="text-lg font-semibold">New Vendor Details</h2>
    <input type="text" name="name" placeholder="Vendor Name" value={newVendorData.name} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
    <input type="email" name="email" placeholder="Vendor Email" value={newVendorData.email} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
    <input type="text" name="profileImage" placeholder="Vendor Profile Image URL" value={newVendorData.profileImage} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
    <input type="text" name="location" placeholder="Vendor Location" value={newVendorData.location} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />

    {/* ✅ Working Since Field */}
    <input type="text" name="workingSince" placeholder="Working Since (e.g., 2018)" value={newVendorData.workingSince} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />

    <textarea name="bio" placeholder="Vendor Bio" value={newVendorData.bio} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
    <input type="text" name="skills" placeholder="Vendor Skills (comma separated)" value={newVendorData.skills} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
    <input type="text" name="portfolioImages" placeholder="Portfolio Image URLs (comma separated)" value={newVendorData.portfolioImages} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />

    <h3 className="font-semibold mt-4">Initial Review</h3>
    <input type="text" name="reviewName" placeholder="Reviewer Name" value={newVendorData.reviewName} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
    <input type="email" name="reviewEmail" placeholder="Reviewer Email" value={newVendorData.reviewEmail} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
    <input type="number" name="reviewRating" placeholder="Rating (1 to 5)" min="1" max="5" value={newVendorData.reviewRating} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
    <textarea name="reviewMessage" placeholder="Review Message" value={newVendorData.reviewMessage} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
  </div>
)}


        <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Create Service
        </button>
      </form>
    </div>
  );
}
