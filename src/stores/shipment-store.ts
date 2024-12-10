import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { IResponseWithPagination } from "src/@types/api";
import { IShipment } from "src/@types/shipments";

interface FetcShipmentParams {
  current_page: number;
  year: string;
  month: string;
}

interface IShipmentStore {
  shipment: IResponseWithPagination<IShipment>;
  fetcShipment: (params: FetcShipmentParams) => void;
  isLoading: boolean;
}

export const SHIPMENT_PER_PAGE = 2;

const useShipmentStore = create(
  devtools<IShipmentStore>((set) => ({
    shipment: null,
    isLoading: false,
    fetcShipment: async (params) => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get<IResponseWithPagination<IShipment>>(
          `shipment/getShipments?&items_per_page=${SHIPMENT_PER_PAGE}`,
          { params }
        );

        set({ shipment: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useShipmentStore;
