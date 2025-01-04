import cn from "classnames";
import { useFormikContext } from "formik";

interface SelectFieldProps {
  name: string;
  label: string;
  options: { label: string; value: number }[];
  className?: string;
  fieldClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  className,
  fieldClassName,
  labelClassName,
  disabled,
  placeholder,
}) => {
  const { setFieldValue, values } = useFormikContext<any>();

  return (
    <div className={cn("flex flex-col", className)}>
      <label
        className={cn(
          "mb-1 block text-sm font-medium text-gray-dark",
          labelClassName
        )}
      >
        {label}
      </label>
      <select
        name={name}
        value={values[name] || ""}
        onChange={(e) => {
          setFieldValue(name, Number(e.target.value));
        }}
        disabled={disabled}
        className={cn(
          "w-full rounded-md border border-gray-300 p-2.5 text-gray-700",
          fieldClassName
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
