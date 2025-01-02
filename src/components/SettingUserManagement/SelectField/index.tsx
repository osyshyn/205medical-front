export const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-dark">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-gray-300 p-2.5 text-gray-700"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
