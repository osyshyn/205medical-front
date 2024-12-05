import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { Cart } from "src/@types/cart";

interface AddProductToCartParams {
  id: number;
  price: number;
  name: string;
  image: string;
}

interface CartState {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cart: Cart;
  isLoading: boolean;
  fetchCart: () => void;
  addProductToCart: (params: AddProductToCartParams) => void;
  removeProductFromCart: (productId: number) => void;
}

const useCartStore = create(
  devtools<CartState>((set) => ({
    isCartOpen: false,
    openCart: () => set({ isCartOpen: true }),
    closeCart: () => set({ isCartOpen: false }),
    cart: {} as Cart,
    isLoading: false,

    fetchCart: async () => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get<Cart>("cart");

        console.log("fetchCart", data);

        set({ cart: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },

    addProductToCart: ({ id, name, price, image }) =>
      set((state) => {
        //temp
        if (!state.cart) {
          return;
        }

        const existingProduct = state.cart.product_to_carts.find(
          (item) => item.product.id === id
        );

        const updatedCart = {
          ...state.cart,
          product_to_carts: existingProduct
            ? state.cart.product_to_carts.map((item) =>
                item.product.id === id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            : [
                ...state.cart.product_to_carts,
                {
                  id: Date.now(),
                  quantity: 1,
                  product: {
                    id,
                    name,
                    image,
                    price,
                  },
                },
              ],
        };

        return { cart: updatedCart };
      }),

    removeProductFromCart: (productId) =>
      set((state) => {
        const updatedCart = {
          ...state.cart,
          product_to_carts: state.cart.product_to_carts.filter(
            (item) => item.product.id !== productId
          ),
        };

        return { cart: updatedCart };
      }),
  }))
);

export default useCartStore;
