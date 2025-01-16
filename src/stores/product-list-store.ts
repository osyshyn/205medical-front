import { da } from "date-fns/locale";
import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { List } from "src/@types/product-list";

interface IListStore {
  list: List;
  allListId: List[];
  activeList: List[];
  fetchAllList: () => void;
  saveList: (list_id: number) => void;
  fetchList: () => void;
  activateList: (list_id: number) => void;
  addProductToList: (productId: number) => void;
  deleteProductInList: (productId: number) => void;
  updateQuantity: (listId: number, productId: number, quantity: number) => void;
  isLoading: boolean;
}

const useProductListStore = create(
  devtools<IListStore>((set) => ({
    list: { id: 0, name: "", product_to_lists: [] },
    allListId: [],
    activeList: [],
    isLoading: false,
    fetchAllList: async () => {
      try {
        const { data } = await instance.get("list");
        set({ allListId: data });
      } catch (error) {
        NotificationService.error("Failed to fetch all lists.");
      }
    },

    saveList: async (list_id: number) => {
      try {
        await instance.post("list/saveList", { list_id });
        NotificationService.success("List saved successfully.");
      } catch (error) {
        NotificationService.error("Failed to save list.");
      }
    },

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
        throw error;
      }
    },
    activateList: async (list_id: number) => {
      try {
        const { data } = await instance.post("list/activateList", { list_id });
        set({ activeList: data });
      } catch (error) {
        NotificationService.error();
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
    updateQuantity: async (listId, productId, quantity) => {
      try {
        console.log(
          "listId",
          listId,
          "productId",
          productId,
          "quantity",
          quantity
        );
        const { data } = await instance.post("list/updateProductInList", {
          listId: listId,
          id: productId,
          quantity,
        });
        set({ list: data });
      } catch (error) {
        NotificationService.error();
      } finally {
      }
    },
  }))
);

export default useProductListStore;
