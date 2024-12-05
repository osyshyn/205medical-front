import React, { FC } from "react";
import { CloseButton } from "src/components/ModalWindow/CloseButton";
import { SelectDropdownList } from "src/components/SelectDropdownList";
import { IOptionSelect } from "src/@types/form";
import { QUANTITY_ITEMS, temp } from "./temp/constants";

const { name, image, price } = temp;

export const CardProduct: FC = () => {
  return (
    <div className="flex h-32 justify-between border-t py-6 last:border-b">
      <div className="flex gap-5">
        <div className="h-10 w-10">
          <img
            className="h-full w-full rounded-md border border-purple-lighter"
            src={image}
            alt={name}
          />
        </div>

        <div className="flex flex-col justify-between">
          <p className="font-semibold">{name}</p>

          <SelectDropdownList
            className="w-36"
            headLabelclassName="w-36 justify-between"
            headLabel="Quantity:"
            options={QUANTITY_ITEMS}
            activeOption={undefined}
            setOption={function (option: IOptionSelect): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <CloseButton onClose={undefined} />

        <p className="text-22 font-medium">&#36;{price}</p>
        <p className="text-xs text-gray-regular">Lorem ipsum</p>
      </div>
    </div>
  );
};
