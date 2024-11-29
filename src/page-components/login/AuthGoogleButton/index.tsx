import React, { FC } from "react";
import { Button } from "src/components/Button";
import { ReactComponent as GoogleIcon } from "src/assets/icons/google.svg";

export const AuthGoogleButton: FC = () => {
  return (
    <Button className="mb-10 mt-6 w-full gap-3 rounded-xl border bg-white-base px-3.5 py-2 text-lg text-gray-dark">
      <GoogleIcon />
      <span>Sign in with google</span>
    </Button>
  );
};
