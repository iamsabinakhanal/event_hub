"use client";

import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";

interface GalleryImage {
    _id?: string;
    id?: string;
    title: string;
    description?: string;
    image_url: string;
    category: string;
}

interface GalleryEditFormProps {
    image: GalleryImage;
    onEditSuccess: () => void;
    onClose: () => void;
}

export default function GalleryEditForm({ image, onEditSuccess, onClose }: GalleryEditFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: image.title || "",
        description: image.description || "",
        category: image.category || "birthday",
        image: null as File | null,
    });
    const [preview, setPreview] = useState(image.image_url || "");

    const categories = [
        "birthday",
        "wedding",
        "engagement",
        "pasani",
        "sangeet",
        "reception",
        "anniversary",
        "corporate",
        "festival",
        "concert",
        "graduation",
        "baby-shower",
        "housewarming",
        "networking",
        "other"
    ];

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

    const resolveImageUrl = (imageUrl?: string) => {
        if (!imageUrl) return "";
        if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
            return imageUrl;
        }
        if (imageUrl.startsWith("/")) {
            return `${apiBaseUrl}${imageUrl}`;
        }
        return `${apiBaseUrl}/uploads/${imageUrl}`;
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
            setError("");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!formData.title.trim()) {
            setError("Title is required");
            return;
        }

        if (!formData.category) {
            setError("Please select a category");
            return;
        }

        setIsLoading(true);

        try {
            const updateFormData = new FormData();
            updateFormData.append("title", formData.title);
            updateFormData.append("description", formData.description || "");
            updateFormData.append("category", formData.category);
            
            // Only append image if a new one was selected
            if (formData.image) {
                updateFormData.append("image", formData.image);
            }

            console.log("Updating image:", {
                id: image._id || image.id,
                title: formData.title,
                category: formData.category,
                hasNewImage: !!formData.image,
            });

            const response = await fetch(`/api/gallery/${image._id || image.id}`, {
                method: "PUT",
                body: updateFormData,
            });

            const result = await response.json();

            console.log("Update response:", { status: response.status, result });

            if (!response.ok) {
                throw new Error(result.message || `Update failed with status ${response.status}`);
            }

            if (!result.success) {
                throw new Error(result.message || "Update failed");
            }

            alert("Photo updated successfully!");
            onEditSuccess();
            onClose();
        } catch (err: any) {
            const errorMessage = err.message || "Failed to update image";
            console.error("Update error:", errorMessage);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Edit Gallery Photo</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Image Preview */}
                    <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={preview.startsWith("blob:") ? preview : resolveImageUrl(preview)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x400?text=Image";
                            }}
                        />
                        {formData.image && (
                            <button
                                type="button"
                                onClick={() => {
                                    setPreview(resolveImageUrl(image.image_url));
                                    setFormData(prev => ({ ...prev, image: null }));
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Image Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Change Image (Optional)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none p-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG or WebP. Max size 5MB</p>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g., Summer Festival 2025"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category *
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Add a description..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
