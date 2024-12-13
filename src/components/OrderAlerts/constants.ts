import { IAlert } from "src/@types/alert";
import { Column, Row } from "src/@types/table";
import { DeleteButton } from "./DeleteButton";

// предположительно кнопка удаления

export const ORDER_TABLE_COLUMNS: Column[] = [
  { key: "orderId", label: "Order number" },
  { key: "orderDate", label: "Date" },
  { key: "deleteButton", label: "" },
];

export const ALERTS_PER_PAGE = 8;

export const getTableItems = (alerts: IAlert[]): Row[] =>
  alerts.map((alert) => ({
    id: alert.id, // Mandatory row ID
    orderId: `Order #${alert.id} (${getStatusLabel(alert.status)})`, // Order number + status
    orderDate: new Date().toLocaleString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }), // Format the date
    deleteButton: {
      type: "component",
      component: DeleteButton,
      props: {
        alertId: alert.id, // Pass alert ID to DeleteButton
      },
    },
  }));

const getStatusLabel = (status: number): string => {
  switch (status) {
    case 1:
      return "Pending";
    case 2:
      return "Processing";
    case 3:
      return "Completed";
    case 4:
      return "Cancelled";
    default:
      return "Unknown";
  }
};