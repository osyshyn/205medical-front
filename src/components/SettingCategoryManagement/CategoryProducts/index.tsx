import React from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
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
    <div
      className="space-y-4 overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 280px)" }}
    >
      <div className="bg-white sticky top-0 grid grid-cols-4 gap-4 pb-2 text-sm text-gray-500">
        <div></div>
        <div>SKU</div>
        <div>Name</div>
        <div>Description</div>
      </div>
      {localProducts.length === 0 ? (
        <div className="flex items-center justify-center py-8 text-gray-500">
          No products available
        </div>
      ) : (
        localProducts.map((product) => (
          <div key={product.id} className="grid grid-cols-4 items-center gap-4">
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
              <span className="line-clamp-1">{product.description || "-"}</span>
              {isEditMode && (
                <Button
                  className="text-white ml-auto h-8 w-8 rounded-full bg-red-500"
                  variant={ButtonVariants.SECONDARY}
                  onClick={() => handleDeleteEntity(product.id, "product")}
                >
                  X
                </Button>
              )}
            </div>
          </div>
        ))
      )}
      {isEditMode && (
        <div className="absolute bottom-7 right-7 mt-4 flex justify-center">
          <Button
            className="h-10 w-36 rounded-20"
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
