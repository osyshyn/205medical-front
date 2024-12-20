import { FC } from "react";
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
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import { Sizes } from "src/@types/sizes";

export const AddLocation: FC = () => {
  const initialValues: IAddFormikValues = {
    id: 0, // default value for id
    name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    zip_code: "",
    created_at: "", // default value for created_at
    updated_at: "", // default value for updated_at
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    address_1: Yup.string().required("Address line 1 is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string().required("Zip code is required"),
  });

  const onSubmit = async (values: IAddFormikValues) => {
    console.log("Form values submitted:", values);
    // Add your form submission logic here
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

            <div className="col-span-4">
              <Window className="flex min-h-62.5 justify-between !p-0">
                <div className="p-7.5">
                  <Title title="Appoved Products" subtitle="" />
                  <ul>
                    <li>Drug screening</li>
                    <li>Drug screening</li>
                    <li>Drug screening</li>
                  </ul>
                </div>

                <Window className="min-h-full w-1/2">
                  <Title title="Approved Users" subtitle="" />
                  <ul>
                    <li>Drug screening</li>
                    <li>Drug screening</li>
                    <li>Drug screening</li>
                  </ul>
                </Window>
              </Window>
            </div>

            <div className="col-span-4 mt-4 flex justify-end">
              <Button
                className="mt-10"
                type="submit"
                variant={ButtonVariants.PRIMARY}
                size={Sizes.S}
              >
                Submit
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </Window>
    </PageWrapper>
  );
};
