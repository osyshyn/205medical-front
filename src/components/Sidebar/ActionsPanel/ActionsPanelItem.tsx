import { FC } from "react";
import { SVGReactComponent } from "src/@types";
import { Button } from "src/components/Button";

export interface Props {
  icon: SVGReactComponent;
  label: string;
  onClick?: VoidFunction;
}

export const ActionsPanelItem: FC<Props> = ({ label, icon: Icon, onClick }) => (
  <Button
    className="flex items-center justify-between rounded-lg p-3"
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <Icon className="h-6 w-6" />
      <span className="text-sm text-gray-ligth">{label}</span>
    </div>
  </Button>
);
