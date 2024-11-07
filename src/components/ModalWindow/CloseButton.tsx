import React, { FC } from "react";
import cn from "classnames";

// import { ReactComponent as CloseIcon } from "src/assets/icons/x-mark.svg";

interface Props {
  className?: string;
  isActiveDefaultHoverEffect?: boolean;
  onClose: VoidFunction;
}

export const CloseButton: FC<Props> = ({
  className,
  isActiveDefaultHoverEffect = true,
  onClose,
}) => (
  <button
    className={cn("group z-30 rounded-lg bg-white-base", className)}
    onClick={onClose}
  >
    {/* <CloseIcon
      className={cn("w-full h-full transition-all duration-200 opacity-50", {
        "group-hover:opacity-100": isActiveDefaultHoverEffect,
      })}
    /> */}
    Close
  </button>
);
