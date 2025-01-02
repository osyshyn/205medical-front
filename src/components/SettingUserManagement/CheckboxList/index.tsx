export const CheckboxList = ({ items, setItems, labelKey = "label" }) => (
  <div className="rounded-lg bg-gray-50 p-4">
    {items.map((item, index) => (
      <div key={index} className="mb-2 flex items-center">
        <input
          type="checkbox"
          checked={item.isSelected}
          onChange={() => {
            const updatedItems = [...items];
            updatedItems[index].isSelected = !updatedItems[index].isSelected;
            setItems(updatedItems);
          }}
          className="mr-3 h-4 w-4 rounded border-gray-300"
        />
        <span className="text-sm text-gray-700">{item[labelKey]}</span>
      </div>
    ))}
  </div>
);
