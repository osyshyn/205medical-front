import React, { FC } from "react";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { RenderFormFields } from "src/components/RenderFormFields";
import { Window } from "src/components/Window";
import { Sizes } from "src/@types/sizes";
import {
  EDIT_LOCATION_VALIDATION_SCHEMA,
  SETTINGS_BUYER_INFO_FORM_FIELDS,
  SETTINGS_CHANGE_PASSWORD_FORM_FIELDS,
  SETTINGS_INITIAL_VALUES,
} from "./contants";
import { IFormikValues } from "./types";

export const SettingsForm: FC = () => {
  const formikProps: FormikConfig<IFormikValues> = {
    initialValues: SETTINGS_INITIAL_VALUES,
    validationSchema: EDIT_LOCATION_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      console.log(values);
    },
  };

  const formik = useFormik(formikProps);

  return (
    <Window className="flex-1">
      <FormikProvider value={formik}>
        <Form className="flex flex-col gap-10">
          <div>
            <h3>Buyer Information</h3>

            <div className="mt-5 grid grid-cols-2 gap-6">
              <RenderFormFields fields={SETTINGS_BUYER_INFO_FORM_FIELDS} />
            </div>
          </div>

          <div>
            <h3>Change Password</h3>

            <div className="mt-5 grid grid-cols-3 gap-6">
              <RenderFormFields fields={SETTINGS_CHANGE_PASSWORD_FORM_FIELDS} />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              variant={ButtonVariants.PRIMARY}
              size={Sizes.S}
            >
              Save
            </Button>

            <Button
              type="reset"
              variant={ButtonVariants.SECONDARY}
              size={Sizes.S}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </Window>
  );
};
