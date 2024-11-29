import { TypesUsers } from "src/@types/users";

export enum AuthStatus {
  AUTHORIZED = "authorized",
  UNAUTHORIZED = "unauthorized",
}

export const ONLY_FOR = {
  ...TypesUsers,
  ...AuthStatus,
} as const;

export type OnlyFor = TypesUsers | AuthStatus;
