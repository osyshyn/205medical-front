import React, { FC } from "react";
import { Button } from "src/components/Button";
import useProductListStore from "src/stores/product-list-store";
import { ReactComponent as CloseIcon } from "src/assets/icons/close.svg";

interface Props {
  id: number;
}

export const DeleteButton: FC<Props> = ({ id }) => {
  const deleteProductInList = useProductListStore(
    (state) => state.deleteProductInList
  );

  const removeProduct = () => {
    deleteProductInList(id);
  };

  return (
    <Button>
      <CloseIcon onClick={removeProduct} />
    </Button>
  );
};
