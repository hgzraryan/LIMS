import React, { useRef, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import FeatherIcon from "feather-icons-react";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const MOBILE_REGEX = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

function CreateUser({
  handleSubmit,
  onRoleSelect,
  onRoleDelete,
  onAdd,
  handleChangeFile,
  handleDrop,
  handleDragEmpty,
  handleToggleCreateModal,
  imageUrl,
  user,
  firstname,
  lastname,
  pwd,
}) {
    const errRef = useRef('')
    const emailRef = useRef("")
    const phoneRef = useRef("")
    const multiselectRef = useRef("");
    const intupAvatarRef = useRef(null);
    
    const [validName, setValidName] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    let roleState = {
        options: [
          { name: "Admin", id: 1 },
          { name: "Editor", id: 2 },
          { name: "User", id: 3 },
        ],
      };
    useEffect(() => {
        setValidName(USER_REGEX.test(user.current));
      }, [user]);
    
      useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd.current));
      }, [pwd]);
      useEffect(() => {
        setValidPwd(MOBILE_REGEX.test(phoneRef.current));
      }, [phoneRef]);
      useEffect(() => {
        setValidPwd(EMAIL_REGEX.test(emailRef.current));
      }, [emailRef]);
  return (
    <Modal
    show={() => handleToggleCreateModal(true)}
    size="xl"
    onHide={() => handleToggleCreateModal(false)}
  >
    <Modal.Header closeButton>
      <Modal.Title
        style={{ width: "100%", textAlign: "center" }}
      >
        Ավելացնել նոր սարքավորում
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
                    <a href="#">Սարքի տվյալներ</a>
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
                                value={
                                  firstname.current.value
                                }
                                onChange={(e) =>
                                  (firstname.current =
                                    e.target.value)
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
                                value={lastname.current.value}
                                onChange={(e) =>
                                  (lastname.current =
                                    e.target.value)
                                }
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row gx-3">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-label">
                                Էլ․ հասցե
                              </label>
                              <input
                                className="form-control"
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={emailRef.current.value}
                                onChange={(e) =>
                                  (emailRef.current =
                                    e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label className="form-label">
                                Հեռախոս
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Հեռախոս"
                                name="phone"
                                value={phoneRef.current.value}
                                onChange={(e) =>
                                  (phoneRef.current =
                                    e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row gx-3">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                className="form-label"
                                htmlFor="username"
                              >
                                Ծածկանուն
                              </label>
                              <input
                                type="text"
                                name="username"
                                placeholder="Ծածկանուն"
                                id="username"
                                className="form-control"
                                autoComplete="off"
                                value={user?.current.value}
                                onChange={(e) =>
                                  (user.current =
                                    e.target.value)
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label
                                className="form-label"
                                htmlFor="password"
                              >
                                Ծածկագիր
                              </label>
                              <input
                                type="password"
                                name="password"
                                placeholder="Ծածկագիր"
                                id="password"
                                className="form-control"
                                autoComplete="off"
                                value={pwd.current.value}
                                onChange={(e) =>
                                  (pwd.current =
                                    e.target.value)
                                }
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/*
                                                  <div className="separator-full"></div>
                                                  <div className="card">
                                                      <div className="card-header">
                                                          <a href="#">Հավելյալ տվյալներ</a>
                                                          <button className="btn btn-xs btn-icon btn-rounded btn-light" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Edit"><span class="icon"  data-bs-toggle="modal" data-bs-target="#moreContact"><span class="feather-icon"><FeatherIcon icon="edit-2" /></span></span></button>
                                                      </div>
                                                      <div className="card-body">
                                                          <div className="modal-body">
                                                              <form>
                                                                  <div className="row gx-3">
                                                                      <div className="col-sm-6">
                                                                          <div className="form-group">
                                                                              <label className="form-label">Designation</label>
                                                                              <input className="form-control" type="text" value="Mandaline" placeholder="First Name" name="name1" />
                                                                          </div>
                                                                      </div>
                                                                      <div className="col-sm-6">
                                                                          <div className="form-group">
                                                                              <label className="form-label">Company</label>
                                                                              <input className="form-control" type="text" value="Shane" placeholder="Last Name" name="lastname1" />
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                                  <div className="row gx-3">
                                                                      <div className="col-sm-6">
                                                                          <div className="form-group">
                                                                              <label className="form-label">Language</label>
                                                                              <input className="form-control" type="email" value="contct@hencework.com" placeholder="Email Id" name="emailid1" />
                                                                          </div>
                                                                      </div>
                                                                      <div className="col-sm-6">
                                                                          <div className="form-group">
                                                                              <label className="form-label">Birthday</label>
                                                                              <input className="form-control" type="text" value="10/24/1984" placeholder="Phone No" name="birthday1"/>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                                  
                                                              </form>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  */}
                <div className="separator-full"></div>
                <div className="card">
                  <div className="card-header">
                    <a href="#">Դերեր</a>
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
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                      <h6 className="text-uppercase fw-bold mb-3">
                        Ավելացնել դերեր
                      </h6>
                      <form>
                        <div className="row gx-3">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <Multiselect
                                options={roleState.options} // Options to display in the dropdown
                                displayValue="name" // Property name to display in the dropdown options
                                //selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                onSelect={onRoleSelect} // Function will trigger on select event
                                onRemove={onRoleDelete} // Function will trigger on remove event
                                closeOnSelect={true}
                                id="input_tags_3"
                                className="form-control"
                                ref={multiselectRef}
                                hidePlaceholder={true}
                                placeholder="Ընտրել դերը"
                              />
                              {/* <select id="input_tags_3" className="form-control" multiple="multiple">
                                                                                  <option selected="selected">Collaborator</option>
                                                                                  <option selected="selected">Designer</option>
                                                                                  <option selected="selected">React Developer</option>
                                                                                  <option selected="selected">Promotion</option>
                                                                                  <option selected="selected">Advertisement</option>
                                                                              </select> */}
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
  )
}

export default CreateUser

