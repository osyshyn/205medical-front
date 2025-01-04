import React, { useEffect, useState } from "react";
import cn from "classnames";
import useCategoryStore from "src/stores/category-store";
import useProductStore from "src/stores/product-store";
import { ReactComponent as ArrowBottomIcon } from "src/assets/icons/arrow-down.svg";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";
import { ProductList } from "./ProductList";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { products, fetchProducts, isLoadingProducts } = useProductStore();
  const { createCategory, isLoading } = useCategoryStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async () => {
    if (!name || selectedProducts.length === 0) return;

    await createCategory(name, selectedProducts);
    setName("");
    setSelectedProducts([]);
  };

  const toggleProductSelection = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const disableAddCategoryButton = () => {
    return isLoading || !name || selectedProducts.length === 0;
  };

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
        <div className="py-2">
          <div className="flex justify-between">
            <div>
              <div className="mb-3">
                <label className="mb-2 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name of new category"
                  className="w-full min-w-96 max-w-96 rounded-lg border p-2 text-14"
                />
              </div>
              <p className="text-sm font-medium text-[#999999]">
                Choose products from the list that will be included <br /> in
                your category
              </p>
            </div>
            <div className="flex min-w-[700px] flex-col pl-7 pr-7">
              <div className="bg-white top-0 grid flex-shrink-0 grid-cols-4 gap-12 border-b border-t pb-4 pt-4 text-sm text-gray-500">
                <div></div>
                <div className="text-14 font-medium">SKU</div>
                <div className="text-14 font-medium">Name</div>
                <div className="text-14 font-medium">Description</div>
              </div>
              <ProductList
                products={products}
                selectedProducts={selectedProducts}
                onToggle={toggleProductSelection}
                isLoading={isLoadingProducts}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              className="h-10 w-44 rounded-20 border font-semibold"
              variant={ButtonVariants.SECONDARY_SQUARE}
              onClick={handleSubmit}
              isDisabled={disableAddCategoryButton()}
            >
              {isLoading ? "Creating..." : "Add Category"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
