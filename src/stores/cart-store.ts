import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { Cart, ICartProduct, ProductToCart } from "src/@types/cart";

export interface CreateOrderParams {
  location_id: string | number;
  poNumber: string;
  type: number;
  product_to_carts: ProductToCart[];
  onSuccess: () => void;
}

interface CartState {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cart: Cart;
  cart_products: ICartProduct[];
  isLoading: boolean;
  isLoadingCartProduct: boolean;
  fetchCart: () => void;
  fetchCartProduct: () => void;
  addProductToCart: (productId: number) => void;
  removeProductFromCart: (productId: number) => void;
  updataQuantity: (productId: number, quantity: number) => void;
  createOrder: (values: CreateOrderParams) => void;
}

const useCartStore = create(
  devtools<CartState>((set, get) => ({
    isCartOpen: false,
    openCart: () => set({ isCartOpen: true }),
    closeCart: () => set({ isCartOpen: false }),
    cart: null,
    cart_products: [],
    isLoading: false,
    isLoadingCartProduct: false,
    fetchCart: async () => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get<Cart>("cart");
        set({ cart: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
    fetchCartProduct: async () => {
      set({ isLoadingCartProduct: true });
      try {
        const { data } = await instance.get<ICartProduct[]>(
          "cart/getCartProduct"
        );

        set({
          cart_products: data.map((product) => ({
            ...product,
            total: +(product.quantity * product.price).toFixed(2),
          })),
        });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoadingCartProduct: false });
      }
    },
    addProductToCart: async (productId) => {
      try {
        const { data } = await instance.post<Cart>("cart/addProductToCart", {
          product_id: productId,
        });
        set({ cart: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
    removeProductFromCart: async (productId) => {
      try {
        await instance.post<Cart>("cart/deleteProductInCart", {
          product_id: productId,
        });
        set((state) => ({
          cart: {
            ...state.cart,
            product_to_carts: state.cart.product_to_carts.filter(
              (item) => item.id !== productId
            ),
          },
        }));

        set((state) => ({
          cart_products: state.cart_products.filter(
            (product) => product.id !== productId
          ),
        }));
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
    updataQuantity: async (id, quantity) => {
      try {
        const { data } = await instance.post<Cart>("cart/updateProductInCart", {
          id,
          quantity,
        });

        set({ cart: data });

        set((state) => ({
          cart_products: state.cart_products.map((product) =>
            product.id === id
              ? {
                  ...product,
                  quantity,
                  total: +(quantity * product.price).toFixed(2),
                }
              : product
          ),
        }));
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
    createOrder: async ({
      location_id,
      poNumber,
      product_to_carts,
      onSuccess,
    }) => {
      try {
        await instance.post("order/create", {
          order_number: poNumber,
          location_id,
          type: 2,
          order_products: product_to_carts.map(({ id, quantity }) => ({
            id,
            quantity,
          })),
        });
        NotificationService.success();
        onSuccess();
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useCartStore;
