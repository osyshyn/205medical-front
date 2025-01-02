export const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-dark">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-gray-300 p-2.5 text-gray-700"
      placeholder={placeholder || label}
    />
  </div>
);
