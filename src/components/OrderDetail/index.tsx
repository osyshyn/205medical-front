import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useShipmentStore from "src/stores/shipment-store";
import { PATHNAMES } from "src/constants/routes";
import { ReactComponent as CopyIcon } from "src/assets/icons/copy.svg";
import { ReactComponent as DownloadIcon } from "src/assets/icons/download.svg";
import { ReactComponent as MailIcon } from "src/assets/icons/mail.svg";
import { Sizes } from "src/@types/sizes";
import { Loader } from "../Loader";
import { Logo } from "../Logo";
import { ModalWindow } from "../ModalWindow";
import { Table, TableBody, TableHeader } from "../Table";
import { Title } from "../Title";
import { Window } from "../Window";
import { BuyerInformation } from "./BuyerInformation";
import {
  ALL_ORDERS_DETAIL_COLUMNS,
  ALL_ORDERS_DETAIL_DATA_TEMP,
  transformOrderToProducts, // transformOrderToProducts,
} from "./constants";
import { CostSummary } from "./CostSummary";
import { OrderInfo } from "./OrderInfo";
import { OrderStatusInfo } from "./OrderStatusInformation";
import { ShippingAddress } from "./ShippingAddress";
import StatusBadge from "./StatusBadge";

export const OrderDetail: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Запит на сервер
  const shipment = useShipmentStore((state) => state.detailShipment);
  const loadShipment = useShipmentStore((state) => state.fetchShipmentDetails);
  const isLoading = useShipmentStore((state) => state.isLoading);

  useEffect(() => {
    loadShipment(id);
  }, [id, loadShipment]);

  const onClose = () => {
    navigate(PATHNAMES.SHIPMENTS);
  };

  if (!shipment && !isLoading) return null;
  if (!shipment || !shipment.order) return null;

  const {
    created_at,
    destination,
    invoice_id,
    location_id,
    location_name,
    order: {
      id: orderId,
      order_number,
      approval_status,
      customer_po_number,
      expected_delivery_date,
      order_amt,
      order_to_products,
      rush_service,
      ship_status,
      shipping_fee,
      status: orderStatus,
      updated_at: orderUpdatedAt,
      user: {
        id: userId,
        first_name,
        last_name,
        email,
        phone,
        role,
        created_at: userCreatedAt,
      },
      user_id,
    },
    po_number,
    ship_carrier,
    ship_date,
    status,
    updated_at,
  } = shipment ?? {};

  const tableData = transformOrderToProducts(order_to_products);

  return (
    <ModalWindow
      className="max-h-[900px] w-2/4 overflow-y-auto"
      onClose={onClose}
      isOpen
      isActivePortal
    >
      {isLoading ? (
        <Loader size={Sizes.XXL} />
      ) : (
        <div className="space-y-16">
          <Logo />
          {/* Header */}
          <div className="mt-8 flex items-center justify-between">
            <Title title="Order Details" subtitle="" />
            <a
              href="#"
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              Download PDF <DownloadIcon />
            </a>
          </div>

          <OrderInfo
            purchase_order_number={po_number}
            date_expected={""}
            sales_order_number={order_number}
            sales_order_date={new Date(created_at).toLocaleDateString()} // Преобразуем в объект Date
          />

          <div className="mt-8 grid grid-cols-2 gap-8 border-b pb-8">
            <ShippingAddress
              address={destination}
              name={`${first_name} ${last_name}`}
              email={email}
            />
            <CostSummary orderToProducts={order_to_products} />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8 border-b pb-8">
            <BuyerInformation
              name={`${first_name} ${last_name}`}
              email={email}
            />

            <OrderStatusInfo
              approvalStatus={approval_status}
              shipStatus={ship_status}
              rushService={rush_service}
            />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8">
            <Window className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <Title title="Item section" subtitle="" />
              </div>
              <Table
                className="scrollbar max-h-[550px] overflow-y-scroll"
                ariaLabel="Item section"
              >
                <TableHeader columns={ALL_ORDERS_DETAIL_COLUMNS} />
                <TableBody
                  items={tableData}
                  columns={ALL_ORDERS_DETAIL_COLUMNS}
                  isLoading={false}
                />
              </Table>
            </Window>
            <Window className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Notes</h2>
            </Window>
          </div>
        </div>
      )}
    </ModalWindow>
  );
};
