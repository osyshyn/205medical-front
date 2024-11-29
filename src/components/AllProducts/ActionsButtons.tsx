import React, { FC } from "react";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";

interface Props {
  onClickView: () => void;
  onClickAdd: () => void;
}

export const ActionsButtons: FC<Props> = ({ onClickView, onClickAdd }) => {
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
