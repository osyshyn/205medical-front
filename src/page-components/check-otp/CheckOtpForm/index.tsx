import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { TextInput } from "src/components/FormField/TextInput";
import useAuthStore from "src/stores/auth-store";
import { PATHNAMES } from "src/constants/routes";
import { Sizes } from "src/@types/sizes";
import {
  CHECK_OTP_FORM_VALIDATION_SCHEMA,
  CHECK_OTP_INITIAL_VALUES,
  LABEL_CLASSNAME,
  TEXT_INPUT_CLASSNAME,
} from "./constants";
import { IFormikValues } from "./types";

export const CheckOtpForm: FC = () => {
  const navigate = useNavigate();
  const isLoading = useAuthStore((state) => state.isLoadingRecoveryPassword);
  const checkOtp = useAuthStore((state) => state.checkOtp);
  const sendCodeAgain = useAuthStore((state) => state.sendCodeAgain);

  const formikProps: FormikConfig<IFormikValues> = {
    initialValues: CHECK_OTP_INITIAL_VALUES,
    validationSchema: CHECK_OTP_FORM_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      checkOtp(values, () => {
        navigate(PATHNAMES.CHANGE_PASSWORD);
      });
    },
  };

  const formik = useFormik(formikProps);

  return (
    <div className="mt-6 w-full">
      <FormikProvider value={formik}>
        <Form>
          <TextInput
            className={TEXT_INPUT_CLASSNAME}
            name="otp"
            type="text"
            label="Code"
            labelClassName={LABEL_CLASSNAME}
            placeholder="Enter code"
          />

          <div className="mt-6 flex flex-col gap-3">
            <Button
              className="w-full rounded-30 text-lg"
              size={Sizes.S}
              variant={ButtonVariants.PRIMARY}
              type="submit"
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              Submit
            </Button>

            <Button
              className="w-full rounded-30 text-lg"
              onClick={sendCodeAgain}
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
