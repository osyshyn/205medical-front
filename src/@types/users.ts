import { Image } from ".";
import { ILocation } from "./location";
import { IProduct } from "./products";

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  google_id: string;
  role: TypesUsers;
  purchase_limit: number;
  created_at: string;
  updated_at: string;
  avatar: Image;
  logo: Image;
}

export interface IDetailUser extends IUser {
  locations: ILocation[];
  products: IProduct[];
}

export enum TypesUsers {
  SUB_USER = 1,
  CLIENT_ADMIN = 2,
  MEDICAL = 3,
}
