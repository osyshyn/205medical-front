import React, { FC } from "react";
import { PageWrapper } from "src/page-components/login/PageWrapper";
import { PasswordRecoveryForm } from "src/page-components/login/password-recovery/PasswordRecoveryForm";

const PasswordRecovery: FC = () => (
  <PageWrapper>
    <div>
      <h2 className="text-center text-gray-dark">Password Recovery</h2>

      <p className="mt-2 text-center text-sm text-gray-dark">
        Please enter your email address below. We will send a 6-digit code to
        help you recover your password.
      </p>
    </div>

    <PasswordRecoveryForm />
  </PageWrapper>
);

export default PasswordRecovery;
