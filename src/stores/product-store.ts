import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { IProduct, IProductDetails } from "src/@types/products";

interface FetchOrdersParams {
  category_ids: string[];
}

interface IProductStore {
  products: IProduct[];
  product_details: IProductDetails;
  fetchProducts: (params?: FetchOrdersParams) => void;
  fetchProductDetails: (id: number) => void;
  isLoadingProducts: boolean;
  isLoadingProductDetail: boolean;
}

const useProductStore = create(
  devtools<IProductStore>((set) => ({
    products: [],
    product_details: {} as IProductDetails,
    isLoadingProducts: false,
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
    isLoadingProductDetail: false,
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
  }))
);

export default useProductStore;
