import React, { FC, useState } from "react";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { TextInput } from "src/components/FormField/TextInput";
import { CloseButton } from "src/components/ModalWindow/CloseButton";
import { SortingDropdownList } from "src/components/SortDropdownList";
import useSidebarStore from "src/stores/siderbar-store";
import { IOptionSelect } from "src/@types/form";
import { Sizes } from "src/@types/sizes";
import {
  LOCATION_OPTIONS_SELECT,
  PURCHASE_ORDER_INITIAL_VALUES,
  PURCHASE_ORDER_VALIDATION_SCHEMA,
} from "./constans";
import { IFormikValues } from "./types";

export const PopupCard: FC = () => {
  const isCartOpen = useSidebarStore((state) => state.isCartOpen);
  const closeCart = useSidebarStore((state) => state.closeCart);

  const formikProps: FormikConfig<IFormikValues> = {
    initialValues: PURCHASE_ORDER_INITIAL_VALUES,
    validationSchema: PURCHASE_ORDER_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      console.log(values);
    },
  };

  const [location, setLocation] = useState<IOptionSelect>(
    LOCATION_OPTIONS_SELECT[0]
  );

  const formik = useFormik(formikProps);

  if (!isCartOpen) return null;

  return (
    <div className="h-screen w-full max-w-md rounded-r-3xl border border-gray-soft bg-white-base px-7.5 py-10">
      <div className="flex items-center justify-between">
        <h3>Purchase Order</h3>
        <CloseButton onClose={closeCart} />
      </div>

      <FormikProvider value={formik}>
        <Form className="flex flex-col gap-7.5">
          <div className="mb-7.5 mt-10 flex flex-col gap-3">
            <SortingDropdownList
              options={LOCATION_OPTIONS_SELECT}
              activeOption={location}
              setOption={setLocation}
              headLabel="Purchase Order Location"
            />

            <TextInput
              className="text-sm"
              placeholder="Add PO Number"
              name="poNumber"
            />
          </div>

          <Button size={Sizes.S} variant={ButtonVariants.PRIMARY} type="submit">
            Issue PO
          </Button>
        </Form>
      </FormikProvider>
    </div>
  );
};
