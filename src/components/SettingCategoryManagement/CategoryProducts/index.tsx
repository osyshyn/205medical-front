import React from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { ReactComponent as Delete } from "src/assets/icons/delete.svg";
import { IProduct } from "src/@types/products";

interface CategoryProductsProps {
  localProducts: IProduct[];
  isEditMode: boolean;
  handleDeleteEntity: (id: number, type: "product" | "category") => void;
  onOpenAddModal: () => void;
}

export const CategoryProducts: React.FC<CategoryProductsProps> = ({
  localProducts,
  isEditMode,
  handleDeleteEntity,
  onOpenAddModal,
}) => {
  return (
    <div className="relative flex max-h-[425px] flex-col overflow-hidden">
      {/* Заголовок */}
      <div className="bg-white grid flex-shrink-0 grid-cols-4 gap-4 py-2 text-sm text-gray-500">
        <div></div>
        <div>SKU</div>
        <div>Name</div>
        <div>Description</div>
      </div>

      <div className="flex-grow overflow-y-auto pr-5">
        {localProducts.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-gray-500">
            No products available
          </div>
        ) : (
          localProducts.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-4 items-center gap-4 py-2"
            >
              <div className="h-12 w-12 rounded bg-gray-200">
                {product.preview && (
                  <img
                    src={product.preview?.path}
                    alt={product.name}
                    className="h-full w-full rounded object-cover"
                  />
                )}
              </div>
              <div>{product.sku}</div>
              <div className="line-clamp-1">{product.name}</div>
              <div className="flex items-center justify-between gap-2">
                <span className="line-clamp-1">
                  {product.description || "-"}
                </span>
                {isEditMode && (
                  <div
                    className="ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-[#9197B3]"
                    onClick={() => handleDeleteEntity(product.id, "product")}
                  >
                    <Delete className="text-white h-5 w-5" />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {isEditMode && (
        <div className="bg-white flex flex-shrink-0 justify-end p-4 shadow-md">
          <Button
            className="h-10 w-44 rounded-20 text-sm"
            variant={ButtonVariants.SECONDARY}
            onClick={onOpenAddModal}
          >
            Add Product
          </Button>
        </div>
      )}
    </div>
  );
};
