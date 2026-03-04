import axios from "./axios";
import { API } from "./endpoints";

export const getAllGalleryImages = async () => {
    try {
        const response = await axios.get(
            "api/gallery"
        );
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to fetch gallery images"
        );
    }
};

export const getGalleryImageById = async (id: string) => {
    try {
        const response = await axios.get(
            `api/gallery/${id}`
        );
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to fetch gallery image"
        );
    }
};

export const getGalleryImagesByCategory = async (category: string) => {
    try {
        const response = await axios.get(
            `api/gallery/category/${encodeURIComponent(category)}`
        );
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to fetch gallery images by category"
        );
    }
};
