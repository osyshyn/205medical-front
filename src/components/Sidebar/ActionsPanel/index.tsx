import useAuthStore from "src/stores/auth-store";
import { ReactComponent as LogoutIcon } from "src/assets/icons/sidebar/active-panel/logout.svg";
import { ReactComponent as MessageIcon } from "src/assets/icons/sidebar/active-panel/message-question.svg";
import { ActionsPanelItem } from "./ActionsPanelItem";

export const ActionsPanel = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex flex-col gap-4">
      <ActionsPanelItem
        icon={MessageIcon}
        label="Message us"
        onClick={logout}
      />

      <ActionsPanelItem icon={LogoutIcon} label="Logout" onClick={logout} />
    </div>
  );
};
