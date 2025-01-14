import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { ICompany } from "src/@types/company";

export interface IAddCompanyFormFields {
  company_name: string;
  trade_name: string;
  address: string;
  contact: string;
  phone: string;
  business_type: string;
  date_of_incorporation: string;
  state_of_incorporation: string;
  federal_tax_id: string;
  duns_no: string;
  sic_code: string;
  years_in_business: string;
  website: string;
  primary_contact: string;
  email: string;
  invoicing_address: string;
  invoicing_contact: string;
  invoicing_email: string;
  invoicing_city: string;
  invoicing_state: string;
  invoicing_zip: string;
  invoicing_fax: string;
  payment_method: string;
  purchasing_contact: string;
  purchasing_phone: string;
  purchasing_email: string;
  owner_name: string;
  owner_position: string;
  owner_ownership: string;
  owner_address: string;
  owner_phone: string;
  owner_email: string;
  bank_name: string;
  bank_number: string;
  bank_contact: string;
  bank_phone: string;
  bank_email: string;
  bank_address: string;
  credit_first_name: string;
  credit_contact: string;
  credit_phone: string;
  credit_fax: string;
  credit_email: string;
  credit_address: string;
  logo: string;
}

export interface IEditCompanyFormFields extends IAddCompanyFormFields {
  id: number | string;
}

interface ICompanyStore {
  companies: any;
  fetchCompanies: () => void;
  createCompany: (params: IAddCompanyFormFields) => void;
  company: ICompany | null;
  companyById: IEditCompanyFormFields;
  isLoading: boolean;
  error: string | null;
  fetchCompany: () => Promise<void>;
  deleteCompany: (id: number) => void;
  fetchCompanyById: (id: string) => void;
  updateCompany: (data: IEditCompanyFormFields) => void;
}

const useCompanyStore = create(
  devtools<ICompanyStore>((set) => ({
    isLoading: false,
    companies: null,
    fetchCompanies: async () => {
      set({ isLoading: true });

      try {
        const { data } = await instance.get("company/getCompany");
        set({ companies: data });
      } catch (error) {
        NotificationService.error(error);
      }
    },
    createCompany: async (params: IAddCompanyFormFields) => {
      set({ isLoading: true });
      try {
        await instance.post("company/createCompany", params);

        NotificationService.success("Company created successfully");
      } catch (error) {
        NotificationService.error("Failed to create company");
      }
    },
    company: null,
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
    deleteCompany: async (id) => {
      set({ isLoading: true, error: null });
      try {
        const { data } = await instance.delete("company/deleteCompany", {
          data: { id }, // Передаем тело запроса
        });
        NotificationService.success(data);
      } catch (error) {
        NotificationService.error(error.message);
      } finally {
        set({ isLoading: false });
      }
    },
    companyById: null,
    fetchCompanyById: async (id) => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get(`company/${id}`);
        set({ companyById: data });
      } catch (error) {
        NotificationService.error(error);
      } finally {
        set({ isLoading: false });
      }
    },
    updateCompany: async (params) => {
      set({ isLoading: true });
      try {
        await instance.post(`company/updateCompany`, params);
        NotificationService.success();
      } catch (error) {
        NotificationService.error(error);
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useCompanyStore;
