import productImg from "src/components/AllProducts/temp/temp.png";
import { IProduct } from "src/@types/products";
import { Column, Row } from "src/@types/table";
import { ActionsButtons } from "./ActionsButtons";
import { IProperty } from "./ProductDetail/PropertiesCard/types";

export const getProperties = ({
  certification,
  type,
  package_info,
  size,
  sku,
  category,
}: IProduct): IProperty[] => [
  {
    label: "Certification",
    value: certification,
  },
  {
    label: "Specimen Type",
    value: type,
  },
  {
    label: "Package Info",
    value: package_info,
  },
  {
    label: "Case Size",
    value: size,
  },
  {
    label: "SKU",
    value: sku,
  },
  {
    label: "Categories",
    value: category.name,
  },
];

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
      component: ActionsButtons,
      props: {
        itemName: `Product Name ${i + 1}`,
        stockKeepingUnit: `12PAN-PCP-CU${i + 1}`,
      },
    },
  })
);
