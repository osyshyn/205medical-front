import React, { FC } from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import {
  DEFAULT_CONTAINER_BUTTONS_CLASSNAME,
  DEFAULT_MODAL_BUTTON_CLASSNAME,
} from "../constants";
import { modalTrns } from "../trns";

export interface Props {
  className?: string;
  approvalButtonClassName?: string;
  approvalButtonName?: string;
  approvalButtonVariant?: ButtonVariants;
  onClose: VoidFunction;
}

export const Alert: FC<Props> = ({
  className,
  approvalButtonClassName,
  approvalButtonName = modalTrns.okayButton,
  approvalButtonVariant = ButtonVariants.PRIMARY,
  onClose,
}) => {
  const { t } = useTranslation();

  const trnsApprovalBtn = t(approvalButtonName);
  const trnsExistsApprovalBtn = trnsApprovalBtn !== approvalButtonName;

  return (
    <div
      className={cn("flex-col", DEFAULT_CONTAINER_BUTTONS_CLASSNAME, className)}
    >
      <Button
        className={cn(DEFAULT_MODAL_BUTTON_CLASSNAME, approvalButtonClassName)}
        variant={approvalButtonVariant}
        onClick={onClose}
      >
        {trnsExistsApprovalBtn ? trnsApprovalBtn : approvalButtonName}
      </Button>
    </div>
  );
};
