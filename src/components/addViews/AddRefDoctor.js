import React, { useRef, useState } from "react";
import { REGISTER_REFDOCTOR } from "../../utils/constants";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../Input";
import ErrorSvg from "../../dist/svg/error.svg";

import {
  city_validation,
  country_validation,
  email_validation,
  fullName_validation,
  medInstitution_validation,
  state_validation,
  street_validation,
  zipCode_validation,
} from "../../utils/inputValidations";
import CustomPhoneComponent from "../CustomPhoneComponent";
import 'react-phone-number-input/style.css'

function AddRefDoctor({ handleToggleCreateModal, getRefDoctors }) {
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const methods = useForm({
    mode: "onChange",
  });

  const editorRef = useRef(null);
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
  const onSubmit = methods.handleSubmit(
    async ({
      fullName,
      medInstitution,
      email,
      country,
      state,
      street,
      city,
      zipCode,
      phone
    }) => {
      const newRefDoctor = {
        doctorName: fullName,
        medInstitution: medInstitution,
        contact: {
          email: email,
          phone: phone,
          address: {
            street: street,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
          },
        },
        //timestamps:'',
        additional: editorRef.current.getContent({ format: "text" }),
      };

       //console.log(newRefDoctor);
      try {
        await axiosPrivate.post(REGISTER_REFDOCTOR, newRefDoctor, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        handleToggleCreateModal(false);
        getRefDoctors();
        notify(`${newRefDoctor.doctorName} ուղղորդող բժիշկը ավելացված է`);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else {
          setErrMsg(" Failed");
        }
      }
    }
  );
  return (
    <Modal
      show={() => true}
      size="xl"
      onHide={() => handleToggleCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ավելացնել նոր ուղղորդող բժիշկ
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
                        <a href="#">Բժշկի տվյալներ</a>
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
                              <Input {...fullName_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...email_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                            <div className="d-flex justify-content-between me-2">
                              <label className="form-label" htmlFor="phoneNumber">
                                Հեռախոս
                              </label>
                              {methods.formState.errors.phone && (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    )}
                                    </div>                              
                              <CustomPhoneComponent name="phone"  control={methods.control} />  
                            </div>
                            <div className="col-sm-6">
                              <Input {...medInstitution_validation} />
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

export default AddRefDoctor;