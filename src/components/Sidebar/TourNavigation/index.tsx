import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { Sizes } from "src/@types/sizes";

export const TourNavigation = () => (
  <div className="rounded-20 bg-gradient-to-r from-purple-ligth to-blue-base p-6">
    <p className="flex flex-col items-center text-sm text-white-base">
      <span>Having problems</span>
      <span>With navigation?</span>
    </p>

    <Button
      className="mt-5 !px-3.5"
      variant={ButtonVariants.SECONDARY}
      size={Sizes.S}
    >
      Tour Navigation
    </Button>
  </div>
);
