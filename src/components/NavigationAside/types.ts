import { SVGReactComponent } from "src/@types";

export interface INavigationItem {
  id: number;
  icon: SVGReactComponent;
  label: string;
  href: string;
}
