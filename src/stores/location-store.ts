import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { ILocation } from "src/@types/users";
import { fakeLocations } from "./temp/api/locations";

interface ILocationStore {
  locations: ILocation[];
  updateLocation: (
    updatedLocation: ILocation,
    onSuccess?: VoidFunction
  ) => void;
  isLoadingUpdate: boolean;
  fetchLocation: () => void;
  isLoadingFetch: boolean;
}

const useLocationStore = create(
  devtools<ILocationStore>((set) => ({
    locations: [],
    updateLocation: async (
      updatedLocation: ILocation,
      onSuccess?: VoidFunction
    ) => {
      const toastId = NotificationService.loading();

      set({ isLoadingUpdate: true });
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
        onSuccess?.();
      } catch (error) {
        NotificationService.updateToError(toastId);
      } finally {
        set({ isLoadingUpdate: false });
      }
    },
    isLoadingUpdate: false,
    fetchLocation: async () => {
      set({ isLoadingFetch: true });
      try {
        const loadData = await fakeLocations.getAll();

        set(() => ({
          locations: loadData,
        }));
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoadingFetch: false });
      }
    },
    isLoadingFetch: false,
  }))
);

export default useLocationStore;
