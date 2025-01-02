import React from "react";

interface Product {
  id: number;
  name: string;
}

interface ProductsProps {
  products: Product[];
}

export const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className="max-h-62.5 min-h-62.5 overflow-y-auto">
      <h4 className="!font-medium text-gray-dark">Approved products</h4>
      <dl className="ml-5 mt-1 flex flex-col gap-4 text-[14px] font-[400]">
        {products?.length > 0 &&
          products?.map((product) => (
            <li className="text-gray-steel" key={product.id}>
              {product.name}
            </li>
          ))}
      </dl>
    </div>
  );
};
