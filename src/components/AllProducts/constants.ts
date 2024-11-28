import productImg from "src/components/AllProducts/temp/temp.png";
import { Column, Row } from "src/@types/table";
import { AllProducts } from "./ActionsButtons";

export const ALL_PRODUCTS_COLUMNS: Column[] = [
  { key: "image", label: "" },
  { key: "stockKeepingUnit", label: "SKU" },
  { key: "itemName", label: "Item name" },
  { key: "unitPrice", label: "Unit Price" },
  { key: "minimumOrder", label: "Minimum Order" },
  { key: "actionButtons", label: "" },
];

export const ALL_PRODUCTS_DATA_TEMP: Row[] = Array.from(
  { length: 30 },
  (_, i) => ({
    key: (i + 1).toString(),
    image: {
      type: "image",
      src: productImg,
      alt: `Product ${i + 1}`,
    },
    stockKeepingUnit: `12PAN-PCP-CU${i + 1}`,
    itemName: `Product Name ${i + 1}`,
    unitPrice: `$${(Math.random() * 100).toFixed(2)}`,
    minimumOrder: Math.floor(Math.random() * 1000) + 1,
    actionButtons: {
      type: "component",
      component: AllProducts,
      props: {},
    },
  })
);
