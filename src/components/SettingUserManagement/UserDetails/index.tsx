import { useCallback, useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { UserMetric } from "src/components/Buyers/UserMetrics";
import {
  BUYERS_ORDER_TABLE_COLUMNS,
  getBuyerOrderTableItems,
} from "src/components/Buyers/UserOrders/constants";
import { DeleteEntity } from "src/components/DeleteEntity";
import { OrderHistory } from "src/components/OrderHistory";
import { SelectDate } from "src/components/SelectDate";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
  MONTH_OPTIONS_SELECT,
  YEARS_OPTIONS_SELECT,
} from "src/components/SelectDate/constants";
import { useQueryParams } from "src/hooks/useQueryParams";
import useMetricStore from "src/stores/metric-store";
import useOrderStore, { FetchOrdersParams } from "src/stores/order-store";
import useUserStore from "src/stores/user-store";
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IOptionSelect } from "src/@types/form";
import { Row } from "src/@types/table";
import { TypesUsers } from "src/@types/users";
import { AddNotes } from "../AddNotes";
import { Avatar } from "../Avatar";
import { ContactInfo } from "../ContactInfo";
import { EditMedicalSettings } from "../EditUserModal";
import { Locations } from "../Locations";
import { Products } from "../Products";
import { Users } from "../Users";

export const UserDetails = ({ id, onUserUpdate, onUserDelete }) => {
  const [isOrderHistoryVisible, setIsOrderHistoryVisible] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  const { getQueryParam, setMultipleQueryParams } = useQueryParams();
  const userOrder = useOrderStore((state) => state.orders);
  const loadUserDetail = useUserStore((state) => state.getUserDetail);
  const loadUserNotes = useUserStore((state) => state.getUserNotes);
  const loadUserOrders = useOrderStore((state) => state.fetchOrders);
  const userDetail = useUserStore((state) => state.detailUser);
  const userNotes = useUserStore((state) => state.userNotes);
  const deleteUser = useUserStore((state) => state.deleteSubUser);
  const subUsers = useUserStore((state) => state.subUsers);
  const getSubUsers = useUserStore((state) => state.getSubUsers);

  const userMetrics = useMetricStore((state) => state.user_metric);
  const loadUserMetrics = useMetricStore((state) => state.fetchUserMetric);

  const selectMonthOption =
    MONTH_OPTIONS_SELECT.find(
      ({ value }) => value === +getQueryParam(QUERY_PARAM_KEYS.MONTH)
    ) || getCurrentMonthOption();

  const selectYearOption =
    YEARS_OPTIONS_SELECT.find(
      ({ value }) => value === +getQueryParam(QUERY_PARAM_KEYS.YEAR)
    ) || getCurrentYearOption();

  const refreshUserData = useCallback(() => {
    const params: FetchOrdersParams = {
      month: selectMonthOption.value.toString(),
      year: selectYearOption.value.toString(),
      su_users_ids: [Number(id)],
      search: "",
      current_page: 1,
    };

    loadUserDetail(id);
    getSubUsers(id);
    loadUserNotes(id);
    loadUserOrders(params);
    loadUserMetrics({
      month: selectMonthOption.value.toString(),
      year: selectYearOption.value.toString(),
      su_users_ids: [id],
    });
  }, [
    id,
    loadUserDetail,
    getSubUsers,
    loadUserNotes,
    loadUserOrders,
    loadUserMetrics,
    selectMonthOption.value,
    selectYearOption.value,
  ]);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const handleEditModalClose = async () => {
    setIsEditModalOpen(false);
    await Promise.all([refreshUserData(), onUserUpdate?.()]);
  };

  const handleDeleteSuccess = async () => {
    try {
      await deleteUser(id);
      setIsDeleteUserOpen(false);
      onUserDelete?.();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const setSelectMonthOption = ({ value }: IOptionSelect) => {
    setMultipleQueryParams({
      [QUERY_PARAM_KEYS.MONTH]: value,
      [QUERY_PARAM_KEYS.PAGE]: "1",
    });
    refreshUserData();
  };

  const setSelectYearOption = ({ value }: IOptionSelect) => {
    setMultipleQueryParams({
      [QUERY_PARAM_KEYS.YEAR]: value,
      [QUERY_PARAM_KEYS.PAGE]: "1",
    });
    refreshUserData();
  };

  const userOrdersResults = userOrder?.result || [];
  const items = getBuyerOrderTableItems(userOrdersResults) as unknown as Row[];

  const toggleOrderHistory = () => {
    setIsOrderHistoryVisible((prev) => !prev);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteUserOpen(true);
  };

  const handleAddNote = () => {
    setIsAddNoteOpen(true);
  };

  const handleEditSave = (updatedUserData) => {
    console.log("Updated user data:", updatedUserData);
  };

  return (
    <div className="flex flex-wrap gap-15 p-10">
      <div className="min-h-[800px] w-[180px]">
        <Avatar avatarPath={userDetail?.avatar?.path} />
        <div className="w-full text-left">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Notes</h3>
            <button
              onClick={() => setIsAddNoteOpen(true)}
              className="text-14 text-gray-500 underline decoration-solid hover:text-gray-700 hover:underline"
            >
              Add
            </button>
            <AddNotes
              isOpen={isAddNoteOpen}
              onClose={() => setIsAddNoteOpen(false)}
              userId={id}
            />
          </div>

          {userNotes.length > 0 ? (
            <ul className="text-sm text-gray-700">
              {userNotes.map((note) => (
                <li key={note.id} className="mb-1">
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
            className="h-10 w-36 rounded-20 border"
            variant={ButtonVariants.SECONDARY_SQUARE}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit
          </Button>
          <EditMedicalSettings
            key={`edit-modal-${id}-${isEditModalOpen}`}
            settingsId={id}
            isOpen={isEditModalOpen}
            onClose={handleEditModalClose}
          />
          <button
            onClick={() => setIsDeleteUserOpen(true)}
            className="mt-1 text-gray-500 underline decoration-solid hover:text-gray-700 hover:underline"
          >
            Delete User
          </button>
          <DeleteEntity
            isOpen={isDeleteUserOpen}
            onClose={() => setIsDeleteUserOpen(false)}
            entityId={id}
            entityName="User"
            deleteAction={handleDeleteSuccess}
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="border-b">
          <ContactInfo
            key={`contact-info-${JSON.stringify(userDetail)}`}
            first_name={userDetail?.first_name}
            last_name={userDetail?.last_name}
            phone={userDetail?.phone}
            email={userDetail?.email}
            role={userDetail?.role}
            purchaseLimit={userDetail?.purchase_limit}
          />
        </div>
        {userDetail?.role !== TypesUsers.MEDICAL && (
          <div
            className={`mt-8 grid ${
              userDetail?.role === TypesUsers.CLIENT_ADMIN
                ? "grid-cols-3"
                : "grid-cols-2"
            } gap-5 pb-8`}
          >
            <div className="flex flex-col gap-4">
              <Locations locations={userDetail?.locations} />
            </div>
            <div className="flex flex-col gap-4">
              <Products products={userDetail?.products} />
            </div>
            {userDetail?.role === TypesUsers.CLIENT_ADMIN && (
              <div className="flex flex-col gap-4">
                <Users users={subUsers} />
              </div>
            )}
          </div>
        )}

        <div className="mt-5 flex w-full">
          {userMetrics && (
            <UserMetric
              title={userMetrics.title}
              metrics={userMetrics.metrics}
            />
          )}
        </div>

        <div className="mt-8">
          <div className="flex justify-end">
            <SelectDate
              selectMonth={selectMonthOption}
              setSelectMonth={setSelectMonthOption}
              selectYear={selectYearOption}
              setSelectYear={setSelectYearOption}
              isTitleHidden
            />
          </div>

          <OrderHistory
            toggleOrderHistory={() =>
              setIsOrderHistoryVisible(!isOrderHistoryVisible)
            }
            isOrderHistoryVisible={isOrderHistoryVisible}
            columns={BUYERS_ORDER_TABLE_COLUMNS}
            items={items}
          />
        </div>
      </div>
    </div>
  );
};
