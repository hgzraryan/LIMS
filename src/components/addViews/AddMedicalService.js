import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {  Form, FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {  toast } from 'react-toastify';
import {
    shortName_validation,
    purchasePrice_validation,
    serviceName_validation,
    categoryName_validation,
    localCode_validation,
    additional_validation,
    price_validation,
  } from "../../utils/inputValidations";
import { REGISTER_MEDICALSERVICES } from "../../utils/constants";
function AddMedicalService({ handleToggleCreateModal, refreshData }) {
    const [errMsg, setErrMsg] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const editorRef = useRef(null);

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
    const onSubmit = methods.handleSubmit(async ({serviceName,
        localCode,
        categoryName,
        shortName,
        price,
        purchasePrice}
      ) => {
     
      const newMedicalService = {
          serviceName,
          localCode,
          categoryName,
          shortName,
          price,
          purchasePrice,
          additional: editorRef.current.getContent({ format: "text" }),
      }; 
      console.log(newMedicalService)     
       try {
         await axiosPrivate.post(REGISTER_MEDICALSERVICES, newMedicalService, {
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
            Ավելացնել նոր բուժ․ ծառայություն
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
                          <a href="#">Բուժ․ ծառայության տվյալներ</a>
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
                                <Input {...serviceName_validation} />
                              </div>
                              <div className="col-sm-6">
                                <Input {...localCode_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                                <Input {...categoryName_validation} />
                              </div>
                              <div className="col-sm-6">
                                <Input {...shortName_validation} />
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
                                apiKey='yx10svi3vbrzauhd8j5jtut8pi6v59tb9ozhno5b1qcz902v'
                                onInit={(evt, editor) =>
                                  (editorRef.current = editor)
                                }
                                init={{
                                  height:300,
                                  plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
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

export default AddMedicalService
