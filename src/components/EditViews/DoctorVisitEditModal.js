import React, { Suspense, useEffect, useRef, useState } from 'react'
import { DOCTORS_URL, PATIENTS_URL, REGISTER_DOCTORSVISITS } from '../../utils/constants';
import { toast } from "react-toastify";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Modal } from "react-bootstrap";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { Controller, Form, FormProvider, useForm} from "react-hook-form";
import ErrorSvg from "../../dist/svg/error.svg";
import Select from "react-select";
import "react-phone-number-input/style.css";
import LoadingSpinner from '../LoadingSpinner';
import CustomDateTimeComponent from '../CustomDateTimeComponent';
import { Editor } from '@tinymce/tinymce-react';
import moment from 'moment';
import { deleteNullProperties } from '../../utils/helper';
function DoctorVisitEditModal({
    doctorVisits,
    setEditRow,
    refreshData,
  }) {
    const [doctors,setDoctors] = useState([])
    const [patients,setPatients] = useState([])
    const [errMsg, setErrMsg] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(true);
    const editorRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
          axiosPrivate
            .get(DOCTORS_URL)
            .then((resp) => {
              setDoctors(resp?.data?.jsonString);
              setIsLoading(false);
            }).then((resp) => {
              axiosPrivate.get(PATIENTS_URL).then((resp) => {
                setPatients(resp?.data?.jsonString);
                setIsLoading(false);
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }, 500);
      }, []);
      const methods = useForm({
        mode: "onChange",
      });      
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
      const onSubmit = methods.handleSubmit(async ({client,
        doctor,
        visitDate}) => {
            debugger
        const updatedDoctorsVisit = {
            clientId:client?.value!==doctorVisits.clientId?client?.value:null,
            doctor:doctor?.id!==doctorVisits.doctorId?doctor?.id:null,
            visitDate:visitDate && 
            moment(visitDate).format('YYYY-MM-DD HH:mm')!== moment(doctorVisits?.visitDate).format('YYYY-MM-DD HH:mm')
            ?moment(visitDate).format('YYYY-MM-DD HH:mm')
            :null,          
            additional: editorRef.current.getContent({ format: "text" }).trim()!==doctorVisits?.additional?.trim()?editorRef.current.getContent({ format: "text" }):null,
        }        
        const updatedFields = deleteNullProperties(updatedDoctorsVisit);

                try {
          const response = await axiosPrivate.put(REGISTER_DOCTORSVISITS, updatedFields, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
    
          setEditRow(false)
          refreshData();
          notify(
            `Բժշկի այցելության տվյալները թարմացված են`
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
          onHide={() => setEditRow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Թարմացնել այցելության տվյալները
            </Modal.Title>
          </Modal.Header>
          <Suspense fallback={<LoadingSpinner />}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
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
                            <a href="#">Բժշկի այցի տվյալներ</a>
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
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="patient"
                                    >
                                      Այցելուներ
                                    </label>
                                    {methods.formState.errors.client && (
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
                                      name="client"
                                      control={methods.control}
                                      isClearable={true}
                                      defaultValue={{value:doctorVisits?.clientId,label:`${doctorVisits?.clientId}․ ${doctorVisits?.clientFirstName} ${doctorVisits?.clientLastName} ${doctorVisits?.clientMidName}`}}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          // onChange={(val) => {
                                          //   field.onChange(
                                          //     val ? val.value : null
                                          //   ); // Ensure you pass null when no patient is selected
                                          //   //onPatientSelect(val);
                                          // }}                                         
                                          options={patients.map((client) => ({
                                              value: client.patientId,
                                              label: `${client?.patientId}․  ${client?.lastName} ${client?.firstName} ${client?.midName}`,
                                            }))
                                          }
                                          placeholder={"Ընտրել"}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="doctor"
                                      placeholder={"Ընտրել"}
                                    >
                                      Բժիշկներ
                                    </label>
                                    {methods.formState.errors.doctor && (
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
                                      name="doctor"
                                      control={methods.control}
                                      isClearable={true}
                                      defaultValue={{ value:doctorVisits.doctorName,label:`${doctorVisits?.doctorId}.${doctorVisits?.doctorName}`,id: doctorVisits.doctorId}}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          options={doctors.map((item) => ({
                                              value: item.doctorName,
                                              label: `${item?.doctorId}.${item.doctorName}`,
                                              id: item.doctorId,
                                            }))
                                          }
                                          placeholder={"Ընտրել"}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row gx-3 mt-2">
                              <div className="col-sm-6">
                              <div className="form-group">
                                <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="purchaseDate"
                                  >
                                  Այցի ժամ
                                </label>
                                  {(methods.formState.errors.visitDate & !methods.formState.errors.notValidVisitDate?.message) ? (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    ):''}
                                  {methods.formState.errors.notValidVisitDate?.message && (
                                   
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> Սխալ ձևաչափ</span>
                                    )}

                                    </div>
                                <div>
                                <CustomDateTimeComponent 
                                name="visitDate" 
                                methods={methods} 
                                control={methods.control} 
                                defaultValue={new Date(doctorVisits?.visitDate)}
                                required={true}/>
                                </div>
                              </div>
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
                          <div className="card-body" style={{ zIndex: "0" }}>
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
            )}
            </Suspense>
        </Modal>
      );
    }

export default DoctorVisitEditModal
