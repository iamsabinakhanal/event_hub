//backend api call for services
import axios from "./axios";
import { API } from "./endpoints";
import { Service } from "../types/booking.type";

export const getAllServices = async () => {
  try {
    console.log('📞 Calling getAllServices with endpoint:', API.SERVICES.GET_ALL);
    const response = await axios.get(API.SERVICES.GET_ALL);
    console.log('✅ getAllServices response:', response.data);
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to fetch services"
    );
  }
};

export const getServiceById = async (id: string) => {
  try {
    const response = await axios.get(API.SERVICES.GET_ONE(id));
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to fetch service"
    );
  }
};

export const createService = async (formData: FormData) => {
  try {
    const response = await axios.post(API.SERVICES.CREATE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to create service"
    );
  }
};

export const updateService = async (id: string, formData: FormData) => {
  try {
    const response = await axios.put(API.SERVICES.UPDATE(id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to update service"
    );
  }
};

export const deleteService = async (id: string) => {
  try {
    const response = await axios.delete(API.SERVICES.DELETE(id));
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to delete service"
    );
  }
};

export const getServicesByCategory = async (category: string) => {
  try {
    const response = await axios.get(API.SERVICES.GET_BY_CATEGORY(category));
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to fetch services by category"
    );
  }
};

export const searchServices = async (params: {
  q: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
}) => {
  try {
    const response = await axios.get(API.SERVICES.SEARCH, { params });
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to search services"
    );
  }
};

export const getServiceBookings = async (id: string) => {
  try {
    const response = await axios.get(API.SERVICES.GET_BOOKINGS(id));
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to fetch service bookings"
    );
  }
};
