import React from "react";

interface ContactInfoProps {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  role: string | number;
  purchaseLimit: number;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  first_name,
  last_name,
  phone,
  email,
  role,
  purchaseLimit,
}) => {
  const fullName = `${first_name} ${last_name}`;

  return (
    <div className="flex border-b-1 pb-8">
      <div className="flex-1 flex-col gap-12">
        <div className="flex gap-2">
          <h5 className="text-[#344054A1]">Name:</h5>
          <h5 className="text-gray-dark">{fullName}</h5>
        </div>
        <div className="mt-1.5 flex gap-2">
          <h5 className="text-[#344054A1]">Role:</h5>
          <h5 className="text-gray-dark">{role}</h5>
        </div>
        <div className="mt-1.5 flex gap-2">
          <h5 className="text-[#344054A1]">Purchase limit:</h5>
          <h5 className="text-gray-dark">{purchaseLimit}</h5>
        </div>
      </div>
      <div className="flex-1 flex-col gap-12">
        <div className="flex gap-2">
          <h5 className="text-[#344054A1]">Phone:</h5>
          <h5 className="text-gray-dark">{phone}</h5>
        </div>
        <div className="mt-1.5 flex gap-2">
          <h5 className="text-[#344054A1]">Email:</h5>
          <h5 className="text-gray-dark">{email}</h5>
        </div>
      </div>
    </div>
  );
};
