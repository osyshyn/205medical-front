import { Image } from ".";
import { ImageValue } from "./table";

export interface ProductToCart {
  id: number;
  quantity: number;
  name: string;
  price: number;
  minimum_order: number;
  preview: Image;
}

interface Location {
  id: number;
  name: string;
}

export interface Cart {
  id: number;
  po_number: string | null;
  location: Location | null;
  user_id: number;
  product_to_carts: ProductToCart[];
}

export interface ICartProduct {
  id: number;
  quantity: number;
  name: string;
  price: number;
  minimum_order: number;
  preview: ImageValue;
  sku: string;
  package_info: string;
  category: string;
  total: number;
}
