import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormProvider } from "react-hook-form";
import { Input } from "../Input";

import {
  name_validation,
  price_validation,
  unit_validation,
  currency_validation,
  desc_validation,
} from "../../utils/inputValidations";
import useSubmitForm from "../../hooks/useSubmitForm";
import Multiselect from "multiselect-react-dropdown";

const REGISTER_URL = "/registerPrice";
function AddPrice({ handleToggleCreateModal, getPrices,researchState }) {
  const [errMsg, setErrMsg] = useState("");
  const multiselectRef = useRef("");
  const editorRef = useRef(null);
  const currencyRef = useRef(null);
  const additionalData={}
  //const additionalData=useRef('')
  const onResearchSelect = (data) => {
    let researchesArr = [];
    for (let research of data) {
      researchesArr.push(Object.values(research)[0]);
    }
    additionalData.researchId=researchesArr[0]
  };
  
  const onCurrencySelect = (data) => {
    additionalData.currency=data[0].currency
  };
  const { onSubmit, methods } = useSubmitForm(
    REGISTER_URL,
    editorRef,
    getPrices,
    setErrMsg,
    handleToggleCreateModal,
    additionalData
  );
 
  return (
    <Modal
      show={() => true}
      size="xl"
      onHide={() => handleToggleCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ավելացնել նոր Գին
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
                        <a href="#">Գնառաջարկի տվյալներ</a>
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
                              <Input {...price_validation} />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...unit_validation} />
                            </div>
                            <div className="col-sm-6">
                            <label
                                  className="form-label"
                                  htmlFor="research"
                                >
                                  Արժույթ
                                </label>
                            <Multiselect
                                    options={[{currency:'AMD'},{currency:'USD'},{currency:'RU'}]} // Options to display in the dropdown
                                    displayValue="currency" // Property name to display in the dropdown options
                                    onSelect={onCurrencySelect} // Function will trigger on select event
                                  //  onRemove={onResearchDelete} // Function will trigger on remove event
                                    closeOnSelect={true}
                                    singleSelect
                                    selectedValues={[{currency:'AMD'}]}
                                    id="input_tags_4"
                                    className="form-control"
                                    ref={currencyRef}
                                    hidePlaceholder={true}
                                    placeholder="Արժույթ"
                                    style={{
                                      height: "10rem",
                                      overflow: "hidden",
                                    }}
                                  />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...desc_validation} />
                            </div>
                            <div className="col-sm-6">
                            <label
                                  className="form-label"
                                  htmlFor="research"
                                >
                                  Հետազոտություններ
                                </label>
                            <Multiselect
                                    options={researchState} // Options to display in the dropdown
                                    displayValue="research" // Property name to display in the dropdown options
                                    onSelect={onResearchSelect} // Function will trigger on select event
                                    //onRemove={onResearchDelete} // Function will trigger on remove event
                                    closeOnSelect={true}
                                    id="input_tags_3"
                                    className="form-control"
                                    ref={multiselectRef}
                                    hidePlaceholder={true}
                                    placeholder="Հետազոտություններ"
                                    groupBy="category_name"
                                    singleSelect
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

export default AddPrice;