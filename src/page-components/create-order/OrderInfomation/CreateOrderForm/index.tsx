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

  const getServiceType = (shipMethod: number): number => {
    const rushMethods = [IRUSH_SERVICE.DAY_2, IRUSH_SERVICE.PRIORITY_OVERNIGHT];
    if (shipMethod === IRUSH_SERVICE.STANDARD)
      return ISERVICE_TYPE.REGULAR_ORDER;
    if (rushMethods.includes(shipMethod)) return ISERVICE_TYPE.RUSH_ORDER;
    return ISERVICE_TYPE.REGULAR_ORDER;
  };

  const onSubmit = async (values: IFormikValues) => {
    const po_number = orderNumber + 1;
    const formattedValues = {
      ...values,
      order_number: po_number.toString(),
      location_id: values.location_id,

      type: getServiceType(Number(values.rush_service)),
      order_products: list?.product_to_lists.map((product) => ({
        id: product.id.toString(),
        quantity: product.quantity.toString(),
      })),
    };

    await createOrder(formattedValues);
  };

  const formikProps: FormikConfig<IFormikValues> = {
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
          className="mt-5 h-10 w-64 self-end rounded-20"
          size={Sizes.S}
          variant={ButtonVariants.PRIMARY}
          type="submit"
        >
          Submit Purchase Order
        </Button>
      </Form>
    </FormikProvider>
  );
};
