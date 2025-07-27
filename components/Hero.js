"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ For routing
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function Hero() {
  const [location, setLocation] = useState("Detecting location...");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(""); // ✅ Track search query
  const router = useRouter(); // ✅ For client-side routing

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                "User-Agent": "MigglaApp/1.0", // ✅ Nominatim requires this
              },
            }
          );

          if (!res.ok) throw new Error("API returned error");

          const data = await res.json();
          const {
            suburb,
            neighbourhood,
            village,
            town,
            city,
            county,
            state,
            country,
          } = data.address || {};

          const displayName =
            suburb ||
            neighbourhood ||
            village ||
            town ||
            city ||
            county ||
            state ||
            country ||
            "Detected Location";

          setLocation(displayName);
        } catch (err) {
          console.error("Geocoding failed:", err);
          setLocation("Location unavailable");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Location access error:", error);
        alert("Unable to retrieve your location.");
        setLoading(false);
      }
    );
  };

  const handleSearch = () => {
    if (!query.trim()) {
      alert("Please enter a search term");
      return;
    }

    console.log("Searching for:", query, "in", location);

    // Redirect to search page with query + location
    router.push(`/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-7 text-center">
      <h1 className="text-3xl md:text-5xl font-bold font-mono text-gray-900 mb-4 leading-tight">
        Transform Your Space with Expert Interior Designers
      </h1>

      <p className="text-base md:text-lg text-gray-600 mb-10">
        Connect with Verified Architects, Modular Kitchen Specialists & Custom Furniture Experts Near You.
      </p>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {/* Location Button */}
        <button
          onClick={handleGetLocation}
          className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-52 sm:w-60 text-sm text-gray-700 hover:border-black transition-all"
        >
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <span className="truncate flex-1">
            {loading ? "Detecting location..." : location}
          </span>
          <IoIosArrowDown className="text-gray-500 ml-2" />
        </button>

        {/* Search Input */}
        <div className="flex items-center w-72 sm:w-80 rounded-full border border-gray-400 px-4 py-0 bg-white">
          <FaSearch
            className="text-gray-500 mr-3 cursor-pointer"
            onClick={handleSearch}
          />
          <input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") handleSearch();
  }}
  placeholder="Find My Expert Now..."
  className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 outline-none border-none focus:outline-none focus:ring-0"
/>
        </div>
      </div>
    </section>
  );
}
