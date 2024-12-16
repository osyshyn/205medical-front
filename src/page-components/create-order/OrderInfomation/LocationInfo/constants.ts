import { IOptionSelect } from "src/@types/form";
import { ILocation } from "src/@types/location";

export const getLocationInfo = (location: ILocation) => [
  {
    id: 1,
    label: "Location Name",
    value: location.name,
  },
  {
    id: 2,
    label: "Address 1",
    value: location.address_1,
  },
  {
    id: 3,
    label: "Address 2",
    value: location.address_2,
  },
  {
    id: 4,
    label: "City",
    value: location.city,
  },
  {
    id: 5,
    label: "State",
    value: location.state,
  },
  {
    id: 6,
    label: "ZIP",
    value: location.zip_code,
  },
  {
    id: 7,
    label: "Contact Name",
    value: location.contact_name,
  },
];

export const getLocationList = (locations: ILocation[]): IOptionSelect[] =>
  locations.map((location) => ({ value: location.id, label: location.name }));

export const BUYER_INFO = [
  {
    id: 1,
    label: "Buyer Name",
    value: "buyerName1",
  },
  {
    id: 2,
    label: "Buyer Email",
    value: "buyerEmail1",
  },
  {
    id: 3,
    label: "Buyer Phone Number",
    value: "buyerPhoneNumber1",
  },
];
