import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { ILocation, IOrder, Users } from "src/@types/user";
import { fakeLocations } from "./temp/api/locations";
import { ORDER_DATA } from "./temp/constants";
import logo from "./temp/temp_logo.png";

interface IUserStore {
  type: Users;
  name: string;
  logo: string;
  recent_orders: IOrder[];
  locations: ILocation[];
  updateLocation: (updatedLocation: ILocation, onSuccess: VoidFunction) => void;
  loadLocation: () => void;
}

const useUserStore = create(
  devtools<IUserStore>((set) => ({
    type: Users.SUB_USER,
    name: "Japp",
    logo: logo,
    recent_orders: ORDER_DATA,
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

export default useUserStore;
