import "react-i18next";
import { defaultLng, resources } from "src/services/i18n";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultLng;
    resources: (typeof resources)[defaultLng];
  }
}
