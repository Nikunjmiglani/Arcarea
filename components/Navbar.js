"use client";

import { FaSearch } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white sticky top-0 z-50">
      {/* Logo + Menu */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center text-xl font-semibold">
          <span className="bg-black text-white px-2 py-1 rounded mr-2 hover:scale-110 transition-transform duration-200 font-mono">AA</span>
          <span className="text-gray-800 font-medium">ArchArea</span>
        </Link>

        {/* Main Menu */}
        <div className="hidden md:flex items-center gap-8 ml-6 text-gray-700 text-sm font-medium">
          <a href="/categories" className="hover:text-black transition">Services</a>
          <a href="/blog" className="hover:text-black transition">Blogs</a>
          <a href="#" className="hover:text-black transition">About Us</a>
        </div>
      </div>

      {/* Location + Search */}
      <div className="flex-1 max-w-2xl mx-6 hidden lg:flex gap-4">
        <div className="flex items-center border rounded-lg px-3 py-2 w-1/2 text-sm text-gray-700">
          <FiMapPin className="mr-2 text-gray-500" />
          <span className="truncate">Connaught Place, New Delhi</span>
        </div>

        <div className="flex items-center border rounded-lg px-3 py-2 w-full text-sm text-gray-700">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for ‘Kitchen cleaning’"
            className="outline-none flex-1 bg-transparent"
          />
        </div>
      </div>

      {/* Profile Icon */}
      <div className="flex items-center gap-4 text-gray-700">
        <Link href="/register">
          <CgProfile className="text-2xl hover:scale-110 transition-transform duration-200" />
        </Link>
      </div>
    </nav>
  );
}
