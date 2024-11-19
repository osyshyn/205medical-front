import React, { FC } from "react";
import { Window } from "src/components/Window";
import { useActiveLocation } from "src/hooks/useActiveLocation";

export const EditLocation: FC = () => {
  const { activeLocation } = useActiveLocation();

  return (
    <Window className="flex-1">
      <h3>Ship To</h3>
      <p>{activeLocation?.city}</p>
    </Window>
  );
};
