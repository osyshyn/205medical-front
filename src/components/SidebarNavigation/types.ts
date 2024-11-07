import { SVGReactComponent } from "src/@types";

export interface ISidebarNavigationItem {
  id: number;
  icon: SVGReactComponent;
  label: string;
  href: string;
}
