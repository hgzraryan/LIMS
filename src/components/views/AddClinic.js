import React, { useRef, useState } from 'react'
import { REGISTER_CLINIC } from '../../utils/constants';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormProvider, useForm} from "react-hook-form";
import { toast } from 'react-toastify';
import { Input } from '../Input';
import PhoneInput from 'react-phone-number-input';
import { city_validation, country_validation, desc_validation, director_validation, email_validation, name_validation, state_validation, street_validation, tin_validation, zipCode_validation } from '../../utils/inputValidations';
function AddClinic({ handleToggleCreateModal, 
  // getClinics 
}) {
    const [errMsg, setErrMsg] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const methods = useForm({
      mode: "onChange",
    });
  
    const handlePhoneNumberChange = (value) => {
      setPhoneNumber(value);
  
    };
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
      name,director,tin,email,description,country,
      state,
      street,
      city,
      zipCode,
    }) => {
      const newClinic = {
         name: name,
         director:director,
         tin:tin,
         contact: {
           email:email,
           phone:phoneNumber,
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
  
     // console.log(newClinic);
      try {
        await axiosPrivate.post(REGISTER_CLINIC, newClinic, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
  
        handleToggleCreateModal(false);
        // getAgents();
        notify(
          `${newClinic.name} բուժ․ հաստատությունը ավելացված է`
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
            Ավելացնել նոր Բուժ․ հաստատություն
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
                          <a href="#">Բուժ․ հաստատության տվյալներ</a>
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
                              <label className="form-label" htmlFor="doctor">
                                  Հեռախոս
                                </label>
                                <PhoneInput
                                  placeholder="Հեռախոս"
                                  value={phoneNumber}
                                  onChange={handlePhoneNumberChange}
                                  displayInitialValueAsLocalNumber
                                  initialValueFormat="national"
                                  autoComplete="off"
                                  defaultCountry="AM"
                                />
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
                                <Input {...tin_validation} />
                              </div>
                            </div>
                            <div className="row gx-3">
                              <div className="col-sm-6">
                              <Input {...desc_validation} />
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
                        <div className="card-body">
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

export default AddClinic
