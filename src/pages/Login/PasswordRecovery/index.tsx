import React, { FC } from "react";
import { PasswordRecoveryForm } from "src/page-components/login/password-recovery/PasswordRecoveryForm";

const PasswordRecovery: FC = () => {
  return (
    <div className="flex h-full">
      <main className="h-full flex-1">
        <section className="flex min-h-full bg-white-base">
          <div className="min-h-full w-1/2 gap-6 self-center px-28 py-10">
            <div>
              <h2 className="text-center text-gray-dark">Password Recovery</h2>

              <p className="mt-2 text-center text-sm text-gray-dark">
                Please enter your email address below. We will send a 6-digit
                code to help you recover your password.
              </p>
            </div>

            <PasswordRecoveryForm />
          </div>

          <div className="flex-1 bg-login-banner bg-cover bg-no-repeat"></div>
        </section>
      </main>
    </div>
  );
};

export default PasswordRecovery;
