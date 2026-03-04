"use server";

import axios from "@/lib/api/axios";
import { getAuthToken } from "@/lib/cookies";

// Get all contacts (Admin only)
export const getAllContacts = async () => {
    try {
        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.get("/api/contact", {
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
        console.error("[getAllContacts] error:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch contacts",
        };
    }
};

// Get contact by ID (Authenticated)
export const getContactById = async (id: string) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.get(`/api/contact/${id}`, {
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
        console.error("[getContactById] error:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch contact",
        };
    }
};

// Reply to contact (Admin only)
export const replyToContact = async (id: string, replyMessage: string) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.post(
            `/api/contact/${id}/reply`,
            { reply_message: replyMessage },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return {
            success: true,
            data: response.data.data,
            message: response.data.message,
        };
    } catch (error: any) {
        console.error("[replyToContact] error:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to send reply",
        };
    }
};

// Delete contact (Admin only)
export const deleteContact = async (id: string) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.delete(`/api/contact/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            message: response.data.message || "Contact deleted successfully",
        };
    } catch (error: any) {
        console.error("[deleteContact] error:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to delete contact",
        };
    }
};
