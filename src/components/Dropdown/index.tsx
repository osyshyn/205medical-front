import React, { Dispatch, FC, ReactNode, useRef } from "react";
import cn from "classnames";
import { useClickOutside } from "src/hooks/useClickOutside";

interface Props {
  children: ReactNode;
  head: ReactNode;
  className?: string;
  bodyClassName?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

export const Dropdown: FC<Props> = ({
  children,
  head,
  className,
  bodyClassName,
  isOpen,
  setIsOpen,
}) => {
  const onClose = () => setIsOpen(false);
  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, onClose);

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={toggleIsOpen}
      >
        {head}
      </div>
      <div
        className={cn(
          "invisible absolute left-1/2 -translate-x-1/2 -translate-y-1/2 scale-y-0 transition-all duration-200",
          bodyClassName,
          {
            "!visible !translate-y-0 !scale-y-100": isOpen,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
};
