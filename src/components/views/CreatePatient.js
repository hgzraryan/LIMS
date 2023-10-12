import React from "react";
import { Modal } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import { useRef } from "react";
import {  selectResearches} from '../../redux/features/researches/researchesSlice'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import {
  firstName_validation,
  lastName_validation,
  midName_validation,
  email_validation,
  mobile_validation,
  address_validation,
  age_validation,
} from "../../utils/inputValidations";


const REGISTER_URL = "/registerPatient";

function CreatePatient({
  handleToggleCreateModal,
  getPatients,
}) {
  const [researchesArray, setResearchesArray] = useState([]);
  const [researchesPrice, setResearchesPrice] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const researchState = useSelector(selectResearches)
  const [errMsg, setErrMsg] = useState("");
  const methods = useForm({
    mode: "onChange",
  });
  const axiosPrivate = useAxiosPrivate();
  const researchesRef = useRef("");
  const handlingDate = useRef("");
  const multiselectRef = useRef("");
  const editorRef = useRef(null);

  const getDate = (date) => {
    setStartDate(date);
    handlingDate.current =
      date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
  };
  const onSubmit = methods.handleSubmit(async (data) => {
    const newPatient = {
      ...data,
      age: parseInt(data["age"]),
      totalPrice:researchesPrice,
      handlingDate: handlingDate.current,
      researchList: researchesRef.current,
      additional: editorRef.current.getContent({ format: "text" }),
    };
    const formData = JSON.stringify(newPatient);

    try {
      await axiosPrivate.post(REGISTER_URL, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      handleToggleCreateModal(false);
      getPatients();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg(" Failed");
      }
    }
  });
  const onResearchSelect = (data) => {
    let researchesArr = [];
    let researchesPrice = [];
    for (let research of data) {
      researchesArr.push(Object.values(research)[1]);
      researchesPrice.push(Object.values(research)[3]);
    }
    researchesPrice=researchesPrice.reduce((acc,el)=>acc+=el,0)
    setResearchesArray((prev) => (prev = researchesArr));
    setResearchesPrice((prev) => (prev = researchesPrice));
  };
  const onResearchDelete = (data) => {
    let researchesArr = [];
    for (let research of data) {
      researchesArr.push(Object.values(research)[0]);
    }
    setResearchesArray((prev) => (prev = researchesArr));

    //reset selected options colors
    const elems = document.querySelectorAll(".chips");
    elems.forEach((element) => {
      element.classList.remove("chips");
    });
  };
  const onAdd = (e) => {
    researchesRef.current = researchesArray;
    //multiselectRef.current.resetSelectedValues()
    const elems = document.querySelectorAll(".chip");
    elems.forEach((element) => {
      element.classList.add("chips");
    });
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
                              <Input {...address_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...email_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...mobile_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...age_validation} />
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
                                    options={researchState.options} // Options to display in the dropdown
                                    displayValue="name" // Property name to display in the dropdown options
                                    onSelect={onResearchSelect} // Function will trigger on select event
                                    onRemove={onResearchDelete} // Function will trigger on remove event
                                    closeOnSelect={true}
                                    id="input_tags_3"
                                    className="form-control"
                                    ref={multiselectRef}
                                    hidePlaceholder={true}
                                    placeholder="Հետազոտություններ"
                                    groupBy="category"
                                  />
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="btn btn-primary float-end"
                              onClick={onAdd}
                              data-bs-dismiss="modal"
                            >
                              Ավելացնել
                            </button>
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
