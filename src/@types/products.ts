import { Image } from ".";
import { ImageValue, Row } from "./table";

export interface ICategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IAttribute {
  label: string;
  value: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  minimum_order: number;
  categories_id: number;
  certification: string;
  sku: string;
  description: string;
  type: string;
  package_info: string;
  size: string;
  how_to_use: string;
  faq: string;
  created_at: string;
  updated_at: string;
}

export interface IProductDetails extends IProduct {
  photos: Image[];
  down_load_link: string;
  category: ICategory;
}

export interface IProductTable extends Row {
  key: string;
  image: ImageValue;
  sku: string;
  name: string;
  price: number;
  minimum_order: number;
}
