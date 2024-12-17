import cn from "classnames";
import { ClientLogo } from "src/components/ClientLogo";
import { Logo } from "src/components/Logo";
import useCartStore from "src/stores/cart-store";
import { AccountCard } from "./AccountCard";
import { ActionsPanel } from "./ActionsPanel";
import { Navigation } from "./Navigation";
import { TourNavigation } from "./TourNavigation";

export const Sidebar = () => {
  const isSidebarCollapsed = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);

  return (
    <aside
      className={cn(
        "scrollbar flex h-full flex-col items-center gap-15 overflow-y-scroll rounded-l-3xl border border-gray-soft bg-white-base p-7 pb-20 transition-all duration-200 ease-in-out",
        {
          "min-w-28.75": isSidebarCollapsed,
          "min-w-62.5": !isSidebarCollapsed,
        }
      )}
      onClick={closeCart}
    >
      <ClientLogo />
      <Navigation isSidebarCollapsed={isSidebarCollapsed} />

      <div className="flex w-full flex-col gap-10">
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
