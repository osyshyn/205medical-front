import React, { FC, memo, MouseEventHandler, ReactNode } from "react";
import cn from "classnames";
import { Sizes } from "src/@types/sizes";
import { Loader } from "../Loader";
import { BUTTON_STYLE_VARIANTS } from "./constants";
import { ButtonVariants } from "./types";

interface Props {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  variant?: ButtonVariants;
  type?: "button" | "submit" | "reset";
  leaderSize?: Sizes;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<Props> = memo(
  ({
    children,
    className,
    isLoading,
    variant,
    type,
    leaderSize,
    isDisabled,
    onClick,
  }) => {
    const combinedClassNames = cn(
      "flex justify-center items-center outline-0 transition ease-in-out duration-200 active:translate-y-0.5 active:duration-150 active:brightness-95 disabled:opacity-50 disabled:active:translate-y-0 disabled:brightness-100",
      BUTTON_STYLE_VARIANTS[variant],
      className
    );

    return (
      <button
        className={combinedClassNames}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
      >
        {isLoading ? <Loader size={leaderSize} /> : children}
      </button>
    );
  }
);
