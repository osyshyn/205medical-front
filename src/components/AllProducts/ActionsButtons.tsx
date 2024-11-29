import React, { FC } from "react";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";

interface Props {
  itemName: string;
  stockKeepingUnit: string;
}

export const ActionsButtons: FC<Props> = ({ itemName }) => {
  const onClickView = () => {
    console.log("onClickView", itemName);
  };

  const onClickAdd = () => {
    console.log("onClickView", itemName);
  };

  return (
    <div className="max-w flex justify-center gap-3">
      <Button onClick={onClickView} variant={ButtonVariants.SECONDARY_SQUARE}>
        View
      </Button>
      <Button onClick={onClickAdd} variant={ButtonVariants.PRIMARY_SQUARE}>
        Add
      </Button>
    </div>
  );
};
