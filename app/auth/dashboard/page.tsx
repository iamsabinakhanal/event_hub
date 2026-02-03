import { getUserData, getAuthToken } from "@/lib/cookies";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const token = await getAuthToken();
  const userData = await getUserData();

  // Redirect to login if not authenticated
  if (!token || !userData) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Where every event becomes extraordinary
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Event Hub is a smart platform that makes planning, managing, and joining events simple and effortless.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* User Info Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Welcome Back, {userData.firstName}!</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-500 mb-2">First Name</p>
              <p className="text-lg font-semibold text-gray-800">{userData.firstName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Last Name</p>
              <p className="text-lg font-semibold text-gray-800">{userData.lastName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Email</p>
              <p className="text-lg font-semibold text-gray-800">{userData.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Status</p>
              <p className="text-lg font-semibold text-green-600">✓ Authenticated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Get Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/auth/dashboard" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Browse Events</h3>
            <p className="text-gray-600">Discover events happening near you</p>
          </Link>
          <Link href="/user/profile" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-gray-800 mb-2">My Profile</h3>
            <p className="text-gray-600">Manage your personal information</p>
          </Link>
          <Link href="/admin/users" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Admin Panel</h3>
            <p className="text-gray-600">Manage users and events</p>
          </Link>
        </div>
      </section>
    </div>
  );
}