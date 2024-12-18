import React, { FC } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import useCartStore from "src/stores/cart-store";
import useModalWindowStore from "src/stores/modal-window-store";

interface Props {
  id: number;
}

export const ActionsButtons: FC<Props> = ({ id }) => {
  const openProduct = useModalWindowStore((state) => state.openProductItem);

  const openCard = useCartStore((state) => state.openCart);
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const onView = () => {
    openProduct(id);
  };

  const onClickAdd = () => {
    addProductToCart(id);
    openCard();
  };

  return (
    <div className="max-w flex justify-center gap-3">
      <Button onClick={onView} variant={ButtonVariants.SECONDARY_SQUARE}>
        View
      </Button>

      <Button onClick={onClickAdd} variant={ButtonVariants.PRIMARY_SQUARE}>
        Add
      </Button>
    </div>
  );
};
