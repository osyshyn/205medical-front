import React, { FC } from "react";
import { PageWrapper } from "src/components/Layouts/LoginPageWrapper";

const CheckOtp: FC = () => (
  <PageWrapper>
    <div>
      <h2 className="text-center text-gray-dark">Password Recovery</h2>

      <p className="mt-2 text-center text-sm text-gray-dark">
        Check your email for the code. If you don’t see it, please check your
        spam or junk folder. After entering the code, you’ll be able to set a
        new password for your account
      </p>
    </div>
  </PageWrapper>
);

export default CheckOtp;
