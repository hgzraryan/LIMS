/*-------------------------------------------------------------------
|
|  🐯 Purpose: THIS FILE CONTAINS ALL THE VALIDATORS OBJECTS
|
*-------------------------------------------------------------------*/
// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const EMAIL_REGEX =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const MOBILE_REGEX = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

export const firstName_validation = {
  name: "firstName",
  label: "Անուն",
  type: "text",
  id: "firstName",
  placeholder: "Անուն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const lastName_validation = {
  name: "lastName",
  label: "Ազգանուն",
  type: "text",
  id: "lastName",
  placeholder: "Ազգանուն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const midName_validation = {
  name: "midName",
  label: "Հայրանուն",
  type: "text",
  id: "midName",
  placeholder: "Հայրանուն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const user_validation = {
  name: "user",
  label: "Ծածկանուն",
  type: "text",
  id: "user",
  placeholder: "Ծածկանուն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const password_validation = {
  name: "password",
  label: "Ծածկագիր",
  type: "password",
  id: "password",
  placeholder: "Ծածկագիր",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    minLength: {
      value: 6,
      message: "min 6 characters",
    },
  },
};
export const passport_validation = {
  name: "passport",
  label: "Անձնագիր/ID",
  type: "text",
  id: "passport",
  placeholder: "Անձնագիր/ID",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const position_validation = {
  name: "position",
  label: "Պաշտոն",
  type: "text",
  id: "position",
  placeholder: "Պաշտոն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const tin_validation = {
  name: "tin",
  label: "ՀՎՀՀ",
  type: "number",
  id: "tin",
  placeholder: "ՀՎՀՀ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const bankName_validation = {
  name: "bankName",
  label: "Բանկ",
  type: "text",
  id: "bankName",
  placeholder: "Բանկ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const bankAccNumber_validation = {
  name: "bankAccNumber",
  label: "Հ/Հ",
  type: "number",
  id: "bankAccNumber",
  placeholder: "Հ/Հ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const director_validation = {
  name: "director",
  label: "Տնօրեն",
  type: "text",
  id: "director",
  placeholder: "Տնօրեն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const medInstitution_validation = {
  name: "medInstitution",
  label: "Աշխատավայր",
  type: "text",
  id: "medInstitution",
  placeholder: "Աշխատավայր",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const shortName_validation = {
  name: "shortName",
  label: "Հապավում",
  type: "text",
  id: "shortName",
  placeholder: "Հապավում",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const category_validation = {
  name: "category",
  label: "Դասակարգ",
  type: "text",
  id: "category",
  placeholder: "Դասակարգ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const researchUnit_validation = {
  name: "researchUnit",
  label: "Հետազոտության միավոր",
  type: "text",
  id: "researchUnit",
  placeholder: "Հետազոտության միավոր",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const referenceRange_validation = {
  name: "referenceRange",
  label: "Հետազոտության նորմա",
  type: "text",
  id: "referenceRange",
  placeholder: "Հետազոտության նորմա",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const birthday_validation = {
  name: "birthday",
  label: "Ծննդյան ամսաթիվ",
  type: "text",
  id: "birthday",
  placeholder: "DD/MM/YYYY",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 10,
      message: "10 symbols max",
    },
  },
};
export const age_validation = {
  name: "age",
  label: "Տարիք",
  type: "number",
  id: "age",
  placeholder: "Տարիք",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 3,
      message: "3 numbers max",
    },
  },
};
export const address_validation = {
  name: "address",
  label: "Հասցե",
  type: "text",
  id: "address",
  placeholder: "Հասցե",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
  },
};
export const email_validation = {
  name: "email",
  label: "Էլ․ հասցե",
  type: "email",
  id: "email",
  placeholder: "Էլ․ հասցե",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "not valid",
    },
  },
};
export const patientEmail_validation = {
  name: "email",
  label: "Էլ․ հասցե",
  type: "email",
  id: "email",
  placeholder: "Էլ․ հասցե",
  validation: {
    required: {
      value: false,
      message: "պարտադիր",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "not valid",
    },
  },
};
export const contactEmail_validation = {
  name: "contactEmail",
  label: "Էլ․ հասցե",
  type: "email",
  id: "contactEmail",
  placeholder: "Էլ․ հասցե",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "not valid",
    },
  },
};
export const mobile_validation = {
  name: "mobile",
  label: "Հեռախոս",
  type: "text",
  id: "mobile",
  placeholder: "Հեռախոս",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 15,
      message: "15 numbers max",
    },
  },
};
export const contactMobile_validation = {
  name: "contactMobile",
  label: "Հեռախոս",
  type: "text",
  id: "contactMobile",
  placeholder: "Հեռախոս",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 15,
      message: "15 numbers max",
    },
  },
};
export const name_validation = {
  name: "name",
  label: "Անվանում",
  type: "text",
  id: "name",
  placeholder: "Անվանում",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const diagName_validation = {
  name: "diagName",
  label: "Ախտորոշման անվանում",
  type: "text",
  id: "diagName",
  placeholder: "Անվանում",
  validation: {
    required: {
      value: false,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const contactName_validation = {
  name: "contactName",
  label: "Անուն",
  type: "text",
  id: "contactName",
  placeholder: "Անուն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const fullName_validation = {
  name: "fullName",
  label: "Անուն ազգանուն հայրանուն",
  type: "text",
  id: "fullName",
  placeholder: "Անուն ազգանուն հայրանուն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const additional_validation = {
  name: "additional",
  label: "Հավելյալ տվյալներ",
  type: "text",
  id: "additional",
  placeholder: "Հավելյալ տվյալներ",
  validation: {
    required: false,
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const doctorState_validation = {
  name: "doctorState",
  label: "Կարգավիճակ",
  type: "text",
  id: "doctorState",
  placeholder: "Կարգավիճակ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const specialty_validation = {
  name: "specialty",
  label: "Մասնագիտացում",
  type: "text",
  id: "specialty",
  placeholder: "Մասնագիտացում",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const licenseNumber_validation = {
  name: "licenseNumber",
  label: "Լիցենզավորման համար",
  type: "text",
  id: "licenseNumber",
  placeholder: "Լիցենզավորման համար",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const qualification_validation = {
  name: "qualification",
  label: "Որակավորում",
  type: "text",
  id: "qualification",
  placeholder: "Որակավորում",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const model_validation = {
  name: "model",
  label: "Սարքի մոդել",
  type: "text",
  id: "model",
  placeholder: "Սարքի մոդել",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const equipmentType_validation = {
  name: "equipmentType",
  label: "Սարքի տեսակ",
  type: "text",
  id: "equipmentType",
  placeholder: "Սարքի տեսակ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const type_validation = {
  name: "type",
  label: "Տեսակ",
  type: "text",
  id: "type",
  placeholder: "Տեսակ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const manufacturer_validation = {
  name: "manufacturer",
  label: "Արտադրող",
  type: "text",
  id: "manufacturer",
  placeholder: "Արտադրող",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "50 characters max",
    },
  },
};
export const serialNumber_validation = {
  name: "serialNumber",
  label: "Սերիական համար",
  type: "text",
  id: "serialNumber",
  placeholder: "Սերիական համար",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 50,
      message: "50 characters max",
    },
  },
};
export const location_validation = {
  name: "locationValid",
  label: "Տեղակայումը",
  type: "text",
  id: "locationValid",
  placeholder: "Տեղակայումը",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const price_validation = {
  name: "price",
  label: "Արժեք",
  type: "number",
  id: "price",
  placeholder: "Արժեք",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 10,
      message: "10 characters max",
    },
  },
};
export const unit_validation = {
  name: "unit",
  label: "Չափման միավոր",
  type: "text",
  id: "unit",
  placeholder: "Չափման միավոր",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const currency_validation = {
  name: "currency",
  label: "Արժույթ",
  type: "text",
  id: "currency",
  placeholder: "Արժույթ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const usage_validation = {
  name: "usage",
  label: "Կիրառություն",
  type: "text",
  id: "usage",
  placeholder: "Կիրառություն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};
export const producer_validation = {
  name: "producer",
  label: "Թողարկող",
  type: "text",
  id: "producer",
  placeholder: "Թողարկող",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const desc_validation = {
  name: "description",
  label: "Նկարագիր",
  multiline: true,
  id: "description",
  placeholder: "Նկարագիր",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const orgDesc_validation = {
  name: "description",
  label: "Նկարագիր",
  multiline: true,
  id: "description",
  placeholder: "Նկարագիր",
  validation: {
    required: {
      value: false,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const class_validation = {
  name: "class",
  label: "Դասակարգ",
  multiline: true,
  id: "class",
  placeholder: "Դասակարգ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const state_validation = {
  name: "state",
  label: "Մարզ",
  multiline: true,
  id: "state",
  placeholder: "Մարզ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const city_validation = {
  name: "city",
  label: "Քաղաք/Գյուղ",
  multiline: true,
  id: "city",
  placeholder: "Քաղաք/Գյուղ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const country_validation = {
  name: "country",
  label: "Երկիր",
  multiline: true,
  id: "country",
  placeholder: "Երկիր",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const street_validation = {
  name: "street",
  label: "Փողոց",
  multiline: true,
  id: "street",
  placeholder: "Փողոց",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const zipCode_validation = {
  name: "zipCode",
  label: "Փոստային համար",
  multiline: true,
  id: "zipCode",
  placeholder: "Փոստային համար",
  validation: {
    required: {
      value: false,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const emergencyContactName_validation = {
  name: "emergencyContactName",
  label: "Լրացուցիչ կոնտակտ",
  multiline: true,
  id: "emergencyContactName",
  placeholder: "Լրացուցիչ կոնտակտ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const emergencyContactNumber_validation = {
  name: "emergencyContactNumber",
  label: "Լրացուցիչ կոնտակտի հեռախոս",
  multiline: true,
  type: "number",
  id: "emergencyContactNumber",
  placeholder: "Լրացուցիչ կոնտակտ հեռախոս",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const purchasePrice_validation = {
  name: "purchasePrice",
  label: "Առքի գին",
  multiline: true,
  type: "number",
  id: "purchasePrice",
  placeholder: "Առքի գին",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 20,
      message: "20 characters max",
    },
  },
};
export const deliveryTimeLimit_validation = {
  name: "deliveryTimeLimit",
  label: "Առաքման ժամկետ",
  multiline: true,
  id: "deliveryTimeLimit",
  placeholder: "Առաքման ժամկետ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const biomaterial_validation = {
  name: "biomaterial",
  label: "Կենսանյութ",
  multiline: true,
  id: "biomaterial",
  placeholder: "Կենսանյութ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const serviceName_validation = {
  name: "serviceName",
  label: "ծառայության անվանում",
  multiline: true,
  id: "serviceName",
  placeholder: "ծառայության անվանում",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const categoryName_validation = {
  name: "categoryName",
  label: "Դասակարգի անվանում",
  multiline: true,
  id: "categoryName",
  placeholder: "Դասակարգի անվանում",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const vial_validation = {
  name: "vial",
  label: "Սրվակ",
  multiline: true,
  id: "vial",
  placeholder: "Սրվակ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const laboratoryService_validation = {
  name: "laboratoryService",
  label: "Լաբորատոր ծառայություն",
  multiline: true,
  id: "laboratoryService",
  placeholder: "Լաբորատոր ծառայություն",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const localCode_validation = {
  name: "localCode",
  label: "Ներքին կոդ",
  multiline: true,
  id: "localCode",
  placeholder: "Ներքին կոդ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const partnerCode_validation = {
  name: "partnerCode",
  label: "Գործընկերոջ կոդ",
  multiline: true,
  id: "partnerCode",
  placeholder: "Գործընկերոջ կոդ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const samplingPeriod_validation = {
  name: "samplingPeriod",
  label: "Նմուշառման ժամկետ",
  multiline: true,
  id: "samplingPeriod",
  placeholder: "Նմուշառման ժամկետ",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const researchPrepSub_validation = {
  name: "researchPrepSub",
  label: "Նախապատրաստում",
  multiline: true,
  id: "researchPrepSub",
  placeholder: "Նախապատրաստում",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
export const researchName_validation = {
  name: "researchName",
  label: "Անվանում",
  multiline: true,
  id: "researchName",
  placeholder: "Անվանում",
  validation: {
    required: {
      value: true,
      message: "պարտադիր",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};
