"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow-sm px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Logo */}
        <Link href="/" className="flex items-center text-xl font-semibold">
         <img
  src="/ArcArea-logo.png"
  className="w-24 h-auto -my-1"
  alt="ArcArea Logo"
/>

        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-20 text-gray-700 text-sm font-medium">
          <Link href="/categories" className="hover:text-black transition">Services</Link>
          <Link href="/blog" className="hover:text-black transition">Blogs</Link>
          <Link href="/about" className="hover:text-black transition">About Us</Link>
          <Link href="/how-it-works" className="hover:text-black transition">How It Works</Link>
        </div>

        {/* Right Auth / Burger */}
        <div className="flex items-center gap-4 text-gray-700 text-sm font-medium">
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
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
              <>
                <Link href="/register" className="flex items-center gap-1 hover:text-black transition">
                  <CgProfile className="text-xl" />
                  <span>Register</span>
                </Link>
                <Link href="/login" className="flex items-center gap-1 hover:text-black transition">
                  <CgProfile className="text-xl" />
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Button (Mobile only) */}
          <button onClick={toggleMenu} className="md:hidden focus:outline-none">
            {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 px-2 space-y-2 text-gray-700 text-sm font-medium">
          <Link href="/categories" className="block py-1 hover:text-black transition">Services</Link>
          <Link href="/blog" className="block py-1 hover:text-black transition">Blogs</Link>
          <Link href="/about" className="block py-1 hover:text-black transition">About Us</Link>
          <Link href="/how-it-works" className="block py-1 hover:text-black transition">How It Works</Link>

          <hr className="my-2" />

          {status === "loading" ? (
            <span>Loading...</span>
          ) : session?.user ? (
            <>
              <span className="block">Welcome, {session.user.name}</span>
              <button onClick={() => signOut()} className="block text-left py-1 hover:text-black transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/register" className="block py-1 flex items-center gap-1 hover:text-black transition">
                <CgProfile className="text-xl" />
                <span>Register</span>
              </Link>
              <Link href="/login" className="block py-1 flex items-center gap-1 hover:text-black transition">
                <CgProfile className="text-xl" />
                <span>Login</span>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
