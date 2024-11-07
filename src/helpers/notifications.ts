import { t } from "i18next";
import { toast, Id } from "react-toastify";
import {
  successfulResponsesTrns,
  pendingResponsesTrns,
  errorResponsesTrns,
} from "src/translate/responses";

export class NotificationService {
  static success = (message: string = successfulResponsesTrns.default) =>
    toast.success(t(message));

  static loading = (message: string = pendingResponsesTrns.default) =>
    toast.loading(t(message));

  static error = (message: string = errorResponsesTrns.default) =>
    toast.error(t(message));

  static updateToSuccess = (
    toastId: Id,
    message: string = errorResponsesTrns.default
  ) =>
    toast.update(toastId, {
      type: "success",
      render: t(message),
      isLoading: false,
      autoClose: 5000,
    });

  static updateToError = (
    toastId: Id,
    message: string = errorResponsesTrns.default
  ) =>
    toast.update(toastId, {
      type: "error",
      render: t(message),
      isLoading: false,
      autoClose: 5000,
    });
}
