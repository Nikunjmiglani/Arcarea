"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);

  // Service form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "Interior",
    subcategory: "Residential Interior",
    image: null,
    vendor: "",
    serviceId: "",
    newServiceName: "",
  });

  // Vendor mode & data
  const [mode, setMode] = useState("new"); // 'new' or 'existing'
  const [vendors, setVendors] = useState([]);
  const [existingVendors, setExistingVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState("");

  const [newVendorData, setNewVendorData] = useState({
    name: "",
    email: "",
    profileImage: null,
    location: "",
    bio: "",
    skills: "",
    portfolioImages: [],
    portfolioImageUrls: [""],
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

  // Static options
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

  // Fetch all services & vendors
  useEffect(() => {
    fetch("/api/vendors")
      .then((res) => res.json())
      .then((data) => setVendors(data || []));
  }, []);

  // Fetch existing vendors for selected service
  useEffect(() => {
    if (!formData.serviceId) {
      setExistingVendors([]);
      setSelectedVendorId("");
      return;
    }
    fetch(`/api/vendors?serviceId=${formData.serviceId}`)
      .then((res) => res.json())
      .then((data) => setExistingVendors(data.vendors || []))
      .catch(() => setExistingVendors([]));
  }, [formData.serviceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewVendorChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewVendorData((prev) => ({
        ...prev,
        [name]: name === "portfolioImages" ? Array.from(files) : files[0],
      }));
    } else {
      setNewVendorData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelectChange = (e, name) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setNewVendorData((prev) => ({ ...prev, [name]: selected }));
  };

  const addPortfolioImageUrlField = () => {
    setNewVendorData((prev) => ({
      ...prev,
      portfolioImageUrls: [...prev.portfolioImageUrls, ""],
    }));
  };

  const handlePortfolioImageUrlChange = (index, value) => {
    const updated = [...newVendorData.portfolioImageUrls];
    updated[index] = value;
    setNewVendorData((prev) => ({ ...prev, portfolioImageUrls: updated }));
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
      files.map(async (file) => {
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

    setLoading(true);
    try {
      const finalForm = new FormData();

      // Add service details
      finalForm.append("title", formData.title);
      finalForm.append("description", formData.description);
      finalForm.append("price", formData.price);
      finalForm.append("category", formData.category);
      finalForm.append("subcategory", formData.subcategory);

      if (formData.image) {
        finalForm.append("image", formData.image);
      }

      // Service ID or new name
      if (formData.serviceId) {
        finalForm.append("serviceId", formData.serviceId);
      } else if (formData.newServiceName.trim()) {
        finalForm.append("newServiceName", formData.newServiceName.trim());
      }

      if (mode === "new") {
        finalForm.append("vendorName", newVendorData.name);
        finalForm.append("vendorEmail", newVendorData.email);

        if (newVendorData.profileImage) {
          finalForm.append("profileImage", newVendorData.profileImage);
        }
        newVendorData.portfolioImageUrls
          .filter((url) => url.trim() !== "")
          .forEach((url) => finalForm.append("portfolioImages", url));

        newVendorData.portfolioImages.forEach((file) =>
          finalForm.append("portfolioImages", file)
        );

        finalForm.append("location", newVendorData.location);
        finalForm.append("bio", newVendorData.bio);
        finalForm.append("skills", newVendorData.skills);
        finalForm.append("workingSince", newVendorData.workingSince);
        finalForm.append("reviewName", newVendorData.reviewName);
        finalForm.append("reviewEmail", newVendorData.reviewEmail);
        finalForm.append("reviewRating", newVendorData.reviewRating);
        finalForm.append("reviewMessage", newVendorData.reviewMessage);
        finalForm.append("projectTypes", JSON.stringify(newVendorData.projectTypes));
        finalForm.append("projectExecutionType", newVendorData.projectExecutionType);
        finalForm.append("budgetRange", newVendorData.budgetRange);
        finalForm.append("turnaroundTime", newVendorData.turnaroundTime);
      } else {
        finalForm.append("existingVendorId", selectedVendorId);
      }

      const res = await fetch("/api/vendors", {
        method: "POST",
        body: finalForm,
      });

      if (res.ok) {
        alert("✅ Operation successful!");
        setFormData({
          title: "",
          description: "",
          price: "",
          category: "Interior",
          subcategory: "Residential Interior",
          image: null,
          vendor: "",
          serviceId: "",
          newServiceName: "",
        });
        setNewVendorData({
          name: "",
          email: "",
          profileImage: null,
          location: "",
          bio: "",
          skills: "",
          portfolioImages: [],
          portfolioImageUrls: [""],
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
        setMode("new");
        setSelectedVendorId("");
      } else {
        alert("Error creating service/vendor");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/3 bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white p-8">
        <h1 className="text-3xl font-bold mb-4">ArcArea Admin</h1>
        <p className="text-gray-300 text-center max-w-xs">
          Add new services and onboard talented vendors to grow your marketplace.
        </p>
        <img src="/admin-illustration.svg" alt="Admin Illustration" className="mt-10 max-w-sm" />
      </div>

      {/* Form */}
      <div className="flex-1 p-6 sm:p-10">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold text-gray-800">Add a New Service & Vendor</h2>

          {/* Mode Toggle */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setMode("new")}
              className={`flex-1 py-3 font-medium rounded-lg border ${
                mode === "new"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              ➕ Add New Vendor
            </button>
            <button
              type="button"
              onClick={() => setMode("existing")}
              className={`flex-1 py-3 font-medium rounded-lg border ${
                mode === "existing"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              👤 Assign Existing Vendor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Details */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">1️⃣ Service Details</h3>
              <input type="text" name="title" placeholder="Service Title" value={formData.title} onChange={handleChange} className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black" />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black" />
              <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black" />
              <div className="grid grid-cols-2 gap-4">
                <select name="category" value={formData.category} onChange={handleChange} className="border rounded-lg p-3 focus:ring-2 focus:ring-black">
                  {Object.keys(subcategoriesMap).map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
                <select name="subcategory" value={formData.subcategory} onChange={handleChange} className="border rounded-lg p-3 focus:ring-2 focus:ring-black">
                  {(subcategoriesMap[formData.category] || []).map((sub) => (
                    <option key={sub}>{sub}</option>
                  ))}
                </select>
              </div>
              <input type="file" accept="image/*" onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.files[0] }))} className="w-full border rounded-lg p-3" />
            </div>

            {/* Vendor Section */}
            {mode === "existing" && (
              <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">2️⃣ Select Existing Vendor</h3>
                <select value={selectedVendorId} onChange={(e) => setSelectedVendorId(e.target.value)} className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black">
                  <option value="">-- Select a vendor --</option>
                  {existingVendors.length === 0 ? (
                    <option disabled>No vendors found for selected service</option>
                  ) : (
                    existingVendors.map((vendor) => (
                      <option key={vendor._id} value={vendor._id}>
                        {vendor.name} ({vendor.email})
                      </option>
                    ))
                  )}
                </select>
              </div>
            )}

            {mode === "new" && (
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-inner">
                <h3 className="text-lg font-semibold mb-2">3️⃣ New Vendor Details</h3>
                <input type="text" name="name" placeholder="Vendor Name" value={newVendorData.name} onChange={handleNewVendorChange} className="w-full border rounded-lg p-3" />
                <input type="email" name="email" placeholder="Vendor Email" value={newVendorData.email} onChange={handleNewVendorChange} className="w-full border rounded-lg p-3" />
                <input type="file" accept="image/*" onChange={(e) => setNewVendorData((prev) => ({ ...prev, profileImage: e.target.files[0] }))} className="w-full border rounded-lg p-3" />

                {/* Portfolio URLs */}
                <label className="block font-semibold text-gray-700 mt-3">Portfolio Image URLs</label>
                {newVendorData.portfolioImageUrls.map((url, idx) => (
                  <input key={idx} type="text" value={url} onChange={(e) => handlePortfolioImageUrlChange(idx, e.target.value)} placeholder="https://example.com/image.jpg" className="w-full border rounded-lg p-2 mb-2" />
                ))}
                <button type="button" onClick={addPortfolioImageUrlField} className="text-blue-600 font-semibold hover:underline mb-3">
                  + Add another URL
                </button>

                {/* Portfolio files */}
                <input type="file" accept="image/*" multiple onChange={(e) => setNewVendorData((prev) => ({ ...prev, portfolioImages: Array.from(e.target.files) }))} className="w-full border rounded-lg p-3" />

                <label className="block font-medium mt-3">Project Type</label>
                <select multiple onChange={(e) => handleMultiSelectChange(e, "projectTypes")} className="w-full border rounded-lg p-3">
                  {projectTypeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <label className="block font-medium">Type of Project</label>
                <select name="projectExecutionType" value={newVendorData.projectExecutionType} onChange={handleNewVendorChange} className="w-full border rounded-lg p-3">
                  {executionTypeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <label className="block font-medium">Budget</label>
                <select name="budgetRange" value={newVendorData.budgetRange} onChange={handleNewVendorChange} className="w-full border rounded-lg p-3">
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>

                <label className="block font-medium">Turnaround Time</label>
                <select name="turnaroundTime" value={newVendorData.turnaroundTime} onChange={handleNewVendorChange} className="w-full border rounded-lg p-3">
                  {turnaroundOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            )}

            <button type="submit" disabled={loading} className="bg-black text-white w-full py-3 rounded-lg hover:bg-gray-800 transition">
              {loading ? "Processing..." : mode === "new" ? "🚀 Add Vendor & Service" : "🔗 Assign Vendor to Service"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
