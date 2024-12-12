import React, { FC } from "react";
import { ChangePasswordForm } from "src/page-components/change-password/ChangePasswordForm";
import { PageWrapper } from "src/components/Layouts/LoginPageWrapper";

const ChangePassword: FC = () => (
  <PageWrapper>
    <h2 className="text-center text-gray-dark">Change Password</h2>
    <ChangePasswordForm />
  </PageWrapper>
);

export default ChangePassword;
