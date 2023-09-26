import React from "react";
import { Modal } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import FeatherIcon from "feather-icons-react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreatePatient({
  handleToggleCreateModal,
  researchState,
  onResearchSelect,
  onResearchDelete,
  onAdd,
  handleSubmit,
  multiselectRef,
  firstnameRef,
  lastnameRef,
  mnameRef,
  ageRef,
  emailRef,
  addressRef,
  mobileRef,
  handlingDate,
  editorRef,
}) {
  const [startDate, setStartDate] = useState(new Date());
  const getDate = (date) => {
    setStartDate(date);
    handlingDate.current =
      date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
  };
  return (
    <Modal
      show={() => handleToggleCreateModal(true)}
      size="xl"
      onHide={() => handleToggleCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Ավելացնել նոր Հիվանդի
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="contact-body contact-detail-body">
            <div data-simplebar className="nicescroll-bar">
              <div className="d-flex flex-xxl-nowrap flex-wrap">
                <div className="contact-info w-100">
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
                        <form>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  htmlFor="firstname"
                                >
                                  Անուն
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="Անուն"
                                  id="firstname"
                                  className="form-control"
                                  autoComplete="off"
                                  value={firstnameRef.current.value}
                                  onChange={(e) =>
                                    (firstnameRef.current = e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  htmlFor="lastname"
                                >
                                  Ազգանուն
                                </label>
                                <input
                                  type="text"
                                  name="lastname"
                                  placeholder="Ազգանուն"
                                  id="lastname"
                                  className="form-control"
                                  autoComplete="off"
                                  value={lastnameRef.current.value}
                                  onChange={(e) =>
                                    (lastnameRef.current = e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-label">Հայրանուն</label>
                                <input
                                  type="text"
                                  name="midname"
                                  placeholder="Հայրանուն"
                                  id="mname"
                                  className="form-control"
                                  autoComplete="off"
                                  value={mnameRef.current.value}
                                  onChange={(e) =>
                                    (mnameRef.current = e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-label" htmlFor="email">
                                  Տարիք
                                </label>
                                <input
                                  type="number"
                                  name="age"
                                  placeholder="Տարիք"
                                  id="age"
                                  className="form-control"
                                  autoComplete="off"
                                  value={ageRef.current.value}
                                  onChange={(e) =>
                                    (ageRef.current = e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row gx-3">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-label" htmlFor="email">
                                  Էլ․ հասցե
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  placeholder="Էլ․ հասցե"
                                  id="email"
                                  className="form-control"
                                  autoComplete="off"
                                  value={emailRef.current.value}
                                  onChange={(e) =>
                                    (emailRef.current = e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-label" htmlFor="address">
                                  Հասցե
                                </label>
                                <input
                                  type="text"
                                  name="address"
                                  placeholder="Հասցե"
                                  id="address"
                                  className="form-control"
                                  autoComplete="off"
                                  value={addressRef.current.value}
                                  onChange={(e) =>
                                    (addressRef.current = e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="form-label" htmlFor="mobile">
                                  Հեռախոս
                                </label>
                                <input
                                  type="text"
                                  name="mobile"
                                  placeholder="Հեռախոս"
                                  id="mobile"
                                  className="form-control"
                                  autoComplete="off"
                                  value={mobileRef.current.value}
                                  onChange={(e) =>
                                    (mobileRef.current = e.target.value)
                                  }
                                  required
                                />
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
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="separator-full"></div>
                  <div className="card">
                    <div className="card-header">
                      <a href="#">Հաետազոտություններ</a>
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
                        <h6 className="text-uppercase fw-bold mb-3">Ընտրել</h6>
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
                      onClick={handleSubmit}
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Ավելացնել
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CreatePatient;
