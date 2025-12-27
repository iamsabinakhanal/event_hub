"use client";

import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="Event-HUB Logo"
                  width={32}
                  height={32}
                  priority
                />
                <span className="text-xl font-bold text-gray-800">
                  Event<span className="text-yellow-500">HUB</span>
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/dashboard"
                className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/auth/profile"
                className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-8">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Events</h2>
          <p className="text-3xl font-bold text-blue-500 mt-2">24</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Upcoming</h2>
          <p className="text-3xl font-bold text-green-500 mt-2">8</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Past Events</h2>
          <p className="text-3xl font-bold text-red-500 mt-2">16</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Registered Users</h2>
          <p className="text-3xl font-bold text-purple-500 mt-2">120</p>
        </div>
      </div>

      {/* Event List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold mb-2">Event {idx + 1}</h3>
              <p className="text-gray-500 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <button className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
