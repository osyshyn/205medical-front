import { FC } from "react";
import { useField } from "formik";
import { IFormField, IOptionSelect, SetOptionSelect } from "src/@types/form";
import { FormField } from ".";
import { SelectDropdownList } from "../SelectDropdownList";

interface Props {
  formFieldProps: IFormField;
  options?: IOptionSelect[];
  headLabel?: string;
  headLabelclassName?: string;
  onChange?: (option: IOptionSelect) => void;
}

export const SelectDropdownListField: FC<Props> = ({
  formFieldProps: {
    className,
    fieldClassName,
    labelClassName,
    id,
    label,
    ...props
  },
  options,
  headLabel,
  headLabelclassName,
  onChange = () => {},
}) => {
  const name = props.name as string;

  const fieldId = id || name;

  const [{ value }, { error, touched }, { setValue }] = useField(fieldId);
  const isShownError = Boolean((touched || value) && error);

  const setOption: SetOptionSelect = (newOption) => {
    setValue(newOption);
    onChange(newOption);
  };

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
        <SelectDropdownList
          headLabelclassName={headLabelclassName}
          headLabel={headLabel}
          className={className}
          options={options}
          activeOption={value}
          setOption={setOption}
        />
      </FormField>
    </div>
  );
};
