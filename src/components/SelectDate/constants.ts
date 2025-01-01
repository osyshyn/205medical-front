import { IOptionSelect } from "src/@types/form";

export const MONTH_OPTIONS_SELECT: IOptionSelect[] = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

export const YEARS_OPTIONS_SELECT: IOptionSelect[] = Array.from(
  { length: 6 },
  (_, index) => {
    const year = 2020 + index;
    return { label: year.toString(), value: year };
  }
);

export function getCurrentMonthOption(): IOptionSelect {
  const currentMonth = new Date().getMonth() + 1;
  return MONTH_OPTIONS_SELECT.find((option) => option.value === currentMonth);
}

export function getCurrentYearOption(): IOptionSelect {
  const currentYear = new Date().getFullYear();
  return YEARS_OPTIONS_SELECT.find((option) => option.value === currentYear);
}
