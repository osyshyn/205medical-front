import React from "react";

interface Location {
  id: number;
  name: string;
}

interface LocationsProps {
  locations: Location[];
}

export const Locations: React.FC<LocationsProps> = ({ locations }) => {
  return (
    <div className="min-h-62.5">
      <h4 className="!font-medium text-gray-dark">Approved locations</h4>
      <dl className="ml-5 mt-1 flex flex-col gap-4 text-[14px] font-[400]">
        {locations?.length > 0 &&
          locations?.map((location) => (
            <li className="text-gray-steel" key={location.id}>
              {location.name}
            </li>
          ))}
      </dl>
    </div>
  );
};
