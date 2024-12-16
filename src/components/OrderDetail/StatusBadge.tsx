import React from "react";

type StatusType = "approved" | "shipped" | "pending" | "rush_service" | "none";

interface StatusBadgeProps {
  status: StatusType;
  label: string;
}

const statusStyles: Record<StatusType, string> = {
  approved: "bg-green-100 text-green-700 border-green-300",
  shipped: "bg-green-100 text-green-700 border-green-300",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  rush_service: "bg-yellow-100 text-yellow-700 border-yellow-300",
  none: "bg-green-100 text-green-700 border-green-300",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-lg border px-2 py-1 ${statusStyles[status]} min-w-20`} // фиксированная ширина
    >
      <span className="text-lg font-semibold">{label}</span>
    </div>
  );
};

export default StatusBadge;
