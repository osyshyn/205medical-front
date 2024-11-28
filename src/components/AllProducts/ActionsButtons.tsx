import React, { FC } from "react";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";

export const AllProducts: FC = () => {
  return (
    <div className="max-w flex justify-center gap-3">
      <Button variant={ButtonVariants.SECONDARY_SQUARE}>View</Button>
      <Button variant={ButtonVariants.PRIMARY_SQUARE}>Add</Button>
    </div>
  );
};
