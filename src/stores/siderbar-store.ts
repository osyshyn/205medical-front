import { create } from "zustand";

interface SidebarState {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));

export default useSidebarStore;
