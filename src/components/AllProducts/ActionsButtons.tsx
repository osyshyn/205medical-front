import React, { FC } from "react";
import { Link } from "react-router-dom";
import useCartStore from "src/stores/cart-store";
import { getItemPath } from "src/utils/getItemPath";
import { PATHNAMES } from "src/constants/routes";
import { IProduct } from "src/@types/products";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";

export const ActionsButtons: FC<IProduct> = ({
  id,
  name,
  preview,
  price,
  minimum_order,
}) => {
  const openCard = useCartStore((state) => state.openCart);
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const onClickAdd = () => {
    addProductToCart({
      id,
      name,
      price,
      minimum_order,
      preview,
      quantity: 1,
    });

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
