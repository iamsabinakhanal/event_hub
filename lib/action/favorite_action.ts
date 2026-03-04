"use server";

import axiosInstance from "@/lib/api/axios";

export const handleGetAllFavorites = async () => {
    try {
        const response = await axiosInstance.get("api/favorites");
        
        if (response.data?.success) {
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        }
        return {
            success: false,
            message: response.data?.message || "Failed to fetch favorites"
        };
    } catch (err: Error | any) {
        console.error("Favorites fetch error:", err.message);
        return {
            success: false,
            message: err.message || "Failed to fetch favorites"
        };
    }
};

export const handleDeleteFavorite = async (favoriteId: string) => {
    try {
        const response = await axiosInstance.delete(`api/favorites/${favoriteId}`);
        
        if (response.data?.success) {
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        }
        return {
            success: false,
            message: response.data?.message || "Failed to delete favorite"
        };
    } catch (err: Error | any) {
        console.error("Favorite delete error:", err.message);
        return {
            success: false,
            message: err.message || "Failed to delete favorite"
        };
    }
};

export const handleGetUserFavorites = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`api/favorites?user_id=${userId}`);
        
        if (response.data?.success) {
            return {
                success: true,
                data: response.data.data,
                message: response.data.message
            };
        }
        return {
            success: false,
            message: response.data?.message || "Failed to fetch user favorites"
        };
    } catch (err: Error | any) {
        console.error("User favorites fetch error:", err.message);
        return {
            success: false,
            message: err.message || "Failed to fetch user favorites"
        };
    }
};
