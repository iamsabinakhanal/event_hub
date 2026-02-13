"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { logoutUser } from "@/lib/action/auth_action";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const defaultProfileImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='#60a5fa'/><stop offset='100%' stop-color='#a78bfa'/></linearGradient></defs><rect width='120' height='120' rx='60' fill='url(#g)'/><text x='50%' y='54%' text-anchor='middle' fill='white' font-size='44' font-family='Arial' font-weight='700'>EH</text></svg>"
  );

export default function Navbar() {
  const router = useRouter();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "Event Manager",
    email: "manager@eventhub.com",
    profilePicture: null as string | null,
  });

  // Get user data from localStorage
  useEffect(() => {
    const userDataString = localStorage.getItem("user_data");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser({
        name: `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "User",
        email: userData.email || "",
        profilePicture: userData.image ? `http://localhost:5000/${userData.image}` : null,
      });
    }
  }, []);

  const profileImage = user.profilePicture || defaultProfileImage;

  const handleLogout = async () => {
    setLoading(true);
    setIsProfileMenuOpen(false);
    try {
      const result = await logoutUser();
      if (result.success) {
        // Clear localStorage
        localStorage.removeItem("user_data");
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/logo.svg"
            alt="Event-HUB Logo"
            width={40}
            height={40}
            priority
            className="rounded"
          />
          <span className="hidden sm:inline text-xl font-bold text-gray-900">
            Event<span className="text-blue-600">HUB</span>
          </span>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Profile Section - Right Side */}
        <div className="flex items-center gap-4">
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition duration-200 p-1 pl-3 cursor-pointer"
            >
              <div className="flex flex-col items-start hidden sm:flex">
                <span className="text-xs text-gray-500 leading-none">Welcome</span>
                <span className="text-sm font-semibold text-gray-900">{user.name}</span>
              </div>
              <img
                src={profileImage}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <ChevronDown
                size={16}
                className={`text-gray-600 transition duration-200 ${
                  isProfileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={profileImage}
                      alt={user.name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-white"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-600 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    href="/user/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <User size={18} />
                    <span>View Profile</span>
                  </Link>
                  <Link
                    href="/user/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-200 py-1">
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut size={18} />
                    <span>{loading ? "Logging out..." : "Logout"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}