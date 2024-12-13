import React, { FC } from "react";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { RenderFormFields } from "src/components/RenderFormFields";
import { Window } from "src/components/Window";
import useAuthStore from "src/stores/auth-store";
import useUserStore from "src/stores/user-store";
import { Sizes } from "src/@types/sizes";
import { ConnectGoogleButton } from "./ConnectGoogleButton";
import {
  getInitialValues,
  SETTINGS_BUYER_INFO_FORM_FIELDS,
  SETTINGS_CHANGE_PASSWORD_FORM_FIELDS,
  SETTINGS_VALIDATION_SCHEMA,
} from "./contants";
import { DisConnectGoogleButton } from "./DisConnectGoogleButton";
import { IFormikValues } from "./types";

export const SettingsForm: FC = () => {
  const user = useUserStore((state) => state.user);
  const updateSetting = useAuthStore((state) => state.updateSetting);
  const isLoading = useAuthStore((state) => state.isLoadingUpdateSetting);

  const formikProps: FormikConfig<IFormikValues> = {
    initialValues: getInitialValues(user),
    validationSchema: SETTINGS_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      updateSetting(
        Object.fromEntries(
          Object.entries(values).filter(([_, value]) => value !== "")
        )
      );
    },
  };

  const formik = useFormik(formikProps);

  const isGoogleAccountConnect = Boolean(user.google_id);

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

          {isGoogleAccountConnect ? (
            <DisConnectGoogleButton google_id={user.google_id} />
          ) : (
            <ConnectGoogleButton />
          )}

          <div className="flex gap-3">
            <Button
              type="submit"
              variant={ButtonVariants.PRIMARY}
              size={Sizes.S}
              isDisabled={isLoading}
              isLoading={isLoading}
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
