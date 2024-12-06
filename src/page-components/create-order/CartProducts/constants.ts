import { ICartProductTable } from "src/@types/table";
import { Column } from "src/@types/table";
import { DeleteButton } from "./DeleteButton";
import { QuantityToggle } from "./QuantityToggle";

export const CART_PRODUCTS_COLUMNS: Column[] = [
  { key: "preview", label: "" },
  { key: "sku", label: "SKU" },
  { key: "name", label: "Item name" },
  { key: "category", label: "Category" },
  { key: "packageInfo", label: "Package" },
  { key: "quantityComponent", label: "Quantity" },
  { key: "price", label: "Unit Price" },
  { key: "totalAmount", label: "Total" },
  { key: "deleteButton", label: "" },
];

export const getTableItems = (
  cartProducts: ICartProductTable[]
): ICartProductTable[] =>
  cartProducts.map((product) => ({
    ...product,
    quantityComponent: {
      type: "component",
      component: QuantityToggle,
      props: {
        id: product.key,
        quantity: product.quantity,
      },
    },
    deleteButton: {
      type: "component",
      component: DeleteButton,
      props: {
        id: product.key,
      },
    },
  }));

export const DATA_FROM_SERVER: ICartProductTable[] = [
  {
    sku: "dsfsefsdf",
    name: "Test Product 1",
    packageInfo: "Box of 10",
    price: 25.03,
    category: "Category 1",
    quantity: 3,
    totalAmount: 75.09,
    preview: {
      id: 1,
      type: "image",
      alt: "preview-1",
      path: "public\\uploads\\user\\product1.jpg",
    },
    key: 1,
  },
  {
    sku: "gdfgfdf",
    name: "Test Product 2",
    packageInfo: "Box of 10",
    price: 13.5,
    category: "Category 2",
    quantity: 5,
    totalAmount: 67.5,
    preview: {
      id: 2,
      type: "image",
      alt: "preview-1",
      path: "public\\uploads\\user\\product1.jpg",
    },
    key: 2,
  },
  {
    sku: "lkjdsf987",
    name: "Test Product 3",
    packageInfo: "Box of 10",
    price: 9.99,
    category: "Category 3",
    quantity: 10,
    totalAmount: 99.9,
    preview: {
      id: 3,
      type: "image",
      alt: "preview-3",
      path: "public\\uploads\\user\\product3.jpg",
    },
    key: 3,
  },
  {
    sku: "qw12dsf44",
    name: "Test Product 4",
    packageInfo: "Pack of 5",
    price: 15.25,
    category: "Category 4",
    quantity: 8,
    totalAmount: 122,
    preview: {
      id: 4,
      type: "image",
      alt: "preview-4",
      path: "public\\uploads\\user\\product4.jpg",
    },
    key: 4,
  },
  {
    sku: "asd98asdf",
    name: "Test Product 5",
    packageInfo: "Box of 10",
    price: 49.99,
    category: "Category 5",
    quantity: 2,
    totalAmount: 99.98,
    preview: {
      id: 5,
      type: "image",
      alt: "preview-1",
      path: "public\\uploads\\user\\product1.jpg",
    },
    key: 5,
  },
  {
    sku: "kjasf9123",
    name: "Test Product 6",
    packageInfo: "Single",
    price: 17.75,
    category: "Category 6",
    quantity: 4,
    totalAmount: 71,
    preview: {
      id: 6,
      type: "image",
      alt: "preview-6",
      path: "public\\uploads\\user\\product6.jpg",
    },
    key: 6,
  },
  {
    sku: "ksdjf0948",
    name: "Test Product 7",
    packageInfo: "Box of 10",
    price: 10.5,
    category: "Category 7",
    quantity: 6,
    totalAmount: 63,
    preview: {
      id: 7,
      type: "image",
      alt: "preview-1",
      path: "public\\uploads\\user\\product1.jpg",
    },
    key: 7,
  },
  {
    sku: "lkj23jdsf",
    name: "Test Product 8",
    packageInfo: "Pack of 12",
    price: 8.3,
    category: "Category 8",
    quantity: 7,
    totalAmount: 58.1,
    preview: {
      id: 8,
      type: "image",
      alt: "preview-8",
      path: "public\\uploads\\user\\product8.jpg",
    },
    key: 8,
  },
  {
    sku: "as23lkdsf",
    name: "Test Product 9",
    packageInfo: "Bundle of 3",
    price: 22.99,
    category: "Category 9",
    quantity: 3,
    totalAmount: 68.97,
    preview: {
      id: 9,
      type: "image",
      alt: "preview-9",
      path: "public\\uploads\\user\\product9.jpg",
    },
    key: 9,
  },
  {
    sku: "afj94fdfs",
    name: "Test Product 10",
    packageInfo: "Box of 10",
    price: 19.99,
    category: "Category 10",
    quantity: 9,
    totalAmount: 179.91,
    preview: {
      id: 10,
      type: "image",
      alt: "preview-1",
      path: "public\\uploads\\user\\product1.jpg",
    },
    key: 10,
  },
];
