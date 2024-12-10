import React, { FC } from "react";
import { AuthGoogleButton } from "src/page-components/login/AuthGoogleButton";
import { LoginForm } from "src/page-components/login/LoginForm";
import { OrSingWithEmail } from "src/page-components/login/OrSingWithEmail";
import { PageWrapper } from "src/components/Layouts/LoginPageWrapper";
import { Logo } from "src/components/Logo";

const Login: FC = () => (
  <PageWrapper>
    <div className="mx-auto flex max-w-lg flex-col items-center justify-center">
      <Logo />
      <h2 className="mt-28 text-gray-dark">Welcome Back!</h2>
      <AuthGoogleButton />
      <OrSingWithEmail />
      <LoginForm />
    </div>
  </PageWrapper>
);

export default Login;
