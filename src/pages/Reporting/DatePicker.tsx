import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DatePickerWindowProps {
  onDateRangeChange: (range: { startDate: Date; endDate: Date }) => void;
}

const DatePickerWindow: React.FC<DatePickerWindowProps> = ({
  onDateRangeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const toggleWindow = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (ranges: any) => {
    const newRange = {
      startDate: ranges.selection.startDate.toISOString(),
      endDate: ranges.selection.endDate.toISOString(),
    };
    setDateRange([ranges.selection]);
    onDateRangeChange(newRange);
  };

  return (
    <div className="relative">
      <p onClick={toggleWindow} className="cursor-pointer underline">
        Choose a Date
      </p>

      {isOpen && (
        <div className="bg-white absolute left-[-120%] top-12 z-10 rounded-lg border shadow-lg">
          <DateRangePicker
            onChange={handleSelect}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            months={2}
            direction="horizontal"
            preventSnapRefocus={true}
            inputRanges={[]}
            rangeColors={["#6b46c1"]}
            className="w-full"
          />
          <div className="flex justify-end bg-white-base p-4">
            <button
              onClick={toggleWindow}
              className="rounded-md border border-purple-600 px-4 py-2 text-purple-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerWindow;
