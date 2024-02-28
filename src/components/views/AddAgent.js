import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormProvider, useForm} from "react-hook-form";
import { Input } from "../Input";
import { name_validation, desc_validation, email_validation, director_validation, tin_validation, zipCode_validation, street_validation, city_validation, state_validation, country_validation, bankAccNumber_validation, bankName_validation } from "../../utils/inputValidations";
import useSubmitForm from "../../hooks/useSubmitForm";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ErrorSvg from "../../dist/svg/error.svg";
import CustomPhoneComponent from "../CustomPhoneComponent";

const REGISTER_AGENT = "/registerAgent";

function AddAgent({ handleToggleCreateModal, getAgents }) {
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const methods = useForm({
    mode: "onChange",
  });

  const editorRef = useRef(null);
  // const { onSubmit, methods } = useSubmitForm(
  //   REGISTER_AGENT,
  //   editorRef,
  //   getAgents,
  //   setErrMsg,
  //   handleToggleCreateModal,
  //   additionalData
  // );
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
  const onSubmit = methods.handleSubmit(async ({
    name,director,bankName,bankAccNumber,tin,email,address,description,country,
    state,
    street,
    city,
    zipCode,
    phone
  }) => {
    const newAgent = {
       name: name,
       director:director,
       bankName:bankName,
       bankAccNumber:bankAccNumber,
       tin:tin,
       contact: {
         email:email,
         phone:phone,
        address: {
          street: street,
          city: city,
          state: state,
          country: country,
          zipCode: zipCode,
        },
       },
       role:description,
      additional: editorRef.current.getContent({ format: "text" }),
    };

    //console.log(newAgent);
    try {
      await axiosPrivate.post(REGISTER_AGENT, newAgent, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      handleToggleCreateModal(false);
      getAgents();
      notify(
        `${newAgent.name} գործընկերը ավելացված է`
      );
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      }  else {
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
          Ավելացնել նոր գործընկեր
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
                        <a href="#">Գործընկերոջ տվյալներ</a>
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
                              <Input {...director_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...email_validation} />
                            </div>
                            <div className="col-sm-6">
                            <div className="d-flex justify-content-between me-2">
                              <label className="form-label" htmlFor="doctor">
                                Հեռախոս
                              </label>
                              {methods.formState.errors.phone && (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    )}
                                    </div>
                                    <CustomPhoneComponent name="phone"  control={methods.control} />

                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...country_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...state_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...city_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...street_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...zipCode_validation} />
                            </div>
                          
                            <div className="col-sm-6">
                            <Input {...desc_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            
                            
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...bankName_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...bankAccNumber_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...tin_validation} />
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
                      <div className="card-body"style={{zIndex:'0'}}>
                        <div className="modal-body">
                          <form>
                            <div className="row gx-12">
                              <div className="col-sm-12">
                                <Editor
                                  apiKey="wiejyphh2h0z879p5bvha1lqdfd0z7utg4rqsw6cyjhd28lx"
                                  name="fieldName"
                                  onInit={(evt, editor) =>
                                    (editorRef.current = editor)
                                  }
                                  //initialValue=""
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

export default AddAgent;
