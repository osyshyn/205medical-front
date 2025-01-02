import { IOrderToApprove } from "src/@types/orders";
import { Column, Row } from "src/@types/table";
import { ActionsButtons } from "./action-buttons";
import { Checkbox } from "./checkbox";

export const AWAITING_APPROVALS_COLUMNS: Column[] = [
  { key: "checkbox", label: "" },
  { key: "buyer_name", label: "Buyer Name" },
  { key: "po_date", label: "PO Date" },
  { key: "po_number", label: "PO #" },
  { key: "location_name", label: "Location name" },
  { key: "products", label: "Products" },
  { key: "expected_date", label: "Expected Date" },
  { key: "service_type", label: "Service Type" },
  { key: "ship_method", label: "Ship Method Req." },
  { key: "actionButtons", label: "" }, // Добавляем колонку для ActionButtons
];

const getServiceType = (shipMethod: string): string => {
  const rushMethods = [
    "2 Day",
    "Priority Overnight",
    "Standard Overnight",
    "Sat Delivery",
  ];
  if (shipMethod === "Standard delivery") return "Regular Order";
  if (rushMethods.includes(shipMethod)) return "Rush Order";
  return "Unknown";
};

const getExpectedDate = (shipMethod: string, poDate: string): string => {
  const date = new Date(poDate);
  switch (shipMethod) {
    case "2 Day":
      date.setDate(date.getDate() + 2);
      break;
    case "Priority Overnight":
      date.setDate(date.getDate() + 1);
      break;
    default:
      return poDate;
  }
  return date.toISOString().split("T")[0];
};

export const AWAITING_PER_PAGE = 10;

export const getTableItems = (orders: IOrderToApprove[]): IOrderToApprove[] =>
  orders?.map((order) => ({
    ...order,
    checkbox: {
      type: "component",
      component: Checkbox,
      props: {
        orderId: order.id,
      },
    },
    buyer_name: order.buyer_name,
    po_number: order.id,
    location_name: order.location,
    po_date: order.created_at,
    expected_date: getExpectedDate(order.rush_service, order.created_at),
    service_type: getServiceType(order.rush_service),
    ship_method: order.rush_service,
    actionButtons: {
      type: "component",
      component: ActionsButtons,
      props: {
        id: order.id,
      },
    },
  }));
