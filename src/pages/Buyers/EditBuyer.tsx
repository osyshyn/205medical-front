import { FC, useEffect, useState } from "react";
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
import useLocationStore from "src/stores/location-store";
import useProductStore from "src/stores/product-store";
import useUserStore from "src/stores/user-store";
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

  const updateUser = useUserStore((state) => state.updateUser);

  useEffect(() => {
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

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: IEditUser) => {
    const fullData: IEditUser = {
      ...values,
    };

    await updateUser(fullData);
  };

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

  console.log("Buyer detail: ", buyerDeatil);

  return (
    <ModalWindow
      className="max-h-[800px] w-3/5 overflow-y-auto"
      onClose={onClose}
      isOpen={true}
      isActivePortal
      closeButtonClassName="!bg-white-base rounded-full  shadow-md"
    >
      <Window className="max-h-200 overflow-auto !border-none !p-0">
        <div className="space-y-8">
          <div className="text-white flex flex-col gap-10 rounded-t-30 bg-[#3D3935] px-7.5 py-4">
            <div>
              <WhiteLogo />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white-base">
                Add user
              </h1>
            </div>
          </div>
        </div>
        <div className="flex gap-15 p-4">
          <div className="w-[150px]">
            <div className="mb-4 h-[180px] w-[180px] overflow-hidden bg-gray-200">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="User Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-2 w-full"
            />
          </div>

          <div className="flex-1">
            <FormikProvider value={formik}>
              <Form className="my-5 grid grid-cols-2 gap-x-6 gap-y-3.5">
                <RenderAddFormFields fields={ADD_BUYERS_FORM_FIELDS} />

                <Window className="max-h-62.5 overflow-auto !p-0">
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
                  <div className="sticky bottom-0 mt-5 flex w-full justify-start gap-5 bg-[#FFFFFF] p-4">
                    <Button
                      className="px-10 py-3"
                      variant={ButtonVariants.PRIMARY}
                    >
                      Edit
                    </Button>
                    <Button
                      className="px-10 py-3"
                      variant={ButtonVariants.SECONDARY}
                    >
                      Save
                    </Button>
                  </div>
                </Window>

                <Window className="max-h-62.5 overflow-auto !p-0">
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
                  <div className="sticky bottom-0 mt-5 flex w-full justify-start gap-5 bg-[#FFFFFF] p-4">
                    <Button
                      className="px-10 py-3"
                      variant={ButtonVariants.PRIMARY}
                    >
                      Edit
                    </Button>
                    <Button
                      className="px-10 py-3"
                      variant={ButtonVariants.SECONDARY}
                    >
                      Save
                    </Button>
                  </div>
                </Window>
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
    </ModalWindow>
  );
};
