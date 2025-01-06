import React, { FC, useEffect } from "react";
import { useFormikContext } from "formik";
import { RenderFormFields } from "src/components/RenderFormFields";
import { CREATE_ORDER_FORM_FIELDS } from "../constants";

export const CustomerInfo: FC = () => {
  const { values, setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0]; // Формат YYYY-MM-DD
    setFieldValue("po_date", currentDate);
  }, [setFieldValue]);

  useEffect(() => {
    if (!values.po_date || !values.rush_service) return;

    const poDate = new Date(values.po_date);
    let daysToAdd = 0;

    // Визначення кількості днів залежно від rush_service
    switch (Number(values.rush_service)) {
      case 2: // 2 Day
        daysToAdd = 2;
        break;
      case 3: // Priority Overnight
        daysToAdd = 1;
        break;
      default: // None
        daysToAdd = 4;
        break;
    }

    // Вираховування дати доставки
    const expectedDate = new Date(poDate);
    expectedDate.setDate(poDate.getDate() + daysToAdd);
    const formattedDate = expectedDate.toISOString().split("T")[0];

    setFieldValue("expected_delivery_date", formattedDate);
  }, [values.po_date, values.rush_service, setFieldValue]);

  return (
    <div>
      <h3>Customer Information</h3>

      <div className="mt-5 grid grid-cols-2 gap-6">
        <RenderFormFields fields={CREATE_ORDER_FORM_FIELDS} />
      </div>
    </div>
  );
};
