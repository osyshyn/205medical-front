import { FC, useEffect, useState } from "react";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { RenderEditFormFields } from "src/page-components/EditLocation/RenderEditFormFields";
import {
  ADD_LOCATION_FORM_FIELDS,
  ADD_LOCATION_FORM_FIELDS_S,
} from "src/page-components/location/AddLocation/constant";
import { RenderAddFormFields } from "src/page-components/location/AddLocation/RenderAddFormFields";
import { IAddFormikValues } from "src/page-components/location/EditLocation/types";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { Checkbox } from "src/components/CheckBox";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { SelectDropdownList } from "src/components/SelectDropdownList";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useLocationStore from "src/stores/location-store";
import useProductStore from "src/stores/product-store";
import { IOptionSelect } from "src/@types/form";
import {
  ICreateLocation,
  ILocation,
  IUpdateLocation,
} from "src/@types/location";
import { Sizes } from "src/@types/sizes";

export const EditLocation: FC = () => {
  const loadLocations = useLocationStore((state) => state.fetchLocation);
  const locations = useLocationStore((state) => state.locations);
  const loadLocation = useLocationStore((state) => state.fetchLocationById);
  const currentLocation = useLocationStore((state) => state.location);
  const loadAvailableProducts = useLocationStore(
    (state) => state.getLocationAvailableProducts
  );
  const availableProducts = useLocationStore(
    (state) => state.available_products
  );
  const loadProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);
  const updateLocation = useLocationStore((state) => state.updateDeepLocation);
  const updateLocationProducts = useLocationStore(
    (state) => state.updateLocationProducts
  );

  const [selectedOption, setSelectedOption] = useState<IOptionSelect | null>(
    null
  );

  useEffect(() => {
    loadLocations();
    loadProducts();
  }, [loadLocations, loadProducts]);

  useEffect(() => {
    if (selectedOption?.value) {
      loadLocation(Number(selectedOption.value)); // Pass the id of the selected location
      loadAvailableProducts(Number(selectedOption.value));
    }
  }, [selectedOption, loadLocation, loadAvailableProducts]); // Add selectedOption as a dependency

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

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

  const onSubmit = async (values: IUpdateLocation) => {
    const fullData: IUpdateLocation = {
      ...values,
      id: currentLocation?.result.id, // Assuming `currentLocation.result` has the `id`
      slug: currentLocation?.result.slug, // Similarly for slug
      address_2: values.address_2 || "", // Ensure `address_2` is always provided
      location_products_id: selectedCategories,
      location_users_id: selectedUsers,
    };

    await updateLocation(fullData, () => {
      updateLocationProducts({
        id: currentLocation?.result.id,
        location_products_id: selectedCategories,
      });
      loadLocations();
    });
  };

  const formikProps: FormikConfig<IAddFormikValues> = {
    initialValues,
    validationSchema,
    onSubmit,
  };

  const formik = useFormik(formikProps);

  const options: IOptionSelect[] = locations.map((location) => ({
    value: location.id, // Assuming 'id' is the unique identifier for each location
    label: location.name, // Assuming 'name' is the display name for each location
  }));

  useEffect(() => {
    if (currentLocation && currentLocation?.result && availableProducts) {
      const updatedValues: ICreateLocation = {
        name: currentLocation?.result.name || "",
        address_1: currentLocation?.result.address_1 || "",
        address_2: currentLocation?.result.address_2 || "",
        city: currentLocation?.result.city || "",
        state: currentLocation?.result.state || "",
        zip_code: currentLocation?.result.zip_code || "",
        contact_name: currentLocation?.result.contact_name || "",
        contact_email: currentLocation?.result.contact_email || "",
        buyer_name: currentLocation?.result.buyer_name || "",
        buyer_email: currentLocation?.result.buyer_email || "",
        location_products_id: availableProducts || [],
        location_users_id: [],
      };

      setSelectedCategories(availableProducts);

      formik.setValues(updatedValues);
    }
  }, [currentLocation, availableProducts]);

  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <PageWrapper>
      <Title title="Location name" subtitle="" />
      <SelectDropdownList
        options={options}
        activeOption={selectedOption}
        setOption={setSelectedOption}
      />

      <Title title="Monthlu purchases" subtitle="" />
      <Window>
        <Title title="Ship To" subtitle="" />
        <FormikProvider value={formik}>
          <Form className="my-5 grid grid-cols-4 gap-x-6 gap-y-3.5">
            <RenderEditFormFields fields={ADD_LOCATION_FORM_FIELDS} />
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
                    {/* {subUsers?.map((user) => (
                      <Checkbox
                        key={user.id}
                        label={`${user.first_name} ${user.last_name}`}
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserChange(user.id)}
                      />
                    ))} */}
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
