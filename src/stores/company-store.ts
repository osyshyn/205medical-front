import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";

export interface IAddCompanyFormFields {
  company_name: string;
  trade_name: string;
  address: string;
  contact: string;
  phone: string;
  business_type: string;
  date_of_incorporation: string; // Или Date, если предполагается работа с объектами Date
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

interface ICompanyStore {
  companies: any;
  fetchCompanies: () => void;
  createCompany: (params: IAddCompanyFormFields) => void;
  isLoading: boolean;
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
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useCompanyStore;
