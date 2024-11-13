import { SVGReactComponent } from "src/@types";

interface ISubNavigationItem {
  id: number;
  label: string;
  href: string;
}

export interface INavigationItem {
  id: number;
  icon: SVGReactComponent;
  iconActive: SVGReactComponent;
  label: string;
  href: string;
  subNavItems?: ISubNavigationItem[];
}

export type INavigationItemProps = Omit<INavigationItem, "id">;
export type ISubNavigationItemProps = Omit<ISubNavigationItem, "id">;
