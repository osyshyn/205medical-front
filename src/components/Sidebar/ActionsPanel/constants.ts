import { ReactComponent as LogoutIcon } from "src/assets/icons/active-panel/logout.svg";
import { ReactComponent as MessageIcon } from "src/assets/icons/active-panel/message-question.svg";
import { IActivePanelItem } from "./types";

export const ACTIVE_PANEL_ITEMS: IActivePanelItem[] = [
  {
    id: 1,
    label: "Message us",
    icon: MessageIcon,
  },
  {
    id: 2,
    label: "Logout",
    icon: LogoutIcon,
  },
];
