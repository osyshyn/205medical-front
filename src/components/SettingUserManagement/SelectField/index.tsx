import React, { useEffect, useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(
    values[name]
      ? options.find((option) => option.value === values[name])?.label
      : null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: number, label: string) => {
    setFieldValue(name, value);
    setSelectedLabel(label);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={cn("flex flex-col", className)} ref={dropdownRef}>
      <label
        className={cn(
          "mb-1 block text-sm font-medium text-gray-dark",
          labelClassName
        )}
      >
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          className={cn(
            "bg-white w-full rounded-md border border-gray-300 p-2.5 text-left text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200",
            fieldClassName,
            { "cursor-not-allowed opacity-50": disabled }
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          {selectedLabel || placeholder || "Select an option"}
        </button>
        {isOpen && (
          <ul className="bg-white absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 shadow-lg">
            {options.map((option) => (
              <li
                key={option.value}
                className="cursor-pointer bg-white-base px-4 py-2 hover:bg-blue-100"
                onClick={() => handleSelect(option.value, option.label)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
