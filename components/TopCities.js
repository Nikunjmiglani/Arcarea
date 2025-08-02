// components/TopCities.js

import { FaCity } from "react-icons/fa";

const cities = [
  { name: "Delhi", icon: <FaCity size={50} className="text-gray-600" /> },
  { name: "Rohtak", icon: <FaCity size={50} className="text-gray-600" /> },
  { name: "Noida", icon: <FaCity size={50} className="text-gray-600" /> },
  { name: "Gurugram", icon: <FaCity size={50} className="text-gray-600" /> },
  { name: "Ghaziabad", icon: <FaCity size={50} className="text-gray-600" /> },
  { name: "Greater Noida", icon: <FaCity size={50} className="text-gray-600" /> },
  { name: "Faridabad", icon: <FaCity size={50} className="text-gray-600" /> },
  { name: "Panchkula", icon: <FaCity size={50} className="text-gray-600" /> },
  { name: "Nepal", icon: <FaCity size={50} className="text-gray-600" /> },
  { name: "Kashmir", icon: <FaCity size={50} className="text-gray-600" /> },
];

export default function TopCities() {
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">
          Our Suppliers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {cities.map((city) => (
            <div
              key={city.name}
              className="flex flex-col items-center text-center group hover:scale-105 transition-transform"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full mb-2">
                {city.icon}
              </div>
              <p className="text-lg font-medium text-gray-700">{city.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
