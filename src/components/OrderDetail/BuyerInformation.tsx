import { FC } from "react";
import { NotificationService } from "src/helpers/notifications";
import { ReactComponent as CopyIcon } from "src/assets/icons/copy.svg";
import { ReactComponent as MailIcon } from "src/assets/icons/mail.svg";

interface BuyerInformationProps {
  name: string;
  email: string;
}

export const BuyerInformation: FC<BuyerInformationProps> = ({
  name,
  email,
}) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(email);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Buyer Information</h2>
      <div className="flex justify-between">
        <span>{name}</span>
      </div>
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
