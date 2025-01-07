import React, { FC } from "react";
import { Button } from "src/components/Button";
import useCartStore from "src/stores/cart-store";
import useProductListStore from "src/stores/product-list-store";

interface Props {
  list_id: number;
  id: number;
  quantity: number;
  minimum_order: number;
}

export const QuantityToggle: FC<Props> = ({
  list_id,
  id,
  quantity,
  minimum_order,
}) => {
  console.log("ListId: ", list_id, "Id: ", id, "Quantity: ", quantity);
  const updateQuantity = useProductListStore((state) => state.updateQuantity);

  const incrementQuantity = () => {
    console.log("TEST: ", list_id, id, quantity);
    updateQuantity(list_id, id, quantity + 1);
  };

  const decrementQuantity = () => {
    updateQuantity(list_id, id, quantity - 1);
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
