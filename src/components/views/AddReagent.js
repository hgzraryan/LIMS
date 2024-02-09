import React, { useRef } from "react";
import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  name_validation,
  price_validation,
  unit_validation,
  currency_validation,
  desc_validation,
  usage_validation,
  producer_validation,
} from "../../utils/inputValidations";
import Multiselect from "multiselect-react-dropdown";
import { REGISTER_REAGENT } from "../../utils/constants";
function AddReagent({ handleToggleCreateModal, getReagents }) {
  const [errMsg, setErrMsg] = useState("");
  const [unitType, setUnitType] = useState("");
  const [currency, setCurrency] = useState("AMD");
  const [amount, setAmount] = useState("");

  const methods = useForm({
    mode: "onChange",
  });
  const multiselectRef = useRef("");
  const axiosPrivate = useAxiosPrivate();
  const editorRef = useRef(null);
  const currencyRef = useRef(null);

 const handleCurrencyChange = (e) => {
      setCurrency(prev=>e.target.value)
 }
 const handleAmountChange = (e) => {
  setAmount(prev=>e.target.value)
 }
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
    const newReagent = {
      ...data,
      currency:currency,
      price:amount,
      unitType: unitType,
      additional: editorRef.current.getContent({ format: "text" }),
    };
    const formData = JSON.stringify(newReagent);

    try {
      await axiosPrivate.post(REGISTER_REAGENT, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      handleToggleCreateModal(false);
      getReagents();
      notify(`${newReagent.name}  ռեագենտը ավելացված է`);
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

  return (
    <Modal
      show={() => true}
      size="xl"
      onHide={() => handleToggleCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ավելացնել նոր Ռեագենտ
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
                        <a href="#">Ռեագենտի տվյալներ</a>
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
                              <label htmlFor="price"className="mb-2">Արժեք</label>
                              <div className="form-control d-flex ">
                                <select
                                  id="currency"
                                  value={currency}
                                  onChange={handleCurrencyChange}
                                  style={{ border: "none", outline: "none" }}
                                >
                                  <option value="AMD">AMD</option>
                                  <option value="USD">USD</option>
                                  <option value="EUR">EUR</option>
                                  <option value="GBP">GBP</option>
                                  <option value="RU">RU</option>
                                </select>
                                <input
                                  type="number"
                                  id="amount"
                                  value={amount}
                                  onChange={handleAmountChange}
                                  placeholder="Enter amount"
                                  style={{
                                    border: "none",
                                    outline: "none",
                                    flex: 1,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...unit_validation} />
                            </div>
                            <div className="col-sm-6">
                              <label className="form-label">Չափման Տեսակ</label>
                              <Multiselect
                                options={[
                                  { name: "Տուփ", id: 1 },
                                  { name: "Հատ", id: 2 },
                                ]} // Options to display in the dropdown
                                displayValue="name" // Property name to display in the dropdown options
                                onSelect={(data) =>
                                  setUnitType(data[0]["name"])
                                } // Function will trigger on select event
                                closeOnSelect={true}
                                singleSelect={true}
                                ref={multiselectRef}
                                placeholder="Չափման միավոր"
                              />
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...usage_validation} />
                            </div>
                            {/* <div className="col-sm-6">
                              <label className="form-label" htmlFor="research">
                                Արժույթ
                              </label>
                              <Multiselect
                                options={[
                                  { currency: "AMD" },
                                  { currency: "USD" },
                                  { currency: "RU" },
                                ]} // Options to display in the dropdown
                                displayValue="currency" // Property name to display in the dropdown options
                                onSelect={onCurrencySelect} // Function will trigger on select event
                                //  onRemove={onResearchDelete} // Function will trigger on remove event
                                closeOnSelect={true}
                                singleSelect
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
                            </div> */}
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <Input {...desc_validation} />
                            </div>
                            <div className="col-sm-6">
                              <Input {...producer_validation} />
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

export default AddReagent;
