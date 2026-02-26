"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import BookingForm from "@/app/components/BookingForm";
import { Service } from "@/lib/types/booking.type";
import { ArrowRight } from "lucide-react";
import { getAllServices } from "@/lib/api/service";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  const resolveImageUrl = (image?: string) => {
    if (!image) return "https://via.placeholder.com/600x400";
    if (image.startsWith("http://") || image.startsWith("https://")) return image;
    // Remove leading slash if present to avoid double slashes
    const cleanPath = image.startsWith("/") ? image.substring(1) : image;
    return `${apiBaseUrl}/${cleanPath}`;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const result = await getAllServices();
        console.log('[Services] API response:', result);
        if (result?.success) {
          console.log('[Services] Services data:', result.data);
          setServices(result.data || []);
        } else {
          const errorMsg = result?.message || "Failed to fetch services";
          setError(errorMsg);
        }
      } catch (err: any) {
        console.error('[Services] Error:', err);
        const errorMsg = err?.message || "Failed to fetch services";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBookClick = (service: Service) => {
    setSelectedService(service);
    setShowBookingForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Services</h1>
          <p className="text-lg text-gray-300">
            Choose from our premium event planning and management services
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {loading ? (
          <div className="text-center text-gray-600 text-lg">Loading services...</div>
        ) : error ? (
          <div className="text-center text-red-600 text-lg">{error}</div>
        ) : services.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">No services available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id || service.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img
                    src={resolveImageUrl(service.image_url)}
                    alt={service.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                  {service.category && (
                    <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {service.category}
                    </span>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                  <p className="text-gray-600 leading-relaxed grow mb-6">{service.description}</p>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-2xl font-bold text-pink-500">
                      ₨{service.price.toLocaleString("ne-NP")}
                    </div>
                    <button
                      onClick={() => handleBookClick(service)}
                      className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition duration-200 font-semibold group"
                    >
                      Book Now
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Book Your Event?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Choose a service above and let us help you create an unforgettable experience
          </p>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingForm && selectedService && (
        <BookingForm
          service={selectedService}
          onClose={() => setShowBookingForm(false)}
          onSuccess={() => {
            // Refresh or show success message
          }}
        />
      )}
    </div>
  );
}
