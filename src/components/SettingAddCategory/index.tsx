import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as ArrowBottomIcon } from "src/assets/icons/arrow-down.svg";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";
import { Checkbox } from "../CheckBox";

export default function AddCategory() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const [isOpen, setIsOpen] = useState(false);
  const products = [
    { id: 1, sku: "12PAN-PCP-CUP", name: "Name 1" },
    { id: 2, sku: "12PAN-PCP-CUP", name: "Name 2" },
    { id: 3, sku: "12PAN-PCP-CUP", name: "Name 3" },
    { id: 4, sku: "12PAN-PCP-CUP", name: "Name 3" },
    { id: 5, sku: "12PAN-PCP-CUP", name: "Name 3" },
    { id: 6, sku: "12PAN-PCP-CUP", name: "Name 3" },
  ];

  return (
    <div>
      <button
        className="hover:text-black flex w-full items-center gap-2 py-3 text-left text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4>Add a New Category</h4>
        <ArrowBottomIcon
          className={cn("ml-2 transition-transform duration-200", {
            "rotate-180": isOpen,
          })}
        />
      </button>
      {isOpen && (
        <div className="px-4 py-2">
          <div className="flex justify-between">
            <div>
              <div className="mb-3">
                <label className="mb-2 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Name of new category"
                  className="border w-full min-w-96 max-w-96 rounded p-2 text-14"
                />
              </div>
              <p className="text-sm font-medium text-[#999999]">
                Choose products from the list that will be included <br /> in
                your category
              </p>
            </div>

            <div className="space-y-4">
              {/* Table Header */}
              <div className="border-b border-t grid grid-cols-4 gap-4 pb-4 pt-4 text-sm text-gray-500">
                <div></div>
                <div className="text-14 font-medium">SKU</div>
                <div className="text-14 font-medium">Name</div>
                <div className="text-14 font-medium">Description</div>
              </div>

              {/* Product Items */}
              {products.map((product, idx) => (
                <div
                  key={idx}
                  className="last:border-b-0 border-b grid grid-cols-4 items-center gap-4 pb-5"
                >
                  <div className="flex items-center gap-4">
                    {/* <input type="checkbox" className="h-4 w-4" /> */}
                    <Checkbox
                      key={product.id}
                      label={product.name}
                      checked={selectedCategories.includes(product.id)}
                      onChange={() => handleCategoryChange(product.id)}
                    />
                    <div className="h-12 w-12 rounded bg-gray-200"></div>
                  </div>
                  <div>{product.sku}</div>
                  <div>{product.name}</div>
                  <div>-</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              className="border h-10 w-44 rounded-20"
              variant={ButtonVariants.SECONDARY_SQUARE}
            >
              Add Category
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
