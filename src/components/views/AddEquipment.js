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
  equipmentType_validation,
  manufacturer_validation,
  model_validation,
  serialNumber_validation,
  location_validation,
} from "../../utils/inputValidations";
import { REGISTER_EQUIPMENT } from "../../utils/constants";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Multiselect from "multiselect-react-dropdown";
import DatePicker from "react-datepicker";
const status = [
  { status: "Աշխատում է" },
  { status: "Վերանորոգվում է" },
  { status: "Չի աշխատում" },
];
function AddEquipment({ handleToggleCreateModal, getEquipments }) {
  const [errMsg, setErrMsg] = useState("");
  const [equipmentStatus, setEquipmentStatus] = useState("Operational");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [warrantyExpiryDate, setWarrantyExpiryDate] = useState("");
  const editorRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();
  const getPurchaseDate = (date) => {
    setPurchaseDate(date);
  };
  const getWarrantyExpiryDate = (date) => {
    setWarrantyExpiryDate(date);
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
  const methods = useForm({
    mode: "onChange",
  });
  const onStatusChange = (data) => {
    switch (data[0].status) {
      case "Աշխատում է":
        setEquipmentStatus("Operational");
        break;
      case "Վերանորոգվում է":
        setEquipmentStatus("Under Maintenance");
        break;
      case "Չի աշխատում":
        setEquipmentStatus("Out of Service");
        break;
      default:
        break;
    }
  };
  const onSubmit = methods.handleSubmit(
    async ({
      name,
      equipmentType,
      manufacturer,
      model,
      serialNumber,
      locationValid,
    }) => {
      const newEquipment = {
        equipmentName: name,
        equipmentType: equipmentType,
        manufacturer: manufacturer,
        model: model,
        serialNumber: serialNumber,
        purchaseDate: purchaseDate,
        warrantyExpiryDate: warrantyExpiryDate,
        location: locationValid,
        status: equipmentStatus,
      };

      //console.log(newEquipment);
      try {
        await axiosPrivate.post(REGISTER_EQUIPMENT, newEquipment, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        handleToggleCreateModal(false);
        getEquipments();
        notify(`${newEquipment.name} Սարքավորումը ավելացված է`);
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
  //   REGISTER_EQUIPMENT,
  //   editorRef,
  //   getEquipments,
  //   setErrMsg,
  //   handleToggleCreateModal
  // );
  return (
    <Modal
      show={() => true}
      size="xl"
      onHide={() => handleToggleCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ավելացնել նոր Սարքավորում
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
                        <a href="#">Սարքավորման տվյալներ</a>
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
                              <Input {...equipmentType_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...manufacturer_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...model_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...serialNumber_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...location_validation} />
                            </div>
                          </div>

                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  htmlFor="handlingDate"
                                >
                                  Գնման ամսաթիվ
                                </label>
                                <div>
                                  <DatePicker
                                    showYearDropdown
                                    yearDropdownItemNumber={100}
                                    scrollableYearDropdown
                                    selected={purchaseDate}
                                    onChange={(date) => getPurchaseDate(date)}
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
                                  Երաշխիքի ավարտի ամսաթիվ
                                </label>
                                <div>
                                  <DatePicker
                                    showYearDropdown
                                    yearDropdownItemNumber={100}
                                    scrollableYearDropdown
                                    selected={warrantyExpiryDate}
                                    onChange={(date) =>
                                      getWarrantyExpiryDate(date)
                                    }
                                    dateFormat={"yyyy-MM-dd"}
                                    isClearable
                                    placeholderText="Select date"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <label
                                className="form-label"
                                htmlFor="internalDiagnosticsStatus"
                              >
                                Սարքավորման Կարգավիճակը
                              </label>
                              <Multiselect
                                options={status}
                                displayValue="status"
                                onSelect={onStatusChange}
                                closeOnSelect={true}
                                singleSelect
                                id="input_tags_4"
                                className="form-control"
                                placeholder="Ընտրեք Կարգավիճակը"
                                selectedValues={[{ status: "Աշխատում է" }]}
                                //hidePlaceholder={true}
                                style={{
                                  height: "10rem",
                                  overflow: "hidden",
                                }}
                              />
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

export default AddEquipment;
