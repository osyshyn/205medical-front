export interface ProductToLists {
  id: number;
  quantity: number;
  name: string;
  price: number;
  minimum_order: number;
}

export interface List {
  id: number;
  name: string;
  product_to_lists: ProductToLists[];
}
