import { ClientLogo } from "src/components/ClientLogo";
import { Logo } from "src/components/Logo";
import { AccountCard } from "./AccountCard";
import { ActionsPanel } from "./ActionsPanel";
import { Navigation } from "./Navigation";
import { TourNavigation } from "./TourNavigation";

export const Sidebar = () => (
  <aside className="scrollbar h-full flex flex-col gap-15 overflow-y-scroll rounded-l-3xl border border-gray-soft bg-white-base p-7 pb-20">
    <ClientLogo />
    <Navigation />

    <div className="mt-5 flex flex-col gap-10">
      <TourNavigation />

      <div className="flex flex-col gap-5">
        <Logo />
        <hr />
        <AccountCard />
      </div>

      <ActionsPanel />
    </div>
  </aside>
);
