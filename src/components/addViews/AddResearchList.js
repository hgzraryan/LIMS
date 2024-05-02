import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import Select from "react-select";
import ErrorSvg from "../../dist/svg/error.svg";
import {
  shortName_validation,
  category_validation,
  purchasePrice_validation,
  deliveryTimeLimit_validation,
  biomaterial_validation,
  serviceName_validation,
  categoryName_validation,
  vial_validation,
  laboratoryService_validation,
  localCode_validation,
  partnerCode_validation,
  samplingPeriod_validation,
  researchPrepSub_validation,
  researchName_validation,
} from "../../utils/inputValidations";
import {  toast } from 'react-toastify';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { REGISTER_RESEARCHLISTS } from "../../utils/constants";
const researchListClassState = [
  { value: "External", label: "Արտաքին" },
  { value: "Internal", label: "Ներքին" },
  { value: "Other", label: "Այլ" },
];
function AddResearchList({ handleToggleCreateModal, refreshData }) {
    const [errMsg, setErrMsg] = useState("");
    const [currency, setCurrency] = useState("AMD");
    const [amount, setAmount] = useState("");
    const editorRef = useRef(null);
    const axiosPrivate = useAxiosPrivate();

    const handleCurrencyChange = (e) => {
      setCurrency(prev=>e.target.value)
 }
 const handleAmountChange = (e) => {
  setAmount(prev=>e.target.value)
 }
    // const { onSubmit, methods } = useSubmitForm(
    //   REGISTER_URL,
    //   editorRef,
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
    const onSubmit = methods.handleSubmit(async ({researchName,
      localCode,
      partnerCode,
      laboratoryService,
      categoryName,
      serviceName,
      shortName,
      deliveryTimeLimit,
      biomaterial,
      vial,
      samplingPeriod,
      researchPrepSub,
      category,
      researchType,
      purchasePrice}
      ) => {
     
      const newResearchList = {
        researchName:researchName,
        localCode:localCode,
        partnerCode:partnerCode,
        laboratoryService:laboratoryService,
        categoryName:categoryName,
        serviceName:serviceName,
        shortName:shortName,
        price:amount,
        purchasePrice:purchasePrice,
        deliveryTimeLimit:deliveryTimeLimit,
        biomaterial:biomaterial,
        vial:vial,
        samplingPeriod:samplingPeriod,
        researchPrepSub:researchPrepSub,
        category:category,
        class: researchType?.value,
        additional: editorRef.current.getContent({ format: "text" }),
        //currency:currency,
      }; 
      //console.log(newResearchList)     
      try {
        await axiosPrivate.post(REGISTER_RESEARCHLISTS, newResearchList, {
          headers: { "Content-Type": "application/json"  },
          withCredentials: true,
        });
        
        handleToggleCreateModal(false);
        refreshData();
        notify(`${newResearchList.researchName} ավելացված է`)
  
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
    // const onResearchTypeSelect = (data) => {
    //   additionalData.researchType=data[0].researchType
    //   if(data[0].researchType=== "Արտաքին" ){
    //     setExternalType(true)
    //   }else{
    //     setExternalType(false)
    //   }
    // };
    return (
      <Modal
        show={() => true}
        size="xl"
        onHide={() => handleToggleCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Ավելացնել նոր հետազոտություն
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
                          <a href="#">Հետազոտության տվյալներ</a>
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
                                <Input {...researchName_validation} />
                              </div>
                              <div className="col-sm-6">
                                <Input {...shortName_validation} />
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
                                <Input {...deliveryTimeLimit_validation} />
                              </div>
                              <div className="col-sm-6">
                                <Input {...biomaterial_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...serviceName_validation} />
                              </div>
                              <div className="col-sm-6">
                                <Input {...laboratoryService_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...vial_validation} />
                              </div>                              
                              <div className="col-sm-6">
                                <Input {...samplingPeriod_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...localCode_validation} />
                              </div>
                              <div className="col-sm-6">
                                <Input {...partnerCode_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
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
                                          options={researchListClassState}
                                          placeholder={"Ընտրել"}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                              <div className="col-sm-6">
                                <Input {...researchPrepSub_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">  
                            <div className="col-sm-6">
                                <Input {...purchasePrice_validation} />
                              </div> 
                                <div className="col-sm-6">
                              <label htmlFor="price"className="mb-2">Արժեք</label>
                              <div className="form-control d-flex ">
                                <select
                                  id="currency"
                                  value={currency}
                                  onChange={handleCurrencyChange}
                                  style={{ border: "none", outline: "none" }}
                                >
                                  <option value="AMD">AMD</option>
                                  <option value="USD">USD</option>
                                  <option value="EUR">EUR</option>
                                  <option value="GBP">GBP</option>
                                  <option value="RU">RU</option>
                                </select>
                                <input
                                  type="number"
                                  id="amount"
                                  value={amount}
                                  onChange={handleAmountChange}
                                  placeholder="Enter amount"
                                  style={{
                                    border: "none",
                                    outline: "none",
                                    flex: 1,
                                  }}
                                />
                              </div>
                            </div>
                            </div>
                            <div className="row gx-3">
                                    
                            {/* {externalType && (
                              
                              <div className="col-sm-6">
                               <label
                                  className="form-label"
                                  htmlFor="research"
                                >
                                  Գործընկեր
                                </label>
                                <Multiselect
                                    options={[{partner:'Diagen+'},{partner:'Dialab'}]} 
                                    displayValue="partner" 
                                    onSelect={onPartnerSelect} 
                                    //  onRemove={onResearchDelete} 
                                    closeOnSelect={true}
                                    singleSelect
                                    id="input_tags_4"
                                    className="form-control"
                                    ref={researchTypeRef}
                                    hidePlaceholder={true}
                                    placeholder="Գործընկեր"
                                    style={{
                                      height: "10rem",
                                      overflow: "hidden",
                                    }}
                                    />
                              </div>
                            )}                              */}
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
                        <div className="card-body" style={{zIndex:'0'}}>
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
                                  height:300,
                                  plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
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
        </Modal.Body>
      </Modal>
    );
  }
  
  export default AddResearchList
