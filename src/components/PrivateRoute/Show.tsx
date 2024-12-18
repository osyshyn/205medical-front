import React, { FC, ReactNode } from "react";
import useUserStore from "src/stores/user-store";
import { Sizes } from "src/@types/sizes";
import { ONLY_FOR, OnlyFor } from "./types";

interface Props {
  children: ReactNode;
  onlyFor: OnlyFor;
  loaderSize?: Sizes;
  loaderClassName?: string;
  showLoader?: boolean;
}
export const Show: FC<Props> = ({ children, onlyFor }) => {
  const isAuthorized = useUserStore((state) => state.isAuthorized);
  const userType = useUserStore((state) => state.user.role);

  const isUserClient = isAuthorized && userType === ONLY_FOR.SUB_USER;
  const isUserAdmin = isAuthorized && userType === ONLY_FOR.CLIENT_ADMIN;
  const isUserMedical = isAuthorized && userType === ONLY_FOR.MEDICAL;

  if (onlyFor === ONLY_FOR.SUB_USER && isUserClient) return <>{children}</>;

  if (onlyFor === ONLY_FOR.CLIENT_ADMIN && isUserAdmin) return <>{children}</>;

  if (onlyFor === ONLY_FOR.MEDICAL && isUserMedical) return <>{children}</>;

  if (isAuthorized && onlyFor === ONLY_FOR.AUTHORIZED) return <>{children}</>;

  return null;
};
