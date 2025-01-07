import React, { FC, useEffect } from "react";
import useOrderStore from "src/stores/order-store";

export const Header: FC = () => {
  const loadLastOrderId = useOrderStore((state) => state.fetchLastOrderId);
  const lastOrderId = useOrderStore((state) => state.lastOrderId);

  useEffect(() => {
    loadLastOrderId();
  }, [loadLastOrderId]);

  return (
    <div className="flex">
      <h3 className="flex-1">Order Information</h3>

      <div className="flex flex-1 flex-col justify-between font-medium">
        <div className="flex justify-between">
          <p>Today Date</p>
          <p>08/13/24</p>
        </div>

        <div className="flex justify-between">
          <p>Sales Order</p>
          <p>{lastOrderId}</p>
        </div>
      </div>
    </div>
  );
};
