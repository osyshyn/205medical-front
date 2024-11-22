import React, { FC } from "react";
import { Window } from "src/components/Window";
import { useActiveLocation } from "src/hooks/useActiveLocation";
import { LocationButton } from "./LocationButton";

export const ActiveLocation: FC = () => {
  const { locations, activeSlug } = useActiveLocation();

  return (
    <Window className="w-1/3">
      <h3>Active Locations</h3>
      <div className="mt-5 flex flex-col gap-3">
        {locations.map((location) => (
          <LocationButton
            key={location.slug}
            isActive={location.slug === activeSlug}
            location={location}
          />
        ))}
      </div>
    </Window>
  );
};
