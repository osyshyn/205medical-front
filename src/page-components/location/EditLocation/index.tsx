import React, { FC, useEffect, useState } from "react";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { Show } from "src/components/PrivateRoute/Show";
import { RenderFormFields } from "src/components/RenderFormFields";
import { Window } from "src/components/Window";
import { useActiveLocation } from "src/hooks/useActiveLocation";
import useLocationStore from "src/stores/location-store";
import useUserStore from "src/stores/user-store";
import { Sizes } from "src/@types/sizes";
import { TypesUsers } from "src/@types/users";
import {
  EDIT_LOCATION_FORM_FIELDS,
  EDIT_LOCATION_FORM_FIELDS_SAB_USER,
  EDIT_LOCATION_VALIDATION_SCHEMA,
} from "./contants";
import { NoEditFields } from "./NoEditFields";
import { IFormikValues } from "./types";

export const EditLocation: FC = () => {
  const updateLocation = useLocationStore((state) => state.updateLocation);
  const deleteLoaction = useLocationStore((state) => state.deleteLocation);
  const isLoading = useLocationStore((state) => state.isLoadingUpdate);

  const { activeLocation } = useActiveLocation();
  const userType = useUserStore((state) => state.user.role);

  const [isEdit, setIsEdit] = useState(false);

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    setIsEdit(false);
  }, [activeLocation]);

  const formikProps: FormikConfig<IFormikValues> = {
    initialValues: activeLocation,
    enableReinitialize: true,
    validationSchema: EDIT_LOCATION_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      updateLocation({ ...activeLocation, ...values }, () => setIsEdit(false));
    },
  };

  const formik = useFormik(formikProps);

  const isEditable = userType === TypesUsers.CLIENT_ADMIN || isEdit;

  const renderFormFields = () => {
    if (userType === TypesUsers.SUB_USER) {
      return (
        <div className="my-5 grid grid-cols-2 gap-x-6 gap-y-3.5">
          <RenderFormFields
            disabled={!isEditable}
            fields={EDIT_LOCATION_FORM_FIELDS_SAB_USER}
          />
        </div>
      );
    }

    return (
      <div className="my-5 grid grid-cols-2 gap-x-6 gap-y-3.5">
        <RenderFormFields
          disabled={!isEditable}
          fields={EDIT_LOCATION_FORM_FIELDS}
        />
      </div>
    );
  };

  return (
    <Window className="flex-1">
      <div className="flex items-center justify-between">
        <h3>Ship To</h3>

        <div className="flex gap-5">
          <Show onlyFor={TypesUsers.CLIENT_ADMIN && TypesUsers.MEDICAL}>
            <Button
              variant={
                isEdit ? ButtonVariants.SECONDARY : ButtonVariants.PRIMARY
              }
              onClick={() => deleteLoaction(activeLocation.id)}
              size={Sizes.S}
            >
              Delete
            </Button>
          </Show>

          <Button
            variant={isEdit ? ButtonVariants.SECONDARY : ButtonVariants.PRIMARY}
            onClick={toggleIsEdit}
            size={Sizes.S}
          >
            Edit
          </Button>
        </div>
      </div>

      <FormikProvider value={formik}>
        <Form>
          {renderFormFields()}

          {isEdit && (
            <Button
              className="mt-10"
              type="submit"
              variant={ButtonVariants.PRIMARY}
              size={Sizes.S}
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              Submit
            </Button>
          )}
        </Form>
      </FormikProvider>
    </Window>
  );
};
