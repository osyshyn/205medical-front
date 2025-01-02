import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import useCartStore from "src/stores/cart-store";
import useModalWindowStore from "src/stores/modal-window-store";
import { getItemPath } from "src/utils/getItemPath";
import { PATHNAMES } from "src/constants/routes";
import { ReactComponent as TrashIcon } from "src/assets/icons/trash.svg";
import { TypesUsers } from "src/@types/users";

interface Props {
  id: number;
  role: TypesUsers;
}

export const ActionsButtons: FC<Props> = ({ id, role }) => {
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
    <>
      {role === TypesUsers.CLIENT_ADMIN ? (
        <div className="max-w flex justify-center gap-3">
          <Button onClick={onView} variant={ButtonVariants.SECONDARY_SQUARE}>
            View
          </Button>

          <Button onClick={onClickAdd} variant={ButtonVariants.PRIMARY_SQUARE}>
            Add
          </Button>
        </div>
      ) : (
        <>
          <div className="max-w flex justify-center gap-3">
            <Button onClick={onView} variant={ButtonVariants.SECONDARY_SQUARE}>
              View
            </Button>

            <Link to={getItemPath(PATHNAMES.EDIT_PRODUCT, { id })}>
              <Button variant={ButtonVariants.PRIMARY_SQUARE}>Edit</Button>
            </Link>

            <Button variant={ButtonVariants.PRIMARY_SQUARE}>
              <TrashIcon />
            </Button>
          </div>
        </>
      )}
    </>
  );
};
