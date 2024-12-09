import { Image } from ".";

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
