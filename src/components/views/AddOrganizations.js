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
  desc_validation,
  email_validation,
  mobile_validation,
  midName_validation,
  country_validation,
  state_validation,
  city_validation,
  street_validation,
  zipCode_validation,
  contactName_validation,
  contactMobile_validation,
  contactEmail_validation,
} from "../../utils/inputValidations";
import useSubmitForm from "../../hooks/useSubmitForm";
import { REGISTER_ORGANIZATIONS } from "../../utils/constants";
import PhoneInput from "react-phone-number-input";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
function AddOrganization({ handleToggleCreateModal, getOrganizations }) {
  const [errMsg, setErrMsg] = useState("");
  const editorRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const axiosPrivate = useAxiosPrivate();
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
  const methods = useForm({
    mode: "onChange",
  });

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };
  const handleContactPhoneNumberChange = (value) => {
    setContactPhoneNumber(value);
  };
  const onSubmit = methods.handleSubmit(
    async ({
      name,
      email,
      country,
      state,
      street,
      city,
      zipCode,
      contactName,
      contactEmail,
      description,
    }) => {
      //console.log(data)
      const newOrganization = {
        name: name,
        description: description,
        //phone: phoneNumber,
        //email: email,
        address: {
          street: street,
          city: city,
          state: state,
          country: country,
          zipCode: zipCode,
        },
        contactPerson: {
          name: contactName,
          email: contactEmail,
          phone: contactPhoneNumber,
        },
      };

      console.log(newOrganization);
      try {
        await axiosPrivate.post(REGISTER_ORGANIZATIONS, newOrganization, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        handleToggleCreateModal(false);
        getOrganizations();
        notify(`${newOrganization.name} Պատվիրատուն ավելացված է`);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 409) {
          setErrMsg("Username Taken");
        } else {
          setErrMsg(" Failed");
        }
      }
    }
  );
  // const { onSubmit, methods } = useSubmitForm(
  //   REGISTER_ORGANIZATIONS,
  //   editorRef,
  //   getOrganizations,
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
          Ավելացնել նոր Պատվիրատու
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
                        <a href="#">Պատվիրատուի տվյալներ</a>
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
                              <Input {...desc_validation} />
                            </div>
                          </div>
                          {/* <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...email_validation} />
                            </div>
                            <div className="col-sm-6">
                              <label
                                className="form-label"
                                htmlFor="phoneNumber"
                              >
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
                          </div> */}
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
                        <a href="#">Պատասխնատու անձի տվյալներ</a>
                      </div>
                      <div className="card-body">
                        <div className="modal-body">
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...contactName_validation} />
                            </div>
                            <div className="col-sm-6">
                              <label
                                className="form-label"
                                htmlFor="contactPhoneNumber"
                              >
                                Հեռախոս
                              </label>
                              <PhoneInput
                                placeholder="Հեռախոս"
                                value={contactPhoneNumber}
                                onChange={handleContactPhoneNumberChange}
                                displayInitialValueAsLocalNumber
                                initialValueFormat="national"
                                autoComplete="off"
                                defaultCountry="AM"
                              />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...contactEmail_validation} />
                            </div>
                            <div className="col-sm-6"></div>
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
                                  initialValue="<p>This is the initial content of the editor.</p>"
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

export default AddOrganization;
