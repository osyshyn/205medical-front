import cn from "classnames";
import { ButtonVariants } from "./types";

const DEFAULT_BUTTON_CLASSNAME =
  "py-2.5 px-10.75 rounded-20 text-sm font-semibold";

export const BUTTON_STYLE_VARIANTS = {
  [ButtonVariants.PRIMARY]: cn(
    "bg-purple-base text-white-base",
    DEFAULT_BUTTON_CLASSNAME
  ),
  [ButtonVariants.SECONDARY]: cn(
    "bg-white-base border border-purple-base text-purple-base",
    DEFAULT_BUTTON_CLASSNAME
  ),
  [ButtonVariants.WHITE]:
    "rounded-xl border border-gray-medium bg-white-base font-semibold text-xs uppercase",
};
