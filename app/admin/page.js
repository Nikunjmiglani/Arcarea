"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Interior",
    subcategory: "Residential Interior",
    image: null,
    vendor: "",
  });

  const [vendors, setVendors] = useState([]);
  const [addNewVendor, setAddNewVendor] = useState(false);
  const [newVendorData, setNewVendorData] = useState({
    name: "",
    email: "",
    profileImage: null,
    location: "",
    bio: "",
    skills: "",
    portfolioImages: [],
    workingSince: "",
    reviewName: "",
    reviewEmail: "",
    reviewRating: "",
    reviewMessage: "",
    projectTypes: [],
    projectExecutionType: "",
    budgetRange: "",
    turnaroundTime: "",
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

  const projectTypeOptions = ["Residential", "Commercial", "Office", "Industrial", "Retail"];
  const executionTypeOptions = ["Turnkey", "Consultancy"];
  const budgetOptions = [
    "1L - 5L",
    "5L - 10L",
    "10L - 15L",
    "15L - 25L",
    "25L - 35L",
    "35L and above",
  ];
  const turnaroundOptions = ["1-5 days", "10-15 days"];

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
    const { name, value, files } = e.target;

    if (files) {
      setNewVendorData((prev) => ({
        ...prev,
        [name]: name === "portfolioImages" ? files : files[0],
      }));
    } else {
      setNewVendorData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelectChange = (e, name) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setNewVendorData((prev) => ({ ...prev, [name]: selected }));
  };

  const handleProfileImageUpload = async (file) => {
    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "unsigned_upload");
    imageData.append("folder", "vendor-images");

    const uploadRes = await fetch("https://api.cloudinary.com/v1_1/diq3lm3nc/image/upload", {
      method: "POST",
      body: imageData,
    });

    const uploadResult = await uploadRes.json();
    return uploadResult.secure_url;
  };

  const handlePortfolioUpload = async (files) => {
    const uploads = await Promise.all(
      Array.from(files).map(async (file) => {
        const imageData = new FormData();
        imageData.append("file", file);
        imageData.append("upload_preset", "unsigned_upload");
        imageData.append("folder", "vendor-images");

        const uploadRes = await fetch("https://api.cloudinary.com/v1_1/diq3lm3nc/image/upload", {
          method: "POST",
          body: imageData,
        });

        const uploadResult = await uploadRes.json();
        return uploadResult.secure_url;
      })
    );
    return uploads;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let vendorId = formData.vendor;

    if (addNewVendor && newVendorData.name && newVendorData.email) {
      const profileImageUrl = newVendorData.profileImage
        ? await handleProfileImageUpload(newVendorData.profileImage)
        : "";

      const portfolioUrls = newVendorData.portfolioImages.length
        ? await handlePortfolioUpload(newVendorData.portfolioImages)
        : [];

      const res = await fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newVendorData,
          profileImage: profileImageUrl,
          portfolioImages: portfolioUrls,
          skills: newVendorData.skills.split(",").map((s) => s.trim()),
          projectType: newVendorData.projectTypes,
          executionType: newVendorData.projectExecutionType,
        }),
      });

      const data = await res.json();
      vendorId = data._id;
    }

    let uploadedImageUrl = "";

    if (formData.image) {
      const imageData = new FormData();
      imageData.append("file", formData.image);
      imageData.append("upload_preset", "unsigned_upload");
      imageData.append("folder", "vendor-images");

      const uploadRes = await fetch("https://api.cloudinary.com/v1_1/diq3lm3nc/image/upload", {
        method: "POST",
        body: imageData,
      });

      const uploadResult = await uploadRes.json();
      uploadedImageUrl = uploadResult.secure_url;
    }

    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, image: uploadedImageUrl, vendor: vendorId }),
    });

    if (res.ok) {
      alert("Service created successfully");
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "Interior",
        subcategory: "Residential Interior",
        image: null,
        vendor: "",
      });
      setNewVendorData({
        name: "",
        email: "",
        profileImage: null,
        location: "",
        bio: "",
        skills: "",
        portfolioImages: [],
        workingSince: "",
        reviewName: "",
        reviewEmail: "",
        reviewRating: "",
        reviewMessage: "",
        projectTypes: [],
        projectExecutionType: "",
        budgetRange: "",
        turnaroundTime: "",
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

        <input type="file" accept="image/*" onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.files[0] }))} className="w-full border p-2 rounded" />

        <select value={formData.vendor || ""} onChange={handleVendorChange} className="w-full border p-2 rounded">
          <option value="">-- Select Vendor --</option>
          {vendors.map((v) => (
            <option key={v._id} value={v._id}>{v.name}</option>
          ))}
          <option value="add_new">+ Add New Vendor</option>
        </select>

        {addNewVendor && (
          <div className="space-y-2 bg-gray-50 p-4 rounded border mt-2">
            <h2 className="text-lg font-semibold">New Vendor Details</h2>
            <input type="text" name="name" placeholder="Vendor Name" value={newVendorData.name} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
            <input type="email" name="email" placeholder="Vendor Email" value={newVendorData.email} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
            <input type="file" accept="image/*" onChange={(e) =>
  setNewVendorData((prev) => ({
    ...prev,
    portfolioImages: Array.from(e.target.files),
  }))
}
 className="w-full border p-2 rounded" />
            <input type="text" name="location" placeholder="Vendor Location" value={newVendorData.location} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
            <input type="text" name="workingSince" placeholder="Working Since (e.g., 2018)" value={newVendorData.workingSince} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
            <textarea name="bio" placeholder="Vendor Bio" value={newVendorData.bio} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
            <input type="text" name="skills" placeholder="Vendor Skills (comma separated)" value={newVendorData.skills} onChange={handleNewVendorChange} className="w-full border p-2 rounded" />
            <input type="file" accept="image/*" multiple onChange={(e) =>
  setNewVendorData((prev) => ({
    ...prev,
    portfolioImages: Array.from(e.target.files),
  }))
} className="w-full border p-2 rounded" />

            <label className="block font-medium">Project Type</label>
            <select multiple onChange={(e) => handleMultiSelectChange(e, "projectTypes")} className="w-full border p-2 rounded">
              {projectTypeOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label className="block font-medium">Type of Project</label>
            <select name="projectExecutionType" value={newVendorData.projectExecutionType} onChange={handleNewVendorChange} className="w-full border p-2 rounded">
              {executionTypeOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label className="block font-medium">Budget</label>
            <select name="budgetRange" value={newVendorData.budgetRange} onChange={handleNewVendorChange} className="w-full border p-2 rounded">
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <label className="block font-medium">Turnaround Time</label>
            <select name="turnaroundTime" value={newVendorData.turnaroundTime} onChange={handleNewVendorChange} className="w-full border p-2 rounded">
              {turnaroundOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

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