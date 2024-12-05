import React, { FC } from "react";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { SelectDropdownListField } from "src/components/FormField/SelectDropdownListField";
import { TextInput } from "src/components/FormField/TextInput";
import { CloseButton } from "src/components/ModalWindow/CloseButton";
import useCartStore from "src/stores/cart-store";
import { Sizes } from "src/@types/sizes";
import { CardProduct } from "./CardProduct";
import {
  LOCATION_OPTIONS_SELECT,
  PURCHASE_ORDER_INITIAL_VALUES,
  PURCHASE_ORDER_VALIDATION_SCHEMA,
} from "./constans";
import { IFormikValues } from "./types";

export const CartProducts: FC = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const cart = useCartStore((state) => state.cart);

  const formikProps: FormikConfig<IFormikValues> = {
    initialValues: PURCHASE_ORDER_INITIAL_VALUES,
    validationSchema: PURCHASE_ORDER_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      console.log(values);
    },
  };

  const formik = useFormik(formikProps);

  if (!isCartOpen) return null;

  return (
    <div className="scrollbar h-full w-full max-w-md overflow-y-scroll rounded-r-3xl border border-gray-soft bg-white-base px-7.5 py-10">
      <div className="flex items-center justify-between">
        <h3>Purchase Order</h3>
        <CloseButton onClose={closeCart} />
      </div>

      <FormikProvider value={formik}>
        <Form className="flex flex-col gap-7.5">
          <div className="mt-10 flex flex-col gap-5">
            <SelectDropdownListField
              headLabelclassName="w-full justify-between !text-sm"
              headLabel="Purchase Order Location"
              options={LOCATION_OPTIONS_SELECT}
              formFieldProps={{ name: "orderLocation" }}
            />

            <TextInput
              className="text-sm"
              placeholder="Add PO Number"
              name="poNumber"
            />
          </div>

          <div>
            {cart?.product_to_carts ? (
              cart.product_to_carts.map(({ id }) => <CardProduct key={id} />)
            ) : (
              <p>Empty</p>
            )}
          </div>

          <Button size={Sizes.S} variant={ButtonVariants.PRIMARY} type="submit">
            Issue PO
          </Button>
        </Form>
      </FormikProvider>
    </div>
  );
};
