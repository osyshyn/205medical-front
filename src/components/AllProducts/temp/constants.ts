import productImg from "src/components/AllProducts/temp/temp.png";
import { IProduct } from "src/@types/products";

export const PRODUCT_TEMP: IProduct = {
  id: 1,
  name: "12 PANEL DRUG TEST CUP",
  price: 2.15,
  minimum_order: 25,
  categories_id: 10,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur. Sed magna dolor vel quam viverra nulla risus. Aliquam gravida suspendisse nulla urna sit imperdiet nisl imperdiet risus. Lorem ipsum dolor sit amet consectetur. Sed magna dolor vel quam viverra nulla risus. Aliquam gravida suspendisse nulla urna sit imperdiet nisl imperdiet risus. Lorem ipsum dolor sit amet consectetur. Sed magna dolor vel quam viverra nulla risus. Aliquam gravida",
  created_at: "2024-11-01T10:00:00Z",
  updated_at: "2024-11-10T12:00:00Z",
  category: {
    id: 10,
    name: "Drug Screening",
    created_at: "2024-01-15T08:30:00Z",
    updated_at: "2024-10-25T14:15:00Z",
  },
  image: productImg,
  certification: "CLIA WAIVED",
  type: "URINE ANALYSIS",
  package_info: "25 TESTS/BX",
  size: "100 TESTS/CS",
  sku: "12PAN-PCP-CUP",
  howToUse:
    "Step 1: Open the package...Step 2: Follow the instructions... Step 1: Open the package...Step 2: Follow the instructions... Step 1: Open the package...Step 2: Follow the instructions... Step 1: Open the package...Step 2: Follow the instructions... Step 1: Open the package...Step 2: Follow the instructions...Step 1: Open the package...Step 2: Follow the instructions... Step 1: Open the package...Step 2: Follow the instructions...",
  faqs: "Q: How long does it take?A: It takes about 5 minutes. How long does it take?A: It takes about 5 minutes. How long does it take?A: It takes about 5 minutes. How long does it take?A: It takes about 5 minutes. How long does it take?A: It takes about 5 minutes. How long does it take?A: It takes about 5 minutes.",
  downloadLink: "",
};
