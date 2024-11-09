import { SVGReactComponent } from "src/@types";

export interface ISidebarNavigationItem {
  id: number;
  icon: SVGReactComponent;
  iconActive: SVGReactComponent;
  label: string;
  href: string;
}

export interface INavigationItemProps
  extends Omit<ISidebarNavigationItem, "id"> {}