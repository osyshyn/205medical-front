import React from "react";
import logo from "src/assets/images/logo.png";
import { Sizes } from "src/@types/sizes";
import { Loader } from ".";

export const ScreenLoader = () => (
  <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-5 bg-white-base">
    <img src={logo} alt="business clone" />
    <Loader size={Sizes.XXL} />
  </div>
);
