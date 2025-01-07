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

export interface PaidInvoicesParams {
  invoice_ids: number[];
}

interface IInvoiceStore {
  invoice: IResponseWithPagination<IInvoice> | null;
  invoiceOpen: IResponseWithPagination<IInvoice> | null;
  invoicePaid: IResponseWithPagination<IInvoice> | null;
  fetchinvoice: (params: FetchInvoiceParams) => void;
  isLoadingOpen: boolean;
  isLoadingPaid: boolean;
  isLoading: boolean;
  paidInvoices: (params: PaidInvoicesParams) => Promise<void>;
  fetchOpenInvoices: (params: FetchInvoiceParams) => Promise<void>;
  fetchPaidInvoices: (params: FetchInvoiceParams) => Promise<void>;
}

export const ORDERS_PER_PAGE = 8;

const useInvoiceStore = create(
  devtools<IInvoiceStore>((set) => ({
    invoice: null,
    invoiceOpen: null,
    invoicePaid: null,
    isLoading: false,
    isLoadingOpen: false,
    isLoadingPaid: false,
    fetchinvoice: async (params) => {
      set({ isLoading: true });

      try {
        const { data } = await instance.get<IResponseWithPagination<IInvoice>>(
          `invoice?&items_per_page=${ORDERS_PER_PAGE}`,
          { params }
        );

        set({ invoice: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
    paidInvoices: async ({ invoice_ids }) => {
      try {
        await instance.post("invoice/paidInvoices", { invoice_ids });
        NotificationService.success("Invoices marked as paid successfully.");
      } catch (error) {
        NotificationService.error("Failed to mark invoices as paid.");
      }
    },
    fetchOpenInvoices: async (params) => {
      set({ isLoadingOpen: true });
      try {
        const { data } = await instance.get<IResponseWithPagination<IInvoice>>(
          `invoice?status=1&items_per_page=${ORDERS_PER_PAGE}`,
          { params }
        );
        set({ invoiceOpen: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoadingOpen: false });
      }
    },
    fetchPaidInvoices: async (params) => {
      set({ isLoadingPaid: true });
      try {
        const { data } = await instance.get<IResponseWithPagination<IInvoice>>(
          `invoice?status=2&items_per_page=${ORDERS_PER_PAGE}`,
          { params }
        );
        set({ invoicePaid: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoadingPaid: false });
      }
    },
  }))
);

export default useInvoiceStore;
