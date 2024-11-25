import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { ILocation } from "src/@types/user";
import { fakeLocations } from "./temp/api/locations";

interface ILocationStore {
  locations: ILocation[];
  updateLocation: (updatedLocation: ILocation, onSuccess: VoidFunction) => void;
  loadLocation: () => void;
}

const useLocationStore = create(
  devtools<ILocationStore>((set) => ({
    locations: [],
    updateLocation: async (updatedLocation: ILocation) => {
      const toastId = NotificationService.loading();

      try {
        const updatedData = await fakeLocations.update(
          updatedLocation.slug,
          updatedLocation
        );

        set((state) => ({
          locations: state.locations.map((location) =>
            location.slug === updatedLocation.slug ? updatedData : location
          ),
        }));

        NotificationService.updateToSuccess(toastId);
      } catch (error) {
        NotificationService.updateToError(toastId);
      }
    },
    loadLocation: async () => {
      try {
        const loadData = await fakeLocations.getAll();

        set(() => ({
          locations: loadData,
        }));
      } catch (error) {
        NotificationService.error();
      }
    },
  }))
);

export default useLocationStore;
