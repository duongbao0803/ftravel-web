import { TicketTypeInfo } from "@/types/ticket.types";
import { create } from "zustand";

interface CreateTripState {
  listTicketChoose: TicketTypeInfo[] | null;
  setListTicketChoose: (listTicketChoose: TicketTypeInfo[]) => void;
}

const useCreateTrip = create<CreateTripState>((set) => ({
    listTicketChoose:  null,
    setListTicketChoose: (listTicketChoose: TicketTypeInfo[]) => set({listTicketChoose})
  }));
  
  export default useCreateTrip;