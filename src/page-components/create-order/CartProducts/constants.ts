import { ProductToLists } from "src/@types/product-list";
import { Column } from "src/@types/table";
import { DeleteButton } from "./DeleteButton";
import { QuantityToggle } from "./QuantityToggle";

export const CART_PRODUCTS_COLUMNS: Column[] = [
  { key: "preview", label: "" },
  { key: "sku", label: "SKU" },
  { key: "name", label: "Item name" },
  { key: "category", label: "Category" },
  { key: "package_info", label: "Package" },
  { key: "quantityComponent", label: "Quantity" },
  { key: "price", label: "Unit Price" },
  { key: "total", label: "Total" },
  { key: "deleteButton", label: "" },
];

export const getTableItems = (
  productToLists: ProductToLists[],
  listId: any
): ProductToLists[] =>
  productToLists.map((product) => ({
    ...product,
    quantityComponent: {
      type: "component",
      component: QuantityToggle,
      props: {
        id: product.id,
        quantity: product.quantity,
        minimum_order: product.minimum_order,
        list_id: listId,
      },
    },
    deleteButton: {
      type: "component",
      component: DeleteButton,
      props: {
        id: product.id,
      },
    },
  }));
