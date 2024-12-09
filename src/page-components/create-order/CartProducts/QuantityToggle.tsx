import React, { FC } from "react";
import { Button } from "src/components/Button";
import useCartStore from "src/stores/cart-store";

interface Props {
  id: number;
  quantity: number;
  minimum_order: number;
}

export const QuantityToggle: FC<Props> = ({ id, quantity, minimum_order }) => {
  const updataQuantity = useCartStore((state) => state.updataQuantity);

  const incrementQuantity = () => {
    updataQuantity(id, quantity + 1);
  };

  const decrementQuantity = () => {
    updataQuantity(id, quantity - 1);
  };

  const isDecrementBtnDisabled = quantity === minimum_order;

  return (
    <div className="mx-auto flex w-max items-center justify-center gap-4 rounded-xl border border-gray-soft bg-white-base px-3.5 py-2 text-xs">
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
          isDisabled={isDecrementBtnDisabled}
        >
          -
        </Button>
      </div>
    </div>
  );
};
