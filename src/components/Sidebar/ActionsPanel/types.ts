import { SVGReactComponent } from "src/@types";

export interface IActionsPanelItem {
  id: number;
  icon: SVGReactComponent;
  label: string;
}

export interface IActionsPanelItemProps extends Omit<IActionsPanelItem, "id"> {}
