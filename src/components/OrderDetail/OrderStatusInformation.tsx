import { FC } from "react";
import StatusBadge from "./StatusBadge";
import { Status } from "./type";

interface OrderStatusInfoProps {
  approvalStatus: number;
  shipStatus: number;
  rushService: string;
}

export const OrderStatusInfo: FC<OrderStatusInfoProps> = ({
  approvalStatus,
  shipStatus,
  rushService,
}) => (
  <div className="flex flex-col gap-4">
    <h2 className="text-lg font-semibold">Status Information</h2>
    <div className="flex justify-between">
      <span>Approval Status:</span>
      <StatusBadge
        status={approvalStatus === 1 ? Status.Approved : Status.Pending}
        label={approvalStatus === 1 ? "Approved" : "Pending"}
      />
    </div>
    <div className="flex justify-between">
      <span>Ship Status:</span>
      <StatusBadge
        status={shipStatus === 1 ? Status.Shipped : Status.Pending}
        label={shipStatus === 1 ? "Shipped" : "Pending"}
      />
    </div>
    <div className="flex justify-between">
      <span>Rush Service:</span>
      <StatusBadge
        status={rushService === "4" ? Status.RushService : Status.None}
        label={rushService === "4" ? "Rush" : "None"}
      />
    </div>
  </div>
);
