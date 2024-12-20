import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import {
  ICreateLocation,
  ILocation,
  IResponseLocation,
  IUpdateLocation,
} from "src/@types/location";

interface ILocationStore {
  locations: ILocation[];
  updateLocation: (updatedLocation: ILocation, onSuccess: VoidFunction) => void;
  updateDeepLocation: (
    updatedLocation: IUpdateLocation,
    onSuccess: VoidFunction
  ) => void;
  isLoadingUpdate: boolean;
  fetchLocation: () => void;
  location: IResponseLocation;
  fetchLocationById: (id: number) => void;
  isLoadingFetch: boolean;
  getLocationAvailableProducts: (locationId?: number) => void;
  available_products: number[];
  isLoadingAvailableProducts: boolean;
  deleteLocation: (id: number) => void;
  createLocation: (newLocation: ICreateLocation) => void;
}

const useLocationStore = create(
  devtools<ILocationStore>((set) => ({
    locations: [],
    updateLocation: async (
      updatedLocation: ILocation,
      onSuccess?: VoidFunction
    ) => {
      const toastId = NotificationService.loading();
      debugger;

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
          contact_name: updatedLocation.contact_name,
          contact_email: updatedLocation.contact_email,
          buyer_name: updatedLocation.buyer_name,
          buyer_email: updatedLocation.buyer_email,
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
    updateDeepLocation: async (
      updatedLocation: IUpdateLocation,
      onSuccess?: VoidFunction
    ) => {
      const toastId = NotificationService.loading();
      debugger;
      console.log("Updated Location: ", updatedLocation);
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
          contact_name: updatedLocation.contact_name,
          contact_email: updatedLocation.contact_email,
          buyer_name: updatedLocation.buyer_name,
          buyer_email: updatedLocation.buyer_email,
          location_products_id: updatedLocation.location_products_id,
          location_users_id: updatedLocation.location_users_id,
        });

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
    getLocationAvailableProducts: async (id) => {
      set({ isLoadingAvailableProducts: true });
      try {
        const { data } = await instance.get<number[]>(
          `/location/getAvailableLocationProducts?id=${id}`
        );
        set({ available_products: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoadingAvailableProducts: false });
      }
    },
    available_products: [],
    isLoadingAvailableProducts: false,
    deleteLocation: async (id) => {
      set({ isLoadingUpdate: true });
      try {
        await instance.post("/location/delete", { id });
        NotificationService.success("Location deleted successfully.");
        set((state) => ({
          locations: state.locations.filter((location) => location.id !== id),
        }));
      } catch (error) {
        NotificationService.error("Failed to delete location.");
      } finally {
        set({ isLoadingUpdate: false });
      }
    },
    createLocation: async (newLocation) => {
      set({ isLoadingUpdate: true });
      try {
        const { data } = await instance.post<ILocation>(
          "/location/createLocation",
          newLocation
        );

        NotificationService.success("Location created successfully.");
        set((state) => ({
          locations: [...state.locations, data],
        }));
      } catch (error) {
        NotificationService.error("Failed to create location.");
      } finally {
        set({ isLoadingUpdate: false });
      }
    },
    location: {} as IResponseLocation,
    fetchLocationById: async (id) => {
      set({ isLoadingFetch: true });
      try {
        const { data } = await instance.get<IResponseLocation>(
          `/location/getLocation/${id}`
        );
        set({ location: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoadingFetch: false });
      }
    },
  }))
);

export default useLocationStore;
