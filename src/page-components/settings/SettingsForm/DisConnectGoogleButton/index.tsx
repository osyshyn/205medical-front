import React, { FC } from "react";
import { Button } from "src/components/Button";
import useAuthStore from "src/stores/auth-store";
import { ReactComponent as GoogleIcon } from "src/assets/icons/google.svg";

interface Props {
  google_id: string;
}

export const DisConnectGoogleButton: FC<Props> = ({ google_id }) => {
  const disConnectGoogle = useAuthStore((state) => state.disConnectGoogle);

  const handleDisConnect = () => {
    disConnectGoogle({ google_id });
  };

  return (
    <Button
      onClick={handleDisConnect}
      className="w-max gap-3 rounded-xl border bg-white-base px-14 py-4 text-sm text-gray-dark"
      type="button"
    >
      <GoogleIcon />
      <span>Disconnect Google Account</span>
    </Button>
  );
};
