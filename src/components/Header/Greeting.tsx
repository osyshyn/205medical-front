import React, { FC } from "react";
import useUserStore from "src/stores/user-store";
import wavingHandEmoji from "src/assets/images/header/waving-hand-emoji.png";

export const Greeting: FC = () => {
  const first_name = useUserStore((state) => state.first_name);

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-2xl font-medium">Hello {first_name}</span>
      <img className="h-6 w-6" src={wavingHandEmoji} alt="Waving hand emoji" />
    </div>
  );
};
