import React, { FC } from "react";
import { INoEditFields } from "./types";

interface Props {
  label: string;
  value: string;
}

const Field: FC<Props> = ({ label, value }) => (
  <div className="flex flex-col gap-2 text-sm">
    <span className="font-poppins text-sm font-medium text-gray-dark">
      {label}
    </span>

    <span className="text-gray-medium">{value}</span>
  </div>
);

export const NoEditFields: FC<INoEditFields> = ({ ...fields }) => {
  const { contact_name, contact_email, buyer_name, buyer_email } = fields;

  return (
    <div>
      <div className="grid grid-cols-2">
        <Field label="Contact Name" value={contact_name} />
        <Field label="Contact Email" value={contact_email} />
      </div>

      <hr className="my-6" />

      <div className="grid grid-cols-2">
        <Field label="Buyer Name" value={buyer_name} />
        <Field label="Buyer Email" value={buyer_email} />
      </div>
    </div>
  );
};
