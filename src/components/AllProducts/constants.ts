import { Column, Row } from "src/@types/table";
import productImg from "src/components/AllProducts/temp/temp.png";

export const ALL_PRODUCTS_COLUMNS: Column[] = [
  { key: "image", label: "" },
  { key: "stockKeepingUnit", label: "SKU" },
  { key: "itemName", label: "Item name" },
  { key: "unitPrice", label: "Unit Price" },
  { key: "minimumOrder", label: "Minimum Order" },
];

export const ALL_PRODUCTS_DATA_TEMP: Row[] = [
  {
    key: "1",
    image: {
      type: "image",
      src: productImg,
      alt: "Name 1",
    },
    stockKeepingUnit: "12PAN-PCP-CUP",
    itemName: "Name 1",
    unitPrice: "$3",
    minimumOrder: 240,
  },
  {
    key: "2",
    image: {
      type: "image",
      src: productImg,
      alt: "Name 2",
    },
    stockKeepingUnit: "12PAN-PCP-CUP",
    itemName: "Name 2",
    unitPrice: "$4",
    minimumOrder: 340,
  },
  {
    key: "3",
    image: {
      type: "image",
      src: productImg,
      alt: "Name 2",
    },
    stockKeepingUnit: "12PAN-PCP-CUP",
    itemName: "Name 3",
    unitPrice: "$6",
    minimumOrder: 29,
  },
  {
    key: "4",
    image: {
      type: "image",
      src: productImg,
      alt: "Name 2",
    },
    stockKeepingUnit: "12PAN-PCP-CUP",
    itemName: "Name 3",
    unitPrice: "$6",
    minimumOrder: 1300,
  },
  {
    key: "5",
    image: {
      type: "image",
      src: productImg,
      alt: "Name 2",
    },
    stockKeepingUnit: "12PAN-PCP-CUP",
    itemName: "Name 3",
    unitPrice: "$6",
    minimumOrder: 2,
  },
  {
    key: "6",
    image: {
      type: "image",
      src: productImg,
      alt: "Name 2",
    },
    stockKeepingUnit: "12PAN-PCP-CUP",
    itemName: "Name 3",
    unitPrice: "$6",
    minimumOrder: 74,
  },
];
