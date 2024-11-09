import { ClientLogo } from "src/components/ClientLogo";
import { Logo } from "src/components/Logo";
import { AccountCard } from "./AccountCard";
import { Navigation } from "./Navigation";
import { TourNavigation } from "./TourNavigation";

export const Sidebar = () => (
  <aside className="border-gray-soft flex min-w-62.5 flex-col gap-15 rounded-l-3xl border bg-white-base p-7">
    <ClientLogo />
    <Navigation />

    <div className="mt-5 flex flex-col gap-10">
      <TourNavigation />

      <div className="flex flex-col gap-5">
        <Logo />
        <hr />
        <AccountCard />
      </div>
    </div>
  </aside>
);
