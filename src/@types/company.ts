export interface ICompany {
  id: number;
  created_at: string;
  company_name: string;
  logo: string | null;
  users: IUser[];
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
}
