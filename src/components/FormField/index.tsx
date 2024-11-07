import React, { FC, ReactNode } from "react";
import cn from "classnames";
import { Ii18nInterpolationObject } from "src/@types/i18next";
import { Error } from "../Error";
import { Label } from "./Label";
import { FORM_FIELD_STYLE_VARIANTS } from "./constants";
import { FormFieldVariants } from "./types";

interface Props {
  children: ReactNode;
  className?: string;
  labelClassName?: string;
  variant?: FormFieldVariants;
  label?: string | Ii18nInterpolationObject;
  labelFor: string;
  isShownError?: boolean;
  error?: string;
}

export const FormField: FC<Props> = ({
  children,
  className,
  labelClassName,
  variant,
  label,
  labelFor,
  isShownError,
  error,
}) => {
  const combinedClassNames = cn(
    "relative w-full",
    FORM_FIELD_STYLE_VARIANTS[variant],
    className,
    { "flex items-center": label }
  );

  return (
    <div className={combinedClassNames}>
      <Label className={labelClassName} variant={variant} htmlFor={labelFor}>
        {label}
      </Label>
      {children}
      <Error isShownError={isShownError}>{error}</Error>
    </div>
  );
};
