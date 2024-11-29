// import React, { FC, ReactNode } from "react";
// import { Sizes } from "src/@types/sizes";
// import { ONLY_FOR, OnlyFor } from "./types";
// import { Loader } from "../Loader";
// import useUserStore from "src/stores/user-store";

// interface Props {
//   children: ReactNode;
//   onlyFor: OnlyFor;
//   loaderSize?: Sizes;
//   loaderClassName?: string;
//   showLoader?: boolean;
// }
// export const Show: FC<Props> = ({
//   children,
//   onlyFor,
//   loaderSize,
//   loaderClassName,
//   showLoader = true,
// }) => {
//   const isAuthorized = useUserStore((state) => state.isAuthorized);
//   const userType = useUserStore((state) => state.type);

//   const isUserAgent = isAuthorized && userType === ONLY_FOR.AGENT;
//   const isUserOwner = isAuthorized && userType === ONLY_FOR.OWNER;

//   if (isLoading && showLoader)
//     return <Loader size={loaderSize} className={loaderClassName} />;

//   if (onlyFor === ONLY_FOR.AGENT && isUserAgent) return <>{children}</>;

//   if (onlyFor === ONLY_FOR.OWNER && isUserOwner) return <>{children}</>;

//   if (isAuthorized && onlyFor === ONLY_FOR.AUTHORIZED) return <>{children}</>;

//   return null;
// };

export const Show = {};
