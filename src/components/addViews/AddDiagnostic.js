import React, { Suspense, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormProvider, useForm, Controller } from "react-hook-form";
import { Input } from "../Input";
import { diagName_validation } from "../../utils/inputValidations";
import {
  AGENTS_URL,
  ORGANIZATIONS_URL,
  PACKAGES_URL,
  PATIENTS_URL,
  REFDOCTORS_URL,
  REGISTER_DIAGNOSTICS,
  RESEARCHLISTS_URL,
} from "../../utils/constants";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Select from "react-select";
import ErrorSvg from "../../dist/svg/error.svg";
import makeAnimated from "react-select/animated";
import LoadingSpinner from "../LoadingSpinner";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteNullProperties } from "../../utils/helper";

const diagnosticClassState = [
  { value: "External", label: "Արտաքին" },
  { value: "Internal", label: "Ներքին" },
  { value: "Other", label: "Այլ" },
];
const biomassType = [
  { value: "Internal", label: "Ներքին" },
  { value: "Delivered", label: "Առաքումով" },
];
const diagnosticStatus = [
  { value: "Approval", label: "Ընդունված" },
  { value: "Delayed", label: "Հետաձգված" },
  { value: "Generated", label: "Ստեղծված" },
  { value: "Other", label: "Այլ" },
];
const customPackageData = [
  {
    packageId:123,
    localCode:45678,
    name:'Բիլիռուբին',
    price:37000,
    researches:[30345,30741]

  },
  {
    packageId:124,
    localCode:45679,
    name:'Որովայն',
    price:42000,
    researches:[30340,30341]
  },
]
function AddDiagnostic({
  handleToggleCreateModal,
  refreshData,
  doctors,
}) {
  const navigate = useNavigate()
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [errMsg, setErrMsg] = useState("");
  const editorRef = useRef(null);
  const [patientId, setPatientId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [clientType, setClientType] = useState(null);
  const [externalType, setExternalType] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [diagnosticsType, setDiagnosticsType] = useState(null);
  const [patients, setPatients] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [agents, setAgents] = useState([]);
  const [researches, setResearches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refDoctors, setRefDoctors] = useState([])
  const [packages, setPackages] = useState([])

  const [researchesPrice, setResearchesPrice] = useState(0);
  const [packagesPrice, setPackagesPrice] = useState(0);

  const onPackageSelect = (data) => {
    const calcPrice = data.reduce((acc,el)=>{
      return acc+=el.price
    },0)
    setPackagesPrice(calcPrice)

  };
const onResearchSelect = (data) => {
    const calcPrice = data.reduce((acc,el)=>{
      return acc+=el.price
    },0)
    setResearchesPrice(calcPrice)

  };

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
        .then((resp) => {
          axiosPrivate.get(REFDOCTORS_URL).then((resp) => {
            setRefDoctors(resp?.data?.jsonString);
            setIsLoading(false);
          });
        })
        .then((resp) => {
          axiosPrivate.get(PACKAGES_URL).then((resp) => {
            setPackages(resp?.data?.jsonString);
            setIsLoading(false);
          });
        })
        .catch((err) => {
          console.log(err);
          navigate("/login", { state: { from: location }, replace: true });

        });
    }, 500);
  }, []);
  const onDiagnosticClassSelect = (data) => {
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
      diagnosticsName: data?.diagName,
      class: data?.diagnosticsType,
      internalStatus: data?.internalDiagnosticsStatus?.value || null,
      externalStatus: data?.externalDiagnosticsStatus?.value || null,
      researchList: data?.research.map((el) => el.value),
      clientId: data?.patient || data?.organizations,
      clientType: data?.organization?"organization":data?.patient?"patient":'none',
      orgPatientId:data?.organization ? data?.patient : null,
      doctors: data?.doctor?.id,
      biomassType:data?.biomassType?.value,
      partner: partnerName || null,
      refDoctor:+data.refDoctor?.id || null,
      additional: editorRef.current.getContent({ format: "text" }),
      // packages:data?.package.map((el) => el.value)
    };

    console.log(newDiagnose);
    const updatedData = deleteNullProperties(newDiagnose)

    try {
      await axiosPrivate.post(REGISTER_DIAGNOSTICS, updatedData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      handleToggleCreateModal(false);
      refreshData();
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
                                  <Input {...diagName_validation} />
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
                                            options={diagnosticStatus}
                                            placeholder={"Ընտրել"}
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <>
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
                                            placeholder={"Ընտրել"}
                                            options={diagnosticStatus}
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
                                    </>
                                )}
                               
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
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          onChange={(val) => {
                                            field.onChange(
                                              val ? val.value : null
                                            ); // Ensure you pass null when no patient is selected
                                            //onPatientSelect(val);
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
                                      htmlFor="organizations"
                                    >
                                      Պատվիրատու
                                    </label>
                                    {methods.formState.errors.organization && (
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
                                      name="organization"
                                      control={methods.control}
                                      defaultValue={null}
                                      // rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          // isClearable={true}
                                          onChange={(val) => {
                                            field.onChange(val.value);
                                            //onOrganizationSelect(val);
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
                                          // isDisabled={patientId}
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
                                          // onChange={(val) => {
                                          //   field.onChange(val.id);
                                          //   onDoctorSelect(val);
                                          // }}
                                          // value={doctors.find(
                                          //   (option) => option.value === doctor
                                          // )}
                                          options={[
                                            { value: 0, label: "Առանց բժիշկ",id:null },
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
                                 <div className="col-sm-6">
                                   <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="doctor"
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
                                      isClearable={true}
                                      defaultValue={null}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                   <Select
                                    {...field}
                                    // onChange={(val) => {
                                    //   field.onChange(val.id);
                                    //   onRefDoctorSelect(val);
                                    // }}
                                    // value={refDoctors?.find(
                                    //   (option) => option.value === refDoctor
                                    // )}
                                    options={[
                                      { value: 0, label: "Առանց ուղղորդող բժիշկ" },
                                      ...refDoctors.map((item) => ({
                                        value: item.doctorName,
                                        label: item.doctorName,
                                        id: item.refDoctorsId,
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
                                      htmlFor="biomassType"
                                    >
                                      Կենսանյութը
                                    </label>
                                    {methods.formState.errors
                                      .biomassType && (
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
                                      name="biomassType"
                                      control={methods.control}
                                      defaultValue={null}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          options={biomassType}
                                          placeholder={"Ընտրել"}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                                </div>
                              <div className="row gx-3">
                                
                                <div className="col-sm-12">
                                  <div className="d-flex justify-content-between me-2 mt-3">
                                  {researchesPrice ? <div className="d-flex flex-row-reverse" ><p style={{color:'#4eafcb',}}>Ընդհանուր արժեք։ <span style={{fontWeight:'bold'}} >{researchesPrice}</span>դր․</p></div>:''}
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
                                      rules={{ required: false }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            onResearchSelect(val);
                                          }}
                                          value={field.value}
                                          isMulti
                                          closeMenuOnSelect={false}
                                          components={animatedComponents}
                                          options={researches.map((res) => ({
                                            value: res.researchListId,
                                            label: `${res?.researchListId} - ${res?.researchName}`,
                                            price: res?.price
                                          }))}
                                          styles={colourStyles}
                                          placeholder={"Հետազոտություններ"}
                                        />
                                      )}
                                    />
                                    
                                  </div>
                                
                                </div>
                                {/* <div className="row gx-3 mt-2">
                                <div className="col-sm-12">
                                  <div className="d-flex justify-content-between me-2">
                                  {packagesPrice ? <div className="d-flex flex-row-reverse" ><p style={{color:'#4eafcb',}}>Ընդհանուր արժեք։ <span style={{fontWeight:'bold'}} >{packagesPrice}</span>դր․</p></div>:''}
                                    <label
                                      className="form-label"
                                      htmlFor="package"
                                      placeholder={"Ընտրել"}
                                    >
                                      Ընտրել փաթեթ
                                    </label>
                                    {methods.formState.errors.package && (
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
                                      name="package"
                                      control={methods.control}
                                      isClearable={true}
                                      defaultValue={null}
                                      rules={{ required: false }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            onPackageSelect(val);
                                          }}
                                          value={field.value}
                                          isMulti
                                          closeMenuOnSelect={false}
                                          components={animatedComponents}
                                          options={packages.map((pack) => ({
                                            value: pack.packageId,
                                            label: `${pack?.packageId} - ${pack?.packageName}`,
                                            //label:`${res.researchName} - ${res.price}`,
                                            price: pack?.price
                                          }))}
                                          styles={colourStyles}
                                          placeholder={"Փաթեթներ"}
                                        />
                                      )}
                                    />
                                    
                                  </div>
                                </div>
                              </div> */}
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
                                apiKey={process.env.REACT_APP_EDITOR_KEY}
                                onInit={(evt, editor) =>
                                  (editorRef.current = editor)
                                }
                                init={{
                                  height: 300,
                                  plugins:"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount pagembed linkchecker",
                                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                  tinycomments_mode: 'embedded',
                                  tinycomments_author: 'Author name',
                                  mergetags_list: [
                                    { value: 'First.Name', title: 'First Name' },
                                    { value: 'Email', title: 'Email' },
                                  ],
                                  ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
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
