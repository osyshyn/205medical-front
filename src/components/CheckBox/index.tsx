import { FC, InputHTMLAttributes, useState } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  ...props
}) => {
  return (
    <label className="inline-flex cursor-pointer items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
        {...props}
      />
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-md border-2 border-gray-700 ${
          checked ? "bg-white" : "bg-transparent"
        }`}
      >
        {checked && (
          <svg
            className="h-4 w-4 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </div>
      <span className="text-gray-700">{label}</span>
    </label>
  );
};
