import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { IResponseWithPagination } from "src/@types/api";
import { IInvoice } from "src/@types/invoice";

export interface FetchInvoiceParams {
  search: string;
  current_page: number;
  year: string;
  month: string;
  su_users_ids?: any[];
  location_ids?: string[];
  product_ids?: string[];
}

interface IInvoiceStore {
  invoice: IResponseWithPagination<IInvoice>;
  fetchinvoice: (params: FetchInvoiceParams) => void;
  isLoading: boolean;
}

export const ORDERS_PER_PAGE = 8;

const useInvoiceStore = create(
  devtools<IInvoiceStore>((set) => ({
    invoice: null,
    isLoading: false,
    fetchinvoice: async (params) => {
      set({ isLoading: true });

      console.log("Params: ", params);

      try {
        const { data } = await instance.get<IResponseWithPagination<IInvoice>>(
          `invoice?&items_per_page=${ORDERS_PER_PAGE}/`,
          { params }
        );

        set({ invoice: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useInvoiceStore;
