import React, { Suspense, useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Form, FormProvider, useForm, Controller } from "react-hook-form";
import { Input } from "../Input";
import { toast } from "react-toastify";
import ErrorSvg from "../../dist/svg/error.svg";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  additional_validation,
  city_validation,
  email_validation,
  emergencyContactName_validation,
  fullName_validation,
  licenseNumber_validation,
  password_validation,
  qualification_validation,
  specialty_validation,
  street_validation,
  user_validation,
  zipCode_validation,
} from "../../utils/inputValidations";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import CustomPhoneComponent from "../CustomPhoneComponent";
import CustomDateComponent from "../CustomDateComponent";
import { deleteNullProperties } from "../../utils/helper";
import { DOCTORS_URL } from "../../utils/constants";
function DoctorEditModal({ doctor, setEditRow, refreshData }) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");
  const [isActive, setIsActive] = useState("");
  const [merried, setMerried] = useState("");

  const { trigger } = useForm();
  const methods = useForm({
    mode: "onChange",
  });
  const onGenderSelect = (value) => {
    setGender(value);
    trigger("gender");
  };
  const onDoctorStateSelect = (value) => {
    console.log(value);
    setIsActive(value);
  };
  const onDoctorMerriedSelect = (event) => {
    setMerried((prev) => event.target.value);
  };
  useEffect(() => {
    if (CountryRegionData[11][0] === "Armenia") {
      CountryRegionData[11][0] = "Հայաստան";
      CountryRegionData[11][2] =
        "Արագածոտն~AG|Արարատ~AR|Արմավիր~AV|Գեղարքունիք~GR|Կոտայք~KT|Լոռի~LO|Շիրակ~SH|Սյունիք~SU|Տավուշ~TV|Վայոց Ձոր~VD|Երևան~ER";
    }
    setCountry(doctor?.contact?.address?.country);
  }, []);
  const onSubmit = methods.handleSubmit(
    async ({
      fullName,
      email,
      street,
      city,
      state,
      country,
      zipCode,
      specialty,
      qualification,
      licenseNumber,
      emergencyContactName,
      emergencyContactNumber,
      gender,
      phone,
      dateOfBirth,
      maritalStatus,
      additional,
      user,
      password,
      isActive,
    }) => {
      const newDateOfBirthString = dateOfBirth
        ? new Date(
            dateOfBirth.getTime() - dateOfBirth.getTimezoneOffset() * 60000
          )
            .toISOString()
            .split("T")[0]
        : null;
      const updatedDoctor = {
        doctorName:
          fullName?.trim() !== doctor?.doctorName?.trim() ? fullName : null,
        gender: gender?.trim() !== doctor?.gender?.trim() ? gender : null,
        contact: {
          email:
            email?.trim() !== doctor?.contact?.email?.trim() ? email : null,
          phone:
            phone?.trim() !== doctor?.contact?.phone?.trim() ? phone : null,
          address: {
            street:
              street?.trim() !== doctor?.contact?.address?.street?.trim()
                ? street
                : null,
            city:
              city?.trim() !== doctor?.contact?.address?.city?.trim()
                ? city
                : null,
            state:
              state?.trim() !== doctor?.contact?.address?.state?.trim()
                ? state
                : null,
            country:
              country?.trim() !== doctor?.contact?.address?.country?.trim()
                ? country
                : null,
            zipCode:
              zipCode?.trim() !== doctor?.contact?.address?.zipCode?.trim()
                ? zipCode
                : null,
          },
        },
        dateOfBirth:
          doctor.dateOfBirth.split("T")[0] !== newDateOfBirthString
            ? newDateOfBirthString
            : null,
        // username:user?.trim()!==doctor?.user?.trim()?user:null,
        // password:password?.trim()!==doctor?.password?.trim()?password:null,
        specialty:
          specialty?.trim() !== doctor?.specialty?.trim() ? specialty : null,
        qualification:
          qualification?.trim() !== doctor?.qualification?.trim()
            ? qualification
            : null,
        licenseNumber:
          licenseNumber?.trim() !== doctor?.licenseNumber?.trim()
            ? licenseNumber
            : null,
        maritalStatus:
          maritalStatus?.trim() !== doctor?.maritalStatus?.trim()
            ? maritalStatus
            : null,
        emergencyContactName:
          emergencyContactName?.trim() !== doctor?.emergencyContactName?.trim()
            ? emergencyContactName
            : null,
        emergencyContactNumber:
          emergencyContactNumber?.trim() !==
          doctor?.emergencyContactNumber?.trim()
            ? emergencyContactNumber
            : null,
        //profilePictureUrl: "profilePictureUrl",
        //isActive: !!isActive?.trim()!==!!doctor?.isActive?isActive:null,
      };
      const updatedFields = deleteNullProperties(updatedDoctor);

      console.log(additional);
      //   formData.append("text", JSON.stringify(newDoctor));
      //   formData.append("image", image);
      try {
        await axiosPrivate.put(
          DOCTORS_URL,
          { ...updatedFields, id: doctor.doctorId },
          {
            headers: { "Content-Type": "application/json" },
            // headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        setEditRow(false);
        refreshData();
        // notify(`${newDoctor.doctorName}  Բժիշկը ավելացված է`)
      } catch (err) {
        console.log(err);
        //   if (!err?.response) {
        //     setErrMsg("No Server Response");
        //   } else if (err.response?.status === 409) {
        //     setErrMsg("Username Taken");
        //   } else {
        //     setErrMsg(" Failed");
        //   }
      }
    }
  );
  return (
    <>
      <Modal show={() => true} size="xl" onHide={() => setEditRow(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Թարմացնել բժշկի տվյալները
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
                          onSubmit={(e) => e.preventDefault()}
                          noValidate
                          autoComplete="off"
                          className="container"
                        >
                          {/* <div className="text-center mt-5">
                            <div className="dropify-circle edit-img">
                              <img
                                width={"100px"}
                                height={"100px"}
                                style={{
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                }}
                                onClick={() => intupAvatarRef.current.click()}
                                src={imageUrl}
                                className="avatar_upload_preview"
                                alt="preview"
                                onDrop={handleDrop}
                                onDragEnter={handleDragEmpty}
                                onDragOver={handleDragEmpty}
                              />
                              <input
                                hidden
                                type="file"
                                ref={intupAvatarRef}
                                onChange={handleChangeFile}
                                className="dropify-1"
                                //data-default-file="dist/img/avatar2.jpg"
                              />
                            </div>
                            <div className="cp-name text-truncate mt-3">
                              Բժշկի նկարը
                            </div>
      
                            <div
                              className="rating rating-yellow my-rating-4"
                              data-rating="3"
                            ></div>
                            <p>&nbsp;</p>
                          </div> */}

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
                                      {...fullName_validation}
                                      defaultValue={doctor?.doctorName}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...specialty_validation}
                                      defaultValue={doctor?.specialty}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...qualification_validation}
                                      defaultValue={doctor?.qualification}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...licenseNumber_validation}
                                      defaultValue={doctor?.licenseNumber}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
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
                                        doctor?.contact?.address?.country
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
                                            trigger("country");
                                          }}
                                          style={{
                                            appearance: "auto",
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
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
                                        doctor?.contact?.address?.state
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
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...city_validation}
                                      defaultValue={
                                        doctor?.contact?.address?.city
                                      }
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...street_validation}
                                      defaultValue={
                                        doctor?.contact?.address?.street
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...zipCode_validation}
                                      defaultValue={
                                        doctor?.contact?.address?.zipCode
                                      }
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...additional_validation}
                                      defaultValue={doctor?.contact?.additional}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...email_validation}
                                      defaultValue={doctor?.contact?.email}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="phoneNumber"
                                      >
                                        Հեռախոս
                                      </label>
                                      {methods.formState.errors.phone && (
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
                                    <CustomPhoneComponent
                                      name="phone"
                                      control={methods.control}
                                      defaultValue={doctor?.contact?.phone}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
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
                                            doctor?.gender === "Male"
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
                                            doctor?.gender === "Female"
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

                                  {/* <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                    <label className="form-check-label" htmlFor="male">
                                    Կարգավիճակ
                                    </label>
                                      {methods.formState.errors.isActive && (
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
                                          id="isActive"
                                          value="Ակտիվ" // Set value as string
                                          defaultChecked={doctor?.isActive === 1} // Use checked instead of defaultChecked
                                          onChange={() => onDoctorStateSelect("Ակտիվ")}
                                          {...methods.register("isActive", {
                                            required: true,
                                          })}
                                        />
                                        
                                        <label
                                          className="form-check-label"
                                          htmlFor="notActive"
                                        >
                                          Ակտիվ
                                        </label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                      <input
                                          className="form-check-input"
                                          type="radio"
                                          id="isActive"
                                          value="Ոչ Ակտիվ" // Set value as string
                                          defaultChecked={doctor?.isActive === 0} // Use checked instead of defaultChecked
                                          onChange={() => onDoctorStateSelect("Ոչ Ակտիվ")}
                                          {...methods.register("isActive", {
                                            required: true,
                                          })}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="female"
                                        >
                                          Ոչ ակտիվ
                                        </label>
                                      </div>
                                    </div>
                                  </div> */}

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
                                      <div>
                                        <CustomDateComponent
                                          name="dateOfBirth"
                                          control={methods.control}
                                          defaultValue={doctor?.dateOfBirth
                                            .split("T")[0]
                                            .split("-")
                                            .join("-")
                                            .toString()}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="mb-2">
                                      <div className="d-flex justify-content-between me-2">
                                        <label
                                          className="form-check-label"
                                          htmlFor="male"
                                        >
                                          Ընտանեկան կարգավիճակ
                                        </label>
                                        {methods.formState.errors
                                          .maritalStatus && (
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
                                    </div>
                                    <div className="d-flex  align-items-center">
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="married"
                                          value="married"
                                          defaultChecked={
                                            doctor?.maritalStatus === "married"
                                          }
                                          onChange={() =>
                                            onDoctorMerriedSelect("married")
                                          }
                                          {...methods.register(
                                            "maritalStatus",
                                            {
                                              required: true,
                                            }
                                          )}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="married"
                                        >
                                          Ամուսնացած
                                        </label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          id="single"
                                          value="single"
                                          defaultChecked={
                                            doctor?.maritalStatus === "single"
                                          }
                                          onChange={() =>
                                            onDoctorMerriedSelect("single")
                                          }
                                          {...methods.register(
                                            "maritalStatus",
                                            {
                                              required: true,
                                            }
                                          )}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="single"
                                        >
                                          Չամուսնացած
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...emergencyContactName_validation}
                                      defaultValue={
                                        doctor?.emergencyContactName
                                      }
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="phoneNumber"
                                      >
                                        Լրացուցիչ կոնտակտի հեռախոս
                                      </label>
                                      {methods.formState.errors
                                        .emergencyContactNumber && (
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
                                    <CustomPhoneComponent
                                      name="emergencyContactNumber"
                                      control={methods.control}
                                      defaultValue={
                                        doctor?.emergencyContactNumber
                                      }
                                    />
                                  </div>
                                </div>
                                {/* <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input {...user_validation} />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input {...password_validation} />
                                  </div>
                                </div> */}
                              </div>
                            </div>
                          </div>
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
                              Ավելացնել
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

export default DoctorEditModal;
