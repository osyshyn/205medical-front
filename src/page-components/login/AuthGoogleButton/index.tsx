import React from "react";
import { useNavigate } from "react-router";
import { Button } from "src/components/Button";
import useGoogleAuth from "src/hooks/useGoogleAuth";
import useAuthStore from "src/stores/auth-store";
import useUserStore from "src/stores/user-store";
import { PATHNAMES } from "src/constants/routes";
import { ReactComponent as GoogleIcon } from "src/assets/icons/google.svg";

export const AuthGoogleButton = () => {
  const navigate = useNavigate();
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const getUser = useUserStore((state) => state.getUser);

  const handleLogin = useGoogleAuth((google_id) =>
    loginWithGoogle({ google_id }, () => {
      getUser();
      navigate(PATHNAMES.DASHBOARD);
    })
  );

  return (
    <Button
      className="mb-10 mt-6 w-full gap-3 rounded-xl border bg-white-base px-3.5 py-2 text-lg text-gray-dark"
      onClick={() => handleLogin()}
      type="button"
    >
      <GoogleIcon />
      <span>Sign in with Google</span>
    </Button>
  );
};
