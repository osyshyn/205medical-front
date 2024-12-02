import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { ILocation } from "src/@types/location";

interface ILocationStore {
  locations: ILocation[];
  updateLocation: (updatedLocation: ILocation, onSuccess: VoidFunction) => void;
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
        await instance.post<ILocation>("/location/update", {
          id: updatedLocation.id,
          name: updatedLocation.name,
          address_1: updatedLocation.address_1,
          address_2: updatedLocation.address_2,
          city: updatedLocation.city,
          state: updatedLocation.state,
          zip_code: updatedLocation.zip_code,
        });

        set((state) => ({
          locations: state.locations.map((location) =>
            location.slug === updatedLocation.slug ? updatedLocation : location
          ),
        }));

        NotificationService.updateToSuccess(toastId);
        onSuccess();
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
        const { data } = await instance.get<ILocation[]>("/location");

        set({ locations: data });
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
