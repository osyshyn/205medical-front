import cn from "classnames";
import { Sizes } from "src/@types/sizes";
import { ButtonVariants } from "./types";

const DEFAULT_BUTTON_CLASSNAME = "rounded-20 text-sm font-semibold";

export const BUTTON_STYLE_VARIANTS = {
  [ButtonVariants.PRIMARY]: cn(
    "bg-purple-base text-white-base",
    DEFAULT_BUTTON_CLASSNAME
  ),
  [ButtonVariants.SECONDARY]: cn(
    "bg-white-base border border-purple-base text-purple-base",
    DEFAULT_BUTTON_CLASSNAME
  ),
  [ButtonVariants.PRIMARY_SQUARE]:
    "bg-purple-base text-white-base text-sm rounded px-6 py-1",
  [ButtonVariants.SECONDARY_SQUARE]:
    "bg-white-base border border-purple-base text-purple-base text-sm rounded px-6 py-1",
  [ButtonVariants.PRIMARY_GRADIENT]:
    "to-blue-base rounded-20 bg-gradient-to-r from-purple-ligth text-white-base",
  [ButtonVariants.WHITE]:
    "rounded-xl border border-gray-medium bg-white-base font-semibold text-xs uppercase",
};

export const BUTTON_STYLE_SIZE = {
  [Sizes.XS]: "px-6 py-1",
  [Sizes.S]: "py-2.5 px-10.75",
};
