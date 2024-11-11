import React, { FC } from "react";
import wavingHandEmoji from "src/assets/images/header/waving-hand-emoji.png";

//temp
const NAME_USER = "Japp";

export const Greeting: FC = () => (
  <div className="flex items-center gap-1.5">
    <span className="text-2xl font-medium">Hello {NAME_USER}</span>
    <img className="h-6 w-6" src={wavingHandEmoji} alt="Waving hand emoji" />
  </div>
);
