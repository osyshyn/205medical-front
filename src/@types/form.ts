import { FC } from "react";
import { FormFieldVariants } from "src/components/FormField/types";
import { Ii18nInterpolationObject } from "./i18next";

export interface IOptionSelect {
  value: string | number;
  label: string;
}

export type SetOptionSelect = (option: IOptionSelect) => void;

export interface IFormField {
  id?: string;
  name: string;
  label?: string | Ii18nInterpolationObject;
  type?: string;
  isTextArea?: boolean;
  mask?: (string | RegExp)[];
  placeholder?: string | Ii18nInterpolationObject;
  className?: string;
  fieldClassName?: string;
  labelClassName?: string;
  variant?: FormFieldVariants;
  // options?: IOptionSelect[];
}

export interface IRenderFormField extends IFormField {
  component: FC<IFormField>;
}
