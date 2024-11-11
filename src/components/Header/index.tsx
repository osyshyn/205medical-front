import React, { FC } from "react";
import { ReactComponent as WavingHandEmoji } from "src/assets/icons/bag.svg";
import { Button } from "../Button";
import { Greeting } from "./Greeting";
import { Search } from "./Search";

export const Header: FC = () => (
  <header className="flex justify-between">
    <Greeting />

    <div className="flex gap-3">
      <Button className="rounded-xl border border-gray-medium bg-white-base px-1.5 py-1">
        <WavingHandEmoji />
      </Button>

      <Search />
    </div>
  </header>
);
