import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
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
import { ReactComponent as WhiteLogo } from "src/assets/icons/whiteLogo.svg";
import { IEditUser, TypesUsers } from "src/@types/users";

interface EditMedicalSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settingsId?: number;
}

export const EditMedicalSettings: FC<EditMedicalSettingsProps> = ({
  isOpen,
  onClose,
  settingsId,
}) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const uploadFile = useFileStore((state) => state.uploadFile);
  const response = useFileStore((state) => state.response);

  const loadProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);
  const loadLocations = useLocationStore((state) => state.fetchLocation);
  const locations = useLocationStore((state) => state.locations);
  const getSubUsers = useUserStore((state) => state.getSubUsers);
  const subUsers = useUserStore((state) => state.subUsers);
  const loadUsers = useUserStore((state) => state.getAllUsers);
  const users = useUserStore((state) => state.users);

  const { updateUser, getUserDetail, detailUser } = useUserStore();

  const [selectedLocation, setSelectedLocation] = useState<number[]>(
    detailUser?.locations?.map((item) => item.id) || []
  );

  const [selectedProduct, setSelectedProduct] = useState<number[]>(
    detailUser?.products?.map((item) => item.id) || []
  );

  const [selectedUsers, setSelectedUsers] = useState<number[]>(
    subUsers.map((item) => item.id) || []
  );

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("This field is required."),
    last_name: Yup.string().required("This field is required."),
    email: Yup.string()
      .email("Invalid email")
      .required("This field is required."),
    phone: Yup.string().required("This field is required."),
    purchase_limit: Yup.number().required("This field is required."),
    role: Yup.number().required("This field is required."),
  });

  const onSubmit = async (values: IEditUser) => {
    const formattedValues = {
      ...values,
      role: Number(values.role),
      avatar: response,
    };
    await updateUser(formattedValues);
    // NotificationService.success("Settings updated successfully");
    onClose();
  };

  const formikProps: FormikConfig<IEditUser> = {
    initialValues: {
      id: detailUser?.id || 0,
      first_name: detailUser?.first_name || "",
      last_name: detailUser?.last_name || "",
      email: detailUser?.email || "",
      phone: detailUser?.phone || "",
      role: detailUser?.role || 1,
      purchase_limit: detailUser?.purchase_limit || 0,
      approval_locations: detailUser?.locations?.map((item) => item.id) || [],
      active_products: detailUser?.products?.map((item) => item.id) || [],
      approved_users: subUsers.map((item) => item.id) || [],
      avatar: detailUser?.avatar,
    },
    validationSchema,
    onSubmit,
    enableReinitialize: true,
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

  useEffect(() => {
    if (settingsId && isOpen) {
      getUserDetail(String(settingsId));
    }
  }, [settingsId, isOpen, getUserDetail]);

  useEffect(() => {
    loadLocations();
    loadProducts();
    getSubUsers(settingsId);
    loadUsers();
  }, [loadLocations, loadProducts, getSubUsers, loadUsers, settingsId]);

  useEffect(() => {
    if (detailUser?.avatar?.path) {
      setAvatarPreview(detailUser.avatar.path);
    }
  }, [detailUser]);

  // const handleUserSelection = (id: number) => {
  //   setSelectedUsers((prev) =>
  //     prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
  //   );
  // };

  // const handleLocationsChange = (id: number) => {
  //   setSelectedLocation((prev) =>
  //     prev.includes(id) ? prev.filter((loc) => loc !== id) : [...prev, id]
  //   );
  // };

  // const handleProductsChange = (id: number) => {
  //   setSelectedProduct((prev) =>
  //     prev.includes(id) ? prev.filter((prod) => prod !== id) : [...prev, id]
  //   );
  // };

  useEffect(() => {
    console.log("Current role value:", formik.values.role);
  }, [formik.values.role]);

  return (
    <ModalWindow
      className="max-h-[800px] w-[1000px] overflow-y-auto"
      onClose={onClose}
      isOpen={isOpen}
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
                Edit User
              </h1>
            </div>
          </div>
        </div>
        <div className="flex gap-15 p-4 pr-11">
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
                    : "Drag and drop an image, or click to select"}
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
                <div className="col-span-2">
                  {formik.values.role !== TypesUsers.MEDICAL && (
                    <>
                      {formik.values.role === TypesUsers.CLIENT_ADMIN ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Window className="h-[250px] overflow-auto !p-0">
                              <div className="p-4">
                                <Title title="Approved Locations" subtitle="" />
                              </div>
                              <div className="mt-5 flex flex-col gap-4">
                                {locations.map((location) => (
                                  <Checkbox
                                    key={location.id}
                                    label={location.name}
                                    checked={selectedLocation.includes(
                                      location.id
                                    )}
                                    onChange={() => {
                                      setSelectedLocation((prev) => {
                                        const updated = prev.includes(
                                          location.id
                                        )
                                          ? prev.filter(
                                              (loc) => loc !== location.id
                                            )
                                          : [...prev, location.id];
                                        formik.setFieldValue(
                                          "approval_locations",
                                          updated
                                        );
                                        return updated;
                                      });
                                    }}
                                  />
                                ))}
                              </div>
                            </Window>

                            <Window className="h-[250px] overflow-auto !p-0">
                              <div className="p-4">
                                <Title title="Approved Users" subtitle="" />
                              </div>
                              <div className="mt-5 flex flex-col gap-4">
                                {users.map((user) => (
                                  <Checkbox
                                    key={user.id}
                                    label={`${user.first_name} ${user.last_name}`}
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => {
                                      setSelectedUsers((prev) => {
                                        const updated = prev.includes(user.id)
                                          ? prev.filter(
                                              (prod) => prod !== user.id
                                            )
                                          : [...prev, user.id];
                                        formik.setFieldValue(
                                          "approved_users",
                                          updated
                                        );
                                        return updated;
                                      });
                                    }}
                                  />
                                ))}
                              </div>
                            </Window>
                          </div>

                          <Window className="h-[250px] w-full overflow-auto !p-0">
                            <div className="p-4">
                              <Title title="Active products" subtitle="" />
                            </div>
                            <div className="mt-5 flex flex-col gap-4">
                              {products.map((product) => (
                                <Checkbox
                                  key={product.id}
                                  label={product.name}
                                  checked={selectedProduct.includes(product.id)}
                                  onChange={() => {
                                    setSelectedProduct((prev) => {
                                      const updated = prev.includes(product.id)
                                        ? prev.filter(
                                            (prod) => prod !== product.id
                                          )
                                        : [...prev, product.id];
                                      formik.setFieldValue(
                                        "active_products",
                                        updated
                                      );
                                      return updated;
                                    });
                                  }}
                                />
                              ))}
                            </div>
                          </Window>
                        </div>
                      ) : (
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
                                onChange={() => {
                                  setSelectedProduct((prev) => {
                                    const updated = prev.includes(product.id)
                                      ? prev.filter(
                                          (prod) => prod !== product.id
                                        )
                                      : [...prev, product.id];
                                    formik.setFieldValue(
                                      "active_products",
                                      updated
                                    );
                                    return updated;
                                  });
                                }}
                              />
                            ))}
                          </div>
                        </Window>
                      )}
                    </>
                  )}
                </div>
              </Form>
            </FormikProvider>
          </div>
        </div>

        <div className="bg-white sticky bottom-0 flex w-full justify-end gap-4 bg-white-base pb-10 pr-15">
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
