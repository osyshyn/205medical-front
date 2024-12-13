import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { ICategory } from "src/@types/categories";

interface ICategoryStore {
  user_products_categories: ICategory[];
  fetchCategories: () => void;
  isLoading: boolean;
}

const useCategoryStore = create(
  devtools<ICategoryStore>((set) => ({
    user_products_categories: null,
    isLoading: false,
    fetchCategories: async () => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get<ICategory[]>(
          "category/userProductsCategory"
        );

        set({ user_products_categories: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useCategoryStore;
