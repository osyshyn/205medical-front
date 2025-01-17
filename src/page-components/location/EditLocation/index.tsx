import React, { FC, useEffect, useState } from "react";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { RenderFormFields } from "src/components/RenderFormFields";
import { Window } from "src/components/Window";
import { useActiveLocation } from "src/hooks/useActiveLocation";
import useLocationStore from "src/stores/location-store";
import { Sizes } from "src/@types/sizes";
import {
  EDIT_LOCATION_FORM_FIELDS,
  EDIT_LOCATION_VALIDATION_SCHEMA,
} from "./contants";
import { NoEditFields } from "./NoEditFields";
import { IFormikValues } from "./types";

export const EditLocation: FC = () => {
  const updateLocation = useLocationStore((state) => state.updateLocation);
  const isLoading = useLocationStore((state) => state.isLoadingUpdate);

  const { activeLocation } = useActiveLocation();

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

  return (
    <Window className="flex-1">
      <div className="flex items-center justify-between">
        <h3>Ship To</h3>

        <Button
          variant={isEdit ? ButtonVariants.SECONDARY : ButtonVariants.PRIMARY}
          onClick={toggleIsEdit}
          size={Sizes.S}
        >
          Edit
        </Button>
      </div>

      <FormikProvider value={formik}>
        <Form>
          <div className="my-5 grid grid-cols-2 gap-x-6 gap-y-3.5">
            <RenderFormFields
              disabled={!isEdit}
              fields={EDIT_LOCATION_FORM_FIELDS}
            />
          </div>

          <NoEditFields {...activeLocation} />

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
