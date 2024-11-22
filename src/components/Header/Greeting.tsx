import React, { FC } from "react";
import useUserStore from "src/stores/user-store";
import wavingHandEmoji from "src/assets/images/header/waving-hand-emoji.png";

export const Greeting: FC = () => {
  const name = useUserStore((state) => state.name);

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-2xl font-medium">Hello {name}</span>
      <img className="h-6 w-6" src={wavingHandEmoji} alt="Waving hand emoji" />
    </div>
  );
};
