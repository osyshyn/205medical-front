import React, { FC, useState } from "react";
import { ReactComponent as WavingHandEmoji } from "src/assets/icons/bag.svg";
import { Button } from "../Button";
import { Search } from "../Search";
import { Greeting } from "./Greeting";

export const Header: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="flex justify-between">
      <Greeting />

      <div className="flex gap-3">
        <Button className="rounded-xl border border-gray-medium bg-white-base px-1.5 py-1">
          <WavingHandEmoji />
        </Button>

        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </header>
  );
};
