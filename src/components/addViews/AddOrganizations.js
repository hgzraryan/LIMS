import React, { useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import {
  name_validation,
  desc_validation,
  email_validation,
  country_validation,
  state_validation,
  city_validation,
  street_validation,
  zipCode_validation,
  contactName_validation,
  contactEmail_validation,
  director_validation,
  bankName_validation,
  bankAccNumber_validation,
  tin_validation,
  type_validation,
} from "../../utils/inputValidations";
import useSubmitForm from "../../hooks/useSubmitForm";
import { REGISTER_ORGANIZATIONS } from "../../utils/constants";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import ErrorSvg from "../../dist/svg/error.svg";
import CustomPhoneComponent from "../CustomPhoneComponent";
import 'react-phone-number-input/style.css'
import { CountryDropdown, RegionDropdown,CountryRegionData  } from 'react-country-region-selector';

function AddOrganization({ handleToggleCreateModal, getOrganizations }) {
  const [errMsg, setErrMsg] = useState("");
  const editorRef = useRef(null);  
  const axiosPrivate = useAxiosPrivate();

 const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')

  const { trigger } = useForm();


  useEffect(() => {
    if (CountryRegionData[11][0] === "Armenia") {
      CountryRegionData[11][0] = "Հայաստան"
      CountryRegionData[11][2] = "Արագածոտն~AG|Արարատ~AR|Արմավիր~AV|Գեղարքունիք~GR|Կոտայք~KT|Լոռի~LO|Շիրակ~SH|Սյունիք~SU|Տավուշ~TV|Վայոց Ձոր~VD|Երևան~ER";
    }
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
  const methods = useForm({
    mode: "onChange",
  });

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
      director,
      bankName,
      bankAccNumber,
      phone,
      tin,
      contactPhoneNumber,
      type,
    }) => {
      //console.log(data)
      const newOrganization = {
        name: name,
        type:type,        
        director:director,
        bankName:bankName,
        bankAccNumber:bankAccNumber,
        tin:tin,
        contact:{
          phone: phone,
          email: email,
          address: {
            street: street,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
          },
        },
        contactPerson: {
          name: contactName,
          email: contactEmail,
          phone: contactPhoneNumber,
        },
        description: description,
      };

      //console.log(newOrganization);
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
          Ավելացնել նոր պատվիրատու
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
                            <Input {...director_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...email_validation} />
                            </div>
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
                          </div>
                          <div className="row gx-3">
                          <div className="col-sm-6">
                            <div className="d-flex justify-content-between me-2">
                              <label className="form-label" htmlFor="country">
                                Երկիր
                              </label>
                              {methods?.formState.errors.country && (
                                <span className="error text-red">
                                  <img src={ErrorSvg} alt="errorSvg" />
                                  Պարտադիր
                                </span>
                              )}
                              </div>
                              <Controller
                                name="country"
                                control={methods.control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <CountryDropdown
                                    {...field}
                                    classes="form-control"
                                    defaultOptionLabel="Երկիր"
                                    value={country}
                                    priorityOptions={['Armenia']}
                                    onChange={(val) => {
                                      field.onChange(val);
                                      setCountry(val);
                                      trigger("country");
                                    }}
                                    style={{
                                      appearance:'auto'
                                    }}
                                  />
                                )}
                              />
                            </div>
                            <div className="col-sm-6">
                            <div className="d-flex justify-content-between me-2">
                            <label className="form-label" htmlFor="state">
                                  Մարզ
                                </label>
                                {methods?.formState.errors.state && (
                                  <span className="error text-red">
                                    <span>
                                      <img src={ErrorSvg} alt="errorSvg" />
                                    </span>
                                    պարտադիր
                                  </span>
                                )}
                                </div>
                                <Controller
                                name="state"
                                control={methods.control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <RegionDropdown
                                  blankOptionLabel="Մարզ"
                                  defaultOptionLabel="Մարզ"
                                  classes="form-control"
                                  country={country}
                                  value={region}
                                  onChange={(val) => {
                                    field.onChange(val);
                                    setRegion(val);
                                    trigger("state");
                                  }}
                                  style={{
                                    appearance:'auto'
                                  }}
                                />                           
                          )}
                        />
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
                            <Input {...type_validation} />
                            </div>
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
                        <a href="#">Պատասխնատու անձի տվյալներ</a>
                      </div>
                      <div className="card-body">
                        <div className="modal-body">
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...contactName_validation} />
                            </div>
                            <div className="col-sm-6">
                            <div className="d-flex justify-content-between me-2">
                              <label className="form-label" htmlFor="contactPhoneNumber">
                                Հեռախոս
                              </label>
                              {methods.formState.errors.contactPhoneNumber && (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    )}
                                    </div>
                             
                                    <CustomPhoneComponent name="contactPhoneNumber"  control={methods.control} />  

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
                      <div className="card-body" style={{zIndex:'0'}}>
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

export default AddOrganization;
