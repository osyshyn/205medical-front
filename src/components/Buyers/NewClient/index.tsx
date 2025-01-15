import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { TextInput } from "src/components/FormField/TextInput";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { ProductList } from "src/components/SettingAddCategory/ProductList";
import { SelectField } from "src/components/SettingUserManagement/SelectField";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useCompanyStore from "src/stores/company-store";
import useFileStore from "src/stores/file-store";
import useProductStore from "src/stores/product-store";
import useUserStore from "src/stores/user-store";
import { NotificationService } from "src/helpers/notifications";
import { IRenderFormField } from "src/@types/form";
import { INewUser, TypesUsers } from "src/@types/users";
import { RenderCreateFormFields } from "./RenderCreateFormFields";

export const NewClient = () => {
  const { company, isLoading, fetchCompany } = useCompanyStore();
  const [companyOptions, setCompanyOptions] = useState<
    Array<{ label: string; value: number }>
  >([]);

  useEffect(() => {
    const initializeCompanyData = async () => {
      await fetchCompany();
    };

    initializeCompanyData();
  }, []);

  useEffect(() => {
    if (company) {
      console.log(company);
      const companyOptions = Object.values(company).map((c) => ({
        label: c.company_name,
        value: c.id,
      }));
      setCompanyOptions(companyOptions);
    }
  }, [company]);

  const CREATE_USER_FORM_FIELDS: IRenderFormField[] = [
    {
      name: "role",
      type: "select",
      label: "Role",
      component: SelectField,
      placeholder: "Choose the Role",
      options: [
        { label: "205 Medical Admin", value: 3 },
        { label: "Client Admin", value: 2 },
      ],
    },
    {
      name: "company_id",
      type: "select",
      label: "Company",
      component: SelectField,
      placeholder: "Choose the Company",
      options: companyOptions,
    },
    {
      name: "purchase_limit",
      type: "text",
      label: "Purchase Limit",
      component: TextInput,
      placeholder: "Purchase Limit",
    },
    {
      name: "first_name",
      type: "text",
      label: "First Name",
      component: TextInput,
      placeholder: "First Name",
    },
    {
      name: "last_name",
      type: "text",
      label: "Last Name",
      component: TextInput,
      placeholder: "Last Name",
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      component: TextInput,
      placeholder: "Email",
    },
    {
      name: "phone",
      type: "phone",
      label: "Phone",
      component: TextInput,
      placeholder: "Phone",
    },
  ];

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const uploadFile = useFileStore((state) => state.uploadFile);
  const response = useFileStore((state) => state.response);

  const createUser = useUserStore((state) => state.createUser);

  const { products, fetchProducts, isLoadingProducts } = useProductStore();
  const [active_products, setSelectedProducts] = useState<number[]>([]);

  const toggleProductSelection = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const validationSchema = Yup.object({
    first_name: Yup.string().required("This field is required."),
    last_name: Yup.string().required("This field is required."),
    email: Yup.string()
      .email("Invalid email")
      .required("This field is required."),
    phone: Yup.string().required("This field is required."),
    purchase_limit: Yup.number().min(1),
    role: Yup.number().required("This field is required."),
    company_id: Yup.number().required("This field is required."),
  });

  const handleFormReset = () => {
    formik.resetForm();
    setSelectedProducts([]);
    setAvatarPreview(null);
  };

  const handleButtonClick = async () => {
    const formDataWithProducts = {
      ...formik.values,
      active_products: active_products,
      avatar: response,
    };
    console.log("Form values with selected products:", formDataWithProducts);
    await createUser(formDataWithProducts);
    handleFormReset();
  };

  const onSubmit = async (values: INewUser) => {
    const formattedValues = {
      ...values,
      role: Number(values.role),
      avatar: response,
      active_products: active_products,
    };
    console.log("Final submission data:", formattedValues);
    handleFormReset();
  };

  const formikProps: FormikConfig<INewUser> = {
    initialValues: {
      role: TypesUsers.CLIENT_ADMIN,
      company_id: 0,
      purchase_limit: 0,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      avatar: undefined,
      active_products: [],
    },
    validationSchema,
    onSubmit,
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

  const isSubmitDisabled = () => {
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "role",
      "company_id",
    ];
    const hasAllRequiredFields = requiredFields.every(
      (field) => formik.values[field]
    );
    const hasNoErrors = Object.keys(formik.errors).length === 0;
    // const hasProducts = active_products.length > 0;

    return !hasAllRequiredFields || !hasNoErrors; // || !hasProducts;
  };

  return (
    <PageWrapper className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <Title
          title="User Onboarding"
          subtitle="Lorem ipsum dolor sit amet consectetur"
        />
      </div>

      <Window className="mt-6">
        <div className="p-4">
          <Title title="User Information" subtitle="" />
        </div>

        <div className="flex flex-wrap items-start gap-6 px-4">
          {/* Avatar Section */}
          <div
            {...getRootProps()}
            className={`h-[180px] w-[180px] overflow-hidden rounded-lg border-2 ${
              isDragActive ? "border-blue-500" : "border-gray-300"
            } flex items-center justify-center bg-gray-100`}
          >
            <input {...getInputProps()} />
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="User Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="p-4 text-center text-gray-500">
                {isDragActive
                  ? "Drop the image here..."
                  : "Drag and drop an image, or click to select"}
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="flex-1 pr-4">
            <FormikProvider value={formik}>
              <Form
                id="edit-user-form"
                onSubmit={formik.handleSubmit}
                className="w-full"
              >
                {isLoading ? (
                  <></>
                ) : (
                  <RenderCreateFormFields
                    fields={CREATE_USER_FORM_FIELDS}
                    className="w-full"
                  />
                )}
              </Form>
            </FormikProvider>
          </div>
        </div>

        <div className="p-4">
          <Title title="Active Products" subtitle="" />
        </div>

        <div className="flex min-w-[700px] flex-col pl-7 pr-7">
          <div className="bg-white top-0 grid flex-shrink-0 grid-cols-4 gap-12 border-b border-t pb-4 pt-4 text-sm text-gray-500">
            <div></div>
            <div className="text-14 font-medium">SKU</div>
            <div className="text-14 font-medium">Name</div>
            <div className="text-14 font-medium">Description</div>
          </div>
          <ProductList
            products={products}
            selectedProducts={active_products}
            onToggle={toggleProductSelection}
            isLoading={isLoadingProducts}
            className="!border-0"
          />
        </div>
      </Window>

      <Button
        className="text-white ml-auto mt-10 h-10 w-48 rounded-full"
        variant={ButtonVariants.PRIMARY}
        onClick={handleButtonClick}
        isDisabled={isSubmitDisabled()}
      >
        Create User
      </Button>
    </PageWrapper>
  );
};
