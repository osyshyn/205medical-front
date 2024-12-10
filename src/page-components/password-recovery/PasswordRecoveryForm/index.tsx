import React, { FC } from "react";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { TextInput } from "src/components/FormField/TextInput";
import useAuthStore from "src/stores/auth-store";
import { Sizes } from "src/@types/sizes";
import {
  LABEL_CLASSNAME,
  PASSWRD_RECOVERY_FORM_VALIDATION_SCHEMA,
  PASSWRD_RECOVERY_INITIAL_VALUES,
  TEXT_INPUT_CLASSNAME,
} from "./constants";
import { IFormikValues } from "./types";

export const PasswordRecoveryForm: FC = () => {
  const isLoading = useAuthStore((state) => state.isLoadingRecoveryPassword);
  const recoveryPassword = useAuthStore((state) => state.recoveryPassword);

  const formikProps: FormikConfig<IFormikValues> = {
    initialValues: PASSWRD_RECOVERY_INITIAL_VALUES,
    validationSchema: PASSWRD_RECOVERY_FORM_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      recoveryPassword(values, () => {});
    },
  };

  const formik = useFormik(formikProps);

  return (
    <div className="mt-6 w-full">
      <FormikProvider value={formik}>
        <Form className="flex flex-col gap-6">
          <TextInput
            className={TEXT_INPUT_CLASSNAME}
            name="email"
            type="email"
            label="Email"
            labelClassName={LABEL_CLASSNAME}
            placeholder="Enter your email id"
          />

          <Button
            className="mt-6 w-full rounded-30 text-lg"
            size={Sizes.S}
            variant={ButtonVariants.PRIMARY}
            type="submit"
            isDisabled={isLoading}
            isLoading={isLoading}
          >
            Send code
          </Button>
        </Form>
      </FormikProvider>
    </div>
  );
};
