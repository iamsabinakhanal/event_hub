"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import covpageImg from "@/app/image/covpage.jpg";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src={covpageImg}
          alt="Event Hub Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <div className="mb-6 inline-block">
            <div className="flex items-center justify-center gap-2 bg-fuchsia-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-fuchsia-400/50">
              <Sparkles className="w-5 h-5 text-fuchsia-400" />
              <span className="text-sm font-semibold text-fuchsia-300">Welcome to Event Hub</span>
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Create Unforgettable <span className="text-fuchsia-400">Moments</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-100 max-w-2xl mx-auto">
            Plan, manage, and host amazing events with Event Hub. From weddings to birthdays, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-lg border border-white/40 transition backdrop-blur-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-900 to-fuchsia-900">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Plan Your Event?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have created amazing events with Event Hub.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-purple-900 font-bold py-4 px-10 rounded-lg transition transform hover:scale-105"
          >
            Start Planning Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}