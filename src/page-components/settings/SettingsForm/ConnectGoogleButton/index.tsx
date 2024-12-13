import React from "react";
import { Button } from "src/components/Button";
import useGoogleAuth from "src/hooks/useGoogleAuth";
import useAuthStore from "src/stores/auth-store";
import useUserStore from "src/stores/user-store";
import { ReactComponent as GoogleIcon } from "src/assets/icons/google.svg";

export const ConnectGoogleButton = () => {
  const getUser = useUserStore((state) => state.getUser);
  const connectGoogle = useAuthStore((state) => state.connectGoogle);
  const isLoading = useAuthStore((state) => state.isLoadingGoogle);

  const handleLogin = useGoogleAuth((google_id) =>
    connectGoogle({ google_id }, () => {
      getUser();
    })
  );

  return (
    <Button
      onClick={() => handleLogin()}
      className="w-max gap-3 rounded-xl border bg-white-base px-14 py-4 text-sm text-gray-dark"
      type="button"
      isLoading={isLoading}
      isDisabled={isLoading}
    >
      <GoogleIcon />
      <span>Connect Google Account</span>
    </Button>
  );
};