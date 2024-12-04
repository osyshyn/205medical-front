import { FC } from "react";
import { useField } from "formik";
import { IFormField } from "src/@types/form";
import { FormField } from ".";
import { SortingDropdownList } from "../SortDropdownList";

export const SelectDropdownListField: FC<IFormField> = ({
  className,
  fieldClassName,
  labelClassName,
  id,
  label,
  options,
  variant,
  ...props
}) => {
  const name = props.name as string;

  const fieldId = id || name;

  const [{ value }, { error, touched }, { setValue }] = useField(fieldId);
  const isShownError = Boolean((touched || value) && error);

  return (
    <div className="flex-1">
      <FormField
        className={fieldClassName}
        labelClassName={labelClassName}
        label={label}
        labelFor={fieldId}
        error={error}
        isShownError={isShownError}
        {...props}
      >
        <SortingDropdownList
          className={className}
          options={options}
          activeOption={value}
          setOption={setValue}
        />
      </FormField>
    </div>
  );
};
