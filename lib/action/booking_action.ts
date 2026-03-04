"use server";

import { createBooking, getMyBookings, getBooking, updateBooking, cancelBooking } from "../api/booking";
import { CreateBookingDTO } from "../dtos/booking.dto";

export const handleCreateBooking = async (bookingData: CreateBookingDTO) => {
    try {
        console.log("Server action: Creating booking with data:", bookingData);
        const result = await createBooking(bookingData);
        console.log("Booking creation result:", result);
        
        if (result.success) {
            return {
                success: true,
                message: "Booking created successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to create booking"
        };
    } catch (err: Error | any) {
        console.error("Booking creation error:", err);
        return {
            success: false,
            message: err.message || "Failed to create booking"
        };
    }
};

export const handleGetMyBookings = async () => {
    try {
        const result = await getMyBookings();
        if (result.success) {
            return {
                success: true,
                message: "Bookings fetched successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to fetch bookings"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to fetch bookings"
        };
    }
};

export const handleGetBooking = async (id: string) => {
    try {
        const result = await getBooking(id);
        if (result.success) {
            return {
                success: true,
                message: "Booking fetched successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to fetch booking"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to fetch booking"
        };
    }
};

export const handleUpdateBooking = async (id: string, bookingData: Partial<CreateBookingDTO>) => {
    try {
        const result = await updateBooking(id, bookingData);
        if (result.success) {
            return {
                success: true,
                message: "Booking updated successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to update booking"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to update booking"
        };
    }
};

export const handleCancelBooking = async (id: string) => {
    try {
        const result = await cancelBooking(id);
        if (result.success) {
            return {
                success: true,
                message: "Booking cancelled successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to cancel booking"
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Failed to cancel booking"
        };
    }
};
