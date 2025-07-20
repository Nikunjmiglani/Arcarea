"use client"
import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function Hero() {
  const [location, setLocation] = useState("Detecting location...");
  const [loading, setLoading] = useState(false);

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

        if (!res.ok) {
          console.error("API status error:", res.status);
          throw new Error("API returned error");
        }

        const data = await res.json();
        console.log("Geocode response:", data);

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



  return (
    <div className="max-w-7xl mx-auto flex flex-col px-6 py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold font-mono mt-7 text-gray-900 mb-5">
        Transform Your Space With Expert Designers
      </h1>
      <p className="text-lg md:text-xl mt-5 text-gray-600 mb-8">
        Connect with top Interior Designers, Architects & Furniture Experts near you.
      </p>

      <div className="flex justify-center items-center flex-wrap gap-4">
        
{/* Location Box with Geolocation */}
<div
  onClick={handleGetLocation}
  className="flex items-center border rounded-2xl px-3 py-2 w-44 text-sm text-gray-700 cursor-pointer"
>
  <FaMapMarkerAlt className="text-gray-500 mr-2" />
  <span className="flex-1 truncate">
    {loading ? "Detecting location..." : location}
  </span>
  <IoIosArrowDown className="text-gray-500 ml-2" />
</div>

{/* Search Services */}
<div className="flex items-center border rounded-2xl px-3 py-2 w-72 text-sm text-gray-700">
  <FaSearch className="text-gray-500 mr-2" />
  <input
    type="text"
    placeholder="Search services..."
    className="outline-none flex-1 bg-transparent"
  />
</div>


      </div>
    </div>
  );
}
