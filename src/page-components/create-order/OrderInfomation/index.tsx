import React, { FC } from "react";
import { Window } from "src/components/Window";
import { CreateOrderForm } from "./CreateOrderForm";
import { Header } from "./Header";
import { LocationInfo } from "./LocationInfo";

export const OrderInfomation: FC = () => (
  <Window className="flex flex-col gap-10">
    <Header />
    <CreateOrderForm />
    <LocationInfo />
  </Window>
);