import React, { useMemo, FC, ReactNode } from "react";
import { Link as LinkReactRouterDom } from "react-router-dom";
import { scrollTop } from "src/utils/scrollTop";
import { ILink } from "src/@types";

interface Props extends Pick<ILink, "href" | "isOpenNewTab"> {
  children?: ReactNode;
  className?: string;
  isExternalLink?: boolean;
  isDisabled?: boolean;
}

export const Link: FC<Props> = ({
  children,
  className,
  href,
  isExternalLink,
  isOpenNewTab,
  isDisabled,
}) => {
  const linkLabel = children || href;

  const link = useMemo(() => {
    if (!linkLabel) {
      return null;
    } else if (isDisabled || !href) {
      return <>{linkLabel}</>;
    } else if (isExternalLink) {
      const target = isOpenNewTab ? "_blank" : "_self";

      return (
        <a className={className} href={href} target={target}>
          {linkLabel}
        </a>
      );
    } else {
      return (
        <LinkReactRouterDom className={className} to={href} onClick={scrollTop}>
          {linkLabel}
        </LinkReactRouterDom>
      );
    }
  }, [linkLabel, className, href, isExternalLink, isOpenNewTab, isDisabled]);

  return link;
};
