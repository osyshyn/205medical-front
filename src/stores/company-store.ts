import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { ICompany } from "src/@types/company";

interface ICompanyStore {
  company: ICompany | null;
  isLoading: boolean;
  error: string | null;
  fetchCompany: () => Promise<void>;
}

const useCompanyStore = create(
  devtools<ICompanyStore>((set) => ({
    company: null,
    isLoading: false,
    error: null,
    fetchCompany: async () => {
      set({ isLoading: true, error: null });
      try {
        const { data } = await instance.get<ICompany>("company/getCompany");
        if (!data) {
          throw new Error("No company data received");
        }
        set({ company: data });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch company data";
        set({ error: errorMessage });
        NotificationService.error(errorMessage);
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useCompanyStore;
