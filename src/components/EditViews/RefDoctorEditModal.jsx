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
  city_validation,
  email_validation,
  fullName_validation,
  medInstitution_validation,
  street_validation,
  zipCode_validation,
} from "../../utils/inputValidations";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import CustomPhoneComponent from "../CustomPhoneComponent";
import ReactQuillEditor from "../ReactQuillEditor";
import { REFDOCTORS_URL } from "../../utils/constants";
import { deleteNullProperties } from "../../utils/helper";
function RefDoctorEditModal({ refDoctor, setEditRow, refreshData }) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const { trigger } = useForm();
  const [additionalData, setAdditionalData] = useState(refDoctor.additional)

  const methods = useForm({
    mode: "onChange",
  });
  useEffect(() => {
    if (CountryRegionData[11][0] === "Armenia") {
      CountryRegionData[11][0] = "Հայաստան";
      CountryRegionData[11][2] =
        "Արագածոտն~AG|Արարատ~AR|Արմավիր~AV|Գեղարքունիք~GR|Կոտայք~KT|Լոռի~LO|Շիրակ~SH|Սյունիք~SU|Տավուշ~TV|Վայոց Ձոր~VD|Երևան~ER";
    }
    setCountry(refDoctor?.contact?.address?.country);
  }, []);
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
      fullName,
      medInstitution,
      email,
      country,
      state,
      street,
      city,
      zipCode,
      phone,
    }) => {
      const updatedRefDoctor = {
        doctorName:
          fullName?.trim() !== refDoctor?.doctorName?.trim() ? fullName : null,
        medInstitution:
          medInstitution?.trim() !== refDoctor?.medInstitution.trim()
            ? medInstitution
            : null,
        contact: {
          email:
            email?.trim() !== refDoctor?.contact?.email?.trim() ? email : null,
          phone:
            phone?.trim() !== refDoctor?.contact?.phone?.trim() ? phone : null,
          address: {
            street:
              street?.trim() !== refDoctor?.contact?.address?.street?.trim()
                ? street
                : null,
            city:
              city?.trim() !== refDoctor?.contact?.address?.city?.trim()
                ? city
                : null,
            state:
              state?.trim() !== refDoctor?.contact?.address?.state?.trim()
                ? state
                : null,
            country:
              country?.trim() !== refDoctor?.contact?.address?.country?.trim()
                ? country
                : null,
            zipCode:
              zipCode?.trim() !== refDoctor?.contact?.address?.zipCode?.trim()
                ? zipCode
                : null,
          },
        },
        //timestamps:'',
        additional: additionalData!==refDoctor?.additional?.trim()?additionalData:null,
      };
      const updatedFields = deleteNullProperties(updatedRefDoctor);
      console.log(updatedRefDoctor);
      try {
        await axiosPrivate.put(
          REFDOCTORS_URL,
          { updatedFields, id: refDoctor.refDoctorsId },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        setEditRow(false);
        refreshData();
        //notify(`${newRefDoctor.doctorName} ուղղորդող բժիշկը ավելացված է`);
      } catch (err) {
        //    if (!err?.response) {
        //      setErrMsg("No Server Response");
        //    } else {
        //      setErrMsg(" Failed");
        //    }
      }
    }
  );
  return (
    <>
      <Modal show={() => true} size="xl" onHide={() => setEditRow(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Թարմացնել ուղղորդող բժշկի տվյալները
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
                          <div className="card">
                            <div className="card-header">
                              <a href="#">Բժշկի տվյալներ</a>
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
                                  <span className="feather-icon">
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
                                      defaultValue={refDoctor?.doctorName}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...email_validation}
                                      defaultValue={refDoctor?.contact?.email}
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="phone"
                                      >
                                        Լրացուցիչ կոնտակտի հեռախոս
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
                                      defaultValue={refDoctor?.contact?.phone}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...medInstitution_validation}
                                      defaultValue={refDoctor?.medInstitution}
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
                                        refDoctor?.contact?.address?.country
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
                                        refDoctor?.contact?.address?.state
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
                                        refDoctor?.contact?.address?.city
                                      }
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <Input
                                      {...street_validation}
                                      defaultValue={
                                        refDoctor?.contact?.address?.street
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="row gx-3">
                                  <div className="col-sm-6">
                                    <Input
                                      {...zipCode_validation}
                                      defaultValue={
                                        refDoctor?.contact?.address?.zipCode
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                           <div className="separator-full"></div>
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
                              className="icon"
                              data-bs-toggle="modal"
                              data-bs-target="#moreContact"
                            >
                              <span className="feather-icon">
                                <FeatherIcon icon="edit-2" />
                              </span>
                            </span>
                          </button>
                        </div>
                        <div className="card-body" style={{zIndex:'0'}}>
                          <div className="modal-body">
                            <form>
                              <div className="row gx-12">
                                   <div className="col-sm-12">
                                   <ReactQuillEditor
                                      value={additionalData}
                                      onChange={setAdditionalData}
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

export default RefDoctorEditModal;
