import { Column } from "src/@types/table";
import { ActionsButtons } from "./ActionButtons";

export const BUYERS_COLUMNS: Column[] = [
  { key: "image", label: "" },
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "state", label: "State" },
  { key: "locations", label: "Locations" },
  { key: "products", label: "Products" },
  { key: "actionButtons", label: "" },
];

export const BUYERS_PER_PAGE = 10;

export const getTableItems = (buyers: any[]): any[] =>
  buyers.map((buyer) => ({
    id: buyer.id,
    image: {
      type: "image",
      src: buyer.imageUrl || "default-image.jpg",
      alt: `${buyer.first_name} ${buyer.last_name}`,
    },
    first_name: buyer.first_name,
    last_name: buyer.last_name,
    state: buyer.state,
    locations:
      Array.isArray(buyer.locations) && buyer.locations.length > 0
        ? `${buyer.locations[0]?.name || JSON.stringify(buyer.locations[0])}...`
        : "N/A",
    products:
      Array.isArray(buyer.products) && buyer.products.length > 0
        ? `${buyer.products[0]?.name || JSON.stringify(buyer.products[0])}...`
        : "N/A",
    actionButtons: {
      type: "component",
      component: ActionsButtons,
      props: {
        id: buyer.id,
      },
    },
  }));
