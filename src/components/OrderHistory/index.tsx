import cn from "classnames";
import { BUYERS_ORDER_TABLE_COLUMNS } from "src/components/Buyers/UserOrders/constants";
import { ReactComponent as ArrowBottomIcon } from "src/assets/icons/arrow-down.svg";
import { Table, TableBody, TableHeader } from "../Table";

export const OrderHistory = ({
  toggleOrderHistory,
  isOrderHistoryVisible,
  columns,
  items,
}) => {
  return (
    <div>
      <button
        onClick={toggleOrderHistory}
        className="flex w-full items-center justify-items-start gap-2 text-lg font-semibold"
      >
        Order History
        <ArrowBottomIcon
          className={cn("ml-2 transition-transform duration-200", {
            "rotate-180": isOrderHistoryVisible,
          })}
        />
      </button>

      {isOrderHistoryVisible && (
        <div className="mt-4">
          <Table>
            <TableHeader columns={BUYERS_ORDER_TABLE_COLUMNS} />
            <TableBody items={items} columns={BUYERS_ORDER_TABLE_COLUMNS} />
          </Table>
        </div>
      )}
    </div>
  );
};
