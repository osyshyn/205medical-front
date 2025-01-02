import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { IProduct, IProductDetails } from "src/@types/products";

interface FetchOrdersParams {
  category_ids: string[];
}

interface FetchProductPurchases {
  month: string;
  year: string;
  location_ids: string[];
  page?: number;
}

interface IProductStore {
  products: IProduct[];
  product_details: IProductDetails;
  fetchProducts: (params?: FetchOrdersParams) => void;
  fetchProductDetails: (id: number) => void;
  purchasesByProductList: IProductDetails[];
  fetchPurchasesByProductList: (params: FetchProductPurchases) => void;
  isLoadingProducts: boolean;
  isLoadingProductDetail: boolean;
  deleteProduct: (id: number) => Promise<void>;
}

const useProductStore = create(
  devtools<IProductStore>((set) => ({
    products: [],
    product_details: {} as IProductDetails,
    isLoadingProducts: false,
    isLoadingProductDetail: false,
    fetchProducts: async (params) => {
      set({ isLoadingProducts: true });

      try {
        const { data } = await instance.get<IProduct[]>("product/getProducts", {
          params,
        });

        set({ products: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoadingProducts: false });
      }
    },
    fetchProductDetails: async (id) => {
      set({ isLoadingProductDetail: true });
      try {
        const { data } = await instance.get<IProductDetails>(
          `product/getProduct/${id}`
        );

        set({ product_details: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoadingProductDetail: false });
      }
    },

    purchasesByProductList: [],
    fetchPurchasesByProductList: async (params) => {
      try {
        const { data } = await instance.get<IProductDetails[]>(
          `product/purchasesByProductsList`,
          { params }
        );

        set({ purchasesByProductList: data });
      } catch (error) {
        NotificationService.error();
      }
    },

    deleteProduct: async (id: number) => {
      try {
        await instance.post("product/deleteProduct", { id });
        NotificationService.success("Product deleted successfully");
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
      } catch (error) {
        NotificationService.error();
      }
    },
    deleteCategory: async (id: number) => {
      try {
        await instance.post("category/deleteCategory", { id });
        NotificationService.success("Category deleted successfully");
      } catch (error) {
        NotificationService.error();
      }
    },
  }))
);

export default useProductStore;
