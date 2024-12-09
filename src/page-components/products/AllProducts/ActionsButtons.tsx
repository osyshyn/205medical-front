import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import useCartStore from "src/stores/cart-store";
import { getItemPath } from "src/utils/getItemPath";
import { PATHNAMES } from "src/constants/routes";

interface Props {
  id: number;
}

export const ActionsButtons: FC<Props> = ({ id }) => {
  const openCard = useCartStore((state) => state.openCart);
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const onClickAdd = () => {
    addProductToCart(id);
    openCard();
  };

  return (
    <div className="max-w flex justify-center gap-3">
      <Link to={getItemPath(PATHNAMES.PRODUCT_ITEM, { id })}>
        <Button variant={ButtonVariants.SECONDARY_SQUARE}>View</Button>
      </Link>

      <Button onClick={onClickAdd} variant={ButtonVariants.PRIMARY_SQUARE}>
        Add
      </Button>
    </div>
  );
};
