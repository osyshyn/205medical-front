import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useMetricStore from "src/stores/metric-store";
import useOrderStore, { FetchOrdersParams } from "src/stores/order-store";
import useUserStore from "src/stores/user-store";
import { PATHNAMES } from "src/constants/routes";
import { ReactComponent as WhiteLogo } from "src/assets/icons/whiteLogo.svg";
import { Row } from "src/@types/table";
import { ModalWindow } from "../ModalWindow";
import { OrderHistory } from "../OrderHistory";
import { ContactInfo } from "../SettingUserManagement/ContactInfo";
import { Locations } from "../SettingUserManagement/Locations";
import { Products } from "../SettingUserManagement/Products";
import { Window } from "../Window";
import { UserMetric } from "./UserMetrics";
import {
  BUYERS_ORDER_TABLE_COLUMNS,
  getBuyerOrderTableItems,
} from "./UserOrders/constants";

export const BuyerDetail: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isOrderHistoryVisible, setIsOrderHistoryVisible] = useState(true);

  const userOrder = useOrderStore((state) => state.orders);
  const buyerDetail = useUserStore((state) => state.detailUser);
  const userNotes = useUserStore((state) => state.userNotes);
  const loadBuyerDetail = useUserStore((state) => state.getUserDetail);
  const loadUserNotes = useUserStore((state) => state.getUserNotes);
  const loadUserOrders = useOrderStore((state) => state.fetchOrders);

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

    loadBuyerDetail(id);
    loadUserNotes(id);
    loadUserOrders(params);
    loadUserMetrics({
      month: String(currentDate.getMonth() + 1),
      year: String(currentDate.getFullYear()),
      su_users_ids: [id],
    });
  }, [loadBuyerDetail, loadUserNotes, loadUserMetrics, loadUserOrders, id]);

  const onClose = () => {
    navigate(PATHNAMES.BUYERS);
  };

  const {
    first_name,
    last_name,
    email,
    phone,
    role,
    purchase_limit,
    locations,
    products,
  } = buyerDetail;

  const userOrdersResults = userOrder?.result || [];

  const items = getBuyerOrderTableItems(userOrdersResults) as unknown as Row[];

  const toggleOrderHistory = () => {
    setIsOrderHistoryVisible((prev) => !prev);
  };

  return (
    <ModalWindow
      className="max-h-[800px] w-3/5 overflow-y-auto"
      onClose={onClose}
      isOpen={true}
      isActivePortal
      closeButtonClassName="!bg-white-base rounded-full  shadow-md"
    >
      <Window className="!border-none !p-0">
        <div className="space-y-8">
          <div className="text-white flex flex-col gap-10 rounded-t-30 bg-[#3D3935] px-7.5 py-4">
            <div>
              <WhiteLogo />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white-base">
                User Overview
              </h1>
            </div>
          </div>

          <div className="flex gap-15 p-4">
            <div className="min-h-[800px] w-[150px]">
              <div className="mb-4 h-[180px] w-[180px] overflow-hidden bg-gray-200">
                {buyerDetail.avatar?.path ? (
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/${buyerDetail.avatar.path.replace(
                      "public\\",
                      ""
                    )}`}
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-500">No Avatar</span>
                )}
              </div>

              <div className="w-full text-left">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Notes</h3>
                  <button className="text-sm text-blue-500 hover:underline">
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
        </div>
      </Window>
    </ModalWindow>
  );
};
