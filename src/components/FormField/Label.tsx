import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { Ii18nInterpolationObject } from "src/@types/i18next";
import { LABEL_STYLE_VARIANTS } from "./constants";
import { FormFieldVariants } from "./types";

interface Props {
  children: string | Ii18nInterpolationObject;
  className?: string;
  variant?: FormFieldVariants;
  htmlFor?: string;
}

export const Label: FC<Props> = ({ className, children, variant, htmlFor }) => {
  const { t } = useTranslation();

  if (!children) return null;

  const labelText =
    typeof children === "string"
      ? children
      : t(children.i18nKey, children.i18nParams);

  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "whitespace-nowrap",
        LABEL_STYLE_VARIANTS[variant],
        className
      )}
    >
      {labelText}
    </label>
  );
};
