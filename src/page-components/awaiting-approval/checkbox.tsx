import React, { FC, InputHTMLAttributes, useEffect, useState } from "react";
import useOrderStore from "src/stores/order-store";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  orderId: number;
}

export const Checkbox: FC<CheckboxProps> = ({ orderId, ...props }) => {
  const [checked, setChecked] = useState(false);
  const selectedOrders = useOrderStore((state) => state.selectedApprovedOrders);
  const selectOrder = useOrderStore((state) => state.setSelectedApprovedOrders);

  const handleCheckboxChange = () => {
    setChecked((prev) => !prev);
    selectOrder({ id: orderId });
  };

  useEffect(() => {
    if (!selectedOrders) return;
    setChecked(
      selectedOrders.some((selectedOrder) => selectedOrder.id === orderId)
    );
  }, [selectedOrders, orderId]);

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="hidden"
        {...props}
      />
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-md border-2 border-gray-700 ${
          checked ? "bg-white" : "bg-transparent"
        }`}
      >
        {checked && (
          <svg
            className="h-4 w-4 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </div>
    </label>
  );
};
