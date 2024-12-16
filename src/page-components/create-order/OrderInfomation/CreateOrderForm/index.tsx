import React, { FC, ReactNode } from "react";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { Sizes } from "src/@types/sizes";
import {
  CREATE_ORDER_FORM_VALIDATION_SCHEMA,
  CREATE_ORDER_INITIAL_VALUES,
} from "./constants";
import { IFormikValues } from "./types";

interface Props {
  children: ReactNode;
}

export const CreateOrderForm: FC<Props> = ({ children }) => {
  const formikProps: FormikConfig<IFormikValues> = {
    initialValues: CREATE_ORDER_INITIAL_VALUES,
    validationSchema: CREATE_ORDER_FORM_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      console.log(values);
    },
  };

  const formik = useFormik(formikProps);

  return (
    <FormikProvider value={formik}>
      <Form className="mt-5 flex flex-col gap-10">
        {children}

        <Button
          className="mt-6 w-max self-end rounded-30 text-lg"
          size={Sizes.S}
          variant={ButtonVariants.SECONDARY_SQUARE}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </FormikProvider>
  );
};
