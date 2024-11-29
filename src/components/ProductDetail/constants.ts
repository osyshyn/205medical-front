import { IProduct } from "src/@types/products";
import { IProperty } from "./PropertiesCard/types";

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
