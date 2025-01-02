import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { ModalWindow } from "src/components/ModalWindow";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useProductStore from "src/stores/product-store";
import { PATHNAMES } from "src/constants/routes";
import { IEditProduct, IProductDetails } from "src/@types/products";
import {
  EDIT_PRODUCT_FORM_FIELDS_FIRST,
  EDIT_PRODUCT_FORM_FIELDS_SECOND,
} from "./constant";
import { RenderEditFormFields } from "./RenderEditFormField";

export const EditProduct: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const loadProduct = useProductStore((state) => state.fetchProductDetails);
  const product = useProductStore((state) => state.product_details);

  useEffect(() => {
    if (id) {
      loadProduct(+id);
    }
  }, [id, loadProduct]);

  const onClose = () => {
    navigate(PATHNAMES.PRODUCT);
  };

  const initialValues: IEditProduct = {
    name: "",
    price: 0,
    minimum_order: 0,
    category_id: 0,
    certification: "",
    sku: "",
    description: "",
    how_to_use: "",
    faq: "",
    photos_ids: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    price: Yup.number().required("Price is required"),
    minimum_order: Yup.number().required("Minimum order is required"),
    category_id: Yup.number().required("Category is required"),
    certification: Yup.string().required("Certification is required"),
    sku: Yup.string().required("SKU is required"),
    description: Yup.string().required("Description is required"),
    // how_to_use: Yup.string(),
    // faq: Yup.string(),
    photos_ids: Yup.array().required("Photos are required"),
  });

  const onSubmit = (values: IEditProduct) => {
    console.log(values);
  };

  const formikProps: FormikConfig<IEditProduct> = {
    initialValues,
    validationSchema,
    onSubmit,
  };

  const formik = useFormik(formikProps);

  useEffect(() => {
    console.log("PRODUCT", product);
    if (product) {
      const updatedValues: IEditProduct = {
        name: product.name,
        price: product.price,
        minimum_order: product.minimum_order,
        category_id: product.category_id,
        certification: product.certification,
        sku: product.sku,
        description: product.description,
        how_to_use: product.how_to_use,
        faq: product.faq,
        photos_ids: product.preview?.id ? [product.preview.id] : [],
      };

      formik.setValues(updatedValues);
    }
  }, [product]);

  return (
    <ModalWindow
      className="max-h-[800px] w-3/5 overflow-y-auto"
      onClose={onClose}
      isOpen={true}
      isActivePortal
      closeButtonClassName="!bg-white-base rounded-full  shadow-md"
    >
      <Window>
        <Title title="Edit Product" subtitle="" />
        <h4>{product?.name}</h4>
        <FormikProvider value={formik}>
          <Form>
            <div className="my-5 grid grid-cols-3 gap-x-6 gap-y-5">
              <RenderEditFormFields fields={EDIT_PRODUCT_FORM_FIELDS_FIRST} />
            </div>
            <div className="grid-cols-y-10 col-span-1 w-full">
              <RenderEditFormFields fields={EDIT_PRODUCT_FORM_FIELDS_SECOND} />
            </div>
          </Form>
        </FormikProvider>
      </Window>
    </ModalWindow>
  );
};
