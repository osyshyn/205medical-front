import React, { FC } from "react";

export const Header: FC = () => (
  <div className="flex">
    <h3 className="flex-1">Order Information</h3>

    <div className="flex flex-1 flex-col justify-between font-medium">
      <div className="flex justify-between">
        <p>Today Date</p>
        <p>08/13/24</p>
      </div>

      <div className="flex justify-between">
        <p>Sales Order</p>
        <p>1234567890</p>
      </div>
    </div>
  </div>
);
