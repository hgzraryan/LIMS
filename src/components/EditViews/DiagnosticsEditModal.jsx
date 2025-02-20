import React, { Suspense, useState, useEffect, useRef } from "react";
import { Form, FormProvider, useForm, Controller } from "react-hook-form";
import ErrorSvg from "../../dist/svg/error.svg";
import { Modal } from "react-bootstrap";
import { Input } from "../Input";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoadingSpinner from "../LoadingSpinner";
import { deleteNullProperties } from "../../utils/helper";

import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import {
  DIAGNOSTICS_URL,
  DOCTORS_URL,
  REFDOCTORS_URL,
} from "../../utils/constants";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuillEditor from "../ReactQuillEditor";

const diagnosticClassState = [
  { value: "External", label: "Արտաքին" },
  { value: "Internal", label: "Ներքին" },
  { value: "Other", label: "Այլ" },
];

function DiagnosticsEditModal({ diagnostics, setEditRow, refreshData }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [errMsg, setErrMsg] = useState("");
  const [refDoctors, setRefDoctors] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [additionalData, setAdditionalData] = useState(diagnostics?.additional)
  const methods = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const refDoctorsResp = await axiosPrivate.get(REFDOCTORS_URL);
        const refDoctorsData = refDoctorsResp?.data?.jsonString.map((el) => ({
          value: el.refDoctorsId,
          label: el.doctorName,
          id: el.refDoctorsId,
        }));
        setRefDoctors(refDoctorsData);

        const doctorsResp = await axiosPrivate.get(DOCTORS_URL);
        const doctorsData = doctorsResp?.data?.jsonString.map((el) => ({
          value: el.doctorId,
          label: el.doctorName,
          id: el.doctorId,
        }));
        setDoctors(doctorsData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    fetchData();
  }, [axiosPrivate, navigate, location]);

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

  const onSubmit = methods.handleSubmit(async ({ refDoctor, doctor }) => {

    const updatedDiagnostics = {
      refDoctor:refDoctor?.value !== diagnostics?.refDoctor ? refDoctor?.value : null,
      doctors: doctor?.value !== diagnostics?.doctor ? doctor?.value : null,
      additional:additionalData !==
        diagnostics?.additional?.trim()
          ? additionalData
          : null,
    };
    const updatedFields = deleteNullProperties(updatedDiagnostics);
    try {
      await axiosPrivate.put(
        DIAGNOSTICS_URL,
        { updatedFields, id: diagnostics.diagnosticsId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setEditRow(false);
      refreshData();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Update Failed");
      }
    }
  });

  return (
    <Modal show={() => true} size="xl" onHide={() => setEditRow(false)}>
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Թարմացնել ախտորոշման տվյալները
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
                            <a href="#">Ախտորոշման տվյալներ</a>
                            <button
                              className="btn btn-xs btn-icon btn-rounded btn-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Edit"
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
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="refDoctor"
                                      placeholder={"Ընտրել"}
                                    >
                                      Ուղղորդող բժիշկներ
                                    </label>
                                    {methods.formState.errors.refDoctor && (
                                      <span className="error text-red">
                                        <span>
                                          <img src={ErrorSvg} alt="errorSvg" />
                                        </span>{" "}
                                        պարտադիր
                                      </span>
                                    )}
                                  </div>
                                  <div className="form-control">
                                    <Controller
                                      name="refDoctor"
                                      control={methods.control}
                                      defaultValue={refDoctors.find(
                                        (option) =>
                                          option.value ===
                                          diagnostics?.refDoctor
                                      )}
                                      rules={{ required: false }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          options={refDoctors}
                                          placeholder={"Ընտրել"}
                                          value={field.value}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="doctor"
                                      placeholder={"Ընտրել"}
                                    >
                                      Բժիշկներ
                                    </label>
                                    {methods.formState.errors.doctor && (
                                      <span className="error text-red">
                                        <span>
                                          <img src={ErrorSvg} alt="errorSvg" />
                                        </span>{" "}
                                        պարտադիր
                                      </span>
                                    )}
                                  </div>

                                  <div className="form-control">
                                    <Controller
                                      name="doctor"
                                      control={methods.control}
                                      isClearable={true}
                                      defaultValue={doctors.find(
                                        (option) =>
                                          option.value ===
                                          diagnostics?.doctors[0]
                                      )}
                                      rules={{ required: false }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          options={doctors}
                                          placeholder={"Ընտրել"}
                                          value={field.value}
                                        />
                                      )}
                                    />
                                  </div>
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
                          <div className="card-body" style={{ zIndex: "0" }}>
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
  );
}

export default DiagnosticsEditModal;
