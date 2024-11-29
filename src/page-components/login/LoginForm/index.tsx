import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { RenderFormFields } from "src/components/RenderFormFields";
import useAuthStore from "src/stores/auth-store";
import useUserStore from "src/stores/user-store";
import { PATHNAMES } from "src/constants/routes";
import { Sizes } from "src/@types/sizes";
import {
  AUTH_FORM_FIELDS,
  AUTH_FORM_VALIDATION_SCHEMA,
  AUTH_INITIAL_VALUES,
} from "./constants";
import { IFormikValues } from "./types";

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const getUser = useUserStore((state) => state.getUser);

  const formikProps: FormikConfig<IFormikValues> = {
    initialValues: AUTH_INITIAL_VALUES,
    validationSchema: AUTH_FORM_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      login(values, () => {
        getUser();
        navigate(PATHNAMES.DASHBOARD);
      });
    },
  };

  const formik = useFormik(formikProps);

  return (
    <div className="mt-15">
      <h3>Sign In</h3>

      <FormikProvider value={formik}>
        <Form className="mt-10">
          <div className="flex flex-col gap-6">
            <RenderFormFields fields={AUTH_FORM_FIELDS} />
          </div>

          <Button
            className="mt-12 w-full"
            size={Sizes.S}
            variant={ButtonVariants.PRIMARY}
            type="submit"
          >
            Sign In
          </Button>
        </Form>
      </FormikProvider>
    </div>
  );
};
