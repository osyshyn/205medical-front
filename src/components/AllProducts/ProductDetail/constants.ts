import { IProduct } from "src/@types/products";

export const getTabs = ({ description, howToUse, faqs }: IProduct) => [
  {
    label: "Description",
    slug: "description",
    value: description,
  },
  {
    label: "How To Use",
    slug: "how-to-use",
    value: howToUse,
  },
  {
    label: "FAQS",
    slug: "faqs",
    value: faqs,
  },
];
