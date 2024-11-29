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
  description: string;
  price: number;
  minimum_order: number;
  categories_id: number;
  certification: string;
  type: string;
  package_info: string;
  size: string;
  sku: string;
  created_at: string;
  updated_at: string;
  category: ICategory;
  image: string;
  howToUse: string;
  faqs: string;
  downloadLink: string;
}
