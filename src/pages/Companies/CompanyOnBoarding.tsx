import { FC, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router";
import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { RenderAddFormFields } from "src/page-components/add-buyers/RenderAddFormFields";
import {
  ADD_COMPANY_FORM_FIELD_BANK_REFERENCE,
  ADD_COMPANY_FORM_FIELD_CREDIT,
  ADD_COMPANY_FORM_FIELDS_1,
  ADD_COMPANY_FORM_FIELDS_2,
  ADD_COMPANY_FORM_FILED_INVOICING,
  ADD_COMPANY_FORM_FILED_INVOICING_2,
  ADD_COMPANY_FORM_FILEDS_CREDIT_REFERENCE,
} from "src/page-components/company-onboarding/constant";
import { Avatar } from "src/components/Avatar";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { ModalWindow } from "src/components/ModalWindow";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useCompanyStore, {
  IAddCompanyFormFields,
} from "src/stores/company-store";
import useFileStore from "src/stores/file-store";
import { NotificationService } from "src/helpers/notifications";
import { PATHNAMES } from "src/constants/routes";
import { Sizes } from "src/@types/sizes";

export const CompanyOnBoarding: FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const uploadFile = useFileStore((state) => state.uploadFile);
  const response = useFileStore((state) => state.response);

  const createCompany = useCompanyStore((state) => state.createCompany);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1); // Переход на следующий шаг
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); // Переход на предыдущий шаг
    }
  };

  const navigate = useNavigate();

  const onClose = () => {
    navigate(PATHNAMES.COMPANIES);
  };

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required("Company name is required"),
    trade_name: Yup.string().required("Trade name is required"),
    address: Yup.string().required("Address is required"),
    contact: Yup.string().required("Contact is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^\+?[0-9]{7,15}$/, "Phone number is not valid"),
    business_type: Yup.string().required("Business type is required"),
    date_of_incorporation: Yup.date().required(
      "Date of incorporation is required"
    ),
    state_of_incorporation: Yup.string().required(
      "State of incorporation is required"
    ),
    federal_tax_id: Yup.string().required("Federal Tax ID is required"),
    // .matches(/^\d{3}-\d{2}-\d{4}$/, "Federal Tax ID is not valid"),
    duns_no: Yup.string()
      .required("DUNs number is required")
      .matches(/^\d{9}$/, "DUNs number is not valid"),
    sic_code: Yup.string().required("NAICS/SIC Code is required"),
    years_in_business: Yup.number()
      .required("Years in business is required")
      .positive("Years in business must be a positive number")
      .integer("Years in business must be an integer")
      .min(1, "Years in business must be at least 1"),
    website: Yup.string().url("Invalid website format"),
    primary_contact: Yup.string().required("Primary contact is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    invoicing_address: Yup.string().required("Billing address is required"),
    invoicing_contact: Yup.string().required("Primary AP Account is required"),
    invoicing_email: Yup.string()
      .email("Invalid email format")
      .required("Invoicing email is required"),
    invoicing_city: Yup.string().required("City is required"),
    invoicing_state: Yup.string().required("State is required"),
    invoicing_zip: Yup.string()
      .required("Zip code is required")
      .matches(/^\d{5}$/, "Zip code is not valid"),
    invoicing_fax: Yup.string().matches(
      /^\+?[0-9]{7,15}$/,
      "Fax number is not valid"
    ),
    payment_method: Yup.string().required("Payment method is required"),
    purchasing_contact: Yup.string().required("Primary contact is required"),
    purchasing_phone: Yup.string().matches(
      /^\+?[0-9]{7,15}$/,
      "Phone number is not valid"
    ),
    purchasing_email: Yup.string()
      .email("Invalid email format")
      .required("Purchasing email is required"),
    owner_name: Yup.string().required("Owner name is required"),
    owner_position: Yup.string().required("Owner position is required"),
    owner_ownership: Yup.string().required("Ownership is required"),
    owner_address: Yup.string().required("Home address is required"),
    owner_phone: Yup.string().matches(
      /^\+?[0-9]{7,15}$/,
      "Phone number is not valid"
    ),
    owner_email: Yup.string()
      .email("Invalid email format")
      .required("Owner email is required"),
    bank_name: Yup.string().required("Bank name is required"),
    bank_number: Yup.string().required("Account number is required"),
    bank_contact: Yup.string().required("Bank contact is required"),
    bank_phone: Yup.string().matches(
      /^\+?[0-9]{7,15}$/,
      "Phone number is not valid"
    ),
    bank_email: Yup.string()
      .email("Invalid email format")
      .required("Bank email is required"),
    bank_address: Yup.string().required("Bank address is required"),
    credit_first_name: Yup.string().required("Firm name is required"),
    credit_contact: Yup.string().required("Credit contact is required"),
    credit_phone: Yup.string().matches(
      /^\+?[0-9]{7,15}$/,
      "Phone number is not valid"
    ),
    credit_fax: Yup.string().matches(
      /^\+?[0-9]{7,15}$/,
      "Fax number is not valid"
    ),
    credit_email: Yup.string()
      .email("Invalid email format")
      .required("Credit email is required"),
    credit_address: Yup.string().required("Credit address is required"),
  });

  const formikProps: FormikConfig<IAddCompanyFormFields> = {
    initialValues: {
      company_name: "",
      trade_name: "",
      address: "",
      contact: "",
      phone: "",
      business_type: "",
      date_of_incorporation: "",
      state_of_incorporation: "",
      federal_tax_id: "",
      duns_no: "",
      sic_code: "",
      years_in_business: "",
      website: "",
      primary_contact: "",
      email: "",
      invoicing_address: "",
      invoicing_contact: "",
      invoicing_email: "",
      invoicing_city: "",
      invoicing_state: "",
      invoicing_zip: "",
      invoicing_fax: "",
      payment_method: "",
      purchasing_contact: "",
      purchasing_phone: "",
      purchasing_email: "",
      owner_name: "",
      owner_position: "",
      owner_ownership: "",
      owner_address: "",
      owner_phone: "",
      owner_email: "",
      bank_name: "",
      bank_number: "",
      bank_contact: "",
      bank_phone: "",
      bank_email: "",
      bank_address: "",
      credit_first_name: "",
      credit_contact: "",
      credit_phone: "",
      credit_fax: "",
      credit_email: "",
      credit_address: "",
      logo: null,
    },
    validationSchema,

    onSubmit: (values) => {
      console.log("Form values:", values);
      const fullData = {
        ...values,
        logo: response,
        logo_id: response?.id,
      };
      createCompany(fullData);
    },
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
    <ModalWindow
      className="max-h-[800px] w-3/5 overflow-y-auto"
      onClose={onClose}
      isOpen={true}
      isActivePortal
      closeButtonClassName="!bg-white-base rounded-full  shadow-md"
    >
      <Window className="max-h-200 overflow-auto !border-none">
        <div className="flex flex-col gap-5">
          <div className="flex">
            <FormikProvider value={formik}>
              <Form>
                {currentStep === 1 && (
                  <>
                    <Title title="Company Information" subtitle="" />
                    <div className="flex gap-5">
                      <div className="min-w-[150px]">
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
                        <div className="my-5 grid grid-cols-3 gap-x-6 gap-y-3.5">
                          <RenderAddFormFields
                            fields={ADD_COMPANY_FORM_FIELDS_1}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="my-5 grid grid-cols-3 gap-x-6 gap-y-3.5">
                      <RenderAddFormFields fields={ADD_COMPANY_FORM_FIELDS_2} />
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <Title title="Invoice Information" subtitle="" />
                    <p className="text-gray-400">
                      Company Name (asitshould appear on invoice. Write billing
                      address if different from address above)
                    </p>
                    <div className="grid grid-cols-3 gap-x-6 gap-y-3.5">
                      <RenderAddFormFields
                        fields={ADD_COMPANY_FORM_FILED_INVOICING}
                      />
                    </div>
                    <div>
                      <Title title="Purchasing Information" subtitle="" />
                      <p className="text-gray-400">
                        Please list contact info for the personnel authorized to
                        submit purchase orders.
                      </p>
                      <div className="grid grid-cols-3 gap-x-6 gap-y-3.5">
                        <RenderAddFormFields
                          fields={ADD_COMPANY_FORM_FILED_INVOICING_2}
                        />
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <Title title="Credit Application" subtitle="" />
                    <Title title="Officers/Owners Information" subtitle="" />

                    <div className="my-5 grid grid-cols-3 gap-x-6 gap-y-3.5">
                      <RenderAddFormFields
                        fields={ADD_COMPANY_FORM_FIELD_CREDIT}
                      />
                    </div>
                    <Title title="Bank Reference" subtitle="" />
                    <div className="my-5 grid grid-cols-3 gap-x-6 gap-y-3.5">
                      <RenderAddFormFields
                        fields={ADD_COMPANY_FORM_FIELD_BANK_REFERENCE}
                      />
                    </div>
                    <Title title="Credit Reference" subtitle="" />
                    <div className="my-5 grid grid-cols-3 gap-x-6 gap-y-3.5">
                      <RenderAddFormFields
                        fields={ADD_COMPANY_FORM_FILEDS_CREDIT_REFERENCE}
                      />
                    </div>
                  </>
                )}

                <div className="mt-10 flex w-full justify-between">
                  <div className="flex flex-col items-center gap-2">
                    <p>Step {currentStep}</p>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`h-2 w-10 ${currentStep >= 1 ? "bg-purple-600" : "bg-gray-300"} rounded-full`}
                      ></div>
                      <div
                        className={`h-2 w-10 ${currentStep >= 2 ? "bg-purple-600" : "bg-gray-300"} rounded-full`}
                      ></div>
                      <div
                        className={`h-2 w-10 ${currentStep >= 3 ? "bg-purple-600" : "bg-gray-300"} rounded-full`}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {currentStep > 1 && (
                      <Button
                        variant={ButtonVariants.SECONDARY}
                        className="px-12 py-2"
                        type="button"
                        onClick={prevStep}
                      >
                        Previous
                      </Button>
                    )}
                    {currentStep === 3 ? (
                      <Button
                        variant={ButtonVariants.PRIMARY}
                        className="px-12 py-2"
                        type="submit"
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button
                        variant={ButtonVariants.PRIMARY}
                        className="px-12 py-2"
                        type="button"
                        onClick={nextStep}
                      >
                        Next
                      </Button>
                    )}
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
