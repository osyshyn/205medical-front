import { FC } from "react";
import { Avatar } from "src/components/Avatar";
import useUserStore from "src/stores/user-store";
import { ReactComponent as ArrowIcon } from "src/assets/icons/sidebar/account-card/arrow-gray.svg";
import { Sizes } from "src/@types/sizes";
import { ROLE_USER } from "./constants";

interface Props {
  isEmailShown: boolean;
}

export const AccountCard: FC<Props> = ({ isEmailShown }) => {
  const { avatar, email, role, first_name, last_name } = useUserStore(
    (state) => state.user
  );

  const altText = `${first_name} ${last_name} avatar`;

  return (
    <div className="flex flex-col">
      <Avatar
        className="overflow-hidden"
        avatarUrl={avatar.path}
        altText={altText}
        sizeVariant={Sizes.XS}
      />

      {isEmailShown && (
        <div className="mt-2 flex flex-col">
          <div className="flex items-center justify-between gap-2">
            <span className="line-clamp-1 text-sm font-medium">{email}</span>
            <ArrowIcon />
          </div>
          <span className="text-xs text-gray-medium">{ROLE_USER[role]}</span>
        </div>
      )}
    </div>
  );
};
