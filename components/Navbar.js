'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between px-7 py-0 shadow-sm bg-white">
      {/* Left Side Logo + Links */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center text-xl font-semibold">
          <span>
            <img src="/ArcArea-logo.png" className="w-17 mt-1" alt="ArcArea Logo" />
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 ml-6 text-gray-700 text-sm font-medium">
          <Link href="/categories" className="hover:text-black transition">Services</Link>
          <Link href="/blog" className="hover:text-black transition">Blogs</Link>
          <Link href="/about" className="hover:text-black transition">About Us</Link>
          <Link href="/how-it-works" className="hover:text-black transition">How It works</Link>
        </div>
      </div>

      {/* Auth Section */}
      <div className="flex items-center gap-4 text-gray-700">
        {status === "loading" ? (
          <span>Loading...</span>
        ) : session?.user ? (
          <>
            <span className="hidden sm:block">Welcome, {session.user.name}</span>
            <button
              onClick={() => signOut()}
              className="hover:text-black transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/register"
              className="flex items-center gap-1 hover:text-black transition"
            >
              <CgProfile className="text-2xl" />
              <span>Register</span>
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1 hover:text-black transition"
            >
              <CgProfile className="text-2xl" />
              <span>Login</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
