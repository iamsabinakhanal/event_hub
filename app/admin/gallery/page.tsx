"use client";

import { useState, useEffect } from "react";
import { Trash2, Search, Edit2 } from "lucide-react";
import GalleryUploadForm from "./GalleryUploadForm";
import GalleryEditForm from "./GalleryEditForm";

interface GalleryImage {
    _id?: string;
    id?: string;
    title: string;
    description?: string;
    image_url: string;
    category: string;
    createdAt?: string;
}

export default function AdminGalleryPage() {
    const [gallery, setGallery] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredGallery, setFilteredGallery] = useState<GalleryImage[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

    const resolveImageUrl = (imageUrl?: string) => {
        if (!imageUrl) return "https://via.placeholder.com/300x300?text=No+Image";
        
        // If already a full URL, return as is
        if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
            return imageUrl;
        }
        
        // If starts with /, prepend the API base URL
        if (imageUrl.startsWith("/")) {
            return `${apiBaseUrl}${imageUrl}`;
        }
        
        // Otherwise prepend /uploads/ and then API base URL
        return `${apiBaseUrl}/uploads/${imageUrl}`;
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch("/api/gallery");
            const result = await response.json();

            if (result?.success) {
                setGallery(result.data || []);
            } else {
                setError(result?.message || "Failed to fetch gallery");
            }
        } catch (err: any) {
            console.error("Error fetching gallery:", err);
            setError(err?.message || "Failed to fetch gallery");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const normalizedSearch = (searchTerm || "").toLowerCase();
        let filtered = gallery.filter((item) => {
            if (!item) return false;
            const titleMatch = (item.title || "").toLowerCase().includes(normalizedSearch);
            const descriptionMatch = (item.description || "").toLowerCase().includes(normalizedSearch);
            return titleMatch || descriptionMatch;
        });

        if (selectedCategory) {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        setFilteredGallery(filtered);
    }, [searchTerm, selectedCategory, gallery]);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this photo?")) {
            try {
                const response = await fetch(`/api/gallery/${id}`, {
                    method: "DELETE",
                });
                const result = await response.json();

                if (result?.success) {
                    setGallery(prev => prev.filter(item => item._id !== id && item.id !== id));
                } else {
                    alert(result?.message || "Failed to delete photo");
                }
            } catch (err: any) {
                alert(err?.message || "Failed to delete photo");
            }
        }
    };

    const categories = Array.from(
        new Set(gallery.map(item => item.category).filter(Boolean))
    ).sort();

    const formatCategoryLabel = (category?: string) => {
        if (!category) return "Uncategorized";
        return category.charAt(0).toUpperCase() + category.slice(1);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
                        <p className="text-gray-600 mt-1">Manage event gallery photos</p>
                    </div>
                    <GalleryUploadForm onUploadSuccess={fetchGallery} />
                </div>

                {/* Search Bar & Filter */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 relative">
                        <Search size={20} className="absolute left-4 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search gallery..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={selectedCategory || ""}
                        onChange={(e) => setSelectedCategory(e.target.value || null)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={String(cat)} value={cat}>
                                {formatCategoryLabel(cat)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading gallery...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-700">{error}</p>
                        <button
                            onClick={fetchGallery}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Gallery Table */}
                {!loading && !error && (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Photo</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredGallery.length > 0 ? (
                                        filteredGallery.map((image) => (
                                            <tr key={image._id || image.id} className="hover:bg-gray-50 transition">
                                                {/* Photo with Title */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={resolveImageUrl(image.image_url)}
                                                            alt={image.title}
                                                            className="w-16 h-16 rounded-lg object-cover"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/100x100?text=Image";
                                                            }}
                                                        />
                                                        <span className="font-medium text-gray-900">{image.title}</span>
                                                    </div>
                                                </td>

                                                {/* Category */}
                                                <td className="px-6 py-4">
                                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                                                        {formatCategoryLabel(image.category)}
                                                    </span>
                                                </td>

                                                {/* Description */}
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600 max-w-md truncate">
                                                        {image.description || "-"}
                                                    </p>
                                                </td>

                                                {/* Date */}
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-600">
                                                        {image.createdAt ? new Date(image.createdAt).toLocaleDateString() : "-"}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => setEditingImage(image)}
                                                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition"
                                                            title="Edit"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(image._id || image.id || "")}
                                                            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center">
                                                <p className="text-gray-500 text-lg mb-4">No photos found</p>
                                                <p className="text-gray-400">
                                                    {searchTerm || selectedCategory ? "Try adjusting your filters" : "Upload your first gallery photo"}
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Statistics Cards */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {/* Total Photos */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Photos</p>
                            <p className="text-4xl font-bold text-blue-600 mt-2">{gallery.length}</p>
                        </div>

                        {/* Categories */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Categories</p>
                            <p className="text-4xl font-bold text-green-600 mt-2">
                                {new Set(gallery.map(img => img.category)).size}
                            </p>
                        </div>

                        {/* Latest Upload */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Latest Upload</p>
                            <p className="text-4xl font-bold text-purple-600 mt-2">
                                {gallery.length > 0 && gallery[0]?.createdAt
                                    ? new Date(gallery[0].createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                    : '-'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {editingImage && (
                    <GalleryEditForm
                        image={editingImage}
                        onEditSuccess={fetchGallery}
                        onClose={() => setEditingImage(null)}
                    />
                )}
            </div>
        </div>
    );
}
