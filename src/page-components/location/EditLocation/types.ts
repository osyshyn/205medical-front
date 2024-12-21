import { ICreateLocation, ILocation } from "src/@types/location";

export type IFormikValues = Omit<
  ILocation,
  "slug" | "contact_name" | "contact_email" | "buyer_name" | "buyer_email"
>;

export type INoEditFields = Omit<
  ILocation,
  | "slug"
  | "location_name"
  | "address_1"
  | "address_2"
  | "city"
  | "state"
  | "zip_code"
>;

export type IAddFormikValues = Omit<
  ICreateLocation,
  "slug" | "contact_name" | "contact_email" | "buyer_name" | "buyer_email"
>;
