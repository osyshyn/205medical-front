import React from "react";
import { ProductItem } from "../ProductItem";

interface ProductListProps {
  products: {
    id: number;
    sku: string;
    name: string;
    description?: string;
    preview?: { path: string };
  }[];
  selectedProducts: number[];
  onToggle: (id: number) => void;
  isLoading: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  selectedProducts,
  onToggle,
  isLoading,
}) => {
  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="max-h-[600px] space-y-4 overflow-y-auto pt-4">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          isSelected={selectedProducts.includes(product.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};
