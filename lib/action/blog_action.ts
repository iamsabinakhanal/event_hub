"use server";

import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from "@/lib/api/blog";
import { getAuthToken } from "@/lib/cookies";

export const handleCreateBlog = async (blogData: any) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            return {
                success: false,
                message: "No authentication token found"
            };
        }

        const result = await createBlog(blogData);
        if (result.success) {
            return {
                success: true,
                message: "Blog created successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to create blog"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to create blog"
        };
    }
};

export const handleGetAllBlogs = async () => {
    try {
        const result = await getAllBlogs();
        if (result.success) {
            return {
                success: true,
                data: result.data,
                message: result.message
            };
        }
        return {
            success: false,
            message: result.message || "Failed to fetch blogs"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to fetch blogs"
        };
    }
};

export const handleGetBlogById = async (id: string) => {
    try {
        const result = await getBlogById(id);
        if (result.success) {
            return {
                success: true,
                data: result.data,
                message: result.message
            };
        }
        return {
            success: false,
            message: result.message || "Failed to fetch blog"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to fetch blog"
        };
    }
};

export const handleUpdateBlog = async (id: string, blogData: any) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            return {
                success: false,
                message: "No authentication token found"
            };
        }

        const result = await updateBlog(id, blogData);
        if (result.success) {
            return {
                success: true,
                message: "Blog updated successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to update blog"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to update blog"
        };
    }
};

export const handleDeleteBlog = async (id: string) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            return {
                success: false,
                message: "No authentication token found"
            };
        }

        const result = await deleteBlog(id);
        if (result.success) {
            return {
                success: true,
                message: "Blog deleted successfully"
            };
        }
        return {
            success: false,
            message: result.message || "Failed to delete blog"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to delete blog"
        };
    }
};
