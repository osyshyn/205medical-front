import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { List } from "src/@types/product-list";

interface IListStore {
  list: List;
  fetchList: () => void;
  addProductToList: (productId: number) => void;
  deleteProductInList: (productId: number) => void;
  isLoading: boolean;
}

const useProductListStore = create(
  devtools<IListStore>((set) => ({
    list: null,
    isLoading: false,
    fetchList: async () => {
      set({ isLoading: true });

      try {
        const { data } = await instance.post("list/getList");
        set({ list: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
    addProductToList: async (productId) => {
      try {
        const { data } = await instance.post("list/addProductToList", {
          product_id: productId,
        });
        set({ list: data });
      } catch (error) {
        NotificationService.error();
      } finally {
      }
    },
    deleteProductInList: async (productId) => {
      try {
        await instance.post("list/deleteProductInList", {
          product_id: productId,
        });

        set((state) => ({
          list: {
            ...state.list,
            product_to_lists: state.list.product_to_lists.filter(
              (item) => item.id !== productId
            ),
          },
        }));
      } catch (error) {
        NotificationService.error();
      } finally {
      }
    },
  }))
);

export default useProductListStore;
