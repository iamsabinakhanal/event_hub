export interface CreateBookingDTO {
  serviceId: string;
  serviceName: string;
  email: string;
  fullName: string;
  phone: string;
  eventDate: string;
  guestCount: number;
  specialRequests?: string;
  price: number;
}

export interface BookingDTO extends CreateBookingDTO {
  id: string;
  userId?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}
