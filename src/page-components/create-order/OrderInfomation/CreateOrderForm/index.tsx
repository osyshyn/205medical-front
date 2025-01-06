import React, { FC, ReactNode } from "react";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import useOrderStore, { CreateOrderParams } from "src/stores/order-store";
import useProductListStore from "src/stores/product-list-store";
import { IOptionSelect } from "src/@types/form";
import { IRUSH_SERVICE, ISERVICE_TYPE } from "src/@types/orders";
import { Sizes } from "src/@types/sizes";
import {
  CREATE_ORDER_FORM_VALIDATION_SCHEMA,
  CREATE_ORDER_INITIAL_VALUES,
} from "../constants";
import { IFormikValues } from "../types";

interface Props {
  children: ReactNode;
}

export const CreateOrderForm: FC<Props> = ({ children }) => {
  const createOrder = useOrderStore((state) => state.createOrder);
  const orderNumber = useOrderStore((state) => state.lastOrderId);

  const list = useProductListStore((state) => state.list);

  // переделать на ENUM
  const getServiceType = (shipMethod: number): number => {
    const rushMethods = [IRUSH_SERVICE.DAY_2, IRUSH_SERVICE.PRIORITY_OVERNIGHT];
    if (shipMethod === IRUSH_SERVICE.STANDARD)
      return ISERVICE_TYPE.REGULAR_ORDER;
    if (rushMethods.includes(shipMethod)) return ISERVICE_TYPE.RUSH_ORDER;
    return ISERVICE_TYPE.REGULAR_ORDER;
  };

  const onSubmit = async (values: CreateOrderParams) => {
    const po_number = orderNumber + 1;
    const formattedValues = {
      ...values,
      order_number: po_number.toString(),
      location_id: values.location_id as IOptionSelect,

      type: getServiceType(Number(values.rush_service)),
      order_producrs: list?.product_to_lists.map((product) => ({
        id: product.id.toString(),
        quantity: product.quantity.toString(),
      })),
    };

    await createOrder(formattedValues);
  };

  const formikProps: FormikConfig<CreateOrderParams> = {
    initialValues: CREATE_ORDER_INITIAL_VALUES,
    validationSchema: CREATE_ORDER_FORM_VALIDATION_SCHEMA,
    onSubmit: onSubmit,
  };

  const formik = useFormik(formikProps);

  return (
    <FormikProvider value={formik}>
      <Form className="mt-5 flex flex-col gap-10">
        {children}

        <Button
          className="mt-6 w-max self-end rounded-30 text-lg"
          size={Sizes.S}
          variant={ButtonVariants.SECONDARY_SQUARE}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </FormikProvider>
  );
};
