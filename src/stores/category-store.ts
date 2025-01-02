import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { ICategory } from "src/@types/categories";

interface ICategoryStore {
  user_products_categories: ICategory[] | null;
  fetchCategories: () => Promise<void>;
  categories: ICategory[] | null;
  fetchAllcategories: () => Promise<void>;
  isLoading: boolean;
  categorieDetail: ICategory | null;
  fetchCategoryDetail: (id: number) => Promise<void>;
  isCategoriesUpdated: boolean;
  createCategory: (name: string, products_id: number[]) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  updateCategory: (
    id: number,
    name: string,
    products_id: number[]
  ) => Promise<void>;
}

const useCategoryStore = create(
  devtools<ICategoryStore>((set) => ({
    user_products_categories: null,
    isLoading: false,
    isCategoriesUpdated: false,
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
    categories: null,
    fetchAllcategories: async () => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get<ICategory[]>(
          "category/getCategories"
        );
        set({ categories: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
    categorieDetail: null,
    fetchCategoryDetail: async (id: number) => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get<ICategory>(
          "category/getCategoryDetail",
          { params: { id } }
        );
        set({ categorieDetail: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
    createCategory: async (name: string, products_id: number[]) => {
      set({ isLoading: true });
      try {
        await instance.post("category/create", {
          name,
          products_id,
        });

        await useCategoryStore.getState().fetchCategories();
        set({ isCategoriesUpdated: true });
        NotificationService.success("Category created successfully");
      } catch (error) {
        NotificationService.error("Failed to create category");
      } finally {
        set({ isLoading: false });
      }
    },
    deleteCategory: async (id: number) => {
      set({ isLoading: true });
      try {
        await instance.post("category/deleteCategory", { id });

        await useCategoryStore.getState().fetchCategories();
        set({ isCategoriesUpdated: true });
        NotificationService.success("Category deleted successfully");
      } catch (error) {
        NotificationService.error("Failed to delete category");
        console.error("Error deleting category:", error);
      } finally {
        set({ isLoading: false });
      }
    },
    updateCategory: async (id: number, name: string, products_id: number[]) => {
      set({ isLoading: true });
      try {
        await instance.post("category/update", {
          id,
          name,
          products_id,
        });

        await useCategoryStore.getState().fetchCategories();
        set({ isCategoriesUpdated: true });
        NotificationService.success("Category updated successfully");
      } catch (error) {
        NotificationService.error("Failed to update category");
        console.error("Error updating category:", error);
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useCategoryStore;
