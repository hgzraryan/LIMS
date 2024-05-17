import React, { Suspense, useState,useEffect, useRef } from "react";
import { Form, FormProvider, useForm, Controller } from "react-hook-form";
import ErrorSvg from "../../dist/svg/error.svg";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Input } from "../Input";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoadingSpinner from "../LoadingSpinner";
import { deleteNullProperties } from "../../utils/helper";
import { city_validation,  email_validation, name_validation, street_validation, zipCode_validation } from "../../utils/inputValidations";
import CustomPhoneComponent from "../CustomPhoneComponent";
import { MEDICALSERVICES_URL } from "../../utils/constants";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { Editor } from "@tinymce/tinymce-react";
function MedInstitutionEditModal({medInstitution,setEditRow,refreshData}) {
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const editorRef = useRef(null);

    const { trigger } = useForm();
    const methods = useForm({
      mode: "onChange",
    });
    useEffect(() => {
      if (CountryRegionData[11][0] === "Armenia") {
        CountryRegionData[11][0] = "Հայաստան";
        CountryRegionData[11][2] =
          "Արագածոտն~AG|Արարատ~AR|Արմավիր~AV|Գեղարքունիք~GR|Կոտայք~KT|Լոռի~LO|Շիրակ~SH|Սյունիք~SU|Տավուշ~TV|Վայոց Ձոր~VD|Երևան~ER";
      }
      setCountry(medInstitution?.contact?.address?.country);
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
    const onSubmit = methods.handleSubmit(async ({
      name,email,country,
      state,
      street,
      city,
      zipCode,
      phone
    }) => {
      const updatedMedInstitution = {
         institutionName: name?.trim() !== medInstitution?.institutionName?.trim() ? name : null,
         contact: {
          email:
            email?.trim() !== medInstitution?.contact?.email?.trim() ? email : null,
          phone:
            phone?.trim() !== medInstitution?.contact?.phone?.trim() ? phone : null,
          address: {
            street:
              street?.trim() !== medInstitution?.contact?.address?.street?.trim()
                ? street
                : null,
            city:
              city?.trim() !== medInstitution?.contact?.address?.city?.trim()
                ? city
                : null,
            state:
              state?.trim() !== medInstitution?.contact?.address?.state?.trim()
                ? state
                : null,
            country:
              country?.trim() !== medInstitution?.contact?.address?.country?.trim()
                ? country
                : null,
            zipCode:
              +zipCode.trim() !== +medInstitution?.contact?.address?.zipCode
                ? zipCode
                : null,
                additional: editorRef.current.getContent({ format: "text" }).trim()!==medInstitution?.additional?.trim()?editorRef.current.getContent({ format: "text" }):null,

          },
        },
      };
      const updatedFields = deleteNullProperties(updatedMedInstitution);

      console.log(updatedMedInstitution);
      try {
        await axiosPrivate.put(MEDICALSERVICES_URL, { updatedFields, id: medInstitution.medInstitutionsId }, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
  
        setEditRow(false);
        refreshData();
        //notify(`${newMedInstitution.name} բուժհաստատությունը ավելացված է`);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        }  else {
          setErrMsg(" Failed");
        }
      }
    }); 
  return (
    <>
    <Modal show={() => true} size="xl" onHide={() => setEditRow(false)}>
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Թարմացնել բուժհաստատության տվյալները
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
                          <a href="#">Բուժհաստատության տվյալներ</a>
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
                              <Input {...name_validation} defaultValue={medInstitution?.institutionName}/>
                              </div>
                              <div className="col-sm-6">
                                <Input {...email_validation} defaultValue={medInstitution?.contact?.email}/>
                              </div>
                            </div>
                            <div className="row gx-3">
                          <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="country"
                                      >
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
                                      defaultValue={
                                        medInstitution?.contact?.address?.country
                                      }
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <CountryDropdown
                                          {...field}
                                          classes="form-control"
                                          defaultOptionLabel="Երկիր"
                                          value={field.value}
                                          priorityOptions={["Armenia"]}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            setCountry(val);
                                            methods.trigger("country");
                                            methods.setValue("state",'')
                                            methods.trigger("state")
                                          }}
                                          style={{
                                            appearance: "auto",
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="state"
                                      >
                                        Մարզ
                                      </label>
                                      {methods?.formState.errors.state && (
                                        <span className="error text-red">
                                          <span>
                                            <img
                                              src={ErrorSvg}
                                              alt="errorSvg"
                                            />
                                          </span>
                                          պարտադիր
                                        </span>
                                      )}
                                    </div>
                                    <Controller
                                      name="state"
                                      control={methods.control}
                                      defaultValue={medInstitution?.contact?.address?.state}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <RegionDropdown
                                          {...field}
                                          classes="form-control"
                                          country={country}
                                          defaultOptionLabel="Մարզ"
                                          value={field.value}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            setRegion(val);
                                            trigger("state");
                                          }}
                                          style={{
                                            appearance: "auto",
                                          }}
                                        />
                                      )}
                                    />
                                  </div>
                          </div>
                            <div className="row gx-3">                              
                            <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="phone"
                                      >
                                        Հեռախոս
                                      </label>
                                      {methods.formState.errors.phone && (
                                        <span className="error text-red">
                                          <span>
                                            <img
                                              src={ErrorSvg}
                                              alt="errorSvg"
                                            />
                                          </span>{" "}
                                          պարտադիր
                                        </span>
                                      )}
                                    </div>
                                    <CustomPhoneComponent
                                      name="phone"
                                      control={methods.control}
                                      defaultValue={medInstitution?.contact?.phone}
                                    />
                                  </div>
                              <div className="col-sm-6">
                                <Input {...city_validation} defaultValue={medInstitution?.contact?.address?.city}/>
                              </div>
                            </div>
                            <div className="row gx-3">                             
                              <div className="col-sm-6">
                                <Input {...street_validation} defaultValue={medInstitution?.contact?.address?.street}/>
                              </div>
                              <div className="col-sm-6">
                                <Input {...zipCode_validation} defaultValue={medInstitution?.contact?.address?.zipCode}/>
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
                                                                apiKey={process.env.REACT_APP_EDITOR_KEY}

                                onInit={(evt, editor) =>
                                  (editorRef.current = editor)
                                }
                                initialValue={medInstitution?.additional}
                                init={{
                                  plugins:"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount pagembed linkchecker",

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
                          onClick={() => setEditRow(false)}
                        >
                          Չեղարկել
                        </button>
                        <button
                          type="button"
                          onClick={onSubmit}
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                        >
                          Հաստատել
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
  </>
  )
}

export default MedInstitutionEditModal
