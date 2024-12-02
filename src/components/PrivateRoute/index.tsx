import React from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "src/stores/user-store";
import { PATHNAMES } from "src/constants/routes";
import { ScreenLoader } from "../Loader/ScreenLoader";
import { ONLY_FOR, OnlyFor } from "./types";

interface Props {
  component: React.FC;
  onlyFor?: OnlyFor;
  redirectUrl?: string;
}

export const PrivateRoute = ({
  component: Component,
  onlyFor = ONLY_FOR.AUTHORIZED,
  redirectUrl = PATHNAMES.LOGIN,
}: Props) => {
  const isAuthorized = useUserStore((state) => state.isAuthorized);
  const userType = useUserStore((state) => state.role);
  const isLoading = useUserStore((state) => state.isLoading);

  const { SUB_USER, AUTHORIZED, UNAUTHORIZED } = ONLY_FOR;

  const isUserSubUser = isAuthorized && userType === SUB_USER;

  if (isLoading) return <ScreenLoader />;

  if (isUserSubUser && onlyFor === SUB_USER) {
    return <Component />;
  }

  if (onlyFor === AUTHORIZED && isAuthorized) {
    return <Component />;
  }

  if (onlyFor === UNAUTHORIZED && !isAuthorized) {
    return <Component />;
  }

  return <Navigate to={redirectUrl} replace />;
};
