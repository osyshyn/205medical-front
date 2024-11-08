import { ClientLogo } from "../ClientLogo";
import { Navigation } from "./Navigation";

export const Sidebar = () => (
  <aside className="flex flex-col gap-15 min-w-62.5 rounded-l-3xl border border-r-0 bg-white-base p-7">
    <ClientLogo />
    <Navigation />
  </aside>
);
