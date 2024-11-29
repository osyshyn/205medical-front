import React, { FC } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { ModalWindow } from "src/components/ModalWindow";
import { Sizes } from "src/@types/sizes";
import { PRODUCT_TEMP } from "../AllProducts/temp/constants";
import { PropertiesCard } from "./PropertiesCard";
import { Tabs } from "./Tabs";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetail: FC<Props> = ({ isOpen, onClose }) => {
  const { name, description, price, image } = PRODUCT_TEMP;

  return (
    <ModalWindow
      className="w-3/4"
      isOpen={isOpen}
      onClose={onClose}
      isActivePortal
    >
      <div className="flex gap-5">
        <div className="flex-1">
          <img className="w-full" src={image} alt={name} />
        </div>

        <div className="mt-5 flex flex-1 flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-22 font-semibold uppercase">{name}</p>
              <p className="text-black-soft line-clamp-1 font-medium">
                {description}
              </p>
            </div>

            <span className="text-2xl font-semibold bg-gradient-text">
              &#36;{price}
            </span>

            <Button variant={ButtonVariants.PRIMARY} size={Sizes.S}>
              Add to Purchase Order
            </Button>

            <PropertiesCard />
          </div>

          <Tabs />
        </div>
      </div>
    </ModalWindow>
  );
};
