"use client";

import Link from "next/link";
import { 
  Calendar, 
  Users, 
  Ticket, 
  Plus, 
  Search,
  MoreVertical 
} from "lucide-react"; // Using Lucide for clean icons

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 1. Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6">
          <span className="text-2xl font-bold text-gray-900">
            Event<span className="text-blue-600">HUB</span>
          </span>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="#" className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg font-medium">
            <Calendar size={20} /> Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Users size={20} /> Attendees
          </Link>
          <Link href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Ticket size={20} /> Tickets
          </Link>
        </nav>
      </aside>

      {/* 2. Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Events Overview</h1>
            <p className="text-gray-500 text-sm">Welcome back, here is what's happening today.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm">
            <Plus size={18} /> Create Event
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex justify-between items-start text-gray-400 mb-4">
              <Calendar size={24} className="text-blue-600" />
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">Active Events</p>
            <h3 className="text-3xl font-bold text-gray-900">24</h3>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex justify-between items-start text-gray-400 mb-4">
              <Users size={24} className="text-purple-600" />
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">+5%</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">Total Attendees</p>
            <h3 className="text-3xl font-bold text-gray-900">1,284</h3>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex justify-between items-start text-gray-400 mb-4">
              <Ticket size={24} className="text-orange-600" />
              <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">-2%</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">Tickets Sold</p>
            <h3 className="text-3xl font-bold text-gray-900">856</h3>
          </div>
        </div>

        {/* Upcoming Events Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-gray-800">Upcoming Events</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Event Name</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {[
                { name: "Tech Conference 2026", date: "Jan 25, 2026", status: "Published", color: "text-green-600 bg-green-50" },
                { name: "Product Launch", date: "Feb 02, 2026", status: "Draft", color: "text-gray-600 bg-gray-50" },
                { name: "Music Festival", date: "Mar 15, 2026", status: "Published", color: "text-green-600 bg-green-50" },
              ].map((event, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{event.name}</td>
                  <td className="px-6 py-4 text-gray-600">{event.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.color}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}