import { useField } from "formik";

export const SelectField = ({ label, name, options }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-dark">
        {label}
      </label>
      <select
        {...field}
        value={field.value || ""}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          helpers.setValue(value);
        }}
        className="w-full rounded-md border border-gray-300 p-2.5 text-gray-700"
      >
        <option value="" disabled>
          Select a category
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};
