import React, { FC } from "react";
import cn from "classnames";
import avatar from "src/assets/images/avatar.png";
import { Sizes } from "src/@types/sizes";
import { AVATAR_SIZE_VARIANTS } from "./constants";

interface Props {
  className?: string;
  containerClassName?: string;
  sizeVariant?: Sizes;
  avatarUrl?: string;
  altText?: string;
}

export const Avatar: FC<Props> = ({
  className,
  sizeVariant = Sizes.S,
  avatarUrl,
  altText,
}) => {
  const combinedClassNames = cn(
    "object-cover rounded-62",
    AVATAR_SIZE_VARIANTS[sizeVariant],
    className
  );

  return (
    <div>
      <img
        className={combinedClassNames}
        src={avatarUrl || avatar}
        alt={altText}
      />
    </div>
  );
};
