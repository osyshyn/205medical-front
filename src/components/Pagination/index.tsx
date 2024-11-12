import React, { FC } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import cn from "classnames";
import { ReactComponent as ArrowIcon } from "src/assets/icons/arrow-down.svg";

const DEFAULT_PAGE_LINK_CLASSNAME =
  "flex items-center justify-center rounded-4 w-6 h-6 bg-white-ligth border font-medium text-xs text-gray-dark";

interface Props {
  className?: string;
  page: number;
  pageCount: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  setPage: (value: number) => void;
}

export const Pagination: FC<Props> = ({
  className,
  page,
  pageCount,
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 3,
  setPage,
}) => {
  const currentPage = page - 1;

  const onPageChange: ReactPaginateProps["onPageChange"] = ({ selected }) =>
    setPage(selected + 1);

  return (
    <ReactPaginate
      containerClassName={cn("flex items-center gap-3", className)}
      pageLinkClassName={DEFAULT_PAGE_LINK_CLASSNAME}
      breakClassName="font-medium text-xs"
      activeLinkClassName="!bg-purple-base rounded-4 !text-white-base"
      disabledClassName="!opacity-50"
      disabledLinkClassName="cursor-default"
      initialPage={currentPage}
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      onPageChange={onPageChange}
      previousLabel={<ArrowIcon className="rotate-90" />}
      nextLabel={<ArrowIcon className="-rotate-90" />}
      previousClassName={DEFAULT_PAGE_LINK_CLASSNAME}
      nextClassName={DEFAULT_PAGE_LINK_CLASSNAME}
    />
  );
};
