import React, { Suspense, useEffect, useState } from 'react'
import { DOCTORS_URL, MEDICALSERVICES_URL, PATIENTS_URL, REGISTER_DOCTORSVISITS } from '../../utils/constants';
import { toast } from "react-toastify";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Modal } from "react-bootstrap";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { Controller, Form, FormProvider, useForm} from "react-hook-form";
import { Input } from '../Input';
import ErrorSvg from "../../dist/svg/error.svg";
import Select from "react-select";
import "react-phone-number-input/style.css";
import LoadingSpinner from '../LoadingSpinner';
import makeAnimated from "react-select/animated";
import CustomDateTimeComponent from '../CustomDateTimeComponent';
const CustomData=[
  {
    doctorsVisitsId:30001,
      patientData:{
        name:"Արման Գևորգի Ստեփանյան",
        contact:{
          email:"fdfgfg1942@as.tu",
          phone:"+37485745896",
        },
        age:45,
        gender:'Ար',
        patientId:49
        //patient's all data
      },
      visitDate:"24-02-2022",
      doctorName:"Կարինե Սամվելի Մանւկյան",
      doctorsAppointments:
        {
          instructions:['Մերսում'],
          medicine:['Դիկլակ գել'],
          researches:[]
      },
    nextVisit:'24-03-2022',
  },
  {
    doctorsVisitsId:30025,
      patientData:{
        contact:{

          email:"Anka1942@as.tu",
          phone:"+3748596584",
        },
        name:"Անուշ Ռազմիկի Գաբրիելյան",
        age:85,
        patientId:48,
        gender:'Իգ',
        //patient's all data
      },
      visitDate:"25-02-2024",
      doctorName:"Կարինե Սամվելի Մանւկյան",
      doctorsAppointments:
        {
          instructions:['Դիետիկ սնունդ'],
          medicine:['Մեզիմ ֆոռտե'],
          researches:['Արյան ընդհանուր հետազոտություն']
      },
    
    nextVisit:'24-03-2024',
  },
  {
    doctorsVisitsId:30852,
      patientData:{
        name:"Կարեն Սերոբի Ստեփանյան",
        contact:{
          email:"ASD1942@as.tu",
          phone:"+3748785263",
        },
        age:32,
        gender:'Ար',
        patientId:85
        //patient's all data
      },
      visitDate:"01-03-2024",
      doctorName:"Կարինե Սամվելի Մանւկյան",
      doctorsAppointments:
        {
          instructions:['Քաղցր չուտել','քայլել օրեկան 1կմ'],
          medicine:['Դիաբետոն'],
          researches:['Արյան ընդհանուր հետազոտություն','ԲԱԿ հետազոտություն']
      },
    nextVisit:'05-03-2024',
  },
  {
    doctorsVisitsId:30857,
      patientData:{
        name:"Կարեն Սերոբի Ստեփանյան",
        contact:{
          email:"ASD1942@as.tu",
          phone:"+3748785263",
        },
        age:32,
        gender:'Ար',
        patientId:85
        //patient's all data
      },
      visitDate:"01-03-2024",
      doctorName:"Կարինե Սամվելի Մանւկյան",
      doctorsAppointments:
        {
          instructions:['Քաղցր չուտել','քայլել օրեկան 1կմ'],
          medicine:['Դիաբետոն'],
          researches:['Արյան ընդհանուր հետազոտություն','ԲԱԿ հետազոտություն']
      },
    nextVisit:'05-03-2024',
  },
]

function AddDoctorsVisit({
    handleToggleCreateModal,
    refreshData,
    doctorsVisits,
  }) {
    const [doctor,setDoctor] = useState([])
    const [doctors,setDoctors] = useState([])
    const [patients,setPatients] = useState([])
    const [medicalServices,setMedicalServices] = useState([])
    const [medicalServicePrice,setMedicalServicePrice] = useState(0)
    const [errMsg, setErrMsg] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(true);
    const animatedComponents = makeAnimated();
    const colourStyles = {
      control: (styles, { isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: "#fff",
        borderColor: isFocused ? "#fff" : "#e8e3e3",
        boxShadow: "#e8e3e3",
        ":hover": {
          borderColor: "#fff",
        },
      }),
  
      multiValueLabel: (styles, { data }) => ({
        ...styles,
        backgroundColor: "#4eafcb",
        color: "#000",
      }),
      multiValueRemove: (styles, { data }) => ({
        ...styles,
        backgroundColor: "#4eafcb",
        color: "#e8e3e3",
        ":hover": {
          backgroundColor: "#4eafcb",
          color: "#eb3434",
        },
      }),
    };
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
            .then((resp) => {
              axiosPrivate.get(MEDICALSERVICES_URL).then((resp) => {
                setMedicalServices(resp?.data?.jsonString);
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
      const { trigger } = useForm();
      const onDoctorSelect = (data) => {
        setDoctor((prev) => data.label);
      };
      
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
        visitDate,medicalServices}) => {
        const newDoctorsVisit = {
            clientId:client?.value,
            doctor:doctor,
            medicalServices:medicalServices?.map((el)=>el.value),
            visitDate:visitDate ? new Date(
              visitDate.getTime() - visitDate.getTimezoneOffset() * 60000
          )
          .toISOString()
          .replace('T', ' ')
          .replace(/\.\d{3}Z/, '') 
          .split(':')
          .slice(0, -1)
          .join(':')  : null,   
          
        }
    
        console.log('newDoctorsVisit',newDoctorsVisit);
        try {
          await axiosPrivate.post(REGISTER_DOCTORSVISITS, newDoctorsVisit, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
    
          handleToggleCreateModal(false);
          refreshData();
          notify(
            `Բժշկի այցելությունը ավելացված է`
          );
        } catch (err) {
          if (!err?.response) {
            setErrMsg("No Server Response");
          }  else {
            setErrMsg(" Failed");
          }
        }
      }); 
      const onMedServiceSelect = (data) => {
        console.log(data);
        const calcPrice = data.reduce((acc,el)=>{
          return acc+=el.price
        },0)
        setMedicalServicePrice(calcPrice)
    
      };
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
                                      defaultValue={null}
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
                                      defaultValue={null}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          onChange={(val) => {
                                            field.onChange(val.id);
                                            onDoctorSelect(val);
                                          }}
                                          value={doctors.find(
                                            (option) => option.value === doctor
                                          )}
                                          options={doctors.map((item) => ({
                                              value: item.doctorName,
                                              label: item.doctorName,
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
                              <div className="row gx-3">
                              
                            
                              </div>
                              <div className="row gx-3">
                              <div className="col-sm-6">
                              <div className="form-group">
                                <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="purchaseDate"
                                  >
                                  Այցի ամսաթիվ
                                </label>
                                  {methods.formState.errors.visitDate && (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    )}
                                    </div>
                                <div>
                                <CustomDateTimeComponent name="visitDate" control={methods.control} required={true}/>
                                </div>
                              </div>
                            </div>
                              {/* <div className="col-sm-6">
                              <div className="form-group">
                                <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-label"
                                  htmlFor="nextVisitDate"
                                  >
                                  Հաջորդ այցի ամսաթիվ
                                </label>
                                  {methods.formState.errors.nextVisitDate && (
                                    <span className="error text-red"><span><img src={ErrorSvg} alt="errorSvg"/></span> պարտադիր</span>
                                    )}
                                    </div>
                                <div>
                                <CustomDateComponent name="nextVisitDate" control={methods.control} required = {false}/>
                                </div>
                              </div>
                            </div> */}
                              </div>
                              <div className="row gx-3">
                                
                                <div className="col-sm-12">
                                  <div className="d-flex justify-content-between me-2">

                                  {medicalServicePrice ? <div className="d-flex flex-row-reverse" ><p style={{color:'#4eafcb',}}>Ընդհանուր արժեք։ <span style={{fontWeight:'bold'}} >{medicalServicePrice}</span>դր․</p></div>:''}

                                    <label
                                      className="form-label"
                                      htmlFor="research"
                                      placeholder={"Ընտրել"}
                                    >
                                      Ընտրել ծառայությունը
                                    </label>
                                    {methods.formState.errors.medicalServices && (
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
                                    name="medicalServices"
                                    control={methods.control}
                                    isClearable={true}
                                    defaultValue={null}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                      <div style={{ zIndex: 9999 }}> {/* Set zIndex for the wrapper div */}
                                        <Select
                                          {...field}
                                          isMulti
                                          components={animatedComponents}
                                          closeMenuOnSelect={false}
                                          options={medicalServices.map((res) => ({
                                            value: res.medServiceId,
                                            label: `${res?.serviceName}`,
                                            price: res?.price
                                          }))}
                                          // styles={colourStyles}
                                          menuPortalTarget={document.body} 
                                          styles={{ ...colourStyles,menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                          placeholder={"Բժշկական ծառայություններ"}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            onMedServiceSelect(val);
                                          }}
                                          value={field.value}
                                        />
                                      </div>
                                    )}
                                  />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="separator-full"></div> */}
                        {/* <div className="card">
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
                        </div>
                        <div className="separator-full"></div> */}
    
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
            )}
            </Suspense>
        </Modal>
      );
    }

export default AddDoctorsVisit
