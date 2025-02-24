import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import React, { Suspense, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";

import { useState } from "react";
import { Form, FormProvider, useForm, Controller } from "react-hook-form";import { Input } from "../Input";
import { toast } from "react-toastify";
import Select from "react-select";
import ErrorSvg from "../../dist/svg/error.svg";
import makeAnimated from "react-select/animated";
import LoadingSpinner from "../LoadingSpinner";
import { name_validation } from '../../utils/inputValidations';
import { MEDICALSERVICES_URL, REGISTER_PACKAGES, RESEARCHLISTS_URL } from '../../utils/constants';
import ReactQuillEditor from "../ReactQuillEditor";

function PackagesTable({
  handleToggleCreateModal,
  refreshData,
}) {
  const navigate = useNavigate()
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [researches, setResearches] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [researchesPrice, setResearchesPrice] = useState(0);
  const [medicalServicePrice,setMedicalServicePrice] = useState(0)
  const [medicalServices,setMedicalServices] = useState([])
  const [additionalData, setAdditionalData] = useState('')

  const onResearchSelect = (data) => {
    const calcPrice = data.reduce((acc,el)=>{
      return acc+=el.price
    },0)
    setResearchesPrice(calcPrice)

  };
  const onMedServiceSelect = (data) => {
    console.log(data);
    const calcPrice = data.reduce((acc,el)=>{
      return acc+=el.price
    },0)
    setMedicalServicePrice(calcPrice)

  };
  const methods = useForm({
    mode: "onChange",
  });
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
  useEffect(() => {
    setTimeout(() => {
      axiosPrivate.get(RESEARCHLISTS_URL).then((resp) => {
        setResearches(resp?.data?.jsonString);
        setIsLoading(false);
      })
      .then((resp) => {
        axiosPrivate.get(MEDICALSERVICES_URL).then((resp) => {
          setMedicalServices(resp?.data?.jsonString);
          setIsLoading(false);
        });
      })
      .catch((err) => {
          console.log(err);
          navigate("/login", { state: { from: location }, replace: true });

        });
    }, 500);
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
  const onSubmit = methods.handleSubmit(async (data) => {
    const newPackage = {
      packageName: data.name,
      researchList: data?.research.map((el) => el.value),
      price: researchesPrice+medicalServicePrice,
      additional: additionalData,
      medicalServices:data.medicalServices?.map((el)=>el.value),

    };

    console.log(newPackage);
    try {
      await axiosPrivate.post(REGISTER_PACKAGES, newPackage, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      handleToggleCreateModal(false);
      refreshData();
      // notify(
      //   `${newPackage.diagnosticsName} Ախտորոշումը ավելացված է`
      // );
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
          Ավելացնել նոր փաթեթ
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
                            <a href="#">Փաթեթի տվյալներ</a>
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
                                  <Input {...name_validation} />
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
                                <div className="col-sm-12">
                                  <div className="d-flex justify-content-between me-2">

                                  {medicalServicePrice ? <div className="d-flex flex-row-reverse" ><p style={{color:'#4eafcb',}}>Ընդհանուր արժեք։ <span style={{fontWeight:'bold'}} >{medicalServicePrice}</span>դր․</p></div>:''}

                                    <label
                                      className="form-label"
                                      htmlFor="research"
                                      placeholder={"Ընտրել"}
                                    >
                                      Ընտրել ծառայությունը
                                    </label>
                                    {methods.formState.errors.medicalServices && (
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
                                    name="medicalServices"
                                    control={methods.control}
                                    isClearable={true}
                                    defaultValue={null}
                                    rules={{ required: false }}
                                    render={({ field }) => (
                                      <div style={{ zIndex: 9999 }}> {/* Set zIndex for the wrapper div */}
                                        <Select
                                          {...field}
                                          isMulti
                                          components={animatedComponents}
                                          closeMenuOnSelect={false}
                                          options={medicalServices.map((res) => ({
                                            value: res.medServiceId,
                                            label: `${res?.medServiceId}. ${res?.serviceName}`,
                                            price: res?.price
                                          }))}
                                          // styles={colourStyles}
                                          menuPortalTarget={document.body} 
                                          styles={{ ...colourStyles,menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                          placeholder={"Բժշկական ծառայություններ"}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            onMedServiceSelect(val);
                                          }}
                                          value={field.value}
                                        />
                                      </div>
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

export default PackagesTable
