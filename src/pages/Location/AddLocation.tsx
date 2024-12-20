import { FC, useEffect, useState } from "react";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
  ADD_LOCATION_FORM_FIELDS,
  ADD_LOCATION_FORM_FIELDS_S,
} from "src/page-components/location/AddLocation/constant";
import { RenderAddFormFields } from "src/page-components/location/AddLocation/RenderAddFormFields";
import { EDIT_LOCATION_FORM_FIELDS_SAB_USER } from "src/page-components/location/EditLocation/contants";
import {
  IAddFormikValues,
  IFormikValues,
} from "src/page-components/location/EditLocation/types";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { Checkbox } from "src/components/CheckBox";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useCategoryStore from "src/stores/category-store";
import useLocationStore from "src/stores/location-store";
import useProductStore from "src/stores/product-store";
import useUserStore from "src/stores/user-store";
import { ICreateLocation } from "src/@types/location";
import { Sizes } from "src/@types/sizes";

export const AddLocation: FC = () => {
  const createLocation = useLocationStore((state) => state.createLocation);
  const loadProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);
  const getSubUsers = useUserStore((state) => state.getSubUsers);
  const subUsers = useUserStore((state) => state.subUsers);

  useEffect(() => {
    loadProducts();
    getSubUsers();
  }, [getSubUsers, loadProducts]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleUserChange = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const initialValues: ICreateLocation = {
    name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    zip_code: "",
    contact_name: "",
    contact_email: "",
    buyer_name: "",
    buyer_email: "",
    location_products_id: [],
    location_users_id: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    address_1: Yup.string().required("Address line 1 is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string().required("Zip code is required"),
    contact_name: Yup.string().required("Contact Name is required"),
    contact_email: Yup.string()
      .email("Invalid email format")
      .required("Contact Email is required"),
    buyer_name: Yup.string().required("Buyer Name is required"),
    buyer_email: Yup.string()
      .email("Invalid email format")
      .required("Buyer Email is required"),
  });

  const onSubmit = async (values: ICreateLocation) => {
    const fullData: ICreateLocation = {
      ...values,
      contact_name: values.contact_name || "",
      contact_email: values.contact_email || "",
      buyer_name: values.buyer_name || "",
      buyer_email: values.buyer_email || "",
      location_products_id: selectedCategories,
      location_users_id: selectedUsers,
    };

    await createLocation(fullData);
  };

  const formikProps: FormikConfig<IAddFormikValues> = {
    initialValues,
    validationSchema,
    onSubmit,
  };

  const formik = useFormik(formikProps);

  return (
    <PageWrapper className="flex flex-col gap-10">
      <Title title="Add a new location" subtitle="" />
      <Window>
        <Title title="Ship To" subtitle="" />
        <FormikProvider value={formik}>
          <Form className="my-5 grid grid-cols-4 gap-x-6 gap-y-3.5">
            <RenderAddFormFields fields={ADD_LOCATION_FORM_FIELDS} />
            <hr className="col-span-4 my-6 border-t border-gray-300" />
            <RenderAddFormFields fields={ADD_LOCATION_FORM_FIELDS_S} />

            <div className="col-span-4 mt-5">
              <Window className="flex max-h-62.5 justify-between !p-0">
                <div className="w-1/2 overflow-auto p-7.5">
                  <Title title="Approved Products" subtitle="" />
                  <div className="mt-5 flex flex-col gap-4">
                    {products?.map((product) => (
                      <Checkbox
                        key={product.id}
                        label={product.name}
                        checked={selectedCategories.includes(product.id)}
                        onChange={() => handleCategoryChange(product.id)}
                      />
                    ))}
                  </div>
                </div>

                <Window className="min-h-full w-1/2 overflow-auto">
                  <Title title="Approved Users" subtitle="" />
                  <div className="flex flex-col gap-4">
                    {subUsers?.map((user) => (
                      <Checkbox
                        key={user.id}
                        label={`${user.first_name} ${user.last_name}`}
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserChange(user.id)}
                      />
                    ))}
                  </div>
                </Window>
              </Window>
            </div>

            <div className="col-span-4 mt-4 flex justify-end gap-5">
              <Button
                className="mt-10"
                type="submit"
                variant={ButtonVariants.PRIMARY}
                size={Sizes.S}
              >
                Save
              </Button>
              <Button
                className="mt-10"
                type="button"
                variant={ButtonVariants.SECONDARY}
                size={Sizes.S}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </Window>
    </PageWrapper>
  );
};
