import { Id, toast } from "react-toastify";
import {
  errorResponses,
  pendingResponses,
  successfulResponses,
} from "src/constants/responses";

export class NotificationService {
  static success = (message: string = successfulResponses.default) =>
    toast.success(message);

  static loading = (message: string = pendingResponses.default) =>
    toast.loading(message);

  static error = (message: string = errorResponses.default) =>
    toast.error(message);

  static updateToSuccess = (
    toastId: Id,
    message: string = errorResponses.default
  ) =>
    toast.update(toastId, {
      type: "success",
      render: message,
      isLoading: false,
      autoClose: 5000,
    });

  static updateToError = (
    toastId: Id,
    message: string = errorResponses.default
  ) =>
    toast.update(toastId, {
      type: "error",
      render: message,
      isLoading: false,
      autoClose: 5000,
    });
}
