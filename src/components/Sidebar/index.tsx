import cn from "classnames";
import { ClientLogo } from "src/components/ClientLogo";
import { Logo } from "src/components/Logo";
import useSidebarStore from "src/stores/siderbar-store";
import { AccountCard } from "./AccountCard";
import { ActionsPanel } from "./ActionsPanel";
import { Navigation } from "./Navigation";
import { TourNavigation } from "./TourNavigation";

export const Sidebar = () => {
  const isSidebarCollapsed = useSidebarStore((state) => state.isCartOpen);
  const closeCart = useSidebarStore((state) => state.closeCart);

  return (
    <aside
      className={cn(
        "scrollbar flex h-full w-full flex-col items-center gap-15 overflow-y-scroll rounded-l-3xl border border-gray-soft bg-white-base p-7 pb-20",
        {
          "max-w-28.75": isSidebarCollapsed,
          "max-w-62.5": !isSidebarCollapsed,
        }
      )}
      onClick={closeCart}
    >
      <ClientLogo />
      <Navigation />

      <div className="mt-auto flex flex-col gap-10">
        {!isSidebarCollapsed && <TourNavigation />}

        <div className="flex flex-col gap-5">
          <Logo />
          <hr />
          <AccountCard isEmailShown={!isSidebarCollapsed} />
        </div>

        {!isSidebarCollapsed && <ActionsPanel />}
      </div>
    </aside>
  );
};
