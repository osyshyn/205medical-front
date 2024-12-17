import { IProduct } from "src/@types/products";
import { Column, Row } from "src/@types/table";

export const ALL_ORDERS_DETAIL_COLUMNS: Column[] = [
  { key: "image", label: "" },
  { key: "sku", label: "SKU" },
  { key: "name", label: "Item name" },
  { key: "price", label: "Unit Price" },
  { key: "quantity", label: "Quantity" },
  { key: "total", label: "Order Total" },
];

export interface OrderToProduct {
  product: IProduct;
  quantity: number;
}

export const transformOrderToProducts = (
  orderToProducts: OrderToProduct[]
): Row[] => {
  return orderToProducts.map((item, index) => {
    if (!item.product) {
      console.error(`Product is undefined at index ${index}`, item);
      return {
        id: index + 1,
        key: "N/A",
        sku: "N/A",
        name: "N/A",
        price: "N/A",
        quantity: item.quantity || 0,
        total: "N/A",
      };
    }

    return {
      id: index + 1,
      key: item.product.id.toString(),
      sku: item.product.sku,
      name: item.product.name,
      price: `$${item.product.price.toFixed(2)}`,
      quantity: item.quantity,
      total: `$${(item.product.price * item.quantity).toFixed(2)}`,
    };
  });
};

export const ALL_ORDERS_DETAIL_DATA_TEMP: Row[] = Array.from(
  { length: 30 },
  (_, i) => ({
    id: i + 1,
    key: (i + 1).toString(),
    sku: `ORD-SKU${i + 1}`,
    name: `Order Item ${i + 1}`,
    price: `$${(Math.random() * 100).toFixed(2)}`,
    quantity: Math.floor(Math.random() * 50) + 1,
    total: `$${(Math.random() * 500).toFixed(2)}`,
  })
);
