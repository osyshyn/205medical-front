import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ILocation, IOrder, Users } from "src/@types/user";
import { LOCATION_DATA, ORDER_DATA } from "./temp";

interface IUserStore {
  type: Users;
  name: string;
  recent_orders: IOrder[];
  locations: ILocation[];
  updateLocation: (updatedLocation: ILocation) => void;
}

const useUserStore = create(
  devtools<IUserStore>((set) => ({
    type: Users.SUB_USER,
    name: "Japp",
    recent_orders: ORDER_DATA,
    locations: LOCATION_DATA,
    updateLocation: (updatedLocation) => {
      set((state) => ({
        locations: state.locations.map((location) =>
          location.slug === updatedLocation.slug ? updatedLocation : location
        ),
      }));
    },
  }))
);

export default useUserStore;
