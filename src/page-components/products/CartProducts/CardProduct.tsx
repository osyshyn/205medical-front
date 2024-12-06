import React, { FC } from "react";
import { Button } from "src/components/Button";
import { CloseButton } from "src/components/ModalWindow/CloseButton";
import useCartStore from "src/stores/cart-store";
import { ProductToCart } from "src/@types/cart";

export const CardProduct: FC<ProductToCart> = ({
  id,
  name,
  preview,
  price,
  minimum_order,
  quantity,
}) => {
  const updataQuantity = useCartStore((state) => state.updataQuantity);
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

  const incrementQuantity = () => {
    updataQuantity(id, quantity + 1);
  };

  const decrementQuantity = () => {
    updataQuantity(id, quantity - 1);
  };

  const removeProduct = () => {
    removeProductFromCart(id);
  };

  const isDecrementBtnDisable = quantity === minimum_order;

  return (
    <div className="flex h-32 justify-between border-t py-6 last:border-b">
      <div className="flex gap-5">
        <div className="h-10 w-10">
          {preview && (
            <img
              className="h-full w-full rounded-md border border-purple-lighter"
              src={preview.path}
              alt={name}
            />
          )}
        </div>

        <div className="flex flex-col justify-between">
          <p className="font-semibold">{name}</p>

          <div className="flex items-center gap-4 rounded-xl border border-gray-soft bg-white-base px-3.5 py-2 text-xs">
            <span className="text-gray-medium">Quantity:</span>
            <div className="flex gap-2 font-semibold text-black-ligth">
              <Button
                className="h-5 w-5 rounded-xl border border-gray-soft bg-white-base"
                type="button"
                onClick={incrementQuantity}
              >
                +
              </Button>

              <span>{quantity}</span>

              <Button
                className="h-5 w-5 rounded-xl border border-gray-soft bg-white-base"
                type="button"
                onClick={decrementQuantity}
                isDisabled={isDecrementBtnDisable}
              >
                -
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <CloseButton onClose={removeProduct} />
        <p className="text-22 font-medium">&#36;{price}</p>
      </div>
    </div>
  );
};
