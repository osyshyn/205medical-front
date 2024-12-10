import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { EMAIL } from "src/constants/cookiesKeys";
import { PATHNAMES } from "src/constants/routes";

interface Props {
  step: "email" | "otp" | "password";
  children: React.ReactNode;
}

export const PasswordRecoveryProgress: React.FC<Props> = ({
  step,
  children,
}) => {
  const email = Cookies.get(EMAIL);

  if (step === "otp" && !email) {
    return <Navigate to={PATHNAMES.PASSWRD_RECOVERY} replace />;
  }

  if (step === "password" && !email) {
    return <Navigate to={PATHNAMES.PASSWRD_RECOVERY} replace />;
  }

  return <>{children}</>;
};
