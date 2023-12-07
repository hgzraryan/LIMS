import React from "react";
import { Modal } from "react-bootstrap";
import { selectResearches } from "../redux/features/researches/researchesSlice";
import { useSelector } from "react-redux";

function PatientInfo({
  handleCloseModal,
  selectedItem,
}) {
  //console.log(researchState)
  // const currentResearches = selectedItem?.researchList
  //   ?.map(
  //     (mapEl) => (mapEl = researchState.filter((el) => el._id === mapEl))
  //   )
  //   .flat(1);
  return (
    <Modal show={selectedItem} size="xl" onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          Հետազոտություններ
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
                          <div className="row gx-12 ">
                            <div className="col-sm-12">
                              {selectedItem &&
                                selectedItem.researchList.map((el, index) => (
                                  <div className="mb-2">
                                    {index + 1}. {el}
                                  </div>
                                ))}
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
                      onClick={() => handleCloseModal(false)}
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
}

export default PatientInfo;
