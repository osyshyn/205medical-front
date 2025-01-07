import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from "react-router";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { ADD_BUYERS_FORM_FIELDS } from "src/page-components/add-buyers/constant";
import { RenderAddFormFields } from "src/page-components/add-buyers/RenderAddFormFields";
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
import { PATHNAMES } from "src/constants/routes";
import { ReactComponent as WhiteLogo } from "src/assets/icons/whiteLogo.svg";
import { IAddUser, IDetailUser, IEditUser, TypesUsers } from "src/@types/users";

export const EditBuyer: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const loadBuyerDetail = useUserStore((state) => state.getUserDetail);
  const buyerDeatil = useUserStore((state) => state.detailUser);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const loadLocations = useLocationStore((state) => state.fetchLocation);
  const locations = useLocationStore((state) => state.locations);
  const loadProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);
  const uploadFile = useFileStore((state) => state.uploadFile);
  const response = useFileStore((state) => state.response);

  const updateUser = useUserStore((state) => state.updateUser);

  useEffect(() => {
    console.log("Use effect");
    loadLocations();
    loadProducts();
    loadBuyerDetail(id);
  }, [loadLocations, loadProducts, loadBuyerDetail, id]);

  const [selectedLocation, setSelectedLocation] = useState<number[]>(
    buyerDeatil?.locations?.map((item) => item.id) || []
  );

  const [selectedProduct, setSelectedProduct] = useState<number[]>(
    buyerDeatil?.products?.map((item) => item.id) || []
  );

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("This field is required."),
    last_name: Yup.string().required("This field is required."),
    role: Yup.number().required("This field is required."),
    phone: Yup.string().required("This field is required."),
    email: Yup.string().required("This field is required."),
    purchase_limit: Yup.number().required("This field is required."),
  });

  const handleLocationsChange = (id: number) => {
    setSelectedLocation((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleProductsChange = (id: number) => {
    setSelectedProduct((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const onSubmit = async (values: IEditUser) => {
    const fullData: IEditUser = {
      ...values,
      avatar: response,
    };

    await updateUser(fullData);
  };

  useEffect(() => {
    if (buyerDeatil) {
      setSelectedLocation(buyerDeatil.locations?.map((item) => item.id) || []);
      setSelectedProduct(buyerDeatil.products?.map((item) => item.id) || []);
      formik.setValues({
        id: buyerDeatil.id,
        first_name: buyerDeatil.first_name,
        last_name: buyerDeatil.last_name,
        role: buyerDeatil.role,
        phone: buyerDeatil.phone,
        email: buyerDeatil.email,
        purchase_limit: buyerDeatil.purchase_limit,
        locations: buyerDeatil.locations,
        products: buyerDeatil.products,
        avatar: buyerDeatil.avatar,
      });

      if (buyerDeatil.avatar?.path) {
        setAvatarPreview(buyerDeatil.avatar.path); // Set avatar preview to the existing avatar path
      }
    }
  }, [buyerDeatil]);

  const formikProps: FormikConfig<IEditUser> = {
    initialValues: {
      id: buyerDeatil.id,
      first_name: buyerDeatil.first_name,
      last_name: buyerDeatil.last_name,
      role: buyerDeatil.role,
      phone: buyerDeatil.phone,
      email: buyerDeatil.email,
      purchase_limit: buyerDeatil.purchase_limit,
      //   approved_users: buyerDeatil.approved_users,
      locations: buyerDeatil?.locations,
      products: buyerDeatil?.products,
      avatar: buyerDeatil?.avatar,
    },
    validationSchema,
    onSubmit: onSubmit,
  };

  const formik = useFormik(formikProps);

  const onClose = () => {
    navigate(PATHNAMES.BUYERS);
  };

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

  useEffect(() => {
    console.log("response: ", response);
  }, [response]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    console.log("Current role value:", formik.values.role);
  }, [formik.values.role]);

  return (
    <ModalWindow
      className="max-h-[800px] w-3/5 overflow-y-auto"
      onClose={onClose}
      isOpen={true}
      isActivePortal
      closeButtonClassName="!bg-white-base rounded-full shadow-md"
    >
      <Window className="relative max-h-200 overflow-auto !border-none !p-0">
        <div className="space-y-8">
          <div className="text-white flex flex-col gap-10 rounded-t-30 bg-[#3D3935] px-7.5 py-4">
            <div>
              <WhiteLogo />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white-base">
                Edit user
              </h1>
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
              <Form
                id="edit-user-form"
                onSubmit={formik.handleSubmit}
                className="my-5 grid grid-cols-2 gap-x-6 gap-y-3.5"
              >
                <RenderAddFormFields fields={ADD_BUYERS_FORM_FIELDS} />

                <Window className="h-[250px] overflow-auto !p-0">
                  <div className="p-4">
                    <Title title="Active products" subtitle="" />
                  </div>
                  <div className="mt-5 flex flex-col gap-4">
                    {products.map((product) => (
                      <Checkbox
                        key={product.id}
                        label={product.name}
                        checked={selectedProduct.includes(product.id)}
                        onChange={() => handleProductsChange(product.id)}
                      />
                    ))}
                  </div>
                </Window>

                {formik.values.role == TypesUsers.CLIENT_ADMIN ? (
                  <Window className="h-[250px] overflow-auto !p-0">
                    <div className="p-4">
                      <Title title="Approved Locations" subtitle="" />
                    </div>
                    <div className="mt-5 flex flex-col gap-4">
                      {locations.map((location) => (
                        <Checkbox
                          key={location.id}
                          label={location.name}
                          checked={selectedLocation.includes(location.id)}
                          onChange={() => handleLocationsChange(location.id)}
                        />
                      ))}
                    </div>
                  </Window>
                ) : (
                  <></>
                )}
              </Form>
            </FormikProvider>
          </div>
        </div>

        <div className="bg-white sticky bottom-0 flex w-full justify-end gap-4 pb-10 pr-15">
          <Button
            form="edit-user-form"
            type="submit"
            variant={ButtonVariants.PRIMARY}
            className="h-10 w-44 rounded-20 px-10 py-3"
          >
            Save
          </Button>
          <Button
            variant={ButtonVariants.SECONDARY}
            className="h-10 w-36 rounded-20 px-10 py-3"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </Window>
    </ModalWindow>
  );
};
