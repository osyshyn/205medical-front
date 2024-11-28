import React, { FC, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import cn from "classnames";
import { useClickOutside } from "src/hooks/useClickOutside";
import { MODAL_ROOT_ELEMENT } from "src/constants/rootElements";
import { Window } from "../Window";
import { CloseButton } from "./CloseButton";

// CHANGE - видалити зайві стилі тут та в темплейтах

interface Props {
  children?: ReactNode;
  isOpen: boolean;
  isActivePortal?: boolean;
  isShownOverlay?: boolean;
  isShownCloseButton?: boolean;
  isHasOutsideCloseButton?: boolean;
  isActiveDefaultHoverCloseButton?: boolean;
  isActiveCloseClickOutside?: boolean;
  overlayClassName?: string;
  className?: string;
  closeButtonClassName?: string;
  onClose: VoidFunction;
}

export const ModalWindow: FC<Props> = ({
  children,
  overlayClassName,
  className,
  closeButtonClassName,
  isOpen,
  isActivePortal,
  isShownOverlay = true,
  isShownCloseButton = true,
  isHasOutsideCloseButton = false,
  isActiveDefaultHoverCloseButton,
  isActiveCloseClickOutside = true,
  onClose,
}) => {
  const modalRef = useRef(null);

  const isActiveClickOutside = isOpen && isActiveCloseClickOutside;
  useClickOutside(modalRef, onClose, isActiveClickOutside);

  const combinedOverlayClassNames = cn(
    "invisible absolute top-0 left-0 w-full bg-black-base/60 opacity-0 z-50 transition-all duration-300",
    overlayClassName,
    {
      "!visible !opacity-100": isOpen,
      "!fixed h-full": isShownOverlay,
    }
  );

  const combinedModalClassNames = cn(
    "invisible fixed top-1/2 translate-y-full left-1/2 -translate-x-1/2 scale-0 opacity-50 rounded-lg transition-all duration-300 z-30",
    className,
    {
      "!visible !-translate-y-1/2 !scale-100 !opacity-100": isOpen,
    }
  );

  const component = (
    <div className={combinedOverlayClassNames}>
      <div ref={modalRef} className={combinedModalClassNames}>
        <Window>
          {isShownCloseButton && !isHasOutsideCloseButton && (
            <div className="flex w-full justify-end">
              <CloseButton className={closeButtonClassName} onClose={onClose} />
            </div>
          )}
          {children}
        </Window>
      </div>
      {isShownCloseButton && isHasOutsideCloseButton && (
        <CloseButton
          className={closeButtonClassName}
          isActiveDefaultHoverEffect={isActiveDefaultHoverCloseButton}
          onClose={onClose}
        />
      )}
    </div>
  );

  return isActivePortal
    ? createPortal(component, MODAL_ROOT_ELEMENT)
    : component;
};
