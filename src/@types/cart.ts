import { Image } from ".";

export interface ProductToCart {
  id: number;
  quantity: number;
  name: string;
  price: number;
  minimum_order: number;
  preview: Image;
}

export interface Cart {
  id: number;
  po_number: string;
  location_id: number;
  user_id: number;
  product_to_carts: ProductToCart[];
}
