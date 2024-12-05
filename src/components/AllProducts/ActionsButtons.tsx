import React, { FC } from "react";
import { Link } from "react-router-dom";
import useSidebarStore from "src/stores/siderbar-store";
import { getItemPath } from "src/utils/getItemPath";
import { PATHNAMES } from "src/constants/routes";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";

interface Props {
  id: number;
}
const name = "name";
const price = 123;
const image = "image";

export const ActionsButtons: FC<Props> = ({ id }) => {
  const openCard = useSidebarStore((state) => state.openCart);
  const addProductToCart = useSidebarStore((state) => state.addProductToCart);

  const onClickAdd = () => {
    addProductToCart({ id, name, image, price });
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
