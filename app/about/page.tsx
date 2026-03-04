"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import PublicFooter from "@/components/PublicFooter";
import missionImage from "@/app/image/mission.jpg";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-linear-to-r from-purple-600 to-pink-600 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">About Event Hub</h1>
          <p className="text-xl text-purple-100">
            Making event planning simple, accessible, and enjoyable for everyone
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Event Hub was founded with a single vision: to democratize event planning. We believe that creating memorable events should be simple, affordable, and accessible to everyone.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our platform combines innovation with user-friendly design to help organizers focus on what matters most – creating unforgettable experiences for their guests.
            </p>
          </div>
          <div className="rounded-3xl h-80 md:h-96 overflow-hidden shadow-2xl border border-gray-100">
            <Image
              src={missionImage}
              alt="Our Mission"
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16 px-6 mt-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to bring the best tools and features to our platform.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                We build a supportive community where event organizers can share and learn.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-16 px-6 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-purple-100 mb-8">
            Become part of thousands of event organizers using Event Hub
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
          >
            Get Started Today
          </Link>
        </div>
      </section>
      
      <PublicFooter />
    </div>
  );
}
