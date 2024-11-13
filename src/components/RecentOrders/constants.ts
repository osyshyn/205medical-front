import { IOptionSelect } from "src/@types/form";
import { Column, Row } from "../Table/types";

export const ORDER_SORT_OPTIONS: IOptionSelect[] = [
  { label: "Select", value: "select" },
  { label: "PO Date: Newest First", value: "poDate_desc" },
  { label: "PO Date: Oldest First", value: "poDate_asc" },
  { label: "Customer PO: A to Z", value: "customerPO_asc" },
  { label: "Customer PO: Z to A", value: "customerPO_desc" },
  { label: "Amount: Low to High", value: "amount_asc" },
  { label: "Amount: High to Low", value: "amount_desc" },
  { label: "Approval Status: A to Z", value: "approvalStatus_asc" },
  { label: "Approval Status: Z to A", value: "approvalStatus_desc" },
  { label: "Ship Status: A to Z", value: "shipStatus_asc" },
  { label: "Ship Status: Z to A", value: "shipStatus_desc" },
];

export const ORDERS_PER_PAGE = 8;

export const ORDER_COLUMNS: Column[] = [
  { key: "customerPO", label: "Customer PO #" },
  { key: "poDate", label: "PO Date" },
  { key: "salesOrder", label: "Sales Order #" },
  { key: "shipTo", label: "Ship To" },
  { key: "amount", label: "Amount" },
  { key: "approvalStatus", label: "Approval Status" },
  { key: "shipStatus", label: "Ship Status" },
];

export const ORDER_DATA: Row[] = [
  {
    key: "1",
    salesOrder: "1111111",
    poDate: "08/13/24",
    shipTo: "Location Name A",
    amount: "$325.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111111",
  },
  {
    key: "2",
    salesOrder: "1111112",
    poDate: "08/13/24",
    shipTo: "Location Name B",
    amount: "$215.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111112",
  },
  {
    key: "3",
    salesOrder: "1111113",
    poDate: "08/13/24",
    shipTo: "Location Name C",
    amount: "$140.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111113",
  },
  {
    key: "4",
    salesOrder: "1111114",
    poDate: "08/13/24",
    shipTo: "Location Name D",
    amount: "$49.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111114",
  },
  {
    key: "5",
    salesOrder: "1111115",
    poDate: "08/13/24",
    shipTo: "Location Name E",
    amount: "$64.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111115",
  },
  {
    key: "6",
    salesOrder: "1111116",
    poDate: "08/13/24",
    shipTo: "Location Name F",
    amount: "$72.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111116",
  },
  {
    key: "7",
    salesOrder: "1111117",
    poDate: "08/13/24",
    shipTo: "Location Name G",
    amount: "$25.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111117",
  },
  {
    key: "8",
    salesOrder: "1111118",
    poDate: "08/13/24",
    shipTo: "Location Name H",
    amount: "$80.00",
    approvalStatus: "Approved",
    shipStatus: "Pending",
    customerPO: "1111118",
  },
  {
    key: "9",
    salesOrder: "1111119",
    poDate: "08/13/24",
    shipTo: "Location Name I",
    amount: "$300.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111119",
  },
  {
    key: "10",
    salesOrder: "1111120",
    poDate: "08/13/24",
    shipTo: "Location Name J",
    amount: "$500.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111120",
  },
  {
    key: "11",
    salesOrder: "1111121",
    poDate: "08/13/24",
    shipTo: "Location Name K",
    amount: "$150.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111121",
  },
  {
    key: "12",
    salesOrder: "1111122",
    poDate: "08/13/24",
    shipTo: "Location Name L",
    amount: "$200.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111122",
  },
  {
    key: "13",
    salesOrder: "1111123",
    poDate: "08/13/24",
    shipTo: "Location Name M",
    amount: "$420.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111123",
  },
  {
    key: "14",
    salesOrder: "1111124",
    poDate: "08/13/24",
    shipTo: "Location Name N",
    amount: "$65.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111124",
  },
  {
    key: "15",
    salesOrder: "1111125",
    poDate: "08/13/24",
    shipTo: "Location Name O",
    amount: "$115.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111125",
  },
  {
    key: "16",
    salesOrder: "1111126",
    poDate: "08/13/24",
    shipTo: "Location Name P",
    amount: "$98.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111126",
  },
  {
    key: "17",
    salesOrder: "1111127",
    poDate: "08/13/24",
    shipTo: "Location Name Q",
    amount: "$76.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111127",
  },
  {
    key: "18",
    salesOrder: "1111128",
    poDate: "08/13/24",
    shipTo: "Location Name R",
    amount: "$130.00",
    approvalStatus: "Approved",
    shipStatus: "Pending",
    customerPO: "1111128",
  },
  {
    key: "1111",
    salesOrder: "1111111",
    poDate: "08/13/24",
    shipTo: "Location Name A",
    amount: "$325.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111111",
  },
  {
    key: "21",
    salesOrder: "1111112",
    poDate: "08/13/24",
    shipTo: "Location Name B",
    amount: "$215.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111112",
  },
  {
    key: "31",
    salesOrder: "1111113",
    poDate: "08/13/24",
    shipTo: "Location Name C",
    amount: "$140.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111113",
  },
  {
    key: "41",
    salesOrder: "1111114",
    poDate: "08/13/24",
    shipTo: "Location Name D",
    amount: "$49.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111114",
  },
  {
    key: "51",
    salesOrder: "1111115",
    poDate: "08/13/24",
    shipTo: "Location Name E",
    amount: "$64.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111115",
  },
  {
    key: "61",
    salesOrder: "1111116",
    poDate: "08/13/24",
    shipTo: "Location Name F",
    amount: "$72.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111116",
  },
  {
    key: "71",
    salesOrder: "1111117",
    poDate: "08/13/24",
    shipTo: "Location Name G",
    amount: "$25.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111117",
  },
  {
    key: "81",
    salesOrder: "1111118",
    poDate: "08/13/24",
    shipTo: "Location Name H",
    amount: "$80.00",
    approvalStatus: "Approved",
    shipStatus: "Pending",
    customerPO: "1111118",
  },
  {
    key: "91",
    salesOrder: "1111119",
    poDate: "08/13/24",
    shipTo: "Location Name I",
    amount: "$300.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111119",
  },
  {
    key: "101",
    salesOrder: "1111120",
    poDate: "08/13/24",
    shipTo: "Location Name J",
    amount: "$500.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111120",
  },
  {
    key: "111",
    salesOrder: "1111121",
    poDate: "08/13/24",
    shipTo: "Location Name K",
    amount: "$150.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111121",
  },
  {
    key: "121",
    salesOrder: "1111122",
    poDate: "08/13/24",
    shipTo: "Location Name L",
    amount: "$200.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111122",
  },
  {
    key: "131",
    salesOrder: "1111123",
    poDate: "08/13/24",
    shipTo: "Location Name M",
    amount: "$420.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111123",
  },
  {
    key: "141",
    salesOrder: "1111124",
    poDate: "08/13/24",
    shipTo: "Location Name N",
    amount: "$65.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111124",
  },
  {
    key: "151",
    salesOrder: "1111125",
    poDate: "08/13/24",
    shipTo: "Location Name O",
    amount: "$115.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111125",
  },
  {
    key: "161",
    salesOrder: "1111126",
    poDate: "08/13/24",
    shipTo: "Location Name P",
    amount: "$98.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111126",
  },
  {
    key: "171",
    salesOrder: "1111127",
    poDate: "08/13/24",
    shipTo: "Location Name Q",
    amount: "$76.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111127",
  },
  {
    key: "181",
    salesOrder: "1111128",
    poDate: "08/13/24",
    shipTo: "Location Name R",
    amount: "$130.00",
    approvalStatus: "Approved",
    shipStatus: "Pending",
    customerPO: "1111128",
  },
  {
    key: "12",
    salesOrder: "1111111",
    poDate: "08/13/24",
    shipTo: "Location Name A",
    amount: "$325.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111111",
  },
  {
    key: "22",
    salesOrder: "1111112",
    poDate: "08/13/24",
    shipTo: "Location Name B",
    amount: "$215.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111112",
  },
  {
    key: "32",
    salesOrder: "1111113",
    poDate: "08/13/24",
    shipTo: "Location Name C",
    amount: "$140.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111113",
  },
  {
    key: "42",
    salesOrder: "1111114",
    poDate: "08/13/24",
    shipTo: "Location Name D",
    amount: "$49.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111114",
  },
  {
    key: "52",
    salesOrder: "1111115",
    poDate: "08/13/24",
    shipTo: "Location Name E",
    amount: "$64.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111115",
  },
  {
    key: "62",
    salesOrder: "1111116",
    poDate: "08/13/24",
    shipTo: "Location Name F",
    amount: "$72.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111116",
  },
  {
    key: "72",
    salesOrder: "1111117",
    poDate: "08/13/24",
    shipTo: "Location Name G",
    amount: "$25.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111117",
  },
  {
    key: "82",
    salesOrder: "1111118",
    poDate: "08/13/24",
    shipTo: "Location Name H",
    amount: "$80.00",
    approvalStatus: "Approved",
    shipStatus: "Pending",
    customerPO: "1111118",
  },
  {
    key: "92",
    salesOrder: "1111119",
    poDate: "08/13/24",
    shipTo: "Location Name I",
    amount: "$300.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111119",
  },
  {
    key: "102",
    salesOrder: "1111120",
    poDate: "08/13/24",
    shipTo: "Location Name J",
    amount: "$500.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111120",
  },
  {
    key: "112",
    salesOrder: "1111121",
    poDate: "08/13/24",
    shipTo: "Location Name K",
    amount: "$150.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111121",
  },
  {
    key: "122",
    salesOrder: "1111122",
    poDate: "08/13/24",
    shipTo: "Location Name L",
    amount: "$200.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111122",
  },
  {
    key: "132",
    salesOrder: "1111123",
    poDate: "08/13/24",
    shipTo: "Location Name M",
    amount: "$420.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111123",
  },
  {
    key: "142",
    salesOrder: "1111124",
    poDate: "08/13/24",
    shipTo: "Location Name N",
    amount: "$65.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111124",
  },
  {
    key: "152",
    salesOrder: "1111125",
    poDate: "08/13/24",
    shipTo: "Location Name O",
    amount: "$115.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111125",
  },
  {
    key: "162",
    salesOrder: "1111126",
    poDate: "08/13/24",
    shipTo: "Location Name P",
    amount: "$98.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111126",
  },
  {
    key: "172",
    salesOrder: "1111127",
    poDate: "08/13/24",
    shipTo: "Location Name Q",
    amount: "$76.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111127",
  },
  {
    key: "182",
    salesOrder: "1111128",
    poDate: "08/13/24",
    shipTo: "Location Name R",
    amount: "$130.00",
    approvalStatus: "Approved",
    shipStatus: "Pending",
    customerPO: "1111128",
  },
  {
    key: "112",
    salesOrder: "1111111",
    poDate: "08/13/24",
    shipTo: "Location Name A",
    amount: "$325.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111111",
  },
  {
    key: "212",
    salesOrder: "1111112",
    poDate: "08/13/24",
    shipTo: "Location Name B",
    amount: "$215.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111112",
  },
  {
    key: "312",
    salesOrder: "1111113",
    poDate: "08/13/24",
    shipTo: "Location Name C",
    amount: "$140.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111113",
  },
  {
    key: "412",
    salesOrder: "1111114",
    poDate: "08/13/24",
    shipTo: "Location Name D",
    amount: "$49.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111114",
  },
  {
    key: "512",
    salesOrder: "1111115",
    poDate: "08/13/24",
    shipTo: "Location Name E",
    amount: "$64.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111115",
  },
  {
    key: "612",
    salesOrder: "1111116",
    poDate: "08/13/24",
    shipTo: "Location Name F",
    amount: "$72.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111116",
  },
  {
    key: "712",
    salesOrder: "1111117",
    poDate: "08/13/24",
    shipTo: "Location Name G",
    amount: "$25.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111117",
  },
  {
    key: "812",
    salesOrder: "1111118",
    poDate: "08/13/24",
    shipTo: "Location Name H",
    amount: "$80.00",
    approvalStatus: "Approved",
    shipStatus: "Pending",
    customerPO: "1111118",
  },
  {
    key: "912",
    salesOrder: "1111119",
    poDate: "08/13/24",
    shipTo: "Location Name I",
    amount: "$300.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111119",
  },
  {
    key: "1012",
    salesOrder: "1111120",
    poDate: "08/13/24",
    shipTo: "Location Name J",
    amount: "$500.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111120",
  },
  {
    key: "1112",
    salesOrder: "1111121",
    poDate: "08/13/24",
    shipTo: "Location Name K",
    amount: "$150.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111121",
  },
  {
    key: "1212",
    salesOrder: "1111122",
    poDate: "08/13/24",
    shipTo: "Location Name L",
    amount: "$200.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111122",
  },
  {
    key: "1312",
    salesOrder: "1111123",
    poDate: "08/13/24",
    shipTo: "Location Name M",
    amount: "$420.00",
    approvalStatus: "Rejected",
    shipStatus: "Cancelled",
    customerPO: "1111123",
  },
  {
    key: "1412",
    salesOrder: "1111124",
    poDate: "08/13/24",
    shipTo: "Location Name N",
    amount: "$65.00",
    approvalStatus: "Approved",
    shipStatus: "Shipped",
    customerPO: "1111124",
  },
  {
    key: "1512",
    salesOrder: "1111125",
    poDate: "08/13/24",
    shipTo: "Location Name O",
    amount: "$115.00",
    approvalStatus: "Pending",
    shipStatus: "Pending",
    customerPO: "1111125",
  },
];
