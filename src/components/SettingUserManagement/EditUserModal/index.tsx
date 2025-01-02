import React, { useState } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { ModalWindow } from "src/components/ModalWindow";
import { Window } from "src/components/Window";
import { ReactComponent as WhiteLogo } from "src/assets/icons/whiteLogo.svg";
import { Avatar } from "../Avatar";
import { CheckboxList } from "../CheckboxList";
import { InputField } from "../InputField";
import { Section } from "../Section";
import { SelectField } from "../SelectField";

const EditUserModal = ({ user, onSave, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    role: user?.role || "",
    phone: user?.phone || "",
    email: user?.email || "",
    purchase_limit: user?.purchase_limit || "",
  });

  const [selectedLocations, setSelectedLocations] = useState(
    user?.locations?.map((loc) => ({ ...loc, isSelected: true })) || []
  );

  const [products, setProducts] = useState(
    user?.products?.map((prod) => ({
      ...prod,
      isSelected: true,
      quantity: prod.quantity || 25,
      price: prod.price || 215,
    })) || []
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ModalWindow
      isOpen={isOpen}
      onClose={onClose}
      className="max-h-[800px] w-3/5 overflow-y-auto rounded-b-30 rounded-t-30"
      isActivePortal
      closeButtonClassName="!bg-white-base rounded-full shadow-md"
    >
      <Window className="!border-none !p-0">
        <div className="space-y-8">
          <div className="text-white flex flex-col gap-6 rounded-t-30 bg-[#3D3935] px-7.5 py-7.5">
            <WhiteLogo />
            <h1 className="text-2xl font-semibold text-white-base">
              Edit User
            </h1>
          </div>

          <div className="flex gap-15 px-14 !pt-1">
            <Avatar
              avatarPath={
                user.avatar?.path &&
                `${process.env.REACT_APP_BASE_URL}/${user.avatar.path.replace("public\\", "")}`
              }
            />

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6">
                <InputField
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder={`placeholder || label`}
                />
                <InputField
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder={`placeholder || label`}
                />
                <SelectField
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  options={[
                    { value: "", label: "Select Role" },
                    { value: "admin", label: "Admin" },
                    { value: "user", label: "User" },
                  ]}
                />
                <InputField
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={`placeholder || label`}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={`placeholder || label`}
                />
                <InputField
                  label="Purchase Limit ($)"
                  name="purchase_limit"
                  type="number"
                  value={formData.purchase_limit}
                  onChange={handleInputChange}
                  placeholder={`placeholder || label`}
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <Section
                  title="Approved Locations"
                  buttons={[
                    <Button
                      key="edit-locations"
                      className="h-10 w-36 rounded-20 border"
                      variant={ButtonVariants.SECONDARY_SQUARE}
                    >
                      Edit
                    </Button>,
                    <Button
                      key="save-locations"
                      className="h-10 w-36 rounded-20"
                      variant={ButtonVariants.PRIMARY}
                    >
                      Save
                    </Button>,
                  ]}
                >
                  <CheckboxList
                    items={selectedLocations}
                    setItems={setSelectedLocations}
                  />
                </Section>

                <Section
                  title="Active Products"
                  buttons={[
                    <Button
                      key="edit-products"
                      className="h-10 w-36 rounded-20 border"
                      variant={ButtonVariants.SECONDARY_SQUARE}
                    >
                      Edit
                    </Button>,
                    <Button
                      key="save-products"
                      className="h-10 w-36 rounded-20"
                      variant={ButtonVariants.PRIMARY}
                    >
                      Save
                    </Button>,
                  ]}
                >
                  <CheckboxList
                    items={products}
                    setItems={setProducts}
                    labelKey="name"
                  />
                </Section>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4 pb-10 pr-15">
            <Button
              className="h-10 w-36 rounded-20 border"
              variant={ButtonVariants.SECONDARY_SQUARE}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="h-10 w-36 rounded-20"
              variant={ButtonVariants.PRIMARY}
              onClick={() => {
                onSave(formData);
                onClose();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Window>
    </ModalWindow>
  );
};

export default EditUserModal;
