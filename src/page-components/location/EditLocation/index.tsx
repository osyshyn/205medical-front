import React, { FC } from "react";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { RenderFormFields } from "src/components/RenderFormFields";
import { Window } from "src/components/Window";
import { useActiveLocation } from "src/hooks/useActiveLocation";
import { EDIT_LOCATION_FORM_FIELDS } from "./contants";
import { NoEditFields } from "./NoEditFields";
import { IFormikValues } from "./types";

export const EditLocation: FC = () => {
  const { activeLocation } = useActiveLocation();

  const formikProps: FormikConfig<IFormikValues> = {
    initialValues: activeLocation,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  };

  const formik = useFormik(formikProps);

  return (
    <Window className="flex-1">
      <div className="flex items-center justify-between">
        <h3>Ship To</h3>

        <Button variant={ButtonVariants.SECONDARY}>Edit</Button>
      </div>

      <FormikProvider value={formik}>
        <Form>
          <div className="my-5 grid grid-cols-2 gap-x-6 gap-y-3.5">
            <RenderFormFields fields={EDIT_LOCATION_FORM_FIELDS} />
          </div>

          <NoEditFields {...activeLocation} />

          <Button
            className="mt-10"
            type="submit"
            variant={ButtonVariants.PRIMARY}
          >
            Submit
          </Button>
        </Form>
      </FormikProvider>
    </Window>
  );
};
