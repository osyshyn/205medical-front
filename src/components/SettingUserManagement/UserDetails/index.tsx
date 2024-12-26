import { useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { UserMetric } from "src/components/Buyers/UserMetrics";
import {
  BUYERS_ORDER_TABLE_COLUMNS,
  getBuyerOrderTableItems,
} from "src/components/Buyers/UserOrders/constants";
import { OrderHistory } from "src/components/OrderHistory";
// import { Window } from "src/components/Window";
import useMetricStore from "src/stores/metric-store";
import useOrderStore, { FetchOrdersParams } from "src/stores/order-store";
import useUserStore from "src/stores/user-store";
import { Row } from "src/@types/table";
import { Avatar } from "../Avatar";
import { ContactInfo } from "../ContactInfo";
import { Locations } from "../Locations";
import { Products } from "../Products";

export const UserDetails = ({ id }) => {
  const [isOrderHistoryVisible, setIsOrderHistoryVisible] = useState(true);

  const userOrder = useOrderStore((state) => state.orders);
  const loadUserDetail = useUserStore((state) => state.getUserDetail);
  const loadUserNotes = useUserStore((state) => state.getUserNotes);
  const loadUserOrders = useOrderStore((state) => state.fetchOrders);
  const userDetail = useUserStore((state) => state.detailUser);
  const userNotes = useUserStore((state) => state.userNotes);

  const userMetrics = useMetricStore((state) => state.user_metric);
  const loadUserMetrics = useMetricStore((state) => state.fetchUserMetric);

  useEffect(() => {
    const params: FetchOrdersParams = {
      month: "12",
      year: "2024",
      su_users_ids: [Number(id)],
      search: "",
      current_page: 1,
    };

    const currentDate = new Date();

    loadUserDetail(id);
    loadUserNotes(id);
    loadUserOrders(params);
    loadUserMetrics({
      month: String(currentDate.getMonth() + 1),
      year: String(currentDate.getFullYear()),
      su_users_ids: [id],
    });
  }, [loadUserDetail, loadUserNotes, loadUserMetrics, loadUserOrders, id]);
  const {
    first_name,
    last_name,
    email,
    phone,
    role,
    purchase_limit,
    locations,
    products,
  } = userDetail;

  const userOrdersResults = userOrder?.result || [];

  const items = getBuyerOrderTableItems(userOrdersResults) as unknown as Row[];

  const toggleOrderHistory = () => {
    setIsOrderHistoryVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-wrap gap-15 p-10">
      <div className="min-h-[800px] w-[180px]">
        <Avatar avatarPath={userDetail.avatar?.path} />
        <div className="w-full text-left">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Notes</h3>
            <button className="text-14 text-gray-500 underline decoration-solid hover:text-gray-700 hover:underline">
              Add
            </button>
          </div>

          {userNotes.length > 0 ? (
            <ul className="text-sm text-gray-700">
              {userNotes.map((note) => (
                <li key={note.id} className="mb-1">
                  <strong>{note.title}: </strong>
                  {note.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No notes available</p>
          )}
        </div>
        <div className="mt-2 flex flex-wrap justify-center text-14">
          <Button
            className="border h-10 w-36 rounded-20"
            variant={ButtonVariants.SECONDARY_SQUARE}
          >
            Edit
          </Button>
          <button className="mt-1 text-gray-500 underline decoration-solid hover:text-gray-700 hover:underline">
            Delete User
          </button>
        </div>
      </div>

      <div className="flex-1">
        <div className="border-b">
          <ContactInfo
            first_name={first_name}
            last_name={last_name}
            phone={phone}
            email={email}
            role={role}
            purchaseLimit={purchase_limit}
          />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-5 pb-8">
          <div className="flex flex-col gap-4">
            <Locations locations={locations} />
          </div>
          <div className="flex flex-col gap-4">
            <Products products={products} />
          </div>
        </div>
        <div className="mt-5 flex w-full">
          {userMetrics && (
            <UserMetric
              title={userMetrics.title}
              metrics={userMetrics.metrics}
            />
          )}
        </div>

        {/* <Window className="mt-8"> */}
        <div className="mt-8">
          <OrderHistory
            toggleOrderHistory={toggleOrderHistory}
            isOrderHistoryVisible={isOrderHistoryVisible}
            columns={BUYERS_ORDER_TABLE_COLUMNS}
            items={items}
          />
        </div>
        {/* </Window> */}
      </div>
    </div>
  );
};
