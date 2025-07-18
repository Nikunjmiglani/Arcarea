'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center text-xl font-semibold">
          <span className="bg-black text-white px-2 py-1 rounded mr-2 font-mono hover:scale-110 transition-transform duration-200">AA</span>
          <span className="text-gray-800 font-medium">ArchArea</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 ml-6 text-gray-700 text-sm font-medium">
          <Link href="/categories" className="hover:text-black transition">Services</Link>
          <Link href="/blog" className="hover:text-black transition">Blogs</Link>
          <Link href="/about" className="hover:text-black transition">About Us</Link>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-2xl mx-6 hidden lg:flex gap-4">
        <div className="flex items-center border rounded-lg px-3 py-2 w-full text-sm text-gray-700">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search services..."
            className="outline-none flex-1 bg-transparent"
          />
        </div>
      </div>

      {/* Auth Section */}
      <div className="flex items-center gap-4 text-gray-700">
        {status === "loading" ? (
          <span>Loading...</span>
        ) : session?.user ? (
          <>
            <span className="hidden sm:block">Welcome, {session.user.name}</span>
            <button onClick={() => signOut()} className="hover:text-black transition">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="flex items-center gap-1 hover:text-black transition">
            <CgProfile className="text-2xl" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
