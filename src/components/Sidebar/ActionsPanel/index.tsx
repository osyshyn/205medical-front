import { ActionsPanelItem } from "./ActionsPanelItem";
import { ACTIONS_PANEL_ITEMS } from "./constants";

export const ActionsPanel = () => (
  <ul className="flex flex-col gap-4">
    {ACTIONS_PANEL_ITEMS.map(({ id, ...item }) => (
      <li key={id}>
        <ActionsPanelItem {...item} />
      </li>
    ))}
  </ul>
);
