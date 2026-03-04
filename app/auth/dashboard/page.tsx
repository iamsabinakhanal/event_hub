import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import PublicFooter from "@/components/PublicFooter";
import { ArrowRight } from "lucide-react";
import covPageImage from "@/app/image/covpage.jpg";
import weddingImage from "@/app/image/wedding.jpg";
import birthdayImage from "@/app/image/birthday.jpg";
import anniversaryImage from "@/app/image/anniversary.jpg";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src={covPageImage}
          alt="Event Hub cover"
          priority
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Where Every Event Becomes Extraordinary
            </h1>
            <p className="text-lg md:text-2xl opacity-95 mb-8">
              Event Hub makes planning, managing, and joining events simple and effortless.
            </p>
            <Link href="/about" className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <p className="text-lg font-semibold text-pink-600 mb-2 tracking-wide">WHAT WE DO</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Our Featured Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wedding Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-all hover:shadow-2xl">
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <Image
                  src={weddingImage}
                  alt="Wedding"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Weddings</h3>
                <p className="text-gray-600 mb-4">Elegant ceremonies and unforgettable receptions tailored to your vision.</p>
                <Link 
                  href="/services" 
                  className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition"
                >
                  Learn More
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Birthday Parties Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-all hover:shadow-2xl">
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <Image
                  src={birthdayImage}
                  alt="Birthday Parties"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Birthday Parties</h3>
                <p className="text-gray-600 mb-4">Fun, creative celebrations for all ages with stunning decor.</p>
                <Link 
                  href="/services" 
                  className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition"
                >
                  Learn More
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Anniversaries Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-all hover:shadow-2xl">
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <Image
                  src={anniversaryImage}
                  alt="Anniversaries"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Anniversaries</h3>
                <p className="text-gray-600 mb-4">Romantic milestones celebrated with elegance and style.</p>
                <Link 
                  href="/services" 
                  className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition"
                >
                  Learn More
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}