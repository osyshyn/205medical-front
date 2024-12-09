import React, { FC } from "react";
import { Button } from "src/components/Button";
import useCartStore from "src/stores/cart-store";
import { ReactComponent as CloseIcon } from "src/assets/icons/close.svg";

interface Props {
  id: number;
}

export const DeleteButton: FC<Props> = ({ id }) => {
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

  const removeProduct = () => {
    removeProductFromCart(id);
  };

  return (
    <Button>
      <CloseIcon onClick={removeProduct} />
    </Button>
  );
};
