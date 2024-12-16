import React, { FC } from "react";
import { RenderFormFields } from "src/components/RenderFormFields";
import { CREATE_ORDER_FORM_FIELDS } from "../constants";

export const CustomerInfo: FC = () => {
  return (
    <div>
      <h3>Customer Information</h3>

      <div className="mt-5 grid grid-cols-2 gap-6">
        <RenderFormFields fields={CREATE_ORDER_FORM_FIELDS} />
      </div>
    </div>
  );
};
