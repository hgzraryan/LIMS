import React, { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";

const ComponentToConfirm = ({
  confirmUserRef,
  handleCloseModal,
  handleDeleteItem,
  selectedItemId
}) => {
  return (
    <Modal show={selectedItemId !== null} size="xl" onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          Ջնջել աշխատակցին
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="contact-body contact-detail-body ">
            <div data-simplebar className="nicescroll-bar">
              <div className="d-flex flex-xxl-nowrap flex-wrap">
                <div className="contact-info w-100">
                  <div className="card">
                    <div className="card-body">
                      <div className="modal-body">
                        <form>
                          <div className="row gx-6 ">
                            <div className="col-sm-6">
                              <div className="form-group center">
                                <label
                                  className="form-label"
                                  htmlFor="confirmUser"
                                >
                                  Ծածկանուն
                                </label>
                                <input
                                  ref={confirmUserRef}
                                  type="text"
                                  name="name"
                                  placeholder="Ծածկանուն"
                                  id="confirmUser"
                                  className="form-control"
                                  autoComplete="off"
                                  value={confirmUserRef.value}
                                  onChange={(e) =>
                                    (confirmUserRef.current = e.target.value)
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
                  <div className="separator-full"></div>
                  <div className="modal-footer align-items-center">
                    <button
                      type="button"
                      onClick={() => handleDeleteItem()}
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Ջնջել
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleCloseModal(selectedItemId)}
                    >
                      Չեղարկել
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
};
export default ComponentToConfirm;