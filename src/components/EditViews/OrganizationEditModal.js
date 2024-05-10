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
import { name_validation, email_validation, director_validation, tin_validation, zipCode_validation, street_validation, city_validation,bankAccNumber_validation, bankName_validation, orgDesc_validation, contactName_validation, contactEmail_validation } from "../../utils/inputValidations";
import {
    CountryDropdown,
    RegionDropdown,
    CountryRegionData,
  } from "react-country-region-selector";
import CustomPhoneComponent from "../CustomPhoneComponent";
import { ORGANIZATIONS_URL } from "../../utils/constants";
import Select from "react-select";
import 'react-phone-number-input/style.css'
import { Editor } from "@tinymce/tinymce-react";

const organizationTypes = [
    { value: "Laboratory", label: "Լաբորատորիա" },
    { value: "Hospital", label: "Հիվանդանոց" },
    { value: "Polyclinic", label: "Պոլիկլինիկա" },
    { value: "Other", label: "Այլ" },
  ]
function OrganizationEditModal({ organization, setEditRow, refreshData }) {
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
        setCountry(organization?.contact?.address?.country);
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
          organizationType,
        }) => {
          //console.log(data)
          const updatedOrganization = {    
              type:organizationType?.value?.trim() !== organization?.type?.trim()
              ? organizationType?.value
              : null,        
              name:name?.trim() !== organization?.name?.trim() ? name : null,
              director:director?.trim() !== organization?.director?.trim() ? director : null,
              bankName:bankName?.trim() !== organization?.bankName?.trim() ? bankName : null,
              bankAccNumber:+bankAccNumber !== +organization?.bankAccNumber ? +bankAccNumber : null,
              tin:+tin !== +organization?.tin ? +tin : null,
            contact: {
                email:
                  email?.trim() !== organization?.contact?.email?.trim() ? email : null,
                phone:
                  phone?.trim() !== organization?.contact?.phone?.trim() ? phone : null,
                address: {
                  street:
                    street?.trim() !== organization?.contact?.address?.street?.trim()
                      ? street
                      : null,
                  city:
                    city?.trim() !== organization?.contact?.address?.city?.trim()
                      ? city
                      : null,
                  state:
                    state?.trim() !== organization?.contact?.address?.state?.trim()
                      ? state
                      : null,
                  country:
                    country?.trim() !== organization?.contact?.address?.country?.trim()
                      ? country
                      : null,
                  zipCode:
                    +zipCode.trim() !== +organization?.contact?.address?.zipCode
                      ? zipCode
                      : null,
                },
              },
            contactPerson: {
              name: contactName?.trim() !== organization?.contactPerson?.name?.trim() ? contactName : null,
              email: contactEmail?.trim() !== organization?.contactPerson?.email?.trim() ? contactEmail : null,
              phone: contactPhoneNumber?.trim() !== organization?.contactPerson?.phone?.trim() ? contactPhoneNumber : null,
            },
            description: description?.trim() !== organization?.description?.trim() ? description : null,
            additional: editorRef.current.getContent({ format: "text" }).trim()!==organization?.additional?.trim()?editorRef.current.getContent({ format: "text" }):null,

          };
          const updatedFields = deleteNullProperties(updatedOrganization);
          console.log(updatedFields);

          try {
            await axiosPrivate.put(ORGANIZATIONS_URL, { updatedFields, id: organization?.organizationId }, {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            });
    
            setEditRow(false);
            refreshData();
           // notify(`${newOrganization.name} Պատվիրատուն ավելացված է`);
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
  return (
    <>
    <Modal show={() => true} size="xl" onHide={() => setEditRow(false)}>
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Թարմացնել պատվիրատուի տվյալները
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
                              <Input {...name_validation} defaultValue={organization?.name}/>
                            </div>
                            <div className="col-sm-6">
                            <Input {...director_validation} defaultValue={organization?.director}/>
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...email_validation} defaultValue={organization?.contact?.email}/>
                            </div>
                            <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="phoneNumber"
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
                                      defaultValue={organization?.contact?.phone}
                                    />
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
                                        organization?.contact?.address?.country
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
                                      defaultValue={
                                        organization?.contact?.address?.state
                                      }
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
                              <Input {...city_validation} defaultValue={organization?.contact?.address?.city}/>
                            </div>
                            <div className="col-sm-6">
                              <Input {...street_validation} defaultValue={organization?.contact?.address?.street}/>
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...zipCode_validation} defaultValue={organization?.contact?.address?.zipCode}/>
                            </div>
                          
                            <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="organizationType"
                                      >
                                        Տեսակը
                                      </label>
                                      {methods.formState.errors
                                        .organizationType && (
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
                                    <div className="form-control">
                                      <Controller
                                        name="organizationType"
                                        control={methods.control}
                                        defaultValue={organizationTypes.find(
                                            (option) =>
                                              option.value === organization?.type
                                          )}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                          <Select
                                            {...field}
                                            options={organizationTypes}
                                            placeholder={"Ընտրել"}
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...bankName_validation} defaultValue={organization?.bankName}/>
                            </div>
                            <div className="col-sm-6">
                              <Input {...bankAccNumber_validation} defaultValue={organization?.bankAccNumber}/>
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...tin_validation} defaultValue={organization?.tin}/>
                            </div>
                            <div className="col-sm-6">
                            <Input {...orgDesc_validation} defaultValue={organization?.description}/>
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
                              <Input {...contactName_validation} defaultValue={organization?.contactPerson?.name}/>
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
                             
                                    <CustomPhoneComponent
                                      name="contactPhoneNumber"
                                      control={methods.control}
                                      defaultValue={organization?.contactPerson?.phone}
                                    />

                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...contactEmail_validation} defaultValue={organization?.contactPerson?.email}/>
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
                                apiKey={process.env.REACT_APP_EDITOR_KEY}
                                initialValue={organization?.additional}
                                onInit={(evt, editor) =>
                                  (editorRef.current = editor)
                                }
                                init={{
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

export default OrganizationEditModal
