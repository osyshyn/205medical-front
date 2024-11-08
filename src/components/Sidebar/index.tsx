import { ClientLogo } from "../ClientLogo";
import { Logo } from "../Logo";
import { Navigation } from "./Navigation";
import { TourNavigation } from "./TourNavigation";

export const Sidebar = () => (
  <aside className="min-w-62.5 flex flex-col gap-15 rounded-l-3xl border border-r-0 bg-white-base p-7">
    <ClientLogo />
    <Navigation />

    <div className="mt-5 flex flex-col gap-10">
      <TourNavigation />
      <Logo />
      <hr />
    </div>
  </aside>
);
