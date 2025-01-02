import React, { FC } from "react";

interface CostSummaryProps {
  orderToProducts: {
    id: number;
    product_id: number;
    order_id: number;
    product: {
      id: number;
      name: string;
      price: number;
    };
    quantity: number;
  }[];
}

export const CostSummary: FC<CostSummaryProps> = ({ orderToProducts }) => {
  const productCost = orderToProducts.reduce((total, item) => {
    return total + (item?.product?.price || 0) * item.quantity;
  }, 0);

  const shipping = 10;
  const tax = productCost * 0.1;

  const total = productCost + shipping + tax;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Cost Summary</h2>
      <div className="flex justify-between">
        <span>Product:</span>
        <span>{productCost.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping:</span>
        <span>{shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Tax:</span>
        <span>{tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between border-t font-semibold">
        <span>Total:</span>
        <span>{total.toFixed(2)}</span>
      </div>
    </div>
  );
};
