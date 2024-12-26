import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as ArrowBottomIcon } from "src/assets/icons/arrow-down.svg";

const CategoryManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(1);

  const categories = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    name: `Category ${i + 1}`,
  }));

  const products = [
    { id: 1, sku: "12PAN-PCP-CUP", name: "Name 1" },
    { id: 2, sku: "12PAN-PCP-CUP", name: "Name 2" },
    { id: 3, sku: "12PAN-PCP-CUP", name: "Name 3" },
    { id: 4, sku: "12PAN-PCP-CUP", name: "Name 4" },
    { id: 5, sku: "12PAN-PCP-CUP", name: "Name 5" },
  ];

  return (
    <div>
      <button
        className="hover:text-black flex w-full items-center gap-2 py-3 text-left text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4>Categories Management</h4>
        <ArrowBottomIcon
          className={cn("ml-2 transition-transform duration-200", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      {isOpen && (
        <div className="flex gap-6">
          <div className="bg-white w-64 rounded-lg p-4 shadow-sm">
            <h3 className="mb-4 font-medium">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex cursor-pointer items-center justify-between rounded p-3 hover:bg-gray-50 ${
                    cat.id === selectedCategory
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-600"
                  }`}
                >
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white flex-1 rounded-lg p-4 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-medium">Products</h3>
              <button className="text-white rounded-lg bg-purple-600 px-4 py-2 hover:bg-purple-700">
                Submit
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 pb-2 text-sm text-gray-500">
                <div></div>
                <div>SKU</div>
                <div>Name</div>
                <div>Description</div>
              </div>

              {products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="h-4 w-4" />
                    <div className="h-12 w-12 rounded bg-gray-200"></div>
                  </div>
                  <div>{product.sku}</div>
                  <div>{product.name}</div>
                  <div>-</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                Delete Product
              </button>
              <button className="text-purple-600 hover:text-purple-700">
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
