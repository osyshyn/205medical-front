import React, { FC, useEffect } from "react";
import { ActiveLocation } from "src/page-components/location/ActiveLocation";
import { EditLocation } from "src/page-components/location/EditLocation";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Title } from "src/components/Title";
import useLocationStore from "src/stores/location-store";

const Location: FC = () => {
  const loadLocation = useLocationStore((state) => state.loadLocation);
  const locations = useLocationStore((state) => state.locations);

  useEffect(() => {
    loadLocation();
  }, [loadLocation]);

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <Title
        title="Location"
        subtitle="The following addresses will be used on the checkout page by default."
      />

      {locations.length !== 0 ? (
        <section className="flex gap-10">
          <ActiveLocation />
          <EditLocation />
        </section>
      ) : (
        <p>LOADING....</p>
      )}
    </PageWrapper>
  );
};

export default Location;
