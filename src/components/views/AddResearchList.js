import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import {
  name_validation,
  class_validation,
  shortName_validation,
  category_validation,
  researchUnit_validation,
  price_validation,
  currency_validation,
  referenceRange_validation,
} from "../../utils/inputValidations";
import useSubmitForm from "../../hooks/useSubmitForm";
import Multiselect from "multiselect-react-dropdown";
import {  toast } from 'react-toastify';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { REGISTER_RESEARCHLISTS } from "../../utils/constants";

function AddResearchList({ handleToggleCreateModal, getResearches,researchState }) {
    const [errMsg, setErrMsg] = useState("");
    const [currency, setCurrency] = useState("AMD");
    const [amount, setAmount] = useState("");
    const [externalType, setExternalType] = useState(false);
    const multiselectRef = useRef("");
    const researchTypeRef = useRef("");
    const additionalData = useRef({});
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
    const onSubmit = methods.handleSubmit(async (data
      ) => {
     
      const newResearchList = {
        researchName:data.name,
        shortName:data.shortName,
        category:data.category,
        referenceRange:data.referenceRange,
        units:data.researchUnit,
        researchesPrice:amount,
        currency:currency,
        class:additionalData.researchType,
      };      
      try {
        await axiosPrivate.post(REGISTER_RESEARCHLISTS, newResearchList, {
          headers: { "Content-Type": "application/json"  },
          withCredentials: true,
        });
        
        handleToggleCreateModal(false);
       //getUsers();
        notify(`${newResearchList.name} ավելացված է`)
  
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
    const onResearchTypeSelect = (data) => {
      additionalData.researchType=data[0].researchType
      if(data[0].researchType=== "Արտաքին" ){
        setExternalType(true)
      }else{
        setExternalType(false)
      }
    };
    const onPartnerSelect = (data) => {
      additionalData.partnerName =  data[0].partner
    };
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
                                <Input {...name_validation} />
                              </div>
                              <div className="col-sm-6">
                                <Input {...shortName_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...class_validation} />
                              </div>
                              <div className="col-sm-6">
                                <Input {...category_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...researchUnit_validation} />
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
                             
                              <div className="col-sm-6">
                            <label
                                  className="form-label"
                                  htmlFor="research"
                                >
                                  Հետազոտության տեսակ
                                </label>
                                <Multiselect
                                    options={[{researchType:'Ներքին'},{researchType:'Արտաքին'}]} // Options to display in the dropdown
                                    displayValue="researchType" // Property name to display in the dropdown options
                                    onSelect={onResearchTypeSelect} // Function will trigger on select event
                                  //  onRemove={onResearchDelete} // Function will trigger on remove event
                                    closeOnSelect={true}
                                    singleSelect
                                    id="input_tags_4"
                                    className="form-control"
                                    ref={researchTypeRef}
                                    hidePlaceholder={true}
                                    placeholder="Արժույթ"
                                    selectedValues={[{researchType:'Ներքին'}]}
                                    style={{
                                      height: "10rem",
                                      overflow: "hidden",
                                    }}
                                  />
                                  
                            </div>
                            <div className="col-sm-6">
                                    <Input {...referenceRange_validation} />
                                  </div>
                            </div>
                            <div className="row gx-3">
                                    
                            {externalType && (
                              
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
                            )}                             
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
                        <div className="card-body">
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
        </Modal.Body>
      </Modal>
    );
  }
  
  export default AddResearchList
