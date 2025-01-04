import { FC } from "react";
import { NotificationService } from "src/helpers/notifications";
import { ReactComponent as CopyIcon } from "src/assets/icons/copy.svg";
import { ReactComponent as MailIcon } from "src/assets/icons/mail.svg";

interface ShippingAddressProps {
  address: string;
  name: string;
  email: string;
}

export const ShippingAddress: FC<ShippingAddressProps> = ({
  address,
  name,
  email,
}) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(email);
  };

  return (
    <div className="flex flex-col gap-4.5">
      <h2 className="text-22 font-semibold">Ship To Address</h2>

      <p>{address}</p>
      <p>{name}</p>
      <p className="flex items-center gap-1">
        <MailIcon className="h-7.5 w-7.5 text-gray-ligth" />

        <span>{email}</span>
        <CopyIcon
          className="hover:text-black h-3ю relative top-[-2px] w-3 cursor-pointer text-gray-500"
          onClick={handleCopyToClipboard}
        />
      </p>
    </div>
  );
};
