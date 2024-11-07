import React, { FC, KeyboardEvent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input/input";
import MaskedInput from "react-text-mask";
import cn from "classnames";
import { useField, useFormikContext } from "formik";
import { IFormField } from "src/@types/form";
import { FormField } from ".";
import { TEXT_INPUT_STYLE_VARIANTS } from "./constants";
import { FormFieldVariants } from "./types";

export const TextInput: FC<IFormField> = ({
  className,
  fieldClassName,
  labelClassName,
  id,
  label,
  variant = FormFieldVariants.PRIMARY,
  placeholder,
  isTextArea,
  ...props
}) => {
  const { t } = useTranslation();

  const fieldId = id || props.name;

  const { handleSubmit } = useFormikContext();
  const [{ value, onChange, ...field }, { error, touched }, { setValue }] =
    useField(fieldId);
  const isShownError = Boolean((touched || value) && error);

  const onKeyDownEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const placeholderText =
    typeof placeholder === "string"
      ? placeholder
      : placeholder && t(placeholder.i18nKey, placeholder.i18nParams);

  const combinedClassNames = cn(
    "w-full outline-none",
    TEXT_INPUT_STYLE_VARIANTS[variant],
    className,
    { "resize-y": isTextArea }
  );

  // const Tag = isTextArea ? "textarea" : "input";
  // const InputComponent = props?.mask ? MaskedInput : Tag;

  const isTelField = props?.type === "tel";

  const InputComponent = useMemo(() => {
    if (isTelField) {
      return PhoneInput;
    }
    if (props?.mask) {
      return MaskedInput;
    } else if (isTextArea) {
      return "textarea";
    } else {
      return "input";
    }
  }, [props?.mask, isTextArea, isTelField]);

  const onChangePhoneValue = (inputValue: string) => {
    if (inputValue) {
      setValue(inputValue);
    }
  };

  return (
    <FormField
      className={fieldClassName}
      labelClassName={labelClassName}
      variant={variant}
      label={label}
      labelFor={fieldId}
      isShownError={isShownError}
      error={error}
    >
      <InputComponent
        id={fieldId}
        className={combinedClassNames}
        value={value}
        placeholder={placeholderText}
        maxLength={isTelField ? 20 : null}
        onChange={isTelField ? onChangePhoneValue : onChange}
        {...props}
        {...field}
        // Placed here to override the Formik default onKeyDown function
        onKeyDown={onKeyDownEnter}
      />
    </FormField>
  );
};
