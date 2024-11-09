import { ReactComponent as LogoutIcon } from "src/assets/icons/active-panel/logout.svg";
import { ReactComponent as MessageIcon } from "src/assets/icons/active-panel/message-question.svg";
import { IActionsPanelItem } from "./types";

export const ACTIONS_PANEL_ITEMS: IActionsPanelItem[] = [
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
