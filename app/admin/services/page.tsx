"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { getAllServices, deleteService } from "@/lib/api/service";

interface AdminService {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  duration?: number;
  features?: string[];
  image_url?: string;
  createdAt?: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState<AdminService[]>([]);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  const resolveImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) return imageUrl;
    // Remove leading slash if present to avoid double slashes
    const cleanPath = imageUrl.startsWith("/") ? imageUrl.substring(1) : imageUrl;
    const fullUrl = `${apiBaseUrl}/${cleanPath}`;
    console.log('[AdminServices] Image URL:', { imageUrl, cleanPath, fullUrl });
    return fullUrl;
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getAllServices();
      console.log('[AdminServices] API response:', result);
      if (result?.success) {
        console.log('[AdminServices] Services data:', result.data);
        setServices(result.data || []);
      } else {
        setError(result?.message || "Failed to fetch services");
      }
    } catch (err: any) {
      console.error('[AdminServices] Error:', err);
      setError(err?.message || "Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchTerm, services]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        const result = await deleteService(id);
        if (result?.success) {
          // Refresh the services list after successful deletion
          fetchServices();
        } else {
          alert(result?.message || "Failed to delete service");
        }
      } catch (err: any) {
        alert(err?.message || "Failed to delete service");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
            <p className="text-gray-600 mt-1">Manage all event planning services</p>
          </div>
          <Link
            href="/admin/services/new"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            <Plus size={20} />
            Add New Service
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading services...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchServices}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Services Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service, index) => {
                    const serviceId = service._id || service.id || "";
                    return (
                      <tr key={serviceId} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {service.image_url && (
                              <img
                                src={resolveImageUrl(service.image_url)}
                                alt={service.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            )}
                            <span className="font-medium text-gray-900">{service.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {service.category && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {service.category}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-600 text-sm truncate max-w-xs">{service.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-blue-600">
                            ₨{service.price.toLocaleString("ne-NP")}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Link
                              href={`/admin/services/${serviceId}/edit`}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            >
                              <Edit2 size={18} />
                            </Link>
                            <button
                              onClick={() => handleDelete(serviceId)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredServices.length === 0 && (
              <div className="px-6 py-12 text-center text-gray-500">
                <p>No services found</p>
              </div>
            )}
          </div>
        )}
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Total Services</h3>
            <p className="text-3xl font-bold text-blue-600">{services.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Average Price</h3>
            <p className="text-3xl font-bold text-green-600" suppressHydrationWarning>
              ₨{services.length > 0 ? Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length).toLocaleString("ne-NP") : "0"}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Total Revenue</h3>
            <p className="text-3xl font-bold text-purple-600" suppressHydrationWarning>
              ₨{services.reduce((sum, s) => sum + s.price, 0).toLocaleString("ne-NP")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
