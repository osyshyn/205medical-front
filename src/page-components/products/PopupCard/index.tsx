import React, { FC } from "react";
import { Button } from "src/components/Button";
import { Window } from "src/components/Window";
import useSidebarStore from "src/stores/siderbar-store";

export const PopupCard: FC = () => {
  const isCartOpen = useSidebarStore((state) => state.isCartOpen);
  const closeCart = useSidebarStore((state) => state.closeCart);

  if (!isCartOpen) return null;

  return (
    <Window className="h-screen !bg-black-base">
      <Button className="text-center text-white-base" onClick={closeCart}>
        CLOSE
      </Button>
      <p className="text-center text-white-base">PopupCard</p>
    </Window>
  );
};
