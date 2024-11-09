import { SVGReactComponent } from "src/@types";

export interface IActivePanelItem {
  id: number;
  icon: SVGReactComponent;
  label: string;
}

export interface IActivePanelItemProps extends Omit<IActivePanelItem, "id"> {}
