export interface Booking {
  id: string;
  userId?: string;
  serviceId: string;
  serviceName: string;
  email: string;
  fullName: string;
  phone: string;
  eventDate: string;
  guestCount: number;
  specialRequests?: string;
  price: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data?: Booking;
}

export interface BookingsListResponse {
  success: boolean;
  message: string;
  data?: Booking[];
}

export interface Service {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  duration?: number;
  features?: string[];
  icon?: string;
  image_url?: string;
  createdAt?: string;
  updatedAt?: string;
}
