import React, { FC } from "react";
import { LoginForm } from "src/page-components/login/LoginForm";
import { Logo } from "src/components/Logo";

const Login: FC = () => {
  return (
    <section className="bg-registration-banner h-full bg-cover bg-no-repeat">
      <div className="rounded-r-40 z-20 h-full w-1/2 bg-white-base px-20 py-8">
        <Logo />
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
