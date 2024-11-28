import React, { FC, useState } from "react";
import productImg from "src/components/AllProducts/temp/temp.png";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { ModalWindow } from "src/components/ModalWindow";
import { Sizes } from "src/@types/sizes";

const product = {
  name: "12 PANEL DRUG TEST CUP",
  description: "Lorem ipsum dolor sit amet consectetur.",
  full_description:
    "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
  price: 2.15,
  certification: "CLIA WAIVED",
  specimenType: "URINE ANALYSIS",
  packageInfo: "25 TESTS/BOX",
  caseSize: "100 TESTS/CS",
  sku: "12PAN-PCP-CUP",
  categories: ["DRUG SCREENING"],
  image: productImg,
  safetyDataSheetUrl: "path/to/safety-data-sheets.pdf",
};

export const ProductDetail: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { name, description, price, image } = product;

  return (
    <ModalWindow
      className="w-3/4"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
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
              <p className="font-medium text-gray-regular">{description}</p>
            </div>

            <span className="bg-gradient-text text-2xl font-semibold">
              &#36;{price}
            </span>

            <Button variant={ButtonVariants.PRIMARY} size={Sizes.S}>
              Add to Purchase Order
            </Button>
          </div>

          <div className="flex gap-1.5">
            <Button variant={ButtonVariants.PRIMARY_GRADIENT} size={Sizes.XS}>
              Description
            </Button>

            <Button variant={ButtonVariants.SECONDARY} size={Sizes.XS}>
              How to use
            </Button>

            <Button variant={ButtonVariants.SECONDARY} size={Sizes.XS}>
              FAQS
            </Button>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};
