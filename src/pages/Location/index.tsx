import React, { FC, useEffect } from "react";
import { ActiveLocation } from "src/page-components/location/ActiveLocation";
import { EditLocation } from "src/page-components/location/EditLocation";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Loader } from "src/components/Loader";
import { Title } from "src/components/Title";
import useLocationStore from "src/stores/location-store";
import { Sizes } from "src/@types/sizes";

const Location: FC = () => {
  const loadLocation = useLocationStore((state) => state.fetchLocation);
  const isLoading = useLocationStore((state) => state.isLoadingFetch);

  useEffect(() => {
    loadLocation();
  }, [loadLocation]);

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <Title
        title="Location"
        subtitle="The following addresses will be used on the checkout page by default."
      />

      {isLoading ? (
        <Loader className="flex h-full items-center" size={Sizes.XXL} />
      ) : (
        <section className="flex gap-10">
          <ActiveLocation />
          <EditLocation />
        </section>
      )}
    </PageWrapper>
  );
};

export default Location;
