import React, { useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { ModalWindow } from "src/components/ModalWindow";
import { Window } from "src/components/Window";
import useProductStore from "src/stores/product-store";
import { IProduct as StoreProduct } from "src/@types/products";

interface AddProductProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProducts: (products: StoreProduct[]) => void;
}

interface GroupedProducts {
  [key: number]: StoreProduct[];
}

export const AddProduct = ({
  isOpen,
  onClose,
  onAddProducts,
}: AddProductProps) => {
  const { products, fetchProducts, isLoadingProducts } = useProductStore();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (isOpen) {
      setSelectedProducts([]);
    }
  }, [isOpen]);

  const groupedProducts = products.reduce<GroupedProducts>((acc, product) => {
    const { category_id: categoryId } = product;
    acc[categoryId] = acc[categoryId] || [];
    acc[categoryId].push(product);
    return acc;
  }, {});

  const handleCheckboxChange = (productId: number) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleAddProduct = () => {
    const selectedProductObjects = products.filter((product) =>
      selectedProducts.includes(product.id)
    );
    onAddProducts(selectedProductObjects);
    onClose();
  };

  return (
    <ModalWindow
      onClose={onClose}
      isOpen={isOpen}
      closeButtonClassName="!bg-white-base rounded-full shadow-md"
      className="bg-white h-[900px] w-[1000px] overflow-hidden rounded-lg p-6"
    >
      <Window>
        <div className="flex h-full flex-col">
          <h1 className="mb-6 text-xl font-bold text-gray-800">Add Product</h1>

          {isLoadingProducts ? (
            <div className="flex items-center justify-center py-8">
              Loading...
            </div>
          ) : (
            <div
              className="flex flex-col gap-8 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 250px)" }}
            >
              {Object.entries(groupedProducts).map(([categoryId, products]) => (
                <div
                  key={categoryId}
                  className="flex flex-col gap-4 border-b border-white-lightgray pb-10 last:border-0"
                >
                  <h2 className="text-base font-semibold text-gray-800">
                    Category {categoryId}
                  </h2>

                  <div className="grid grid-cols-1 gap-8">
                    <div className="grid grid-cols-[40px_1fr_1fr_1fr_1fr] gap-4 text-sm font-medium text-gray-500">
                      <div></div>
                      <div></div>
                      <div>SKU</div>
                      <div>Name</div>
                      <div>Description</div>
                    </div>

                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="grid grid-cols-[40px_1fr_1fr_1fr_1fr] items-center gap-4"
                      >
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleCheckboxChange(product.id)}
                            className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                          />
                        </div>
                        <div className="flex items-center justify-start">
                          {product.preview ? (
                            <img
                              src={product.preview.toString()}
                              alt={product.name}
                              className="h-8 w-8 rounded object-cover"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded bg-gray-200"></div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <span className="truncate text-14 font-medium">
                            {product.sku}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="truncate text-14 font-medium">
                            {product.name}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <span className="truncate text-14 font-medium">
                            {product.description || "-"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Button
              className="text-white h-10 w-44 rounded-full bg-purple-600"
              variant={ButtonVariants.PRIMARY}
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </div>
        </div>
      </Window>
    </ModalWindow>
  );
};
