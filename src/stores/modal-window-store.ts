import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IModalWindowStore {
  isOpenProductItem: boolean;
  productId: number | null;
  openProductItem: (productId: number) => void;
  closeProductItem: VoidFunction;
}

const useModalWindowStore = create(
  devtools<IModalWindowStore>((set) => ({
    isOpenProductItem: false,
    productId: null,
    openProductItem: (productId) => {
      set({ productId });
      set({ isOpenProductItem: true });
    },
    closeProductItem: () => {
      set({ productId: null });
      set({ isOpenProductItem: false });
    },
  }))
);

export default useModalWindowStore;
