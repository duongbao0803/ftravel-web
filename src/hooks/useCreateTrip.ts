import { TicketTypeInfo } from "@/types/ticket.types";
import { create } from "zustand";

interface CreateTripState {
  listTicketChoose: TicketTypeInfo[] | null;
  setListTicketChoose: (listTicketChoose: TicketTypeInfo[]) => void;
  createTripForm: object;
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
