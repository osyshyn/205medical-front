import React, { FC, ReactNode } from "react";
import cn from "classnames";
import { Error } from "../Error";
import { FORM_FIELD_STYLE_VARIANTS } from "./constants";
import { Label } from "./Label";
import { FormFieldVariants } from "./types";

interface Props {
  children: ReactNode;
  className?: string;
  labelClassName?: string;
  variant?: FormFieldVariants;
  label?: string;
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
    { "flex flex-col gap-2.5": label }
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
