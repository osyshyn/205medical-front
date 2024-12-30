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
  // approved_users: IUser[];
}

export interface ISubUser {
  id: number;
  first_name: string;
  last_name: string;
}

export enum TypesUsers {
  SUB_USER = 1,
  CLIENT_ADMIN = 2,
  MEDICAL = 3,
}

export type IAddUser = Omit<
  IUser,
  "id" | "created_at" | "updated_at" | "google_id" | "logo" | "avatar"
> & {
  avatar_id: number;
  approved_users: number[];
  active_products: number[];
};

export type IEditUser = Omit<
  IDetailUser,
  | "created_at"
  | "updated_at"
  | "google_id"
  | "logo"
  | "approved_users"
  | "active_products"
>;
