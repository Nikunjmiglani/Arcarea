"use client";
import { useState } from "react";

export default function AdminVendorForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [workingSince, setWorkingSince] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [portfolioImages, setPortfolioImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload profile image
      const profileImageUrl = profileImage
        ? await handleImageUpload(profileImage)
        : "";

      // Upload portfolio images
      const portfolioUrls = await Promise.all(
        portfolioImages.map((img) => handleImageUpload(img))
      );

      // Post vendor data
      const res = await fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          bio,
          role: "designer",
          location,
          workingSince,
          profileImage: profileImageUrl,
          portfolioImages: portfolioUrls,
        }),
      });

      const data = await res.json();
      alert("Vendor created successfully!");
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-4 p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold">Add New Vendor</h2>

      <input
        type="text"
        placeholder="Name"
        className="w-full border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Location"
        className="w-full border p-2"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="text"
        placeholder="Working Since (e.g. 2015)"
        className="w-full border p-2"
        value={workingSince}
        onChange={(e) => setWorkingSince(e.target.value)}
      />

      <textarea
        placeholder="Bio"
        className="w-full border p-2"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      {/* Profile Image Upload */}
      <div>
        <label className="font-medium">Profile Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
        {profileImage && (
          <img
            src={URL.createObjectURL(profileImage)}
            alt="preview"
            className="w-20 h-20 object-cover mt-2"
          />
        )}
      </div>

      {/* Portfolio Images Upload */}
      <div>
        <label className="font-medium">Portfolio Images:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setPortfolioImages([...e.target.files])}
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {portfolioImages.map((img, i) => (
            <img
              key={i}
              src={URL.createObjectURL(img)}
              alt="portfolio"
              className="w-20 h-20 object-cover"
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Uploading..." : "Create Vendor"}
      </button>
    </form>
  );
}
