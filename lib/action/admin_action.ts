"use server";

import axios from "@/lib/api/axios";
import { getAuthToken } from "@/lib/cookies";

// Validate MongoDB ObjectId format
const isValidObjectId = (id: string): boolean => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};

// Validate that ID is not a reserved route name
const isReservedRouteName = (id: string): boolean => {
    const reserved = ["create", "edit", "delete", "users", "admin", "undefined", "null"];
    return reserved.includes(id.toLowerCase());
};

// Get all users (Admin only)
export const getAllUsers = async () => {
    try {
        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.get("/api/admin", {
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
        // Validate ID format
        if (!id || isReservedRouteName(id)) {
            return {
                success: false,
                message: "Invalid user ID format",
            };
        }

        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.get(`/api/admin/${id}`, {
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

        const response = await axios.post("/api/admin", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return {
            success: true,
            data: response.data.data,
            message: response.data.message || "User created successfully",
        };
    } catch (error: any) {
        console.error("[createUserAdmin] error:", error);
        console.error("[createUserAdmin] error response:", error.response?.data);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Failed to create user",
        };
    }
};

// Update user (Admin only)
export const updateUserAdmin = async (id: string, formData: FormData) => {
    try {
        // Validate ID format
        if (!id || isReservedRouteName(id)) {
            return {
                success: false,
                message: "Invalid user ID format",
            };
        }

        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.put(`/api/admin/${id}`, formData, {
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
        // Validate ID format
        if (!id || isReservedRouteName(id)) {
            return {
                success: false,
                message: "Invalid user ID format",
            };
        }

        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.delete(`/api/admin/${id}`, {
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
        // Validate ID format
        if (!id || isReservedRouteName(id)) {
            return {
                success: false,
                message: "Invalid user ID format",
            };
        }

        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.put(`/api/auth/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                // Don't set Content-Type when sending FormData - let axios/browser handle it
            },
        });

        return {
            success: true,
            data: response.data.data,
            message: response.data.message,
        };
    } catch (error: any) {
        console.error("[updateProfile] error:", error);
        console.error("[updateProfile] error response:", error.response?.data);
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Failed to update profile",
        };
    }
};
