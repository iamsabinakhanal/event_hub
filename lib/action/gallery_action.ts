"use server";

import axiosInstance from "@/lib/api/axios";

export const handleGetAllGalleryImages = async () => {
    try {
        // Use the backend API directly with axios
        const response = await axiosInstance.get("api/gallery");
        
        if (response.data?.success) {
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        }
        return {
            success: false,
            message: response.data?.message || "Failed to fetch gallery images"
        };
    } catch (err: Error | any) {
        console.error("Gallery fetch error:", err.message);
        return {
            success: false,
            message: err.message || "Failed to fetch gallery images"
        };
    }
};

export const handleGetGalleryImagesByCategory = async (category: string) => {
    try {
        const response = await axiosInstance.get(`api/gallery/category/${encodeURIComponent(category)}`);
        
        if (response.data?.success) {
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        }
        return {
            success: false,
            message: response.data?.message || "Failed to fetch gallery images"
        };
    } catch (err: Error | any) {
        console.error("Gallery category fetch error:", err.message);
        return {
            success: false,
            message: err.message || "Failed to fetch gallery images"
        };
    }
};

export const handleGetGalleryImageById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`api/gallery/${id}`);
        
        if (response.data?.success) {
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        }
        return {
            success: false,
            message: response.data?.message || "Failed to fetch gallery image"
        };
    } catch (err: Error | any) {
        console.error("Gallery image fetch error:", err.message);
        return {
            success: false,
            message: err.message || "Failed to fetch gallery image"
        };
    }
};
