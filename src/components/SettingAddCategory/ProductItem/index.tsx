import React from "react";
import cn from "classnames";
import { Checkbox } from "src/components/CheckBox";

interface ProductItemProps {
  product: {
    id: number;
    sku: string;
    name: string;
    description?: string;
    preview?: { path: string };
  };
  isSelected: boolean;
  onToggle: (id: number) => void;
  className?: string;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  isSelected,
  onToggle,
  className,
}) => {
  return (
    <div
      key={product.id}
      className={cn(
        "grid grid-cols-4 items-center gap-4 border-b pb-5 last:border-b-0",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Checkbox
          label=""
          checked={isSelected}
          onChange={() => onToggle(product.id)}
        />
        <div className="h-12 w-12 rounded bg-gray-200">
          {product.preview ? (
            <img
              src={product.preview.path}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded bg-gray-300"></div>
          )}
        </div>
      </div>
      <div className="text-14 font-medium">{product.sku}</div>
      <div className="text-14 font-medium">{product.name}</div>
      <div className="break-words text-14 font-medium">
        {product.description || "-"}
      </div>
    </div>
  );
};
