import React, { FC } from "react";
import { Button } from "src/components/Button";
import { ReactComponent as CloseIcon } from "src/assets/icons/close.svg";

interface Props {
  id: number;
}

export const DeleteButton: FC<Props> = ({ id }) => {
  return (
    <Button>
      <CloseIcon />
    </Button>
  );
};
