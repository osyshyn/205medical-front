import React, { FC, useState } from "react";
import { ReactComponent as BagIcon } from "src/assets/icons/bag.svg";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";
import { Search } from "../Search";
import { Greeting } from "./Greeting";

export const Header: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="flex justify-between">
      <Greeting />

      <div className="flex gap-3">
        <Button className="px-1.5 py-1" variant={ButtonVariants.WHITE}>
          <BagIcon />
        </Button>

        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </header>
  );
};
