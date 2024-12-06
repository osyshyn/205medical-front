import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { IProduct, IProductDetails } from "src/@types/products";
import { IProductTable } from "src/@types/table";

interface IProductStore {
  products: IProduct[];
  all_products: IProductTable[];
  product_details: IProductDetails;
  fetchProducts: () => void;
  fetchProductDetails: (id: number) => void;
  isLoadingProducts: boolean;
  isLoadingProductDetail: boolean;
}

const useProductStore = create(
  devtools<IProductStore>((set) => ({
    products: [],
    all_products: [],
    product_details: {} as IProductDetails,
    isLoadingProducts: false,
    fetchProducts: async () => {
      set({ isLoadingProducts: true });
      try {
        const { data } = await instance.get<IProduct[]>("product/getProducts");

        set({ products: data });

        const allProducts = data.map(
          ({
            id,
            preview,
            sku,
            name,
            price,
            minimum_order,
          }): IProductTable => ({
            key: id,
            image: {
              type: "image",
              alt: name,
              ...preview,
            },
            sku,
            name,
            price,
            minimum_order,
          })
        );

        set({
          all_products: allProducts,
        });
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
