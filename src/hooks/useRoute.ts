import { RouteStore } from "@/types/route.types";
import { create } from "zustand";

const useRoute = create<RouteStore>((set) => ({
  startName: "",
  endName: "",
  routeName: "",
  setStartName: (startName: string) => set({ startName }),
  setEndName: (endName: string) => set({ endName }),
  setRouteName: (routeName: string) => set({ routeName }),
}));

export default useRoute;
