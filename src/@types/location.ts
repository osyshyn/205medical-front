export interface ILocation {
  id: number;
  name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: string;
  contact_name: string;
  contact_email: string;
  buyer_name: string;
  buyer_email: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface ICreateLocation {
  name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  zip_code: string;
  contact_name: string;
  contact_email: string;
  buyer_name: string;
  buyer_email: string;
  location_products_id: number[];
  location_users_id: number[];
}
