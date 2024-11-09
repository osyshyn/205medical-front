import { Avatar } from "src/components/Avatar";
import { ReactComponent as ArrowIcon } from "src/assets/icons/sidebar/account-card/arrow-gray.svg";
import { Sizes } from "src/@types/sizes";

const email = "japples@gmail.com";
const role = "Subuser";

export const AccountCard = () => (
  <div className="flex flex-col">
    <Avatar sizeVariant={Sizes.XS} />

    <div className="mt-2 flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{email}</span>
        <ArrowIcon />
      </div>
      <span className="text-gray-medium text-xs">{role}</span>
    </div>
  </div>
);
