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
    navigator.clipboard
      .writeText(email)
      .then(() => {
        NotificationService.success("The email is copied to the clipboard");
      })
      .catch((err) => {
        console.error("Ошибка копирования: ", err);
        NotificationService.error("Failed to copy email");
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Ship To Address</h2>
      <p>{address}</p>
      <p>{name}</p>
      <p className="flex items-center gap-1">
        <MailIcon className="h-7 w-7 text-gray-500" />
        <span>{email}</span>
        <CopyIcon
          className="hover:text-black h-3ю relative top-[-2px] w-3 cursor-pointer text-gray-500"
          onClick={handleCopyToClipboard}
        />
      </p>
    </div>
  );
};
