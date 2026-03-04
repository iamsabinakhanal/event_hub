"use client";

import { useState, useEffect, useTransition } from "react";
import { CheckCircle, Clock, XCircle, Search, AlertCircle, Loader } from "lucide-react";
import { getAllBookings, updateBookingStatus } from "@/lib/api/booking";

interface Booking {
  _id: string;
  user_id: {
    _id: string;
    fullName: string;
    email: string;
  };
  service_id: {
    _id: string;
    title: string;
    price: number;
  };
  event_date: string;
  guest_count: number;
  total_price: number;
  special_requests?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "confirmed" | "completed" | "cancelled">("all");
  const [isPending, startTransition] = useTransition();

  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllBookings();
        
        if (response.success && response.data) {
          // Handle nested Mongoose documents
          const processedBookings = response.data.map((booking: any) => {
            const docBooking = booking._doc || booking;
            return {
              _id: docBooking._id || booking._id,
              user_id: docBooking.user_id || booking.user_id,
              service_id: docBooking.service_id || booking.service_id,
              event_date: docBooking.event_date || booking.event_date,
              guest_count: docBooking.guest_count || booking.guest_count,
              total_price: docBooking.total_price || booking.total_price,
              special_requests: docBooking.special_requests || booking.special_requests,
              status: docBooking.status || booking.status,
              createdAt: docBooking.createdAt || booking.createdAt,
              updatedAt: docBooking.updatedAt || booking.updatedAt,
            };
          });
          setBookings(processedBookings);
        }
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.user_id?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user_id?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service_id?.title?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Handle status change with optimistic update
  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    const oldBooking = bookings.find((b) => b._id === bookingId);
    if (!oldBooking) return;

    // Optimistic update
    setBookings((prevBookings) =>
      prevBookings.map((b) =>
        b._id === bookingId ? { ...b, status: newStatus as any } : b
      )
    );

    startTransition(async () => {
      try {
        await updateBookingStatus(bookingId, newStatus as any);
      } catch (err: any) {
        console.error("Error updating booking status:", err);
        // Revert on error
        setBookings((prevBookings) =>
          prevBookings.map((b) => (b._id === bookingId ? oldBooking : b))
        );
        setError(`Failed to update booking: ${err.message}`);
        setTimeout(() => setError(null), 5000);
      }
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="text-green-600" size={18} />;
      case "pending":
        return <Clock className="text-yellow-600" size={18} />;
      case "cancelled":
        return <XCircle className="text-red-600" size={18} />;
      case "completed":
        return <CheckCircle className="text-blue-600" size={18} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all event bookings</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search size={20} className="absolute left-4 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader className="animate-spin mx-auto mb-4" size={40} />
              <p className="text-gray-600">Loading bookings...</p>
            </div>
          </div>
        )}

        {/* Bookings Table */}
        {!loading && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Event Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Guests</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking, index) => (
                    <tr key={booking._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.user_id?.fullName || "Unknown User"}
                          </p>
                          <p className="text-sm text-gray-600">{booking.user_id?.email || "No email"}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {booking.service_id?.title || "Unknown Service"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900">{formatDate(booking.event_date)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900">{booking.guest_count}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-blue-600">₨{booking.total_price.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                          disabled={isPending}
                          className={`px-3 py-1 rounded-full text-sm font-semibold border-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {getStatusIcon(booking.status)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredBookings.length === 0 && !loading && (
              <div className="px-6 py-12 text-center text-gray-500">
                <p className="text-lg">No bookings found</p>
                {searchTerm || filterStatus !== "all" ? (
                  <p className="text-sm mt-2">Try adjusting your search or filter criteria</p>
                ) : (
                  <p className="text-sm mt-2">No bookings have been created yet</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        {!loading && bookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Total Bookings</h3>
              <p className="text-3xl font-bold text-blue-600">{bookings.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Confirmed</h3>
              <p className="text-3xl font-bold text-green-600">
                {bookings.filter((b) => b.status === "confirmed").length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Pending</h3>
              <p className="text-3xl font-bold text-yellow-600">
                {bookings.filter((b) => b.status === "pending").length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Total Revenue</h3>
              <p className="text-3xl font-bold text-purple-600">
                ₨{bookings.reduce((sum, b) => sum + b.total_price, 0).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
