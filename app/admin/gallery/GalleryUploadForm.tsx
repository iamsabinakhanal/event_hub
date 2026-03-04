"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

interface GalleryUploadFormProps {
    onUploadSuccess: () => void;
}

export default function GalleryUploadForm({ onUploadSuccess }: GalleryUploadFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "birthday",
        image: null as File | null,
    });
    const [preview, setPreview] = useState("");

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

        if (!formData.image) {
            setError("Please select an image");
            return;
        }

        if (!formData.category) {
            setError("Please select a category");
            return;
        }

        setIsLoading(true);

        try {
            const uploadFormData = new FormData();
            uploadFormData.append("title", formData.title);
            uploadFormData.append("description", formData.description || "");
            uploadFormData.append("category", formData.category);
            uploadFormData.append("image", formData.image);

            console.log("Uploading with:", {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                imageSize: formData.image?.size,
                imageName: formData.image?.name,
            });

            const response = await fetch("/api/gallery", {
                method: "POST",
                body: uploadFormData,
            });

            const result = await response.json();

            console.log("Upload response:", { status: response.status, result });

            if (!response.ok) {
                throw new Error(result.message || `Upload failed with status ${response.status}`);
            }

            if (!result.success) {
                throw new Error(result.message || "Upload failed");
            }

            // Reset form
            setFormData({
                title: "",
                description: "",
                category: "birthday",
                image: null,
            });
            setPreview("");
            
            // Show success message
            alert("Photo uploaded successfully!");
            
            setIsOpen(false);
            onUploadSuccess();
        } catch (err: any) {
            const errorMessage = err.message || "Failed to upload image";
            console.error("Upload error:", errorMessage);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
            >
                <Upload size={20} />
                Add Photo
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Upload Gallery Photo</h2>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setError("");
                                    setPreview("");
                                    setFormData({ title: "", description: "", category: "birthday", image: null });
                                }}
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
                            {preview && (
                                <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreview("");
                                            setFormData(prev => ({ ...prev, image: null }));
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}

                            {/* Image Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image *
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setError("");
                                        setPreview("");
                                        setFormData({ title: "", description: "", category: "birthday", image: null });
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "Uploading..." : "Upload"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
