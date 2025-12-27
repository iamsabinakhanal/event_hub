"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Event-HUB Dashboard</h1>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Home
        </Link>
      </header>

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
  );
}
