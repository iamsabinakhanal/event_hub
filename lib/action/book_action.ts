"use server";

import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from "@/lib/api/book";
import { getAuthToken } from "@/lib/cookies";

export const handleCreateBook = async (bookData: any) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            return {
                success: false,
                message: "No authentication token found"
            };
        }

        const result = await createBook(bookData);
        if (result.success) {
            return {
                success: true,
                message: "Book created successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to create book"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to create book"
        };
    }
};

export const handleGetAllBooks = async () => {
    try {
        const result = await getAllBooks();
        if (result.success) {
            return {
                success: true,
                data: result.data,
                message: result.message
            };
        }
        return {
            success: false,
            message: result.message || "Failed to fetch books"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to fetch books"
        };
    }
};

export const handleGetBookById = async (id: string) => {
    try {
        const result = await getBookById(id);
        if (result.success) {
            return {
                success: true,
                data: result.data,
                message: result.message
            };
        }
        return {
            success: false,
            message: result.message || "Failed to fetch book"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to fetch book"
        };
    }
};

export const handleUpdateBook = async (id: string, bookData: any) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            return {
                success: false,
                message: "No authentication token found"
            };
        }

        const result = await updateBook(id, bookData);
        if (result.success) {
            return {
                success: true,
                message: "Book updated successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to update book"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to update book"
        };
    }
};

export const handleDeleteBook = async (id: string) => {
    try {
        const token = await getAuthToken();
        if (!token) {
            return {
                success: false,
                message: "No authentication token found"
            };
        }

        const result = await deleteBook(id);
        if (result.success) {
            return {
                success: true,
                message: "Book deleted successfully"
            };
        }
        return {
            success: false,
            message: result.message || "Failed to delete book"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to delete book"
        };
    }
};
