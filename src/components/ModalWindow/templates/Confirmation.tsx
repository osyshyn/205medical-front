import React, { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import {
  DEFAULT_CONTAINER_BUTTONS_CLASSNAME,
  DEFAULT_MODAL_BUTTON_CLASSNAME,
} from "../constants";
import { modalTrns } from "../trns";

export interface Props {
  className?: string;
  confirmButtonName?: string;
  cancelButtonName?: string;
  confirmButtonVariant?: ButtonVariants;
  cancelButtonVariant?: ButtonVariants;
  isCloseAfterConfirm?: boolean;
  onConfirm: VoidFunction;
  onClose: VoidFunction;
}

export const Confirmation: FC<Props> = ({
  className,
  confirmButtonName = modalTrns.yesButton,
  cancelButtonName = modalTrns.noButton,
  confirmButtonVariant = ButtonVariants.PRIMARY,
  cancelButtonVariant = ButtonVariants.OPACITY_SECONDARY,
  isCloseAfterConfirm = true,
  onConfirm,
  onClose,
}) => {
  const { t } = useTranslation();

  const trnsConfirmBtn = t(confirmButtonName);
  const trnsCancelBtn = t(cancelButtonName);

  const trnsExistsConfirmBtn = trnsConfirmBtn !== confirmButtonName;
  const trnsExistsCancelBtn = trnsCancelBtn !== cancelButtonName;

  const onApprove = useCallback(() => {
    onConfirm();

    if (isCloseAfterConfirm) {
      onClose();
    }
  }, [onConfirm, onClose, isCloseAfterConfirm]);

  return (
    <div className={cn(DEFAULT_CONTAINER_BUTTONS_CLASSNAME, className)}>
      <Button
        className={DEFAULT_MODAL_BUTTON_CLASSNAME}
        variant={confirmButtonVariant}
        onClick={onApprove}
      >
        {trnsExistsConfirmBtn ? trnsConfirmBtn : confirmButtonName}
      </Button>
      <Button
        className={cn("ml-4 py-2", DEFAULT_MODAL_BUTTON_CLASSNAME)}
        variant={cancelButtonVariant}
        onClick={onClose}
      >
        {trnsExistsCancelBtn ? trnsCancelBtn : cancelButtonName}
      </Button>
    </div>
  );
};
