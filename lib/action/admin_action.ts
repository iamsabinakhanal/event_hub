"use server";

import axios from "@/lib/api/axios";
import { getAuthToken } from "@/lib/cookies";

// Get all users (Admin only)
export const getAllUsers = async () => {
    try {
        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.get("/api/admin/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            data: response.data.data,
            message: response.data.message,
        };
    } catch (error: any) {
        console.error("[getAllUsers] error:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch users",
        };
    }
};

// Get user by ID (Admin only)
export const getUserById = async (id: string) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.get(`/api/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            data: response.data.data,
            message: response.data.message,
        };
    } catch (error: any) {
        console.error("[getUserById] error:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch user",
        };
    }
};

// Create user (Admin only)
export const createUserAdmin = async (formData: FormData) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.post("/api/admin/users", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return {
            success: true,
            data: response.data.data,
            message: response.data.message,
        };
    } catch (error: any) {
        console.error("[createUserAdmin] error:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to create user",
        };
    }
};

// Update user (Admin only)
export const updateUserAdmin = async (id: string, formData: FormData) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.put(`/api/admin/users/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return {
            success: true,
            data: response.data.data,
            message: response.data.message,
        };
    } catch (error: any) {
        console.error("[updateUserAdmin] error:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to update user",
        };
    }
};

// Delete user (Admin only)
export const deleteUserAdmin = async (id: string) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.delete(`/api/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            message: response.data.message,
        };
    } catch (error: any) {
        console.error("[deleteUserAdmin] error:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to delete user",
        };
    }
};

// Update user profile (authenticated user)
export const updateProfile = async (id: string, formData: FormData) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.put(`/api/auth/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return {
            success: true,
            data: response.data.data,
            message: response.data.message,
        };
    } catch (error: any) {
        console.error("[updateProfile] error:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to update profile",
        };
    }
};
