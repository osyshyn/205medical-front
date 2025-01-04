import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from "react-router";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { TextInput } from "src/components/FormField/TextInput";
import { ModalWindow } from "src/components/ModalWindow";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useCategoryStore from "src/stores/category-store";
import useFileStore from "src/stores/file-store";
import useProductStore from "src/stores/product-store";
import { NotificationService } from "src/helpers/notifications";
import { PATHNAMES } from "src/constants/routes";
import { IEditProduct } from "src/@types/products";
import { EDIT_PRODUCT_FORM_FIELDS_SECOND } from "./constant";
import { RenderEditFormFields } from "./RenderEditFormField";
import { SelectField } from "./SelectField";

export const EditProduct: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const uploadDocument = useFileStore((state) => state.uploadDocument);
  const responseDocument = useFileStore((state) => state.responseDocument);
  const uploadFile = useFileStore((state) => state.uploadFile);
  const response = useFileStore((state) => state.response);

  const [instructionFile, setInstructionFile] = useState(null);
  const [instructionPreview, setInstructionPreview] = useState(null);

  const loadProduct = useProductStore((state) => state.fetchProductDetails);
  const product = useProductStore((state) => state.product_details);
  const loadCategories = useCategoryStore((state) => state.fetchAllcategories);
  const categories = useCategoryStore((state) => state.categories);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const [document, setDocument] = useState(null);

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (id) {
      loadProduct(+id);
    }
    loadCategories();
  }, [id, loadProduct, loadCategories]);

  const onClose = () => {
    navigate(PATHNAMES.PRODUCT);
  };

  const initialValues: IEditProduct = {
    id: "",
    name: "",
    price: "",
    minimum_order: "",
    category: {
      id: 0,
    },
    certification: "",
    sku: "",
    description: "",
    package_info: "",
    size: "",
    how_to_use: "",
    down_load_link: { id: 0 },
    faq: "",
    photos: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    price: Yup.number().required("Price is required"),
    minimum_order: Yup.number().required("Minimum order is required"),
    certification: Yup.string().required("Certification is required"),
    sku: Yup.string().required("SKU is required"),
    description: Yup.string().required("Description is required"),
    how_to_use: Yup.string(),
    faq: Yup.string(),
  });

  const onSubmit = (values: IEditProduct) => {
    const formattedValues = {
      ...values,
      category_id: values.category.id, // конвертация вложенной структуры
      down_load_link: {
        id: responseDocument?.id
          ? responseDocument.id
          : product.down_load_link.id,
      },
      photos: images.map((image) => ({ id: image.id })),
    };
    console.log("formattedValues: ", formattedValues);
    updateProduct(formattedValues);
  };

  const formikProps: FormikConfig<IEditProduct> = {
    initialValues,
    validationSchema,
    onSubmit: onSubmit,
  };

  const formik = useFormik(formikProps);

  useEffect(() => {
    if (product && product.id) {
      const updatedValues: IEditProduct = {
        id: product.id.toString(),
        name: product.name,
        price: product.price.toString(),
        minimum_order: product.minimum_order.toString(),
        category: { id: product.category_id },
        certification: product.certification,
        sku: product.sku,
        description: product.description,
        package_info: product.package_info,
        size: product.size,
        down_load_link: product.down_load_link
          ? product.down_load_link
          : { id: 0, path: "" },
        how_to_use: product.how_to_use,
        faq: product.faq,
        photos: product.photos,
      };
      formik.setValues(updatedValues);
    }
  }, [product]);

  const editProductFormFieldsFirst = [
    {
      name: "name",
      type: "text",
      label: "Product Name",
      component: TextInput,
      placeholder: "Product Name",
    },
    {
      name: "price",
      type: "number",
      label: "Price",
      component: TextInput,
      placeholder: "Price",
    },
    {
      name: "minimum_order",
      type: "number",
      label: "Minimum Order",
      component: TextInput,
      placeholder: "Minimum Order",
    },
    {
      name: "category.id", // если вы хотите использовать вложенную структуру
      type: "select",
      label: "Category",
      component: SelectField,
      placeholder: "Category",
      options: categories?.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    },
    {
      name: "certification",
      type: "text",
      label: "Certification",
      component: TextInput,
      placeholder: "Certification",
    },
    {
      name: "sku",
      type: "text",
      label: "SKU",
      component: TextInput,
      placeholder: "SKU",
    },
  ];

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setInstructionFile(file);

      const reader = new FileReader();

      reader.onload = () => {
        setInstructionPreview(reader.result as string);
      };

      reader.readAsDataURL(file);

      try {
        await uploadDocument("product_document", file);
        if (responseDocument && responseDocument.fileUrl) {
          formik.setFieldValue("product_document", responseDocument.fileUrl);
        }
      } catch (error) {
        NotificationService.error("Failed to upload file");
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    setImages(product.photos);
    setDocument(product.down_load_link);
  }, [product]);

  const handleRemoveImage = (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
  };

  useEffect(() => {
    setDocument(responseDocument);
  }, [responseDocument]);

  const onPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    const file = e.target.files?.[0];
    if (file) {
      try {
        await uploadFile("product_photos", file); // Загрузка файла через uploadFile
        if (response && response.fileUrl) {
          const newImage = {
            id: response.id, // Или другой идентификатор, который возвращает сервер
            path: response.fileUrl, // Путь к файлу
          };
          setImages((prevImages) => [...prevImages, newImage]);
          NotificationService.success("Photo uploaded successfully");
        }
      } catch (error) {
        console.log("Error uploading photo:", error);
        NotificationService.error("Failed to upload photo");
      }
    }
  };

  useEffect(() => {
    if (response) {
      setImages([...images, { id: response.id, path: response.path }]);
    }
  }, [response]);

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
              <RenderEditFormFields fields={editProductFormFieldsFirst} />
            </div>

            <div className="mt-5">
              <div
                {...getRootProps()}
                className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2${
                  isDragActive
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300 bg-gray-100"
                } hover:border-gray-400`}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-sm text-blue-600">Drop the file here...</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-600">
                      Attach your Safety Data Sheets
                    </p>
                    <p className="text-sm text-gray-400">or just drag & drop</p>
                    {instructionPreview && (
                      <img
                        src={instructionPreview}
                        alt="Preview"
                        className="mt-3 h-16 w-16 object-cover"
                      />
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="grid-cols-y-10 col-span-1 mt-5 w-full">
              <RenderEditFormFields fields={EDIT_PRODUCT_FORM_FIELDS_SECOND} />
            </div>
            <div className="mt-5">
              <h4 className="mb-3 text-lg font-medium">Photos of Product</h4>
              <div className="flex items-center gap-3">
                {/* Кнопка для загрузки фото */}
                <label
                  htmlFor="upload-photo"
                  className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 hover:border-gray-400"
                >
                  <span className="text-sm text-gray-500">+</span>
                  <input
                    id="upload-photo"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={onPhotoUpload} // Используем обновленный обработчик
                  />
                </label>

                {images?.length > 0 &&
                  images?.map((photo) => (
                    <div key={photo.id} className="relative h-24 w-24">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${photo.path.replace(
                          "public\\",
                          ""
                        )}`}
                        alt="Product"
                        className="h-full w-full rounded-md object-cover"
                      />
                      {/* Кнопка удаления */}
                      <button
                        className="bg-white absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full shadow-md hover:bg-gray-100"
                        onClick={() => handleRemoveImage(photo.id)}
                      >
                        <span className="text-sm text-gray-600">×</span>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="mt-5 flex w-full items-end justify-end gap-5">
              <Button
                variant={ButtonVariants.PRIMARY}
                className="px-10 py-2"
                type="submit"
              >
                Save
              </Button>
              <Button variant={ButtonVariants.SECONDARY} className="px-10 py-2">
                Close
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </Window>
    </ModalWindow>
  );
};
