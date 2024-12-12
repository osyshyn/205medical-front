import React, { FC } from "react";
import { Button } from "src/components/Button";
import { ReactComponent as GoogleIcon } from "src/assets/icons/google.svg";

export const SingInGoogleButton: FC = () => {
  return (
    <Button
      className="w-max gap-3 rounded-xl border bg-white-base px-14 py-4 text-sm text-gray-dark"
      type="button"
    >
      <GoogleIcon />
      <span>Connect Google Account</span>
    </Button>
  );
};
