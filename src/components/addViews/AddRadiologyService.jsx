import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "../Input";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {  toast } from 'react-toastify';
import {
    shortName_validation,
    purchasePrice_validation,
    serviceName_validation,
    categoryName_validation,
    localCode_validation,
    price_validation,
    category_validation,
    partnerCode_validation,
  } from "../../utils/inputValidations";
import { REGISTER_RADIOLOGYSERVICE } from "../../utils/constants";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import ErrorSvg from "../../dist/svg/error.svg";
import { deleteNullProperties } from "../../utils/helper";
import ReactQuillEditor from "../ReactQuillEditor";

const radiologyserviceClassState = [
  { value: "External", label: "Արտաքին" },
  { value: "Internal", label: "Ներքին" },
  { value: "Other", label: "Այլ" },
];
function AddRadiologyService({ handleToggleCreateModal, refreshData }) {
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [additionalData, setAdditionalData] = useState('')
  const [serviceType, setServiceType] = useState("");
  const [externalType, setExternalType] = useState("");

  const handleServiceType = (data) => {
    console.log(data)
    switch (data.value) {
      case "External":
        setServiceType(data.value);
        setExternalType(true);
        break;
      case "Internal":
        setServiceType(data.value);
        setExternalType(false);
        break;
      case "Other":
        setServiceType(data.value);
        setExternalType(false);
        break;
      default:
        break;
    }
  }

    // const { onSubmit, methods } = useSubmitForm(
    //   REGISTER_URL,
    //   getResearches,
    //   setErrMsg,
    //   handleToggleCreateModal,
    //   additionalData
    // );
    const notify = (text) => toast.success(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    const methods = useForm({
      mode: "onChange",
    });
    const onSubmit = methods.handleSubmit(async ({serviceName,
        localCode,
        category,
        categoryName,
        shortName,
        price,
        partnerCode,
        purchasePrice}
      ) => {
     
      const newRadService = {
          serviceName,
          localCode,
          category:category,
          categoryName,
          shortName,
          price:+price,
          purchasePrice:+purchasePrice,
          partnerCode:partnerCode?partnerCode:null,
          class: serviceType,
          additional: additionalData,
        }; 
      const updatedData = deleteNullProperties(newRadService)
       try {
         await axiosPrivate.post(REGISTER_RADIOLOGYSERVICE, updatedData, {
           headers: { "Content-Type": "application/json"  },
           withCredentials: true,
         });
      
         handleToggleCreateModal(false);
         refreshData();
         notify(`Բուժ․ ծառայությունը ավելացված է`)
  
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
   
    return (
      <Modal
        show={() => true}
        size="xl"
        onHide={() => handleToggleCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Ավելացնել նոր ռադիոլոգիական ծառայություն
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                          <a href="#">Ծառայության տվյալներ</a>
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
                                <Input {...serviceName_validation} />
                              </div>
                              <div className="col-sm-6">
                                <Input {...localCode_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                               <Input {...category_validation} />
                             </div>
                              <div className="col-sm-6">
                                <Input {...categoryName_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
                                <div className="col-sm-6">
                                <Input {...shortName_validation} />
                              </div>
                            <div className="col-sm-6">
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="diagnosticsType"
                                    >
                                  Հետազոտության տեսակ
                                    </label>
                                    {methods.formState.errors
                                      .researchType && (
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
                                      name="researchType"
                                      control={methods.control}
                                      defaultValue={null}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          options={radiologyserviceClassState}
                                          placeholder={"Ընտրել"}
                                          onChange={(val) => {
                                            field.onChange(val.value);
                                            handleServiceType(val);
                                          }}
                                          value={radiologyserviceClassState.find(
                                            (option) =>
                                              option.value === serviceType
                                          )}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                            </div>
                            <div className="row gx-3">  
                            <div className="col-sm-6">
                                <Input {...purchasePrice_validation} />
                              </div> 
                              <div className="col-sm-6">
                                <Input {...price_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">  
                           <div className="col-sm-6">
                               <Input {...partnerCode_validation} validation={{required:externalType? {value:true,message: "պարտադիր"}:{value:false}}}/>
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
        </Modal.Body>
      </Modal>
    );
  }

export default AddRadiologyService
