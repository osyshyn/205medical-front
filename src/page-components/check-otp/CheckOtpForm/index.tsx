import React, { FC } from "react";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { TextInput } from "src/components/FormField/TextInput";
import { Sizes } from "src/@types/sizes";
import {
  CHECK_OTP_FORM_VALIDATION_SCHEMA,
  CHECK_OTP_INITIAL_VALUES,
  LABEL_CLASSNAME,
  TEXT_INPUT_CLASSNAME,
} from "./constants";
import { IFormikValues } from "./types";

export const CheckOtpForm: FC = () => {
  const formikProps: FormikConfig<IFormikValues> = {
    initialValues: CHECK_OTP_INITIAL_VALUES,
    validationSchema: CHECK_OTP_FORM_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      console.log(values);
    },
  };

  const formik = useFormik(formikProps);

  return (
    <div className="mt-6 w-full">
      <FormikProvider value={formik}>
        <Form>
          <TextInput
            className={TEXT_INPUT_CLASSNAME}
            name="code"
            type="number"
            label="Email"
            labelClassName={LABEL_CLASSNAME}
            placeholder="Enter code"
          />

          <div className="mt-6 flex flex-col gap-3">
            <Button
              className="w-full rounded-30 text-lg"
              size={Sizes.S}
              variant={ButtonVariants.PRIMARY}
              type="submit"
            >
              Submit
            </Button>

            <Button
              className="w-full rounded-30 text-lg"
              size={Sizes.S}
              variant={ButtonVariants.SECONDARY}
              type="button"
            >
              Send again
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};
