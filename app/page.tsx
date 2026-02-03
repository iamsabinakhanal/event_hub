import Navbar from "./components/navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-24">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Where every event becomes extraordinary
            </h1>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Event Hub is a smart platform that makes planning, managing, and joining events simple and effortless.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/login" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Login
              </Link>
              <Link href="/register" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                Register
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose Event Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Easy Planning</h3>
              <p className="text-gray-600">Simple tools to plan, organize, and manage all types of events effortlessly.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Guest Management</h3>
              <p className="text-gray-600">Invite guests, track RSVPs, and manage attendance all in one place.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Analytics</h3>
              <p className="text-gray-600">Get insights and reports to make your events more successful.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-pink-100 py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8 text-lg">Join thousands of event planners using Event Hub</p>
            <Link href="/register" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition inline-block">
              Create Your Account
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
