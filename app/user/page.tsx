"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleGetMyBookings } from "@/lib/action/booking_action";
import { handleGetAllFavorites, handleDeleteFavorite } from "@/lib/action/favorite_action";
import { Calendar, Heart, User, Mail, Phone, MapPin, Clock, DollarSign, Trash2, Eye } from "lucide-react";
import Link from "next/link";

interface Booking {
    _id: string;
    service_id: {
        _id: string;
        name: string;
        price: number;
        category?: string;
    };
    event_date: string;
    guest_count?: number;
    special_requests?: string;
    status: string;
    total_price: number;
    createdAt: string;
}

interface Favorite {
    _id: string;
    service_id: {
        _id: string;
        name: string;
        description?: string;
        price: number;
        category?: string;
        image?: string;
    };
    createdAt: string;
}

export default function UserDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        // Get user data from localStorage
        const userDataString = localStorage.getItem("user_data");
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUser(userData);
        }

        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [bookingsResult, favoritesResult] = await Promise.all([
                handleGetMyBookings(),
                handleGetAllFavorites(),
            ]);

            if (bookingsResult.success) {
                setBookings(bookingsResult.data || []);
            }

            if (favoritesResult.success) {
                setFavorites(favoritesResult.data || []);
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFavorite = async (favoriteId: string) => {
        if (!confirm("Remove this service from favorites?")) return;

        try {
            const result = await handleDeleteFavorite(favoriteId);
            if (result.success) {
                setSuccessMessage("Removed from favorites");
                fetchDashboardData();
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                setError(result.message);
            }
        } catch (err: any) {
            setError(err.message || "Failed to remove favorite");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "confirmed":
                return "bg-green-100 text-green-700";
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "completed":
                return "bg-blue-100 text-blue-700";
            case "cancelled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user?.firstName || "User"}!
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Manage your bookings and favorites
                    </p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                        {successMessage}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Bookings</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {bookings.length}
                                </p>
                            </div>
                            <Calendar className="h-12 w-12 text-purple-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Favorites</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {favorites.length}
                                </p>
                            </div>
                            <Heart className="h-12 w-12 text-pink-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Profile</p>
                                <Link
                                    href="/user/profile"
                                    className="text-purple-600 hover:text-purple-700 font-medium mt-1 block"
                                >
                                    Edit Profile →
                                </Link>
                            </div>
                            <User className="h-12 w-12 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* My Bookings */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Calendar className="h-6 w-6 text-purple-600" />
                            My Bookings
                        </h2>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {bookings.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                <p>No bookings yet</p>
                                <Link
                                    href="/services"
                                    className="text-purple-600 hover:text-purple-700 mt-2 inline-block"
                                >
                                    Browse Services →
                                </Link>
                            </div>
                        ) : (
                            bookings.map((booking) => (
                                <div key={booking._id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {booking.service_id?.name || "Service"}
                                            </h3>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <p className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    Event Date: {formatDate(booking.event_date)}
                                                </p>
                                                {booking.guest_count && (
                                                    <p className="flex items-center gap-2">
                                                        <User className="h-4 w-4" />
                                                        Guests: {booking.guest_count}
                                                    </p>
                                                )}
                                                <p className="flex items-center gap-2">
                                                    <DollarSign className="h-4 w-4" />
                                                    Total: ${booking.total_price}
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                booking.status
                                            )}`}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>

                                    {booking.special_requests && (
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-sm font-medium text-gray-700 mb-1">
                                                Special Requests:
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {booking.special_requests}
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-3 text-xs text-gray-500">
                                        Booked on: {formatDate(booking.createdAt)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* My Favorites */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Heart className="h-6 w-6 text-pink-600" />
                            My Favorites
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {favorites.length === 0 ? (
                            <div className="col-span-full p-12 text-center text-gray-500">
                                <Heart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                <p>No favorite services yet</p>
                                <Link
                                    href="/services"
                                    className="text-purple-600 hover:text-purple-700 mt-2 inline-block"
                                >
                                    Explore Services →
                                </Link>
                            </div>
                        ) : (
                            favorites.map((favorite) => (
                                <div
                                    key={favorite._id}
                                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    {favorite.service_id?.image && (
                                        <img
                                            src={favorite.service_id.image}
                                            alt={favorite.service_id.name}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            {favorite.service_id?.name}
                                        </h3>
                                        {favorite.service_id?.description && (
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                {favorite.service_id.description}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-purple-600">
                                                ${favorite.service_id?.price}
                                            </span>
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/services/${favorite.service_id?._id}`}
                                                    className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm flex items-center gap-1"
                                                >
                                                    <Eye className="h-3 w-3" />
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => handleRemoveFavorite(favorite._id)}
                                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm flex items-center gap-1"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
