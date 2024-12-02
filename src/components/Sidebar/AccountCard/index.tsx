import { Avatar } from "src/components/Avatar";
import useUserStore from "src/stores/user-store";
import { ReactComponent as ArrowIcon } from "src/assets/icons/sidebar/account-card/arrow-gray.svg";
import { Sizes } from "src/@types/sizes";
import { ROLE_USER } from "./constants";

export const AccountCard = () => {
  const { avatar, email, role } = useUserStore((state) => state.user);

  return (
    <div className="flex flex-col">
      <Avatar
        avatarUrl={avatar.path}
        altText={avatar.type}
        sizeVariant={Sizes.XS}
      />

      <div className="mt-2 flex flex-col">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{email}</span>
          <ArrowIcon />
        </div>
        <span className="text-xs text-gray-medium">{ROLE_USER[role]}</span>
      </div>
    </div>
  );
};
