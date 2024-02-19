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
} from "../../utils/inputValidations";
import useSubmitForm from "../../hooks/useSubmitForm";
import Multiselect from "multiselect-react-dropdown";
import { REGISTER_DIAGNOSTICS } from "../../utils/constants";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectDoctors } from "../../redux/features/doctor/doctorsSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const diagnosticClassState = [
  { class: "Արտաքին" },
  { class: "Ներքին" },
  { class: "Այլ" },
];
const diagnosticStatus = [
  { status: "Ընդունված" },
  { status: "Հետաձգված" },
  { status: "Ընթացքում" },
  { status: "այլ" },
];
const partnerState = [
  { partner: "Diagen+" }, 
  { partner: "Dialab" }
];
function AddDiagnostic({
  handleToggleCreateModal,
  getDiagnostics,
  researchesState,
  patients,
}) {
  const axiosPrivate = useAxiosPrivate();
  const [errMsg, setErrMsg] = useState("");
  const multiselectRef = useRef("");
  const editorRef = useRef(null);
  const patientRef = useRef("");
  const additionalData = useRef("");
  const diagnosticClassRef = useRef("");
  const [externalType, setExternalType] = useState(false);
  const [researchesIds, setResearchesIds] = useState([]);
  const [partnerName, setPartnerName] = useState("");
  const [diagnosticsType, setDiagnosticsType] = useState("Internal");
  const [intDiagnosticsStatus, setIntDiagnosticsStatus] = useState(null);
  const [extDiagnosticsStatus, setExtDiagnosticsStatus] = useState(null);
  const [doctor, setDoctor] = useState("");
  const doctors = useSelector(selectDoctors);

  const methods = useForm({
    mode: "onChange",
  });
  const onResearchSelect = (data) => {
    let researchesArr = [];
    //let researchesPrice = [];
    for (let research of data) {
      researchesArr.push(research?.researchListId.toString());
      // researchesPrice.push(research?.researchListPrice);
    }
    //researchesPrice = researchesPrice.reduce((acc, el) => (acc += el), 0);
    setResearchesIds((prev) => (prev = researchesArr));
    // setResearchesPrice((prev) => (prev = researchesPrice));
  };
  const onResearchDelete = (data) => {
    let researchesArr = [];
    for (let research of data) {
      researchesArr.push(research?.researchListId.toString());
    }
    setResearchesIds((prev) => (prev = researchesArr));
  };
  const onDoctorSelect = (data) => {
    setDoctor((prev) => data[0].key);
  };
  const onDiagnosticClassSelect = (data) => {
    switch (data[0].class) {
      case "Արտաքին":
        setDiagnosticsType("External");
        setExternalType(true);
        break;
      case "Ներքին":
        setDiagnosticsType("Internal");
        setExternalType(false);
        break;
      case "Այլ":
        setDiagnosticsType("Other");
        setExternalType(false);
        break;
      default:
        break;
    }
  };
  const onInternalDiagnosticStatusSelect = (data) => {
    switch (data[0].status) {
      case "Ընդունված":
        setIntDiagnosticsStatus("Approval");
        break;
      case "Հետաձգված":
        setIntDiagnosticsStatus("Delayed");
        break;
      case "Ընթացքում":
        setIntDiagnosticsStatus("Generated");
        break;
      case "այլ":
        setIntDiagnosticsStatus("Other");
        break;
      default:
        break;
    }
  };
  const onExternalDiagnosticStatusSelect = (data) => {
    switch (data[0].status) {
      case "Ընդունված":
        setExtDiagnosticsStatus("Approval");
        break;
      case "Հետաձգված":
        setExtDiagnosticsStatus("Delayed");
        break;
      case "Ընթացքում":
        setExtDiagnosticsStatus("Generated");
        break;
      case "այլ":
        setExtDiagnosticsStatus("Other");
        break;
      default:
        break;
    }
  };
  const onPartnerSelect = (data) => {
    setPartnerName(data[0].partner);
  };
  const onPatientSelect = (data) => {
    patientRef.current = data[0].key; //get patientID
    console.log(patientRef.current);
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

  const onSubmit = methods.handleSubmit(async (data) => {
    const newDiagnose = {
      diagnosticsName: data.name,
      class: diagnosticsType,
      internalStatus: intDiagnosticsStatus,
      externalStatus: extDiagnosticsStatus,
      researchIds: researchesIds,
      patientId: patientRef.current,
      doctors: doctor,
      //partner:partner,
      additional: editorRef.current.getContent({ format: "text" }),
    };

    console.log(newDiagnose);
    try {
      await axiosPrivate.post(REGISTER_DIAGNOSTICS, newDiagnose, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      handleToggleCreateModal(false);
      getDiagnostics();
      notify(
        `${newDiagnose.diagnosticsName} Ախտորոշումը ավելացված է`
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
  });
  // const { onSubmit, methods } = useSubmitForm(
  //   REGISTER_DIAGNOSTICS,
  //   editorRef,
  //   getDiagnostics,
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
          Ավելացնել նոր ախտորոշում
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
                        <a href="#">Ախտորոշման տվյալներ</a>
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
                              <label
                                className="form-label"
                                htmlFor="diagnosticsClass"
                              >
                                Ախտորոշման տեսակ
                              </label>
                              <Multiselect
                                options={diagnosticClassState} // Options to display in the dropdown
                                displayValue="class" // Property name to display in the dropdown options
                                onSelect={onDiagnosticClassSelect} // Function will trigger on select event
                                //  onRemove={onResearchDelete} // Function will trigger on remove event
                                closeOnSelect={true}
                                singleSelect
                                id="input_tags_3"
                                className="form-control"
                                ref={diagnosticClassRef}
                                placeholder="Ախտորոշման տեսակ"
                                //hidePlaceholder={true}
                                selectedValues={[{ class: "Ներքին" }]}
                                style={{
                                  height: "10rem",
                                  overflow: "hidden",
                                }}
                              />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <label
                                className="form-label"
                                htmlFor="internalDiagnosticsStatus"
                              >
                                Ներքին ախտորոշման կարգավիճակ
                              </label>
                              <Multiselect
                                options={diagnosticStatus} // Options to display in the dropdown
                                displayValue="status" // Property name to display in the dropdown options
                                onSelect={onInternalDiagnosticStatusSelect} // Function will trigger on select event
                                //  onRemove={onResearchDelete} // Function will trigger on remove event
                                closeOnSelect={true}
                                singleSelect
                                id="input_tags_4"
                                className="form-control"
                                placeholder="Ընտրեք կարգավիճակը"
                                //hidePlaceholder={true}
                                style={{
                                  height: "10rem",
                                  overflow: "hidden",
                                }}
                              />
                            </div>
                            <div className="col-sm-6">
                              <label className="form-label" htmlFor="research">
                                Հետազոտություններ
                              </label>
                              <Multiselect
                                options={researchesState} // Options to display in the dropdown
                                displayValue="researchName" // Property name to display in the dropdown options
                                onSelect={onResearchSelect} // Function will trigger on select event
                                onRemove={onResearchDelete} // Function will trigger on remove event
                                closeOnSelect={true}
                                id="input_tags_3"
                                className="form-control"
                                ref={multiselectRef}
                                hidePlaceholder={true}
                                placeholder="Հետազոտություններ"
                                groupBy="category_name"
                                style={{
                                  height: "10rem",
                                  overflow: "hidden",
                                }}
                              />
                            </div>
                          </div>
                          <div className="row gx-3"></div>
                          <div className="row gx-3"></div>
                          {externalType && (
                            <div className="row gx-3">
                              {console.log("asd")}
                              <div className="col-sm-6">
                                <label className="form-label" htmlFor="partner">
                                  Գործընկեր
                                </label>
                                <Multiselect
                                  options={partnerState}
                                  displayValue="partner"
                                  onSelect={onPartnerSelect}
                                  closeOnSelect={true}
                                  singleSelect
                                  id="input_tags_4"
                                  className="form-control"
                                  hidePlaceholder={true}
                                  placeholder="Գործընկեր"
                                  style={{
                                    height: "10rem",
                                    overflow: "hidden",
                                  }}
                                />
                              </div>
                              <div className="col-sm-6">
                                <label
                                  className="form-label"
                                  htmlFor="externalDiagnosticsStatus"
                                >
                                  Արտաքին ախտորոշման կարգավիճակ
                                </label>
                                <Multiselect
                                  options={diagnosticStatus}
                                  displayValue="status"
                                  onSelect={onExternalDiagnosticStatusSelect}
                                  closeOnSelect={true}
                                  singleSelect
                                  id="input_tags_5"
                                  className="form-control"
                                  placeholder="Ընտրեք կարգավիճակը"
                                  style={{
                                    height: "10rem",
                                    overflow: "hidden",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <label className="form-label" htmlFor="patient">
                                Հիվանդ
                              </label>
                              <Multiselect
                                options={patients.map((patient) => ({
                                  key: patient.patientId,
                                  value: `${patient.firstName} ${patient.lastName}`,
                                }))}
                                singleSelect
                                onSelect={onPatientSelect}
                                displayValue="value"
                                id="input_tags_4"
                                className="form-control"
                                ref={multiselectRef}
                                hidePlaceholder={true}
                                placeholder="Ընտրել հիվանդին"
                                style={{
                                  height: "10rem",
                                  overflow: "hidden",
                                }}
                              />
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
                                onSelect={onDoctorSelect}
                                closeOnSelect={true}
                                singleSelect
                                displayValue="value"
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

export default AddDiagnostic;
