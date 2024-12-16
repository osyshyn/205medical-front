import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { SelectDropdownListField } from "src/components/FormField/SelectDropdownListField";
import { TextInput } from "src/components/FormField/TextInput";
import { Loader } from "src/components/Loader";
import { CloseButton } from "src/components/ModalWindow/CloseButton";
import useCartStore from "src/stores/cart-store";
import useLocationStore from "src/stores/location-store";
import { PATHNAMES } from "src/constants/routes";
import { IOptionSelect } from "src/@types/form";
import { Sizes } from "src/@types/sizes";
import { CardProduct } from "./CardProduct";
import {
  getLocationOption,
  PURCHASE_ORDER_INITIAL_VALUES,
  PURCHASE_ORDER_VALIDATION_SCHEMA,
} from "./constans";
import { IFormikValues } from "./types";

export const Cart: FC = () => {
  const navigation = useNavigate();

  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const cart = useCartStore((state) => state.cart);
  const createOrder = useCartStore((state) => state.createOrder);

  const formikProps: FormikConfig<IFormikValues> = {
    initialValues: PURCHASE_ORDER_INITIAL_VALUES,
    validationSchema: PURCHASE_ORDER_VALIDATION_SCHEMA,
    onSubmit: ({ orderLocation, poNumber }) => {
      createOrder({
        location_id: orderLocation.value,
        poNumber,
        type: 2,
        product_to_carts: cart.product_to_carts,
        onSuccess: () => navigation(PATHNAMES.CREATE_ORDER),
      });
    },
    enableReinitialize: true,
  };

  const formik = useFormik(formikProps);

  const fetchLocation = useLocationStore((state) => state.fetchLocation);
  const locations = useLocationStore((state) => state.locations);
  const getLocationAvailableProducts = useLocationStore(
    (state) => state.getLocationAvailableProducts
  );
  const availableProducts = useLocationStore(
    (state) => state.available_products
  );
  const isLoadingLocationFetch = useLocationStore(
    (state) => state.isLoadingFetch
  );

  const onChangeDropdownList = (option: IOptionSelect) => {
    getLocationAvailableProducts(option.value as number);
  };

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  if (!isCartOpen || !cart) return null;

  const totalPrice = cart.product_to_carts
    .reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.price * currentValue.quantity,
      0
    )
    .toFixed(2);

  const isSubmitBtnDisabled =
    !cart.product_to_carts.every(
      (product) =>
        availableProducts.length === 0 || availableProducts.includes(product.id)
    ) || cart.product_to_carts.length === 0;

  return (
    <div className="scrollbar h-full w-full max-w-md overflow-y-scroll rounded-r-3xl border border-gray-soft bg-white-base px-7.5 py-10">
      <div className="flex items-center justify-between">
        <h3>Purchase Order</h3>
        <CloseButton onClose={closeCart} />
      </div>

      {isLoadingLocationFetch ? (
        <Loader className="flex h-full items-center" size={Sizes.XXL} />
      ) : (
        <FormikProvider value={formik}>
          <Form className="flex flex-col gap-7.5">
            <div className="mt-10 flex flex-col gap-5">
              <SelectDropdownListField
                headLabelclassName="w-full justify-between !text-sm"
                headLabel="Purchase Order Location"
                options={getLocationOption(locations)}
                formFieldProps={{ name: "orderLocation" }}
                onChange={onChangeDropdownList}
              />

              <TextInput
                className="text-sm"
                placeholder="Add PO Number"
                name="poNumber"
              />
            </div>

            <div>
              {cart.product_to_carts.length !== 0 ? (
                cart.product_to_carts.map((product) => (
                  <CardProduct
                    key={product.id}
                    product={product}
                    isAvailable={
                      availableProducts.length === 0 ||
                      availableProducts.includes(product.id)
                    }
                  />
                ))
              ) : (
                <p className="my-10 text-center">Your cart is empty.</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Button
                size={Sizes.S}
                variant={ButtonVariants.PRIMARY}
                type="submit"
                isDisabled={isSubmitBtnDisabled}
              >
                Issue PO
              </Button>

              <div className="flex gap-2">
                <span className="font-medium text-gray-regular">Total</span>

                <span className="font-medium text-purple-base">
                  &#36;{totalPrice}
                </span>
              </div>
            </div>
          </Form>
        </FormikProvider>
      )}
    </div>
  );
};
