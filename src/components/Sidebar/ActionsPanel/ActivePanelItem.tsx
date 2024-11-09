import { FC } from "react";
import { Button } from "src/components/Button";
import { IActivePanelItemProps } from "./types";

export const ActivePanelItem: FC<IActivePanelItemProps> = ({
  label,
  icon: Icon,
}) => (
  <Button className="flex items-center justify-between rounded-lg p-3">
    <div className="flex items-center gap-3">
      <Icon className="h-6 w-6" />
      <span className="text-sm text-gray-ligth">{label}</span>
    </div>
  </Button>
);
