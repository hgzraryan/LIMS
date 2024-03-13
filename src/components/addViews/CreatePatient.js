import React, { useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import FeatherIcon from "feather-icons-react";
import ErrorSvg from "../../dist/svg/error.svg";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormProvider, useForm, useController } from "react-hook-form";
import { Input } from "../Input";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { DOCTORS_URL, REGISTER_PATIENT } from "../../utils/constants";
import {
  firstName_validation,
  lastName_validation,
  midName_validation,
  email_validation,
  zipCode_validation,
  street_validation,
  city_validation,
  state_validation,
  country_validation,
  passport_validation,
} from "../../utils/inputValidations";
import { useCalculateAge } from "../../hooks/useCalculateAge";
import { selectDoctors } from "../../redux/features/doctor/doctorsSlice";
import { useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { selectRefDoctors } from "../../redux/features/refDoctors/refDoctorsSlice";
import CustomPhoneComponent from "../CustomPhoneComponent";
import CustomDateComponent from "../CustomDateComponent";

function CreatePatient({
  handleToggleCreateModal,
  getPatients,
  researchState,
}) {
  const [researchesArray, setResearchesArray] = useState([]);
  const [addDiagnostic, setAddDiagnostic] = useState(false);
  const [addDoctorsVisit, setAddDoctorsVisit] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [doctor, setDoctor] = useState("Առանց բժիշկ");
  const [refDoctor, setRefDoctor] = useState("Առանց բժիշկ");
  const [extraDoctor, setExtraDoctor] = useState(false);
  const refDoctors = useSelector(selectRefDoctors);
  const [errMsg, setErrMsg] = useState("");
  const [doctors,setDoctors] = useState([]);

  const { trigger } = useForm();

  const methods = useForm({
    mode: "onChange",
  });
  const axiosPrivate = useAxiosPrivate();
  const handlingDate = useRef("");
  const multiselectRef = useRef("");
  const editorRef = useRef(null);

  useEffect(()=>{
    setTimeout(() => {
      
      axiosPrivate.get(DOCTORS_URL).then((resp)=>{
        setDoctors(prev=>resp?.data?.jsonString)
     }).catch((err)=>{
       console.log(err)
     })
    }, 1000);
 },[])
  const getDate = (date) => {
    setStartDate(date);
    handlingDate.current =
      date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
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
    const calculateAge =(dateOfBirth) => {
      // Convert the birthdate string to a Date object
      const birthdateObj = new Date(dateOfBirth);
    
      // Get the current date
      const currentDate = new Date();
    
      // Calculate the difference in years
      let age = currentDate.getFullYear() - birthdateObj.getFullYear();
    
      // Check if the birthday hasn't occurred yet this year
      if (
        currentDate.getMonth() < birthdateObj.getMonth() ||
        (currentDate.getMonth() === birthdateObj.getMonth() &&
          currentDate.getDate() < birthdateObj.getDate())
      ) {
        age--;
      }
    
      return age;
    }
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
      dateOfBirth
    }) => {
      const newPatient = {
        firstName: firstName,
        lastName: lastName,
        midName: midName,
        age: calculateAge(dateOfBirth),
        //lastHandlingDate: handlingDate.current,
        researchList: researchesArray,
        additional: editorRef.current.getContent({ format: "text" }),
        gender: gender,
        doctors: doctor,
        refDoctor: refDoctor,
        contact: {
          email: email,
          phone: phone,
          passport: passport,
          address: {
            street: street,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
          },
        },
        medicalHistory: "medicalHistory",
        dateOfBirth: new Date(
          dateOfBirth.getTime() - dateOfBirth.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0],
      };

      //console.log(newPatient);

      try {
        await axiosPrivate.post(REGISTER_PATIENT, newPatient, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        handleToggleCreateModal(false);
        getPatients();
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
    if (data[0].doctorName === "Ուղղորդող բժիշկ") {
      setExtraDoctor(true);
    } else {
      setExtraDoctor(false);
    }
    setDoctor((prev) => data[0].doctorName);
  };
  const onRefDoctorSelect = (data) => {
    setRefDoctor((prev) => data[0].doctorName);
  };
  const onResearchSelect = (data) => {
    let researchesArr = [];
    //let researchesPrice = [];
    for (let research of data) {
      researchesArr.push(research?.researchListId.toString());
      // researchesPrice.push(research?.researchListPrice);
    }
    //researchesPrice = researchesPrice.reduce((acc, el) => (acc += el), 0);
    setResearchesArray((prev) => (prev = researchesArr));
    // setResearchesPrice((prev) => (prev = researchesPrice));
  };
  const onResearchDelete = (data) => {
    let researchesArr = [];
    for (let research of data) {
      researchesArr.push(research?.researchListId.toString());
    }
    setResearchesArray((prev) => (prev = researchesArr));
  };
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
                              <Input {...country_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...state_validation} />
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
                              <Input {...email_validation} />
                            </div>
                            <div className="col-sm-6">
                              <div className="d-flex justify-content-between me-2">
                                <label className="form-label" htmlFor="doctor">
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
                              <CustomPhoneComponent name="phone"  control={methods.control} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...passport_validation} />
                            </div>

                            <div className="col-sm-6">
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
                            {/* <div className="col-sm-6">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  htmlFor="handlingDate"
                                >
                                  Հանձնման ամսաթիվ
                                </label>
                                <div>
                                  <DatePicker
                                    selected={startDate}
                                    showTimeSelect
                                    onChange={(date) => getDate(date)}
                                    dateFormat={"dd/MM/yyyy HH:mm"}
                                    timeFormat="HH:mm"
                                    minDate={new Date()}
                                    isClearable
                                    placeholderText="Select date"
                                  />
                                </div>
                              </div>
                            </div> */}
                          </div>
                          <div className="row gx-3">
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
                                <div >
                                  <CustomDateComponent name="dateOfBirth" control={methods.control}/>
                              
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6 d-flex">
                            <div className="col-sm-6">
                              <label>Ավելացնել ախտորոշում</label>
                              <div>
                                <input
                                  type="checkbox"
                                  name="selectDiagnostic"
                                  checked={addDiagnostic}
                                  onChange={(e) =>
                                    setAddDiagnostic(e.target.checked)
                                  }
                                  style={{ transform: "scale(1.5)" }}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <label>Բժշկի այց</label>
                              <div>
                                <input
                                  type="checkbox"
                                  name="selectDoctorsVisit"
                                  checked={addDoctorsVisit}
                                  onChange={(e) =>
                                    setAddDoctorsVisit(e.target.checked)
                                  }
                                  style={{ transform: "scale(1.5)" }}
                                />
                              </div>
                            </div>
                            </div>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                    <div className="separator-full"></div>

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
                                <div className="col-sm-6">
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
                                </div>
                                {extraDoctor && (
                                  <div className="col-sm-6">
                                    <label
                                      className="form-label"
                                      htmlFor="doctor"
                                    >
                                      Ուղղորդող բժիշկներ
                                    </label>
                                    <Multiselect
                                      options={refDoctors}
                                      onSelect={onRefDoctorSelect} // Function will trigger on select event
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
                                  </div>
                                )}
                              </div>
                              <div className="row gx-3 mt-2">
                                <label
                                  className="form-label"
                                  htmlFor="input_tags_3"
                                >
                                  Ընտրել
                                </label>
                                <div className="row gx-3">
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <Multiselect
                                        options={researchState}
                                        displayValue="researchName"
                                        onSelect={onResearchSelect}
                                        onRemove={onResearchDelete}
                                        closeOnSelect={true}
                                        id="input_tags_3"
                                        className="form-control"
                                        ref={multiselectRef}
                                        hidePlaceholder={true}
                                        placeholder="Հետազոտություններ"
                                        groupBy="category"
                                        style={{
                                          height: "10rem",
                                          overflow: "hidden",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
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
                                <div className="col-sm-6">
                                  <label
                                    className="form-label"
                                    htmlFor="doctor"
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
                                    selectedValues={[
                                      { doctorName: "Առանց բժիշկ" },
                                    ]}
                                    style={{
                                      height: "10rem",
                                      overflow: "hidden",
                                    }}
                                  />
                                </div>
                                
                              </div>
                             
                            </div>
                          </div>
                        </div>                        
                        <div className="separator-full"></div>
                      </>
                    )}
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

export default CreatePatient;
