import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { ADD_BUYERS_FORM_FIELDS } from "src/page-components/add-buyers/constant";
import { RenderAddFormFields } from "src/page-components/add-buyers/RenderAddFormFields";
import { Avatar } from "src/components/Avatar";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { Checkbox } from "src/components/CheckBox";
import { ModalWindow } from "src/components/ModalWindow";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useFileStore from "src/stores/file-store";
import useLocationStore from "src/stores/location-store";
import useProductStore from "src/stores/product-store";
import useUserStore from "src/stores/user-store";
import { NotificationService } from "src/helpers/notifications";
import { ReactComponent as WhiteLogo } from "src/assets/icons/whiteLogo.svg";
import { ILocation } from "src/@types/location";
import { IAddUser, TypesUsers } from "src/@types/users";

export const AddBuyers: FC = () => {
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const loadLocations = useLocationStore((state) => state.fetchLocation);
  const locations = useLocationStore((state) => state.locations);
  const uploadFile = useFileStore((state) => state.uploadFile);
  const response = useFileStore((state) => state.response);

  const currentUserRole = useUserStore((state) => state.user.role);

  const createUser = useUserStore((state) => state.createUser);

  const loadProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("This field is required."),
    last_name: Yup.string().required("This field is required."),
    role: Yup.number().required("This field is required."),
    phone: Yup.string().required("This field is required."),
    email: Yup.string().required("This field is required."),
    purchase_limit: Yup.number().required("This field is required."),
  });

  useEffect(() => {
    loadLocations();
    loadProducts();
  }, [loadLocations, loadProducts]);

  const handleLocationsChange = (id: number) => {
    setSelectedLocations((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleProductsChange = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Загрузка файла на сервер
      try {
        await uploadFile("avatars", file);
        if (response && response.fileUrl) {
          formik.setFieldValue("avatar", response.fileUrl); // Сохраняем URL изображения в данные формы
        }
      } catch (error) {
        NotificationService.error("Failed to upload file");
      }
    }
  };

  useEffect(() => {
    console.log("Response: ", response);
  }, [response]);

  const onSubmit = async (values: IAddUser) => {
    const fullData: IAddUser = {
      ...values,
      avatar_id: response?.id,
      approved_users: selectedLocations,
      active_products: selectedProducts,
    };

    await createUser(fullData);
  };

  const formikProps: FormikConfig<IAddUser> = {
    initialValues: {
      first_name: "",
      last_name: "",
      role: TypesUsers.SUB_USER,
      phone: "",
      email: "",
      purchase_limit: 0,
      approved_users: [],
      active_products: [],
      avatar_id: 0,
    },
    validationSchema,
    onSubmit: onSubmit,
  };

  const formik = useFormik(formikProps);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        await uploadFile("avatars", file);
        if (response?.fileUrl) {
          formik.setFieldValue("avatar", response.fileUrl);
        }
      } catch (error) {
        NotificationService.error("Failed to upload file");
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Window className="max-h-200 overflow-auto !border-none !p-0">
      <div className="space-y-8">
        <div className="text-white flex flex-col gap-10 rounded-t-30 bg-[#3D3935] px-7.5 py-4">
          <div>
            <WhiteLogo />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white-base">Add user</h1>
          </div>
        </div>
      </div>
      <div className="flex gap-15 p-4">
        <div className="w-[150px]">
          <div
            {...getRootProps()}
            className={`mb-4 h-[180px] w-[180px] overflow-hidden border-2 ${
              isDragActive ? "border-blue-500" : "border-gray-300"
            } flex items-center justify-center bg-gray-200`}
          >
            <input {...getInputProps()} />
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="User Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center text-gray-500">
                {isDragActive
                  ? "Drop the image here..."
                  : "Drag and drop an image, or click to select one"}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <FormikProvider value={formik}>
            <Form className="my-5 grid grid-cols-2 gap-x-6 gap-y-3.5">
              {/* <RenderAddFormFields fields={ADD_BUYERS_FORM_FIELDS} /> */}
              <RenderAddFormFields
                fields={ADD_BUYERS_FORM_FIELDS.map((field) => ({
                  ...field,
                  ...(field.name === "role" &&
                  currentUserRole === TypesUsers.CLIENT_ADMIN
                    ? {
                        disabled: true,
                        options: [
                          { label: "Sub User", value: TypesUsers.SUB_USER },
                        ],
                      }
                    : {}),
                }))}
              />

              <Window className="max-h-62.5 overflow-auto !p-0">
                <div className="p-4">
                  <Title title="Active products" subtitle="" />
                </div>
                <div className="mt-5 flex flex-col gap-4">
                  {products.map((product) => (
                    <Checkbox
                      key={product.id}
                      label={product.name}
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleProductsChange(product.id)}
                    />
                  ))}
                </div>
              </Window>

              {formik.values.role == TypesUsers.CLIENT_ADMIN ? (
                <Window className="max-h-62.5 overflow-auto !p-0">
                  <div className="p-4">
                    <Title title="Approved Locations" subtitle="" />
                  </div>
                  <div className="mt-5 flex flex-col gap-4">
                    {locations.map((location) => (
                      <Checkbox
                        key={location.id}
                        label={location.name}
                        checked={selectedLocations.includes(location.id)}
                        onChange={() => handleLocationsChange(location.id)}
                      />
                    ))}
                  </div>
                </Window>
              ) : (
                <></>
              )}

              <div className="col-span-2 mt-10">
                <div className="flex w-full justify-end gap-5">
                  <Button
                    type="submit"
                    variant={ButtonVariants.PRIMARY}
                    className="px-10 py-3"
                  >
                    Save
                  </Button>
                  <Button
                    variant={ButtonVariants.SECONDARY}
                    className="px-10 py-3"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </Window>
  );
};
