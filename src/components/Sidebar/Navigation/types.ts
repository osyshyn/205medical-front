import { SVGReactComponent } from "src/@types";

export interface INavigationItem {
  id: number;
  icon: SVGReactComponent;
  iconActive: SVGReactComponent;
  label: string;
  href: string;
}

export interface INavigationItemProps
  extends Omit<INavigationItem, "id"> {}
