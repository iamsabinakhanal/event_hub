//backend api call for bookings only
import axios from "./axios";
import { API } from "./endpoints";
import { CreateBookingDTO, BookingDTO } from "../dtos/booking.dto";

export const createBooking = async (bookingData: CreateBookingDTO) => {
    try {
        console.log("Creating booking with data:", bookingData);
        
        // Transform frontend DTO to backend API format
        const backendData = {
            service_id: bookingData.serviceId,
            event_date: bookingData.eventDate,
            guest_count: bookingData.guestCount,
            special_requests: bookingData.specialRequests || "",
            total_price: bookingData.price,
        };
        
        console.log("Sending to backend:", backendData);
        const response = await axios.post(
            API.BOOKINGS.CREATE,
            backendData
        );
        console.log("Booking creation response:", response.data);
        return response.data;
    } catch (err: Error | any) {
        console.error("Booking creation error:", err.response?.data || err.message);
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to create booking"
        );
    }
};

export const getMyBookings = async () => {
    try {
        const response = await axios.get(API.BOOKINGS.GET_MY_BOOKINGS);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to fetch bookings"
        );
    }
};

export const getBooking = async (id: string) => {
    try {
        const response = await axios.get(API.BOOKINGS.GET_ONE(id));
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to fetch booking"
        );
    }
};

export const updateBooking = async (id: string, bookingData: Partial<CreateBookingDTO>) => {
    try {
        const response = await axios.put(
            API.BOOKINGS.UPDATE(id),
            bookingData
        );
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to update booking"
        );
    }
};

export const cancelBooking = async (id: string) => {
    try {
        const response = await axios.delete(API.BOOKINGS.DELETE(id));
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to cancel booking"
        );
    }
};

export const getAllBookings = async () => {
    try {
        const response = await axios.get(API.BOOKINGS.GET_ALL);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to fetch bookings"
        );
    }
};

export const updateBookingStatus = async (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    try {
        const response = await axios.put(
            API.BOOKINGS.UPDATE_STATUS(id),
            { status }
        );
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message
            || err.message
            || "Failed to update booking status"
        );
    }
};
