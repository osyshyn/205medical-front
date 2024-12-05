interface ProductToCart {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

export interface Cart {
  id: number;
  po_number: string;
  location_id: number;
  user_id: number;
  product_to_carts: ProductToCart[];
}
