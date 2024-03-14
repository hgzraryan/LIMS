import React, { Suspense, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormProvider, useForm, Controller } from "react-hook-form";
import { Input } from "../Input";
import { name_validation } from "../../utils/inputValidations";
import useSubmitForm from "../../hooks/useSubmitForm";
import {
  AGENTS_URL,
  ORGANIZATIONS_URL,
  PATIENTS_URL,
  REGISTER_DIAGNOSTICS,
  RESEARCHLISTS_URL,
} from "../../utils/constants";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Select from "react-select";
import ErrorSvg from "../../dist/svg/error.svg";
import makeAnimated from "react-select/animated";
import LoadingSpinner from "../LoadingSpinner";

const diagnosticClassState = [
  { value: "External", label: "Արտաքին" },
  { value: "Internal", label: "Ներքին" },
  { value: "Other", label: "Այլ" },
];
const diagnosticStatus = [
  { value: "Received", label: "Ընդունված" },
  { value: "Delayed", label: "Հետաձգված" },
  { value: "Pending", label: "Ընթացքում" },
  { value: "Other", label: "այլ" },
];

function AddDiagnostic({
  handleToggleCreateModal,
  getDiagnostics,
  researchesState,
  doctors,
}) {
  const axiosPrivate = useAxiosPrivate();
  const [errMsg, setErrMsg] = useState("");
  const multiselectRef = useRef("");
  const editorRef = useRef(null);
  const [researchId, setResearchId] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [clientType, setClientType] = useState(null);
  const additionalData = useRef("");
  const diagnosticClassRef = useRef("");
  const [externalType, setExternalType] = useState(false);
  const [researchesIds, setResearchesIds] = useState([]);
  const [partnerName, setPartnerName] = useState("");
  const [diagnosticsType, setDiagnosticsType] = useState(null);
  const [intDiagnosticsStatus, setIntDiagnosticsStatus] = useState(null);
  const [extDiagnosticsStatus, setExtDiagnosticsStatus] = useState(null);
  const [doctor, setDoctor] = useState("");
  // const [ptient, setPatient] = useState([{label: 'Առանց այցելու',value:""}]);
  const [patients, setPatients] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [agents, setAgents] = useState([]);
  const [researches, setResearches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //   const handleChange = (selectedOption) => {
  //     setPatients(selectedOption);
  // };
  const animatedComponents = makeAnimated();
  const colourStyles = {
    control: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: "#fff",
      borderColor: isFocused ? "#fff" : "#e8e3e3",
      boxShadow: "#e8e3e3",
      ":hover": {
        borderColor: "#fff",
      },
    }),

    multiValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#4eafcb",
      color: "#000",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#4eafcb",
      color: "#e8e3e3",
      ":hover": {
        backgroundColor: "#4eafcb",
        color: "#eb3434",
      },
    }),
  };

  const methods = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setTimeout(() => {
      axiosPrivate
        .get(PATIENTS_URL)
        .then((resp) => {
          setPatients(resp?.data?.jsonString);
          setIsLoading(false);
        })
        .then((resp) => {
          axiosPrivate.get(ORGANIZATIONS_URL).then((resp) => {
            setOrganizations(resp?.data?.jsonString);
            setIsLoading(false);
          });
        })
        .then((resp) => {
          axiosPrivate.get(AGENTS_URL).then((resp) => {
            setAgents(resp?.data?.jsonString);
            setIsLoading(false);
          });
        })
        .then((resp) => {
          axiosPrivate.get(RESEARCHLISTS_URL).then((resp) => {
            setResearches(resp?.data?.jsonString);
            setIsLoading(false);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }, []);

  const onDoctorSelect = (data) => {
    setDoctor((prev) => data.label);
  };
  const onDiagnosticClassSelect = (data) => {
    console.log(data);
    switch (data.value) {
      case "External":
        setDiagnosticsType(data.value);
        setExternalType(true);
        break;
      case "Internal":
        setDiagnosticsType(data.value);
        setExternalType(false);
        break;
      case "Other":
        setDiagnosticsType(data.value);
        setExternalType(false);
        break;
      default:
        break;
    }
  };
  const onInternalDiagnosticStatusSelect = (data) => {
    switch (data.value) {
      case "Ընդունված":
        setIntDiagnosticsStatus("Approval");
        break;
      case "Հետաձգված":
        setIntDiagnosticsStatus("Delayed");
        break;
      case "Ընթացքում":
        setIntDiagnosticsStatus("Generated");
        break;
      case "այլ":
        setIntDiagnosticsStatus("Other");
        break;
      default:
        break;
    }
  };
  const onExternalDiagnosticStatusSelect = (data) => {
    switch (data[0].status) {
      case "Ընդունված":
        setExtDiagnosticsStatus("Approval");
        break;
      case "Հետաձգված":
        setExtDiagnosticsStatus("Delayed");
        break;
      case "Ընթացքում":
        setExtDiagnosticsStatus("Generated");
        break;
      case "այլ":
        setExtDiagnosticsStatus("Other");
        break;
      default:
        break;
    }
  };
  const onPartnerSelect = (data) => {
    setPartnerName(data.value);
  };
  const onOrganizationSelect = (data) => {
    data.label === "Առանց Պատվիրատու"
      ? (() => {
          setOrganizationId(false);
        })()
      : (() => {
          setOrganizationId(data.value);
          setClientType("organization");
        })();
  };
  const onPatientSelect = (data) => {
    data.label === "Առանց այցելու"
      ? (() => {
          setPatientId(false);
        })()
      : (() => {
          setPatientId(data.value);
          setClientType("patient");
        })();
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

  const onSubmit = methods.handleSubmit(async (data) => {
    const newDiagnose = {
      diagnosticsName: data.name,
      class: data.diagnosticsType,
      internalStatus: data.internalDiagnosticsStatus || null,
      externalStatus: data.externalDiagnosticsStatus || null,
      researchIds: data?.research.map((el) => el.value),
      clientId: patientId || organizationId,
      clientType: clientType,
      doctors: data.doctor,
      partner: partnerName,
      additional: editorRef.current.getContent({ format: "text" }),
    };

    //console.log(newDiagnose);
    try {
      await axiosPrivate.post(REGISTER_DIAGNOSTICS, newDiagnose, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      handleToggleCreateModal(false);
      getDiagnostics();
      notify(
        `${newDiagnose.diagnosticsName} Ախտորոշումը ավելացված է`
      );
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg(" Failed");
      }
    }
  });
  // const { onSubmit, methods } = useSubmitForm(
  //   REGISTER_DIAGNOSTICS,
  //   editorRef,
  //   getDiagnostics,
  //   setErrMsg,
  //   handleToggleCreateModal,
  //   additionalData
  // );
  return (
    <Modal
      show={() => true}
      size="xl"
      onHide={() => handleToggleCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ավելացնել նոր ախտորոշում
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
                                  <Input {...name_validation} />
                                </div>
                                <div className="col-sm-6">
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="diagnosticsType"
                                    >
                                      Ախտորոշման տեսակ
                                    </label>
                                    {methods.formState.errors
                                      .diagnosticsType && (
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
                                      name="diagnosticsType"
                                      control={methods.control}
                                      defaultValue={null}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          onChange={(val) => {
                                            field.onChange(val.value);
                                            onDiagnosticClassSelect(val);
                                          }}
                                          value={diagnosticClassState.find(
                                            (option) =>
                                              option.value === diagnosticsType
                                          )}
                                          options={diagnosticClassState}
                                          placeholder={"Ընտրել"}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row gx-3">
                                {!externalType ? (
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="internalDiagnosticsStatus"
                                      >
                                        Ներքին ախտորոշման կարգավիճակ
                                      </label>
                                      {methods.formState.errors
                                        .internalDiagnosticsStatus && (
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
                                    <div className="form-control">
                                      <Controller
                                        name="internalDiagnosticsStatus"
                                        control={methods.control}
                                        defaultValue={null}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                          <Select
                                            {...field}
                                            onChange={(val) => {
                                              field.onChange(val.value);
                                              onInternalDiagnosticStatusSelect(
                                                val
                                              );
                                            }}
                                            value={diagnosticStatus.find(
                                              (option) =>
                                                option.value ===
                                                intDiagnosticsStatus
                                            )}
                                            options={diagnosticStatus}
                                            placeholder={"Ընտրել"}
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="externalDiagnosticsStatus"
                                      >
                                        Արտաքին ախտորոշման կարգավիճակ
                                      </label>
                                      {methods.formState.errors
                                        .externalDiagnosticsStatus && (
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
                                    <div className="form-control">
                                      <Controller
                                        name="externalDiagnosticsStatus"
                                        control={methods.control}
                                        defaultValue={null}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                          <Select
                                            {...field}
                                            onChange={(val) => {
                                              field.onChange(val.value);
                                              onExternalDiagnosticStatusSelect(
                                                val
                                              );
                                            }}
                                            value={diagnosticStatus.find(
                                              (option) =>
                                                option.value ===
                                                extDiagnosticsStatus
                                            )}
                                            placeholder={"Ընտրել"}
                                            options={diagnosticStatus}
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>
                                )}
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
                                      defaultValue={null}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          onChange={(val) => {
                                            field.onChange(val.value);
                                            onDoctorSelect(val);
                                          }}
                                          value={doctors.find(
                                            (option) => option.value === doctor
                                          )}
                                          options={[
                                            { value: 0, label: "Առանց բժիշկ" },
                                            ...doctors.map((item) => ({
                                              value: item.doctorName,
                                              label: item.doctorName,
                                              id: item.doctorId,
                                            })),
                                          ]}
                                          placeholder={"Ընտրել"}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row gx-3">
                                <div className="col-sm-6">
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="patient"
                                    >
                                      Այցելուներ
                                    </label>
                                    {methods.formState.errors.patient && (
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
                                      name="patient"
                                      control={methods.control}
                                      isClearable={true}
                                      defaultValue={null}
                                      // rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          onChange={(val) => {
                                            field.onChange(
                                              val ? val.value : null
                                            ); // Ensure you pass null when no patient is selected
                                            onPatientSelect(val);
                                          }}
                                          value={patients.find(
                                            (option) =>
                                              option.value === patientId
                                          )}
                                          options={[
                                            {
                                              value: 0,
                                              label: "Առանց այցելու",
                                            },
                                            ...patients.map((patient) => ({
                                              value: patient.patientId,
                                              label: `${patient?.patientId}․  ${patient?.lastName} ${patient?.firstName} ${patient?.midName}`,
                                            })),
                                          ]}
                                          isDisabled={organizationId}
                                          placeholder={"Ընտրել"}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="partner"
                                    >
                                      Պատվիրատու
                                    </label>
                                    {methods.formState.errors.organizations && (
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
                                      name="organizations"
                                      control={methods.control}
                                      defaultValue={null}
                                      // rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          isClearable={true}
                                          onChange={(val) => {
                                            field.onChange(val.value);
                                            onOrganizationSelect(val);
                                          }}
                                          value={organizations.find(
                                            (option) =>
                                              option.value === organizationId
                                          )}
                                          options={[
                                            {
                                              value: 0,
                                              label: "Առանց պատվիրատու",
                                            },
                                            ...organizations.map((item) => ({
                                              value: item.organizationId,
                                              label: `${item?.organizationId}․  ${item?.name}`,
                                            })),
                                          ]}
                                          placeholder={"Ընտրել"}
                                          isDisabled={patientId}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row gx-3">
                                {externalType && (
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="partner"
                                      >
                                        Գործընկեր
                                      </label>
                                      {methods.formState.errors.partner && (
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
                                    <div className="form-control">
                                      <Controller
                                        name="partner"
                                        control={methods.control}
                                        defaultValue={null}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                          <Select
                                            {...field}
                                            onChange={(val) => {
                                              field.onChange(val.value);
                                              onPartnerSelect(val);
                                            }}
                                            value={agents.find(
                                              (option) =>
                                                option.value === partnerName
                                            )}
                                            options={agents.map((agent) => ({
                                              value: agent.agentId,
                                              label: `${agent?.agentId}․  ${agent?.name}`,
                                            }))}
                                            placeholder={"Ընտրել"}
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="row gx-3">
                                <div className="col-sm-12">
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="research"
                                      placeholder={"Ընտրել"}
                                    >
                                      Ընտրել հետազոտություն
                                    </label>
                                    {methods.formState.errors.research && (
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
                                      name="research"
                                      control={methods.control}
                                      isClearable={true}
                                      defaultValue={null}
                                      // rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          isMulti
                                          closeMenuOnSelect={false}
                                          components={animatedComponents}
                                          options={researchesState.map((res) => ({
                                            value: res.agentId,
                                            label: `${res?.researchName}`,
                                          }))}
                                          styles={colourStyles}
                                          placeholder={"Հետազոտություններ"}
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
                            onClick={() => handleToggleCreateModal(false)}
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
  );
}

export default AddDiagnostic;
