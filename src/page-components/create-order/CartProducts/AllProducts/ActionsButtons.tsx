import React, { FC } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import useModalWindowStore from "src/stores/modal-window-store";
import useProductListStore from "src/stores/product-list-store";

interface Props {
  id: number;
}

export const ActionsButtons: FC<Props> = ({ id }) => {
  const openProduct = useModalWindowStore((state) => state.openProductItem);

  const addProductToList = useProductListStore(
    (state) => state.addProductToList
  );

  const onView = () => {
    openProduct(id);
  };

  const onClickAdd = () => {
    addProductToList(id);
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
