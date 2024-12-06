import React, { FC } from "react";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { RenderFormFields } from "src/components/RenderFormFields";
import { Sizes } from "src/@types/sizes";
import {
  CREATE_ORDER_FORM_FIELDS,
  CREATE_ORDER_FORM_VALIDATION_SCHEMA,
  CREATE_ORDER_INITIAL_VALUES,
} from "./constants";
import { IFormikValues } from "./types";

export const CreateOrderForm: FC = () => {
  const formikProps: FormikConfig<IFormikValues> = {
    initialValues: CREATE_ORDER_INITIAL_VALUES,
    validationSchema: CREATE_ORDER_FORM_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      console.log(values);
    },
  };

  const formik = useFormik(formikProps);

  return (
    <div>
      <h3>Customer Information</h3>

      <FormikProvider value={formik}>
        <Form className="mt-5">
          <div className="grid grid-cols-2 gap-6">
            <RenderFormFields fields={CREATE_ORDER_FORM_FIELDS} />
          </div>

          <Button
            className="mt-6 w-full rounded-30 text-lg"
            size={Sizes.S}
            variant={ButtonVariants.PRIMARY}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </FormikProvider>
    </div>
  );
};
