import React, { FC } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import cn from "classnames";

// import { ReactComponent as PrevIcon } from "src/assets/icons/arrow-left-blue-medium.svg";
// import { ReactComponent as NextIcon } from "src/assets/icons/arrow-right-blue-medium.svg";

const DEFAULT_PAGE_CLASSNAME = "opacity-50 hover:opacity-100";
const DEFAULT_PAGE_LINK_CLASSNAME = "";

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
      pageClassName={DEFAULT_PAGE_CLASSNAME}
      pageLinkClassName={DEFAULT_PAGE_LINK_CLASSNAME}
      breakClassName={DEFAULT_PAGE_CLASSNAME}
      breakLinkClassName={DEFAULT_PAGE_LINK_CLASSNAME}
      activeClassName="default:opacity-100"
      activeLinkClassName=""
      disabledClassName="!opacity-50"
      disabledLinkClassName="cursor-default"
      initialPage={currentPage}
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      onPageChange={onPageChange}
      // previousLabel={<PrevIcon />}
      // nextLabel={<NextIcon />}
      previousLabel={"prev"}
      nextLabel={"next"}
    />
  );
};
