import React, { FC } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";

interface Props {
  id: number;
}

export const ActionsButtons: FC<Props> = ({ id }) => {
  const onClickAdd = () => {
    console.log("onClickAdd");
  };

  const onView = () => {
    console.log("onView");
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
