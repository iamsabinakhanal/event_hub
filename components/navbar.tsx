"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userDataString = localStorage.getItem("user_data");
    setIsLoggedIn(!!userDataString);
  }, []);

  const homeLink = isLoggedIn ? "/user/profile" : "/auth/dashboard";
  const homeLabel = isLoggedIn ? "Dashboard" : "Home";

  const handleLogout = () => {
    localStorage.removeItem("user_data");
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="bg-linear-to-r from-purple-700 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href={homeLink} className="text-3xl font-bold text-white hover:text-purple-200 transition">
              Event Hub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={homeLink} className="hover:text-purple-200 transition font-medium">
              {homeLabel}
            </Link>
            <Link href="/about" className="hover:text-purple-200 transition font-medium">
              About Us
            </Link>
            <Link href="/gallery" className="hover:text-purple-200 transition font-medium">
              Gallery
            </Link>
            <Link href="/services" className="hover:text-purple-200 transition font-medium">
              Services
            </Link>
            <Link href="/contact" className="hover:text-purple-200 transition font-medium">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-purple-600 focus:outline-none"
            >
              <svg
                className={`h-6 w-6 transition-transform ${isOpen ? "rotate-90" : ""}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link href={homeLink} className="block px-3 py-2 rounded hover:bg-purple-600">
              {homeLabel}
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded hover:bg-purple-600">
              About Us
            </Link>
            <Link href="/gallery" className="block px-3 py-2 rounded hover:bg-purple-600">
              Gallery
            </Link>
            <Link href="/services" className="block px-3 py-2 rounded hover:bg-purple-600">
              Services
            </Link>
            <Link href="/contact" className="block px-3 py-2 rounded hover:bg-purple-600">
              Contact
            </Link>
            {!isLoggedIn ? (
              <Link href="/(auth)/login" className="block px-3 py-2 rounded hover:bg-purple-600">
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded hover:bg-purple-600"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
