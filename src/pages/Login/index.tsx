import React, { FC } from "react";
import { AuthGoogleButton } from "src/page-components/login/AuthGoogleButton";
import { LoginForm } from "src/page-components/login/LoginForm";
import { OrSingWithEmail } from "src/page-components/login/OrSingWithEmail";
import { Logo } from "src/components/Logo";

const Login: FC = () => {
  return (
    <div className="flex h-full">
      <main className="h-full flex-1">
        <section className="flex min-h-full bg-white-base">
          <div className="min-h-full w-1/2 self-center px-28 py-10">
            <div className="mx-auto flex max-w-lg flex-col items-center justify-center">
              <Logo />
              <h2 className="mt-28 text-gray-dark">Welcome Back!</h2>
              <AuthGoogleButton />
              <OrSingWithEmail />
              <LoginForm />
            </div>
          </div>

          <div className="flex-1 bg-login-banner bg-cover bg-no-repeat"></div>
        </section>
      </main>
    </div>
  );
};

export default Login;
