import { ActivePanelItem } from "./ActivePanelItem";
import { ACTIVE_PANEL_ITEMS } from "./constants";

export const ActionsPanel = () => (
  <ul className="flex flex-col gap-4">
    {ACTIVE_PANEL_ITEMS.map(({ id, ...item }) => (
      <li key={id}>
        <ActivePanelItem {...item} />
      </li>
    ))}
  </ul>
);
