import { IOrder } from "src/@types/orders";
import { Column, Row } from "src/@types/table";

// Обновленные колонки
export const BUYERS_ORDER_TABLE_COLUMNS: Column[] = [
  { key: "customer_po_number", label: "Customer PO #" },
  { key: "invoice_status", label: "Invoice Status" },
  { key: "date", label: "Date" }, // Указал ключ "date" для соответствия строкам
  { key: "location", label: "Location" },
  { key: "order_total", label: "Order Total" }, // Уточнил label для суммы заказа
  { key: "due_date", label: "Due Date" }, // Оставил ключ "due_date"
  { key: "delivery_status", label: "Delivery Status" }, // Добавил статус доставки
  { key: "payment_status", label: "Payment Status" }, // Добавил статус оплаты
];

// Обновленная функция получения элементов для таблицы
export const getBuyerOrderTableItems = (orders: any[]): Row[] =>
  orders.map((order) => ({
    id: order.id, // ID строки
    customer_po_number: order.customer_po_number || "N/A", // Номер PO клиента
    invoice_status: getInvoiceStatusLabel(order.invoice_status), // Статус счета
    date: formatDate(order.created_at), // Дата создания
    location: order.location || "N/A", // Местоположение
    order_total: order.order_amt, // Сумма заказа
    due_date: formatDate(order.expected_delivery_date), // Ожидаемая дата доставки
    delivery_status: getDeliveryStatusLabel(order.ship_status), // Статус доставки
    payment_status: getPaymentStatusLabel(order.status), // Статус оплаты
  }));

// Универсальная функция форматирования даты
const formatDate = (date: string | number | undefined): string => {
  if (!date) return "Invalid date";
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime())
    ? "Invalid date"
    : parsedDate.toLocaleString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
};

// Функция для получения текста статуса счета
const getInvoiceStatusLabel = (status: number): string => {
  switch (status) {
    case 1:
      return "Paid";
    case 2:
      return "Unpaid";
    case 3:
      return "Pending";
    default:
      return "Unknown";
  }
};

const getDeliveryStatusLabel = (status: number): string => {
  switch (status) {
    case 1:
      return "Shipped";
    case 2:
      return "Not Shipped";
    case 3:
      return "In Progress";
    default:
      return "Unknown";
  }
};

const getPaymentStatusLabel = (status: number): string => {
  switch (status) {
    case 1:
      return "Completed";
    case 2:
      return "Pending";
    case 3:
      return "Failed";
    default:
      return "Unknown";
  }
};
