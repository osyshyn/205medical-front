import React from "react";
import { Status } from "./type";

interface StatusBadgeProps {
  status: Status;
  label: string;
}

const statusStyles = {
  approved: "bg-green-ligth text-green-base border-gray-soft",
  shipped: "bg-green-ligth text-green-base border-gray-soft",
  pending: "bg-yellow-base text-black-base border-gray-soft",
  rush_service: "bg-yellow-base text-black-base border-gray-soft",
  none: "bg-green-ligth text-green-base border-gray-soft",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-lg border px-2 py-1 ${statusStyles[status]} min-w-20`}
    >
      <span className="text-lg font-semibold">{label}</span>
    </div>
  );
};

export default StatusBadge;
