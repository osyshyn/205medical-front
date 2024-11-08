import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";

export const TourNavigation = () => (
  <div className="to-blue-base rounded-20 bg-gradient-to-r from-purple-ligth p-6">
    <p className="flex flex-col items-center text-sm text-white-base">
      <span>Having problems</span>
      <span>With navigation?</span>
    </p>

    <Button className="mt-5 !px-3.5" variant={ButtonVariants.SECONDARY}>
      Tour Navigation
    </Button>
  </div>
);
