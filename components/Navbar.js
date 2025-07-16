"use client";

import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow-sm bg-white sticky top-0 z-50">
      {/* Logo + Categories */}
      <div className="flex items-center gap-6">
       <Link href="/"> <div className="font-bold text-xl flex items-center">
          <span className="bg-black text-white px-2 py-1 rounded mr-1">AA</span>
          <span>ArcArea</span>
        </div></Link>

        <div className="hidden md:flex items-center gap-4 text-gray-700">
          <a href="#" className="hover:text-black">Beauty</a>
          <a href="#" className="hover:text-black">Wall Panels</a>
          <a href="#" className="hover:text-black">Native</a>
        </div>
      </div>

      {/* Location + Search */}
      <div className="flex-1 max-w-2xl mx-6 hidden lg:flex gap-4">
        <div className="flex items-center border rounded px-3 py-1 w-1/2">
          <FiMapPin className="mr-2 text-gray-500" />
          <span className="truncate">Connaught Place, New Delhi</span>
        </div>

        <div className="flex items-center border rounded px-3 py-1 w-full">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for ‘AC service’"
            className="outline-none flex-1"
          />
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4 text-gray-700">
        
        <Link href="/register"><FaUser size={20} /></Link>
      </div>
    </nav>
  );
}
