import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { REGISTER_PATIENT } from "../../utils/constants";
import {
  firstName_validation,
  lastName_validation,
  midName_validation,
  email_validation,
  mobile_validation,
  zipCode_validation,
  street_validation,
  city_validation,
  state_validation,
  country_validation,
} from "../../utils/inputValidations";
import { useCalculateAge } from "../../hooks/useCalculateAge";
import { selectDoctors } from "../../redux/features/doctor/doctorsSlice";
import { useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
function CreatePatient({
  handleToggleCreateModal,
  getPatients,
  researchState,
}) {
  const [researchesArray, setResearchesArray] = useState([]);
  const [researchesPrice, setResearchesPrice] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState("");
  const [doctor, setDoctor] = useState("");
  const doctors = useSelector(selectDoctors);

  const [errMsg, setErrMsg] = useState("");
  const methods = useForm({
    mode: "onChange",
  });
  const axiosPrivate = useAxiosPrivate();
  const handlingDate = useRef("");
  const multiselectRef = useRef("");
  const editorRef = useRef(null);
  const doctorRef = useRef(null);
  const { age } = useCalculateAge(birthday);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const getDate = (date) => {
    setStartDate(date);
    handlingDate.current =
      date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
  };
  const getAge = (date) => {
    setBirthday(date);
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
    
  const onSubmit = methods.handleSubmit(
    async ({
      firstName,
      lastName,
      midName,
      email,
      street,
      city,
      state,
      country,
      zipCode,
    }) => {
      const newPatient = {
        firstName: firstName,
        lastName: lastName,
        midName: midName,
        age: age,
        lastHandlingDate: handlingDate.current,
        researchList: researchesArray,
        additional: editorRef.current.getContent({ format: "text" }),
        gender: gender,
        doctors:doctor,
        contact: {
          email: email,
          phone: phoneNumber,
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
          birthday.getTime() - birthday.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0],
      };

      console.log(newPatient);
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
  const onGenderSelect = (event) => {
    setGender((prev) => event.target.value);
  };
  const onDoctorSelect = (data) => {
    console.log('**********');
    console.log('data',data);
    console.log('**********',);
    
    setDoctor(prev=> data[0].key);
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
          Ավելացնել նոր Հիվանդի
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
                              <label className="form-label" htmlFor="doctor">
                                Հեռախոս
                              </label>
                              <PhoneInput
                                placeholder="Enter phone number"
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
                              <div className="mb-2">
                                <label
                                  className="form-check-label"
                                  htmlFor="male"
                                >
                                  Սեռ
                                </label>
                              </div>
                              <div className="d-flex  align-items-center">
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    id="male"
                                    value="Male"
                                    checked={gender === "Male"}
                                    onChange={onGenderSelect}
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
                                    checked={gender === "Female"}
                                    onChange={onGenderSelect}
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
                            <div className="col-sm-6">
                              <label className="form-label" htmlFor="doctor">
                                Բժիշկներ
                              </label>
                              <Multiselect
                                options={doctors.map((doctor) => ({
                                  key: doctor.doctorId,
                                  value: `${doctor.doctorName} `,
                                }))}
                                onSelect={onDoctorSelect} // Function will trigger on select event
                                //  onRemove={onResearchDelete} // Function will trigger on remove event
                                closeOnSelect={true}
                                singleSelect
                                displayValue="value"
                                id="input_tags_4"
                                className="form-control"
                                ref={multiselectRef}
                                hidePlaceholder={true}
                                placeholder="Ընտրել Բժշկին"
                                style={{
                                  height: "10rem",
                                  overflow: "hidden",
                                }}
                              />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  htmlFor="handlingDate"
                                >
                                  Ծննդյան ամսաթիվ
                                </label>
                                <div>
                                  <DatePicker
                                    showYearDropdown
                                    yearDropdownItemNumber={100}
                                    scrollableYearDropdown
                                    selected={birthday}
                                    onChange={(date) => getAge(date)}
                                    dateFormat={"yyyy-MM-dd"}
                                    isClearable
                                    placeholderText="Select date"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="separator-full"></div>
                    <div className="card">
                      <div className="card-header">
                        <a href="#">Հետազոտություններ</a>
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
                          <h6 className="text-uppercase fw-bold mb-3">
                            Ընտրել
                          </h6>
                          <form>
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
                          </form>
                        </div>
                      </div>
                    </div>
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

export default CreatePatient;
