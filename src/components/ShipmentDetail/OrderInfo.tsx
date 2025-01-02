import React, { FC } from "react";
import { IShipmentDetail } from "src/@types/shipments";

interface OrderInfoProps {
  purchase_order_number: string;
  date_expected: string;
  sales_order_number: string;
  sales_order_date: string;
}

export const OrderInfo: FC<OrderInfoProps> = ({
  purchase_order_number,
  date_expected,
  sales_order_number,
  sales_order_date,
}) => {
  return (
    <div className="mt-8 flex gap-12 border-b pb-8">
      <div className="flex-1 flex-col gap-12">
        <div className="flex justify-between">
          <p>Purchase order number:</p>
          <p className="font-semibold">{purchase_order_number}</p>
        </div>
        <div className="flex justify-between">
          <p>PO Date:</p>
          <p className="font-semibold"></p>
        </div>
        <div className="flex justify-between">
          <p>Date Expected:</p>
          <p className="font-semibold">{date_expected}</p>
        </div>
      </div>
      <div className="flex-1 flex-col gap-12">
        <div className="flex justify-between">
          <p>Sales order number:</p>
          <p className="font-semibold">{sales_order_number}</p>
        </div>
        <div className="flex justify-between">
          <p>Sales order date:</p>
          <p className="font-semibold">{sales_order_date}</p>
        </div>
      </div>
    </div>
  );
};
