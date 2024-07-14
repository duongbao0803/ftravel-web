export interface TicketTripInfo {
  price: unknown;
  id: number;
  "trip-id": number;
  "seat-code": string;
  status: string;
  "ticket-type-id": number;
  "ticket-type-name": string;
}

export interface TicketTypeInfo {
  id: number;
  name: string;
  price: number;
  "route-id": number;
  "route-name": string;
  "create-date": string | Date;
  "update-date"?: string | Date;
  "is-deleted": boolean;
}

export interface CreateTicketTypeInfo {
  "route-id": number;
  name: string;
  price: number;
}

export interface TicketFormCreate {
  createDate: string;
  id: number;
  isDeleted: boolean;
  price: number;
  seatCode: string;
  status: "AVAILABLE" | "PENDING" | "CANCELLED";
  ticketTypeId: number;
  ticketTypeName: string;
  tripId: number;
  updateDate: string | null;
}

export interface TicketTypeInfo {
  id: number;
  name: string;
  price: number;
  [key: string]: unknown;
}
