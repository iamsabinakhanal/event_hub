import axiosInstance from "./axios";

export interface Favorite {
    _id: string;
    user_id: string;
    service_id: string;
    createdAt: string;
    updatedAt: string;
}

// Get all user favorites
export const getUserFavorites = async () => {
    try {
        const response = await axiosInstance.get("api/favorites");
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message ||
            err.message ||
            "Failed to fetch favorites"
        );
    }
};

// Add a service to favorites
export const addFavorite = async (service_id: string) => {
    try {
        const response = await axiosInstance.post("api/favorites", {
            service_id,
        });
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message ||
            err.message ||
            "Failed to add favorite"
        );
    }
};

// Remove a favorite
export const removeFavorite = async (favorite_id: string) => {
    try {
        const response = await axiosInstance.delete(`api/favorites/${favorite_id}`);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message ||
            err.message ||
            "Failed to remove favorite"
        );
    }
};

// Get a specific favorite by ID
export const getFavoriteById = async (favorite_id: string) => {
    try {
        const response = await axiosInstance.get(`api/favorites/${favorite_id}`);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message ||
            err.message ||
            "Failed to fetch favorite"
        );
    }
};
