import { FC } from "react";
import { FormFieldVariants } from "src/components/FormField/types";

export interface IOptionSelect {
  value: string | number;
  label: string;
}

export type SetOptionSelect = (option: IOptionSelect) => void;

export interface IFormField {
  id?: string;
  name: string;
  label?: string;
  type?: string;
  isTextArea?: boolean;
  mask?: (string | RegExp)[];
  placeholder?: string;
  className?: string;
  fieldClassName?: string;
  labelClassName?: string;
  variant?: FormFieldVariants;
  disabled?: boolean;
  // options?: IOptionSelect[];
}

export interface IRenderFormField extends IFormField {
  component: FC<IFormField>;
}
