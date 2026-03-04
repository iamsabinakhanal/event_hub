"use client";

import { useState, useEffect } from "react";
import { Trash2, Heart, Loader } from "lucide-react";

interface Favorite {
    _id: string;
    user_id: {
        _id: string;
        email: string;
        firstName?: string;
        lastName?: string;
    };
    service_id: {
        _id: string;
        name: string;
        price: number;
        category: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface FavoritesClientProps {
    initialFavorites: Favorite[];
}

export default function FavoritesClient({ initialFavorites }: FavoritesClientProps) {
    const [favorites, setFavorites] = useState<Favorite[]>(initialFavorites);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
    const [filterType, setFilterType] = useState<"all" | "users" | "services">("all");

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

    // Filter favorites based on search
    const filteredFavorites = favorites.filter((fav) => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            fav.user_id.email.toLowerCase().includes(searchLower) ||
            fav.user_id.firstName?.toLowerCase().includes(searchLower) ||
            fav.user_id.lastName?.toLowerCase().includes(searchLower) ||
            fav.service_id.name.toLowerCase().includes(searchLower);

        return matchesSearch;
    });

    const handleDeleteFavorite = async (favoriteId: string) => {
        if (!confirm("Are you sure you want to remove this favorite?")) return;

        setDeleteLoading(favoriteId);
        try {
            const response = await fetch(`${apiBaseUrl}/api/favorites/${favoriteId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                setFavorites((prev) => prev.filter((fav) => fav._id !== favoriteId));
                alert("Favorite removed successfully");
            } else {
                alert("Failed to remove favorite");
            }
        } catch (error) {
            console.error("Error deleting favorite:", error);
            alert("Error removing favorite");
        } finally {
            setDeleteLoading(null);
        }
    };

    const handleRefresh = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiBaseUrl}/api/favorites`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setFavorites(data.data || []);
            }
        } catch (error) {
            console.error("Error fetching favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    // Statistics
    const totalFavorites = favorites.length;
    const uniqueUsers = new Set(favorites.map((f) => f.user_id._id)).size;
    const uniqueServices = new Set(favorites.map((f) => f.service_id._id)).size;

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white mb-6 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <Heart size={32} className="text-red-500" />
                            Manage Favorites
                        </h1>
                        <p className="text-gray-600 mt-2">Monitor and manage user favorite selections</p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-semibold transition"
                    >
                        {loading ? (
                            <>
                                <Loader size={18} className="animate-spin" />
                                Refreshing...
                            </>
                        ) : (
                            <>
                                <span>Refresh</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-linear-to-br from-red-50 to-red-100 rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Total Favorites</p>
                        <p className="text-3xl font-bold text-red-600">{totalFavorites}</p>
                    </div>
                    <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Users with Favorites</p>
                        <p className="text-3xl font-bold text-blue-600">{uniqueUsers}</p>
                    </div>
                    <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Favorited Services</p>
                        <p className="text-3xl font-bold text-purple-600">{uniqueServices}</p>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <input
                    type="text"
                    placeholder="Search by user email, name, or service name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {/* Favorites Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {filteredFavorites.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                        Service
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                        Added Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredFavorites.map((favorite) => (
                                    <tr key={favorite._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {favorite.user_id.firstName || favorite.user_id.lastName
                                                        ? `${favorite.user_id.firstName || ""} ${
                                                              favorite.user_id.lastName || ""
                                                          }`.trim()
                                                        : "Unknown User"}
                                                </p>
                                                <p className="text-sm text-gray-600">{favorite.user_id.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900">{favorite.service_id.name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900">
                                                ${favorite.service_id.price.toFixed(2)}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-medium">
                                                {favorite.service_id.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(favorite.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDeleteFavorite(favorite._id)}
                                                disabled={deleteLoading === favorite._id}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition"
                                            >
                                                {deleteLoading === favorite._id ? (
                                                    <Loader size={16} className="animate-spin" />
                                                ) : (
                                                    <Trash2 size={16} />
                                                )}
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-xl text-gray-600">
                            {searchTerm ? "No favorites match your search" : "No favorites yet"}
                        </p>
                    </div>
                )}
            </div>

            {/* Footer Info */}
            {filteredFavorites.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
                    Showing {filteredFavorites.length} of {totalFavorites} total favorites
                    {searchTerm && ` (filtered by "${searchTerm}")`}
                </div>
            )}
        </main>
    );
}
