import React, { FC } from "react";
import { useNavigate } from "react-router";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { RenderFormFields } from "src/components/RenderFormFields";
import useAuthStore from "src/stores/auth-store";
import { PATHNAMES } from "src/constants/routes";
import { Sizes } from "src/@types/sizes";
import {
  CHANGE_PASSWORD_FORM_FIELDS,
  CHANGE_PASSWORD_FORM_VALIDATION_SCHEMA,
  CHANGE_PASSWORD_INITIAL_VALUES,
} from "./constants";
import { IFormikValues } from "./types";

export const ChangePasswordForm: FC = () => {
  const navigate = useNavigate();
  const isLoading = useAuthStore((state) => state.isLoadingRecoveryPassword);
  const changePassword = useAuthStore((state) => state.changePassword);

  const formikProps: FormikConfig<IFormikValues> = {
    initialValues: CHANGE_PASSWORD_INITIAL_VALUES,
    validationSchema: CHANGE_PASSWORD_FORM_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      changePassword(values, () => {
        navigate(PATHNAMES.LOGIN);
      });
    },
  };

  const formik = useFormik(formikProps);

  return (
    <div className="mt-6 w-full">
      <FormikProvider value={formik}>
        <Form>
          <div className="flex flex-col gap-6">
            <RenderFormFields fields={CHANGE_PASSWORD_FORM_FIELDS} />
          </div>

          <Button
            className="mt-6 w-full rounded-30 text-lg"
            size={Sizes.S}
            variant={ButtonVariants.PRIMARY}
            type="submit"
            isDisabled={isLoading}
            isLoading={isLoading}
          >
            Update Password
          </Button>
        </Form>
      </FormikProvider>
    </div>
  );
};
