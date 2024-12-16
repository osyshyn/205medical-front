import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useOrderStore, { FetchOrdersParams } from "src/stores/order-store";
import useUserStore from "src/stores/user-store";
import { PATHNAMES } from "src/constants/routes";
import { Sizes } from "src/@types/sizes";
import { Row } from "src/@types/table";
import { Loader } from "../Loader";
import { Metric } from "../Metrics/Metric";
import { ModalWindow } from "../ModalWindow";
import { Table, TableBody, TableHeader } from "../Table";
import { Window } from "../Window";
import {
  BUYERS_ORDER_TABLE_COLUMNS,
  getBuyerOrderTableItems,
} from "./UserOrders/constants";

export const BuyerDetail: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const userOrder = useOrderStore((state) => state.orders);
  const buyerDetail = useUserStore((state) => state.detailUser);
  const approvedLocations = useUserStore((state) => state.approvedLocations);
  const userNotes = useUserStore((state) => state.userNotes);
  const loadBuyerDetail = useUserStore((state) => state.getUserDetail);
  const loadApprovedLocations = useUserStore(
    (state) => state.getUserApprovedLocations
  );
  const loadUserNotes = useUserStore((state) => state.getUserNotes);
  const loadUserOrders = useOrderStore((state) => state.fetchOrders);

  useEffect(() => {
    const params: FetchOrdersParams = {
      month: "12", // Convert to string
      year: "2024",
      su_users_ids: [Number(id)], // Pass `id` as `su_users_ids`
      search: "", // Optional, depending on your use case
      current_page: 1, // Set the current page (or handle pagination)
    };

    loadBuyerDetail(id);
    loadApprovedLocations(id);
    loadUserNotes(id);
    loadUserOrders(params); // Now matches the expected type
  }, [
    loadBuyerDetail,
    loadApprovedLocations,
    loadUserNotes,
    loadUserNotes,
    id,
  ]);

  const onClose = () => {
    navigate(PATHNAMES.BUYERS);
  };

  const { first_name, last_name, email, phone, role, purchase_limit } =
    buyerDetail;

  const userOrdersResults = userOrder?.result || [];

  console.log("User Orders: ", userOrdersResults[0]);

  const items = getBuyerOrderTableItems(userOrdersResults) as unknown as Row[];

  // console.log("Items: ", items);

  return (
    <ModalWindow
      className="max-h-[900px] w-3/5 overflow-y-auto"
      onClose={onClose}
      isOpen={true}
      isActivePortal
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-semibold">User Overview</h1>
          </div>
        </div>

        {/* Body */}
        <div className="flex gap-15">
          <div className="min-h-[800px] w-[150px]">
            <div className="mb-4 h-[140px] w-[140px] overflow-hidden bg-gray-200">
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
            {/* USER INFO */}
            <div className="mt-8 flex border-b pb-8">
              <div className="flex-1 flex-col gap-12">
                <div className="flex gap-2">
                  <p className="text-[#344054A1]">Name:</p>
                  <p className="font-semibold">{`${first_name} ${last_name}`}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-[#344054A1]">Role:</p>
                  <p className="font-semibold">{role}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-[#344054A1]">Purchase limit:</p>
                  <p className="font-semibold">{purchase_limit}</p>
                </div>
              </div>
              <div className="flex-1 flex-col gap-12">
                <div className="flex gap-2">
                  <p className="text-[#344054A1]">Phone:</p>
                  <p className="font-semibold">{phone}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-[#344054A1]">Email:</p>
                  <p className="font-semibold">{email}</p>
                </div>
              </div>
            </div>

            {/* Approval */}
            <div className="mt-8 grid grid-cols-2 border-b pb-8">
              <div className="flex flex-col gap-4">
                <h3 className="text-[14px] font-[500]">Approved locations</h3>
                <dl className="ml-5 flex flex-col gap-4 text-[14px] font-[400]">
                  {approvedLocations.length > 0 &&
                    approvedLocations.map((location) => (
                      <li key={location}>{location}</li>
                    ))}
                </dl>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-[14px] font-[500]">Approved locations</h3>
                <dl className="ml-5 flex flex-col gap-4 text-[14px] font-[400]">
                  <li>Location 1</li>
                  <li>Location 2</li>
                  <li>Location 3</li>
                </dl>
              </div>
            </div>

            {/* Metrics */}
            <div className="mt-5 flex w-full justify-center">
              <Metric title="Orders" metrics={[]} />
            </div>

            <Table>
              <TableHeader columns={BUYERS_ORDER_TABLE_COLUMNS} />
              <TableBody items={items} columns={BUYERS_ORDER_TABLE_COLUMNS} />
            </Table>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};
