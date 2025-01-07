import { Image } from ".";
import { ICategory } from "./categories";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  minimum_order: number;
  category_id: number;
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
  preview: Image;
}

export interface IProductDetails extends IProduct {
  photos: Image[];
  down_load_link: any;
  category: ICategory;
}

interface IDocument {
  id: number;
  path: string;
}

export interface IEditProduct {
  id: string;
  name: string;
  price: string;
  minimum_order: string;
  category: {
    id: number;
  };
  certification: string;
  sku: string;
  description: string;
  package_info: string;
  size: string;
  how_to_use: string;
  faq: string;
  down_load_link: { id: number };
  // down_load_link: {
  //   id: number;
  // };
  photos: {
    id: number;
  }[];
}
