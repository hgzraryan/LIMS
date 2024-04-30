import React, { Suspense, useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Form, FormProvider, useForm, Controller } from "react-hook-form";
import { Input } from "../Input";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  firstName_validation,
  lastName_validation,
  midName_validation,
  patientEmail_validation,
  zipCode_validation,
  street_validation,
  city_validation,
  passport_validation,
  respPersonFullName_validation,
  respPersonPassport_validation,
} from "../../utils/inputValidations";
import CustomPhoneComponent from "../CustomPhoneComponent";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomDateComponent from "../CustomDateComponent";
import { Editor } from "@tinymce/tinymce-react";
import ErrorSvg from "../../dist/svg/error.svg";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { PATIENTS_URL, UPDATE_PATIENT } from "../../utils/constants";
import { calculateAge, deleteNullProperties } from "../../utils/helper";
function PatientEditModal({ patient, setEditRow, refreshData }) {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [additionalPhone, setAdditionalPhone] = useState(false);
  const [gender, setGender] = useState("");
  const [isChild,setIsChild]= useState(false)

  const handleCheckIfChild = () =>{
    setIsChild(false)
  }

  const editorRef = useRef(null);
  const { trigger } = useForm();
  useEffect(() => {
    if (CountryRegionData[11][0] === "Armenia") {
      CountryRegionData[11][0] = "Հայաստան";
      CountryRegionData[11][2] =
        "Արագածոտն~AG|Արարատ~AR|Արմավիր~AV|Գեղարքունիք~GR|Կոտայք~KT|Լոռի~LO|Շիրակ~SH|Սյունիք~SU|Տավուշ~TV|Վայոց Ձոր~VD|Երևան~ER";
    }
    setCountry(patient?.contact?.address?.country);
  }, []);
  const methods = useForm({
    mode: "onChange",
  });
  const enableAdditionalPhone = (e, value) => {
    e.stopPropagation();
    e.preventDefault();
    setAdditionalPhone(value);
  };
  const onGenderSelect = (value) => {
    setGender(value);
    trigger("gender");
  };

  const notify = (text) =>
    toast.success(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const onSubmit = methods.handleSubmit(
    async ({
      firstName,
      lastName,
      midName,
      passport,
      email,
      street,
      city,
      state,
      country,
      zipCode,
      gender,
      phone,
      dateOfBirth,
      addPhone,
    }) => {
      const newDateOfBirthString = dateOfBirth
        ? new Date(
            dateOfBirth.getTime() - dateOfBirth.getTimezoneOffset() * 60000
          )
            .toISOString()
            .split("T")[0]
        : null;
      const updatedPatient = {
        firstName:
          firstName?.trim() !== patient?.firstName?.trim() ? firstName : null,
        lastName:
          lastName?.trim() !== patient?.lastName?.trim() ? lastName : null,
        midName: midName?.trim() !== patient?.midName?.trim() ? midName : null,
        age:calculateAge(dateOfBirth) !== patient.age? calculateAge(dateOfBirth): null,
        additional: editorRef.current.getContent({ format: "text" }),
        gender: gender?.trim() !== patient?.gender?.trim() ? gender : null,
        contact: {
          email:
            email?.trim() !== patient?.contact?.email?.trim() ? email : null,
          phone:
            phone?.trim() !== patient?.contact?.phone?.trim() ? phone : null,
          addPhone:
            addPhone === patient?.contact?.addPhone?.trim() ? null : addPhone,
          passport:
            passport?.trim() !== patient.contact?.passport?.trim()
              ? passport
              : null,
          address: {
            street:
              street?.trim() !== patient?.contact?.address?.street?.trim()
                ? street
                : null,
            city:
              city?.trim() !== patient?.contact?.address?.city?.trim()
                ? city
                : null,
            state:
              state?.trim() !== patient?.contact?.address?.state?.trim()
                ? state
                : null,
            country:
              country?.trim() !== patient?.contact?.address?.country?.trim()
                ? country
                : null,
            zipCode:
              zipCode?.trim() !== patient?.contact?.address?.zipCode?.trim()
                ? zipCode
                : null,
          },
        },
        dateOfBirth:
          patient?.dateOfBirth?.split("T")[0] !==newDateOfBirthString
           ? newDateOfBirthString
           : null,
      };

      const updatedFields = deleteNullProperties(updatedPatient);
      console.log(updatedFields);
      try {
        await axiosPrivate.put(
          PATIENTS_URL,
          { updatedFields, id: patient.patientId },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        setEditRow(false);
        refreshData();
        //   notify(
        //     `${newPatient.firstName} ${newPatient.lastName} հաճախորդը ավելացված է`
        //   );
      } catch (err) {
        // if (!err?.response) {
        //   setErrMsg("No Server Response");
        // } else if (err.response?.status === 409) {
        //   setErrMsg("Username Taken");
        // } else {
        //   setErrMsg(" Failed");
        // }
      }
    }
  );
  return (
    <>
      <Modal show={() => true} size="xl" onHide={() => setEditRow(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Թարմացնել այցելուի տվյալները
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Suspense fallback={<LoadingSpinner />}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <FormProvider {...methods}>
                <div className="contact-body contact-detail-body">
                  <div data-simplebar className="nicescroll-bar">
                    <div className="d-flex flex-xxl-nowrap flex-wrap">
                      <div className="contact-info w-100">
                        <Form
                          onSubmit={onSubmit}
                          noValidate
                          autoComplete="off"
                          className="container"
                        >
                          <div className="card">
                            <div className="card-header">
                              <a href="#">Անձնական տվյալներ</a>
                              <button
                                className="btn btn-xs btn-icon btn-rounded btn-light"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Edit"
                              >
                                <span
                                  className="icon"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editInfo"
                                >
                                  <span class="feather-icon">
                                    <FeatherIcon icon="edit-2" />
                                  </span>
                                </span>
                              </button>
                            </div>
                            <div className="card-body">
                              <div className="modal-body">
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...firstName_validation}
                                      defaultValue={patient?.firstName}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...lastName_validation}
                                      defaultValue={patient?.lastName}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...midName_validation}
                                      defaultValue={patient?.midName}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="country"
                                      >
                                        Երկիր
                                      </label>
                                      {methods?.formState.errors.country && (
                                        <span className="error text-red">
                                          <img src={ErrorSvg} alt="errorSvg" />
                                          Պարտադիր
                                        </span>
                                      )}
                                    </div>
                                    <Controller
                                      name="country"
                                      control={methods.control}
                                      defaultValue={
                                        patient?.contact?.address?.country
                                      }
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <CountryDropdown
                                          {...field}
                                          classes="form-control"
                                          defaultOptionLabel="Երկիր"
                                          value={field.value}
                                          priorityOptions={["Armenia"]}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            setCountry(val);
                                            methods.trigger("country");
                                            methods.setValue("state",'')
                                            methods.trigger("state")
                                          }}
                                          style={{
                                            appearance: "auto",
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="state"
                                      >
                                        Մարզ
                                      </label>
                                      {methods?.formState.errors.state && (
                                        <span className="error text-red">
                                          <span>
                                            <img
                                              src={ErrorSvg}
                                              alt="errorSvg"
                                            />
                                          </span>
                                          պարտադիր
                                        </span>
                                      )}
                                    </div>
                                    <Controller
                                      name="state"
                                      control={methods.control}
                                      defaultValue={
                                        patient?.contact?.address?.state
                                      }
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <RegionDropdown
                                          {...field}
                                          classes="form-control"
                                          country={country}
                                          defaultOptionLabel="Մարզ"
                                          value={field.value}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            setRegion(val);
                                            trigger("state");
                                          }}
                                          style={{
                                            appearance: "auto",
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...city_validation}
                                      defaultValue={
                                        patient?.contact?.address?.city
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...street_validation}
                                      defaultValue={
                                        patient?.contact?.address?.street
                                      }
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...zipCode_validation}
                                      defaultValue={
                                        patient?.contact?.address?.zipCode
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...patientEmail_validation}
                                      defaultValue={patient?.contact?.email}
                                    />
                                  </div>
                                  <div className="col-sm-6 d-flex">
                                    <div className="col-sm-6">
                                      <div className="d-flex justify-content-between me-2">
                                        <label
                                          className="form-label"
                                          htmlFor="doctor"
                                        >
                                          Հեռախոս
                                        </label>
                                        {methods?.formState.errors.phone && (
                                          <span className="error text-red">
                                            <span>
                                              <img
                                                src={ErrorSvg}
                                                alt="errorSvg"
                                              />
                                            </span>
                                            պարտադիր
                                          </span>
                                        )}
                                      </div>
                                      <CustomPhoneComponent
                                        name="phone"
                                        control={methods.control}
                                        defaultValue={patient?.contact?.phone}
                                      />
                                    </div>
                                    {(patient?.contact?.addPhone ||
                                      additionalPhone) && (
                                      <>
                                        <div className="col-sm-6">
                                          <div className="d-flex justify-content-between me-2">
                                            <label
                                              className="form-label"
                                              htmlFor="addPhone"
                                            >
                                              Հեռախոս
                                            </label>
                                            {methods?.formState.errors
                                              .addPhone && (
                                              <span className="error text-red">
                                                <span>
                                                  <img
                                                    src={ErrorSvg}
                                                    alt="errorSvg"
                                                  />
                                                </span>
                                                պարտադիր
                                              </span>
                                            )}
                                          </div>
                                          <CustomPhoneComponent
                                            name="addPhone"
                                            control={methods.control}
                                            required={false}
                                            defaultValue={
                                              patient?.contact?.addPhone
                                            }
                                          />
                                        </div>
                                      </>
                                    )}
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        paddingTop: "41px",
                                      }}
                                    >
                                      {patient?.contact?.addPhone ||
                                      additionalPhone ? (
                                        <></>
                                      ) : (
                                        <FeatherIcon
                                          icon="plus-circle"
                                          width="35"
                                          onClick={(e) =>
                                            enableAdditionalPhone(e, true)
                                          }
                                          style={{ cursor: "pointer" }}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...passport_validation}
                                      defaultValue={patient?.contact?.passport}
                                    />
                                  </div>

                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-check-label"
                                        htmlFor="gender"
                                      >
                                        Սեռ
                                      </label>
                                      {methods.formState.errors.gender && (
                                        <span className="error text-red">
                                          <span>
                                            <img
                                              src={ErrorSvg}
                                              alt="errorSvg"
                                            />
                                          </span>{" "}
                                          պարտադիր
                                        </span>
                                      )}
                                    </div>
                                    <div className="d-flex  align-items-center">
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="male"
                                          value="Male"
                                          defaultChecked={
                                            patient?.gender === "Male"
                                          }
                                          onChange={() =>
                                            onGenderSelect("Male")
                                          }
                                          {...methods.register("gender", {
                                            required: true,
                                          })}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="male"
                                        >
                                          Արական
                                        </label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="female"
                                          value="Female"
                                          defaultChecked={
                                            patient?.gender === "Female"
                                          }
                                          onChange={() =>
                                            onGenderSelect("Female")
                                          }
                                          {...methods.register("gender", {
                                            required: true,
                                          })}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="female"
                                        >
                                          Իգական
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <div className="d-flex justify-content-between me-2">
                                        <label
                                          className="form-label"
                                          htmlFor="birthday"
                                        >
                                          Ծննդյան ամսաթիվ
                                        </label>
                                        {methods.formState.errors
                                          .dateOfBirth && (
                                          <span className="error text-red">
                                            <span>
                                              <img
                                                src={ErrorSvg}
                                                alt="errorSvg"
                                              />
                                            </span>{" "}
                                            պարտադիր
                                          </span>
                                        )}
                                      </div>
                                     { console.log(patient?.dateOfBirth)}
                                      <div>
                                        <CustomDateComponent
                                          name="dateOfBirth"
                                          control={methods.control}
                                          defaultValue={patient?.dateOfBirth.split('T')[0]
                                            // .split("-")
                                            // .reverse()
                                            // .join("-")
                                            // .toString()
                                          }
                                         // handleCheckIfChild={handleCheckIfChild}

                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="separator-full"></div>
                          {isChild &&
                          <>
                           <div className="card">
                           <div className="card-body">
                        <div className="modal-body">
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...respPersonFullName_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...respPersonPassport_validation} />
                            </div>
                          </div>
                          </div>
                          </div>
                          </div>
                            <div className="separator-full"></div>
                          </>
                          }
                          <div className="card">
                            <div className="card-header">
                              <a href="#">Հավելյալ տվյալներ</a>
                              <button
                                className="btn btn-xs btn-icon btn-rounded btn-light"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Edit"
                              >
                                <span
                                  class="icon"
                                  data-bs-toggle="modal"
                                  data-bs-target="#moreContact"
                                >
                                  <span class="feather-icon">
                                    <FeatherIcon icon="edit-2" />
                                  </span>
                                </span>
                              </button>
                            </div>
                            <div className="card-body" style={{ zIndex: "0" }}>
                              <div className="modal-body">
                                <form>
                                  <div className="row gx-12">
                                    <div className="col-sm-12">
                                      <Editor
                                        apiKey="wiejyphh2h0z879p5bvha1lqdfd0z7utg4rqsw6cyjhd28lx"
                                        onInit={(evt, editor) =>
                                          (editorRef.current = editor)
                                        }
                                        //initialValue="<p>This is the initial content of the editor.</p>"
                                        init={{
                                          height: 200,
                                          menubar: false,
                                          plugins: [
                                            "advlist autolink lists link image charmap print preview anchor",
                                            "searchreplace visualblocks code fullscreen",
                                            "insertdatetime media table paste code help wordcount",
                                          ],
                                          toolbar:
                                            "undo redo | formatselect | " +
                                            "bold italic backcolor | alignleft aligncenter " +
                                            "alignright alignjustify | bullist numlist outdent indent | " +
                                            "removeformat | help",
                                          content_style:
                                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="separator-full"></div>

                          <div className="modal-footer align-items-center">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setEditRow(false)}
                            >
                              Չեղարկել
                            </button>
                            <button
                              type="button"
                              onClick={onSubmit}
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                            >
                              Հաստատել
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </FormProvider>
            )}
          </Suspense>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PatientEditModal;
