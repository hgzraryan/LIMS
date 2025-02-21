import React, { Suspense, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import ErrorSvg from "../../dist/svg/error.svg";

import { useState } from "react";
import { Form, FormProvider, useForm, Controller } from "react-hook-form";
import { Input } from "../Input";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  DOCTORS_URL,
  MEDICALSERVICES_URL,
  PACKAGES_URL,
  PATIENTS_URL,
  REFDOCTORS_URL,
  REGISTER_PATIENT,
} from "../../utils/constants";
import {
  firstName_validation,
  lastName_validation,
  midName_validation,
  patientEmail_validation,
  zipCode_validation,
  street_validation,
  city_validation,
  passport_validation,
  respPersonFullName_validation,
  respPersonPassport_validation,
  extraReferrer_validation,
} from "../../utils/inputValidations";
import CustomPhoneComponent from "../CustomPhoneComponent";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomDateComponent from "../CustomDateComponent";
import Select from "react-select";

import makeAnimated from "react-select/animated";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import CustomDateTimeComponent from "../CustomDateTimeComponent";
import { calculateAge, deleteNullProperties } from "../../utils/helper";
import LoadingSpinner from "../LoadingSpinner";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import ReactQuillEditor from "../ReactQuillEditor";

const brokers = [
  {
    brokerId:123,
    label:"Stepan Martirosyan",
    value:'Stepan Martirosyan',
  },
  {
    brokerId:456,
    label:"Gagik Lalayan",
    value:'Gagik Lalayan',
  },
  {
    brokerId:789,
    label:"Andranik Kirakosyan",
    value:'Andranik Kirakosyan',
  },
]
const customPackageData = [
  {
    packageId:123,
    localCode:45678,
    name:'Բիլիռուբին',
    price:37000
  },
  {
    packageId:124,
    localCode:45679,
    name:'Որովայն',
    price:42000
  },
]
function CreatePatient({
  handleToggleCreateModal,
  refreshData,
  researchState
}) {
  const [medicalServices, setMedicalServices] = useState([]);
  const [patients, setPatients] = useState([]);
  const [addDiagnostic, setAddDiagnostic] = useState(false);
  const [addDoctorsVisit, setAddDoctorsVisit] = useState(false);
  const [addReferrer, setAddReferrer] = useState(false);
  const [referrer, setReferrer] = useState('Ավելացնել աղբյուր');
  const [extraReferrer, setExtraReferrer] = useState(false);
  const [gender, setGender] = useState("");
  const [doctor, setDoctor] = useState("Առանց բժիշկ");
  const [patient, setPatient] = useState("Առանց բժիշկ");
  const [extraDoctor, setExtraDoctor] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [refDoctors, setRefDoctors] = useState("");
  const [additionalPhone, setAdditionalPhone] = useState(false);
  const [researchesPrice, setResearchesPrice] = useState(0);
  const [packagesPrice, setPackagesPrice] = useState(0);
  const [packages, setPackages] = useState([]);
  const [medicalServicePrice,setMedicalServicePrice] = useState(0)
  const [isChild,setIsChild]= useState(false)
  const axiosPrivate = useAxiosPrivate();
  const [additionalData, setAdditionalData] = useState('')
  const animatedComponents = makeAnimated();
  const onMedServiceSelect = (data) => {
          console.log(data);
          const calcPrice = data.reduce((acc,el)=>{
            return acc+=el.price
          },0)
          setMedicalServicePrice(calcPrice)
      
        };
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
  }, []);
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
          //setIsLoading(false);
        })
        .then((resp) => {
          axiosPrivate.get(MEDICALSERVICES_URL).then((resp) => {
            setMedicalServices(resp?.data?.jsonString);
            setIsLoading(false);
          });
        })
        .then((resp) => {
          axiosPrivate.get(REFDOCTORS_URL).then((resp) => {
            setRefDoctors(resp?.data?.jsonString);
            setIsLoading(false);
          });
        }) 
        .then((resp) => {
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
      firstName,
      lastName,
      midName,
      passport,
      email,
      street,
      city,
      state,
      country,
      zipCode,
      gender,
      phone,
      dateOfBirth,
      research,
      visitDate,
      medicalServices,
      refDoctor,
      doctor,
      visitDoctor,
      addPhone,
      respPersonFullName,
      respPersonPassport,
      referrer,
      extraReferrer,
      packages,
    }) => {

console.log(extraReferrer)
console.log(referrer === 'other')
      const newPatient = {
        firstName: firstName,
        lastName: lastName,
        midName: midName,
        referrer: (referrer!=='other')?referrer:null,
        extraReferrer: (referrer === 'other' & !!extraReferrer)?extraReferrer:(referrer !== 'other')?null:null ,
        age: calculateAge(dateOfBirth),
        //lastHandlingDate: handlingDate.current,
        // internalStatus: "Approval",
        // externalStatus:  null,
        researchList: research ? research?.map((el) => el.value) : null,
        // packages:packages.map((el) => el.value),
        additional: additionalData,
        gender: gender,
        doctors: doctor || null,
        serviceType: addDoctorsVisit
          ? "visit"
          : addDiagnostic
          ? "diagnostics"
          : null,
        refDoctor: extraDoctor && refDoctor ? +refDoctor?.id : null,
        contact: {
          email: email,
          phone: phone,
          addPhone:addPhone?addPhone:null,
          passport: passport,
          respPersonPassport: respPersonPassport,
          respPersonFullName: respPersonFullName,
          address: {
            street: street,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
          },
        },
        medicalHistory: "medicalHistory",
        visitDoctor: visitDoctor ? visitDoctor.id : null,
        medicalServices: medicalServices? medicalServices?.map((el) => el.value): null,
        visitDate:visitDate?moment(visitDate).format('YYYY-MM-DD HH:mm'):null,          
        dateOfBirth: dateOfBirth ? moment(dateOfBirth).format('YYYY-MM-DD') : null,
      };
      const updatedData = deleteNullProperties(newPatient)
      console.log(updatedData)
      try {
        await axiosPrivate.post(REGISTER_PATIENT, updatedData, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        handleToggleCreateModal(false);
        refreshData();
        notify(
          `${newPatient.firstName} ${newPatient.lastName} հաճախորդը ավելացված է`
        );
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
  const onGenderSelect = (value) => {
    setGender(value);
    trigger("gender");
  };
  const onDoctorSelect = (data) => {
    if (data.label === "Ուղղորդող բժիշկ") {
      setExtraDoctor(true);
    } else {
      setExtraDoctor(false);
    }
    setDoctor((prev) => data?.id);
  };
  const onReferrerSelect = (data) => { 
    console.log(data)   
    if (data.label === "Ավելացնել աղբյուր") {
      setExtraReferrer(true);
      setReferrer(data?.label)
    } else {
      setExtraReferrer(false);
      setReferrer(data?.label)
    }
  };
  const onResearchSelect = (data) => {
    const calcPrice = data.reduce((acc,el)=>{
      return acc+=el.price
    },0)
    setResearchesPrice(calcPrice)

  };
  const onPackageSelect = (data) => {
    const calcPrice = data.reduce((acc,el)=>{
      return acc+=el.price
    },0)
    setPackagesPrice(calcPrice)

  };
  const toggleAdditionalPhone = (e, value) => {
    e.stopPropagation()
    e.preventDefault()
    setAdditionalPhone(value)
  }
  return (
    <Modal
      show={() => true}
      size="xl"
      onHide={() => handleToggleCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ավելացնել նոր այցելու
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
                    onSubmit={onSubmit}
                    noValidate
                    autoComplete="off"
                    className="container"
                  >
                    <div className="card">
                      <div className="card-header">
                        <a href="#">Անձնական տվյալներ</a>
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
                            <span className="feather-icon">
                              <FeatherIcon icon="edit-2" />
                            </span>
                          </span>
                        </button>
                      </div>
                      <div className="card-body">
                        <div className="modal-body">
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...firstName_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...lastName_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...midName_validation} />
                            </div>
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
                          </div>
                          <div className="row gx-3">
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
                                      appearance: "auto",
                                    }}
                                  />
                                )}
                              />
                            </div>
                            <div className="col-sm-6">
                              <Input {...city_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...street_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...zipCode_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...patientEmail_validation} />
                            </div>
                            <div className="col-sm-6 d-flex">
                              <div className="col-sm-6">
                                <div className="d-flex justify-content-between me-2">
                                  <label
                                    className="form-label"
                                    htmlFor="doctor"
                                  >
                                    Հեռախոս
                                  </label>
                                  {methods?.formState.errors.phone && (
                                    <span className="error text-red">
                                      <span>
                                        <img src={ErrorSvg} alt="errorSvg" />
                                      </span>
                                      պարտադիր
                                    </span>
                                  )}
                                </div>
                                <CustomPhoneComponent
                                  name="phone"
                                  control={methods.control}
                                />
                              </div>
                              {additionalPhone &&
                              <>
                              <div className="col-sm-6">
                                <div className="d-flex justify-content-between ">
                                  <label
                                    className="form-label"
                                    htmlFor="addPhone"
                                  >
                                    Հեռախոս
                                  </label>
                                  {methods?.formState.errors.addPhone && (
                                    <span className="error text-red">
                                      <span>
                                        <img src={ErrorSvg} alt="errorSvg" />
                                      </span>
                                      պարտադիր
                                    </span>
                                  )}
                                </div>
                         <div className="d-flex">
                                <CustomPhoneComponent
                                  name="addPhone"
                                  control={methods.control}
                                  required={false}
                                  />
                                         <div>
                                  <FeatherIcon icon="minus-circle" width='24' onClick={(e)=>toggleAdditionalPhone(e,false)} style={{ cursor: 'pointer',marginTop:'8px' }}   />
                                          </div>                         
                                  </div>
                              </div>
                              </>
                              }
                              <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                paddingTop:'41px'
                              }}
                              >
                                {!additionalPhone &&
                                  <FeatherIcon icon="plus-circle" width='35' onClick={(e)=>toggleAdditionalPhone(e,true)} style={{ cursor: 'pointer' }}   />
                                }
                              </div>
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...passport_validation} />
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <div className="d-flex justify-content-between me-2">
                                  <label
                                    className="form-label"
                                    htmlFor="birthday"
                                  >
                                    Ծննդյան ամսաթիվ
                                  </label>
                                  {methods.formState.errors.dateOfBirth && (
                                    <span className="error text-red">
                                      <span>
                                        <img src={ErrorSvg} alt="errorSvg" />
                                      </span>{" "}
                                      պարտադիր
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <CustomDateComponent
                                    name="dateOfBirth"
                                    control={methods.control}
                                    setIsChild={setIsChild}
                                    maxDate={new Date()}
                                    ignoreTyping={false}
                                  />
                                </div>
                              </div>
                            </div> 
                          </div>
                          <div className="row gx-3">    
                          <div className="col-sm-3">
                              <div className="d-flex justify-content-between me-2">
                                <label
                                  className="form-check-label"
                                  htmlFor="gender"
                                >
                                  Սեռ
                                </label>
                                {methods.formState.errors.gender && (
                                  <span className="error text-red">
                                    <span>
                                      <img src={ErrorSvg} alt="errorSvg" />
                                    </span>{" "}
                                    պարտադիր
                                  </span>
                                )}
                              </div>
                              <div className="d-flex  align-items-center">
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    id="male"
                                    value="Male"
                                    onChange={() => onGenderSelect("Male")}
                                    {...methods.register("gender", {
                                      required: true,
                                    })}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="male"
                                  >
                                    Արական
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    id="female"
                                    value="Female"
                                    onChange={() => onGenderSelect("Female")}
                                    {...methods.register("gender", {
                                      required: true,
                                    })}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="female"
                                  >
                                    Իգական
                                  </label>
                                </div>
                              </div>
                            </div>
                            </div>
                        </div>
                      </div>
                    </div>
                          {isChild &&
                          <>
                                              <div className="separator-full"></div>

                           <div className="card">
                           <div className="card-body">
                        <div className="modal-body">
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...respPersonFullName_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...respPersonPassport_validation} />
                            </div>
                          </div>
                          </div>
                          </div>
                          </div>
                          </>
                          }
                    <div className="separator-full"></div>
                    <div className="card">
                          <div className="card-body">
                          <div className="row gx-3 d-flex" style={{
                              // 
                              marginTRop:'10px',
                              padding:'5px',
                              borderRadius:'10px'}} >
                          
                              <div className="col-sm-4">
                                <label>Ավելացնել ախտորոշում</label>
                                <div>
                                  <input
                                    type="checkbox"
                                    name="selectDiagnostic"
                                    checked={addDiagnostic}
                                    disabled={addDoctorsVisit}
                                    onChange={(e) =>
                                      setAddDiagnostic(e.target.checked)
                                    }
                                    style={{ transform: "scale(1.5)" }}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-4">
                                <label>Ավելացնել բժշկի այց</label>
                                <div>
                                  <input
                                    type="checkbox"
                                    name="selectDoctorsVisit"
                                    checked={addDoctorsVisit}
                                    disabled={addDiagnostic}
                                    onChange={(e) =>
                                      setAddDoctorsVisit(e.target.checked)
                                    }
                                    style={{ transform: "scale(1.5)" }}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-4">
                                <label>Ավելացնել տեղեկացվածության աղբյուր</label>
                                <div>
                                  <input
                                    type="checkbox"
                                    name="selectBroker"
                                    checked={addReferrer}
                                    onChange={(e) =>
                                      setAddReferrer(e.target.checked)
                                    }
                                    style={{ transform: "scale(1.5)" }}
                                  />
                                </div>
                              </div>
                          </div>
                          </div>
                        </div>
                    
                    {addDiagnostic && (
                      <>
                        <div className="card">
                          <div className="card-header">
                            <a href="#">Ախտորոշումներ</a>
                            <button
                              className="btn btn-xs btn-icon btn-rounded btn-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Add Tags"
                            >
                              <span
                                className="icon"
                                data-bs-toggle="modal"
                                data-bs-target="#tagsInput"
                              >
                                <span className="feather-icon">
                                  <FeatherIcon icon="edit-2" />
                                </span>
                              </span>
                            </button>
                          </div>
                          <div className="card-body">
                            <div className="modal-body">
                              <div className="row gx-3">
                                {/* <div className="col-sm-6">
                                  <label
                                    className="form-label"
                                    htmlFor="doctor"
                                  >
                                    Բժիշկներ
                                  </label>
                                  <Multiselect
                                    options={[
                                      ...[
                                        { doctorName: "Առանց բժիշկ" },
                                        { doctorName: "Ուղղորդող բժիշկ" },
                                      ],
                                      ...doctors,
                                    ]}
                                    onSelect={onDoctorSelect} // Function will trigger on select event
                                    //  onRemove={onResearchDelete} // Function will trigger on remove event
                                    closeOnSelect={true}
                                    singleSelect
                                    displayValue="doctorName"
                                    id="input_tags_4"
                                    className="form-control"
                                    ref={multiselectRef}
                                    hidePlaceholder={true}
                                    placeholder="Ընտրել բժշկին"
                                    selectedValues={[
                                      { doctorName: "Առանց բժիշկ" },
                                    ]}
                                    style={{
                                      height: "10rem",
                                      overflow: "hidden",
                                    }}
                                  />
                                </div> */}
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
                                      rules={{ required: false }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          onChange={(val) => {
                                            field.onChange(val.id);
                                            onDoctorSelect(val);
                                          }}
                                          value={doctors.find(
                                            (option) => option.label === doctor
                                          )}
                                          options={[
                                            {
                                              value: "Առանց բժիշկ",
                                              label: "Առանց բժիշկ",
                                              id: null,
                                            },
                                            {
                                              value: "Ուղղորդող բժիշկ",
                                              label: "Ուղղորդող բժիշկ",
                                              id: null,
                                            },
                                            ...doctors.map((item) => ({
                                              value: item.doctorName,
                                              label: item.doctorName,
                                              id: item.doctorId,
                                            })),
                                          ]}
                                          placeholder={"Ընտրել"}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                                {extraDoctor && (
                                  <div className="col-sm-6">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="refDoctors"
                                        placeholder={"Ընտրել"}
                                      >
                                        Ուղղորդող բժիշկներ
                                      </label>
                                      {methods.formState.errors.refDoctor && (
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
                                        name="refDoctor"
                                        control={methods.control}
                                        isClearable={true}
                                        defaultValue={null}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                          <Select
                                            {...field}
                                            //  onChange={(val) => {
                                            //    field.onChange(val.id);
                                            //    onRefDoctorSelect(val);
                                            //  }}
                                            //  value={refDoctors.find(
                                            //    (option) => option.value === refDoctor
                                            //  )}
                                            options={refDoctors.map((item) => ({
                                              value: item.doctorName,
                                              label: item.doctorName,
                                              id: item.refDoctorsId,
                                            }))}
                                            placeholder={"Ընտրել"}
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>
                                  // <div className="col-sm-6">
                                  //   <label
                                  //     className="form-label"
                                  //     htmlFor="doctor"
                                  //   >
                                  //     Ուղղորդող բժիշկներ
                                  //   </label>
                                  //   <Multiselect
                                  //     options={refDoctors}
                                  //     onSelect={onRefDoctorSelect} // Function will trigger on select event
                                  //     //  onRemove={onResearchDelete} // Function will trigger on remove event
                                  //     closeOnSelect={true}
                                  //     singleSelect
                                  //     displayValue="doctorName"
                                  //     id="input_tags_4"
                                  //     className="form-control"
                                  //     ref={multiselectRef}
                                  //     hidePlaceholder={true}
                                  //     placeholder="Ընտրել բժշկին"
                                  //     style={{
                                  //       height: "10rem",
                                  //       overflow: "hidden",
                                  //     }}
                                  //   />
                                  // </div>
                                )}
                              </div>
                              <div className="row gx-3 mt-2">
                                <div className="col-sm-12">
                                  <div className="d-flex justify-content-between me-2">
                                  {researchesPrice ? <div className="d-flex flex-row-reverse" ><p style={{color:'#4eafcb',}}>Ընդհանուր արժեք։ <span style={{fontWeight:'bold'}} >{researchesPrice}</span>դր․</p></div>:''}
                                    <label
                                      className="form-label"
                                      htmlFor="research"
                                      placeholder={"Ընտրել"}
                                    >
                                      Ընտրել հետազոտություն
                                    </label>
                                    {methods.formState.errors.research && (
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
                                      name="research"
                                      control={methods.control}
                                      isClearable={true}
                                      defaultValue={null}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            onResearchSelect(val);
                                          }}
                                          value={field.value}
                                          isMulti
                                          closeMenuOnSelect={false}
                                          components={animatedComponents}
                                          options={researchState.map((res) => ({
                                            value: res.researchListId,
                                            label: `${res?.researchListId} - ${res?.researchName}`,
                                            //label:`${res.researchName} - ${res.price}`,
                                            price: res?.price
                                          }))}
                                          styles={colourStyles}
                                          placeholder={"Հետազոտություններ"}
                                        />
                                      )}
                                    />
                                    
                                  </div>
                                </div>
                              </div>
                              {/* <div className="row gx-3 mt-2">
                                <div className="col-sm-12">
                                  <div className="d-flex justify-content-between me-2">
                                  {packagesPrice ? <div className="d-flex flex-row-reverse" ><p style={{color:'#4eafcb',}}>Ընդհանուր արժեք։ <span style={{fontWeight:'bold'}} >{packagesPrice}</span>դր․</p></div>:''}
                                    <label
                                      className="form-label"
                                      htmlFor="packages"
                                      placeholder={"Ընտրել"}
                                    >
                                      Ընտրել փաթեթ
                                    </label>
                                    {methods.formState.errors.packages && (
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
                                      name="packages"
                                      control={methods.control}
                                      isClearable={true}
                                      defaultValue={null}
                                      rules={{ required: false }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          onChange={(val) => {
                                            field.onChange(val);
                                            onPackageSelect(val);
                                          }}
                                          value={field.value}
                                          isMulti
                                          closeMenuOnSelect={false}
                                          components={animatedComponents}
                                          options={packages.map((pack) => ({
                                            value: pack.packageId,
                                            label: `${pack?.packageId} - ${pack?.name}`,
                                            //label:`${res.researchName} - ${res.price}`,
                                            price: pack?.price
                                          }))}
                                          styles={colourStyles}
                                          placeholder={"Փաթեթներ"}
                                        />
                                      )}
                                    />
                                    
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="separator-full"></div>
                      </>
                    )}
                    {addDoctorsVisit && (
                      <>
                        <div className="card">
                          <div className="card-header">
                            <a href="#">Բժշկի այց</a>
                            <button
                              className="btn btn-xs btn-icon btn-rounded btn-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Add Tags"
                            >
                              <span
                                className="icon"
                                data-bs-toggle="modal"
                                data-bs-target="#tagsInput"
                              >
                                <span className="feather-icon">
                                  <FeatherIcon icon="edit-2" />
                                </span>
                              </span>
                            </button>
                          </div>
                          <div className="card-body">
                            <div className="modal-body">
                              <div className="row gx-3">
                                {/* <div className="col-sm-6">
                                  <label
                                    className="form-label"
                                    htmlFor="visitDoctorName"
                                  >
                                    Բժիշկներ
                                  </label>
                                  <Multiselect
                                    options={doctors}
                                    onSelect={onDoctorSelect} // Function will trigger on select event
                                    //  onRemove={onResearchDelete} // Function will trigger on remove event
                                    closeOnSelect={true}
                                    singleSelect
                                    displayValue="doctorName"
                                    id="input_tags_4"
                                    className="form-control"
                                    ref={multiselectRef}
                                    hidePlaceholder={true}
                                    placeholder="Ընտրել բժշկին"
                                    style={{
                                      height: "10rem",
                                      overflow: "hidden",
                                    }}
                                  />
                                </div> */}
                                <div className="col-sm-6">
                                  <div className="d-flex justify-content-between me-2">
                                    <label
                                      className="form-label"
                                      htmlFor="visitDoctor"
                                      placeholder={"Ընտրել"}
                                    >
                                      Բժիշկներ
                                    </label>
                                    {methods.formState.errors.visitDoctor && (
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
                                      name="visitDoctor"
                                      control={methods.control}
                                      isClearable={true}
                                      defaultValue={null}
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          // onChange={(val) => {
                                          //   field.onChange(val.id);
                                          //   onVisitDoctorSelect(val);
                                          // }}
                                          // value={doctors.find(
                                          //   (option) => option.value === doctor
                                          // )}
                                          options={doctors.map((item) => ({
                                            value: item.doctorName,
                                            label: item.doctorName,
                                            id: item.doctorId,
                                          }))}
                                          placeholder={"Ընտրել"}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <div className="d-flex justify-content-between me-2">
                                      <label
                                        className="form-label"
                                        htmlFor="purchaseDate"
                                      >
                                        Այցի ամսաթիվ
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
                                        control={methods.control}
                                        required={false}
                                        methods={methods}
                                      />
                                    </div>
                                  </div>
                                </div>
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
                                    {methods.formState.errors
                                      .medicalServices && (
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
                                            label: `${res?.medServiceId}. ${res?.serviceName}`,
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
                        <div className="separator-full"></div>
                      </>
                    )}
                    {addReferrer && (
                      <>
                        <div className="card">
                          <div className="card-header">
                            <a href="#">Տեղեկացվածության աղբյուր</a>
                            <button
                              className="btn btn-xs btn-icon btn-rounded btn-light"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Add Tags"
                            >
                              <span
                                className="icon"
                                data-bs-toggle="modal"
                                data-bs-target="#tagsInput"
                              >
                                <span className="feather-icon">
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
                                      htmlFor="brokers"
                                    >
                                      Աղբյուր
                                    </label>
                                    {methods.formState.errors.referrer && (
                                      <span className="error text-red">
                                        <span>
                                          <img src={ErrorSvg} alt="errorSvg" />
                                        </span>{" "}
                                        պարտադիր
                                      </span>
                                    )}
                                  </div>
                                  {console.log(addReferrer)}
                                  <div className="form-control">
                                    <Controller
                                      name="referrer"
                                      control={methods.control}
                                      defaultValue={null}
                                      rules={{ required: false }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          onChange={(val) => {
                                            field.onChange(val ? val.value : null);
                                            onReferrerSelect(val);
                                          }}
                                          value={patients.find(
                                            (option) =>
                                              option.value === referrer
                                          )}
                                          options={[
                                            {
                                              value: "other",
                                              label: "Ավելացնել աղբյուր",
                                              id: null,
                                            },
                                            ...patients.map((item) => ({
                                              value: item.patientId,
                                              label: `${item?.patientId}․  ${item?.firstName} ${item?.lastName } ${item?.midName }`,
                                            })),
                                          ]}
                                          placeholder={"Ընտրել"}
                                        />
                                      //   <Select
                                      //   {...field}
                                      //   onChange={(val) => {
                                      //     field.onChange(val.value);
                                      //     onDiagnosticClassSelect(val);
                                      //   }}
                                      //   value={diagnosticClassState.find(
                                      //     (option) =>
                                      //       option.value === diagnosticsType
                                      //   )}
                                      //   options={diagnosticClassState}
                                      //   placeholder={"Ընտրել"}
                                      // />
                                      )}
                                    />
                                  </div>
                                </div>
                                {extraReferrer && 
                                <div className="col-sm-6">
                              <Input {...extraReferrer_validation} />
                            </div>
                                }
                              </div>
                              
                            </div>
                          </div>
                        </div>
                        <div className="separator-full"></div>
                      </>
                    )}
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
                            className="icon"
                            data-bs-toggle="modal"
                            data-bs-target="#moreContact"
                          >
                            <span className="feather-icon">
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
                            <ReactQuillEditor
                                value={additionalData}
                                onChange={setAdditionalData}
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
         )}
         </Suspense>
      </Modal.Body>
    </Modal>
  );
}

export default CreatePatient;
