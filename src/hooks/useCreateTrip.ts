import { TicketTypeInfo } from "@/types/ticket.types";
import { CreateTripForm } from "@/types/trip.types";
import { create } from "zustand";

interface CreateTripState {
  listTicketChoose: TicketTypeInfo[] | null;
  setListTicketChoose: (listTicketChoose: TicketTypeInfo[]) => void;
  createTripForm: CreateTripForm;
  setCreateTripForm: (createTripForm: object) => void;
}

const useCreateTrip = create<CreateTripState>((set) => ({
  listTicketChoose: null,
  setListTicketChoose: (listTicketChoose: TicketTypeInfo[]) =>
    set({ listTicketChoose }),

  createTripForm: {},
  setCreateTripForm: (createTripForm) => set({ createTripForm }),
}));
export default useCreateTrip;
