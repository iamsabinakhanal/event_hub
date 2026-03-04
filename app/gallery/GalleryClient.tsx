"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import PublicFooter from "@/components/PublicFooter";

interface GalleryImage {
    _id: string;
    id?: string;
    title: string;
    description?: string;
    image_url: string;
    category: string;
    createdAt?: string;
}

interface GalleryClientProps {
    initialImages: GalleryImage[];
}

export default function GalleryClient({ initialImages }: GalleryClientProps) {
    const router = useRouter();
    const [images, setImages] = useState<GalleryImage[]>(initialImages);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [animatingId, setAnimatingId] = useState<string | null>(null);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

    // Resolve image URL to full path
    const resolveImageUrl = (imageUrl?: string) => {
        if (!imageUrl) return "https://via.placeholder.com/400x400?text=No+Image";
        
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

    // Load favorites from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem("gallery_favorites");
        if (savedFavorites) {
            try {
                setFavorites(new Set(JSON.parse(savedFavorites)));
            } catch (e) {
                console.error("Failed to load favorites:", e);
            }
        }
    }, []);

    // Save favorites to localStorage
    useEffect(() => {
        localStorage.setItem("gallery_favorites", JSON.stringify(Array.from(favorites)));
    }, [favorites]);

    const getImageId = (image: GalleryImage | any) => {
        // Handle Mongoose document nesting
        const docImage = image._doc || image;
        const id = docImage._id || docImage.id || image._id || image.id;
        
        if (!id) {
            console.warn("Image has no ID, using title as fallback:", image);
            return String(docImage.title || image.title || Date.now());
        }
        return String(id);
    };

    const getImageProperty = (image: GalleryImage | any, prop: string) => {
        const docImage = image._doc || image;
        return docImage[prop] !== undefined ? docImage[prop] : image[prop];
    };

    // Get unique categories
    const categories = Array.from(new Set(initialImages.map(img => getImageProperty(img, 'category')).filter(Boolean)))
        .sort()
        .map(cat => ({
            name: cat,
            label: cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : "Other"
        }));

    // Filter images based on selected category and favorites
    let filteredImages = images;
    
    if (showFavoritesOnly) {
        filteredImages = filteredImages.filter(img => favorites.has(getImageId(img)));
    }
    
    if (selectedCategory) {
        filteredImages = filteredImages.filter(img => getImageProperty(img, 'category') === selectedCategory);
    }

    const toggleFavorite = (image: GalleryImage) => {
        const imageId = getImageId(image);
        
        // Add animation effect
        setAnimatingId(imageId);
        setTimeout(() => setAnimatingId(null), 600);
        
        console.log("Toggling favorite for image:", imageId, getImageProperty(image, 'title'));
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(imageId)) {
                newFavorites.delete(imageId);
                console.log("Removed from favorites:", imageId);
            } else {
                newFavorites.add(imageId);
                console.log("Added to favorites:", imageId);
            }
            console.log("Total favorites:", newFavorites.size);
            return newFavorites;
        });
    };

    const handleResetFilters = () => {
        setSelectedCategory(null);
        setShowFavoritesOnly(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white py-8 px-6 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                  
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Gallery</h1>
                            <p className="text-gray-600">Explore beautiful moments from our events</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Category & Favorites Filters */}
                <div className="mb-12 flex flex-wrap gap-3 justify-center sm:justify-start">
                    <button
                        onClick={handleResetFilters}
                        className={`px-8 py-3 rounded-full font-semibold transition duration-300 text-lg ${
                            selectedCategory === null && !showFavoritesOnly
                                ? "bg-gray-900 text-white shadow-lg"
                                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => {
                            setShowFavoritesOnly(!showFavoritesOnly);
                            setSelectedCategory(null);
                        }}
                        className={`px-8 py-3 rounded-full font-semibold transition duration-300 text-lg flex items-center gap-2 ${
                            showFavoritesOnly
                                ? "bg-red-500 text-white shadow-lg"
                                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                        }`}
                    >
                        ❤️ Favorites ({favorites.size})
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.name}
                            onClick={() => {
                                setSelectedCategory(category.name);
                                setShowFavoritesOnly(false);
                            }}
                            className={`px-8 py-3 rounded-full font-semibold transition duration-300 text-lg ${
                                selectedCategory === category.name && !showFavoritesOnly
                                    ? "bg-purple-600 text-white shadow-lg"
                                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                {filteredImages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {filteredImages.map((image) => {
                            const imageId = getImageId(image);
                            const isFavorited = favorites.has(imageId);
                            const isAnimating = animatingId === imageId;
                            return (
                            <div
                                key={imageId}
                                className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 h-96"
                            >
                                {/* Image */}
                                <img
                                    src={resolveImageUrl(getImageProperty(image, 'image_url'))}
                                    alt={getImageProperty(image, 'title')}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            "https://via.placeholder.com/400x400?text=Image+Not+Found";
                                    }}
                                />

                                {/* Favorite Button - Floating (Always Visible) */}
                                <button
                                    onClick={() => toggleFavorite(image)}
                                    className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 z-10 transform ${
                                        isAnimating ? "scale-110" : "scale-100"
                                    } ${
                                        isFavorited
                                            ? "bg-red-500 text-white shadow-lg hover:bg-red-600"
                                            : "bg-white/30 text-white hover:bg-white/50"
                                    }`}
                                    title={isFavorited ? "Remove from favorites" : "Add to favorites"}
                                >
                                    <Heart
                                        size={24}
                                        className={`transition-all duration-300 ${
                                            isFavorited ? "fill-current" : ""
                                        }`}
                                    />
                                </button>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100">
                                    {/* Top - Category Badge */}
                                    <div className="flex justify-end">
                                        <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                            {(() => {
                                                const category = getImageProperty(image, 'category');
                                                return category ? category.charAt(0).toUpperCase() + category.slice(1) : "Other";
                                            })()}
                                        </span>
                                    </div>

                                    {/* Bottom - Title and Details */}
                                    <div className="space-y-3">
                                        <h3 className="text-white font-bold text-xl line-clamp-2">
                                            {getImageProperty(image, 'title')}
                                        </h3>
                                        {getImageProperty(image, 'description') && (
                                            <p className="text-gray-200 text-sm line-clamp-2">
                                                {getImageProperty(image, 'description')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-2xl text-gray-600 mb-4">
                            {showFavoritesOnly ? "No favorite photos yet" : "No photos in this category"}
                        </p>
                        <button
                            onClick={handleResetFilters}
                            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
                        >
                            View All Photos
                        </button>
                    </div>
                )}

                {/* Statistics */}
                {filteredImages.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200">
                        <div className="text-center">
                            <p className="text-4xl font-bold text-purple-600">{images.length}</p>
                            <p className="text-gray-600 mt-2 text-lg">Total Photos</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold text-purple-600">{categories.length}</p>
                            <p className="text-gray-600 mt-2 text-lg">Categories</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold text-purple-600">{favorites.size}</p>
                            <p className="text-gray-600 mt-2 text-lg">Favorite Photos</p>
                        </div>
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div className="bg-linear-to-r from-purple-600 to-purple-700 text-white py-16 px-6 mt-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to create your own event?</h2>
                    <p className="text-purple-100 mb-8 text-lg">
                        Book our services and make your event unforgettable
                    </p>
                    <a
                        href="/services"
                        className="inline-block bg-white text-purple-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg"
                    >
                        Browse Services
                    </a>
                </div>
            </div>

            <PublicFooter />
            
        </main>
        </div>
    );
}
