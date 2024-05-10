import React from 'react'
import { Modal } from "react-bootstrap";
import diagnoseSvg from "../../dist/img/diagnose.svg"
import moment from 'moment';

function DiagnosticsInfoModal({modalInfo,setModalInfo}) {
  return (
    <Modal show={() => true} size="md" onHide={() => setModalInfo(false)}>
    <Modal.Header closeButton>
      <Modal.Title style={{ width: "100%", textAlign: "center" }}>
        {modalInfo.name}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="contact-body contact-detail-body">
        <div data-simplebar className="nicescroll-bar">
          <div className="d-flex flex-xxl-nowrap flex-wrap">
            <div className="contact-info w-100">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  width={"150px"}
                  height={"200px"}
                  style={{
                    borderRadius: "5px",
                  }}
                  src={diagnoseSvg}
                  className="avatar_upload_preview"
                  alt="preview"
                />
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  {" "}
                  <span>ID</span> <span>{modalInfo.diagnosticsId}</span>
                </div>
                <div className="separator-full m-0"></div>
                <div className="d-flex justify-content-between">
                  {" "}
                  <span>Ախտորոշման Տեսակը </span>{" "}
                  <span>
                    {modalInfo.class === "Internal"
                      ? "Ներքին"
                      : "External"
                      ? "Արտաքին"
                      : "Այլ"}
                  </span>
                </div>
                <div className="separator-full m-0"></div>
                <div className="d-flex justify-content-between">
                  {" "}
                  {/* <span>Բժիշկ </span> <span>{modalInfo?.doctors && modalInfo.doctors[0]}</span> */}
                </div>
                <div className="separator-full m-0"></div>
                <div className="d-flex justify-content-between">
                  {" "}
                  <span>Հաճախորդի ID </span>{" "}
                  <span>{modalInfo.clientId}</span>
                </div>
                <div className="separator-full m-0"></div>
                <div className="d-flex justify-content-between">
                  {" "}
                  <span>Գրանցվել է </span>{" "}
                  <span>{moment.utc(modalInfo.createdAt).format('DD-MM-YYYY HH:mm')}</span>                        
                </div>
                <div className="d-flex justify-content-between">
                  {" "}
                  <span>Վերջին թարմացում </span>{" "}
                  <span>{moment.utc(modalInfo?.updatedAt).format('DD-MM-YYYY HH:mm')}</span>                        
                </div>
                <div className="separator-full m-0"></div>
                <div className="d-flex justify-content-between">
                  {" "}
                  <span>ներքին հետ․ կարգավիճակ </span>{" "}
                  <span>{modalInfo.internalStatus}</span>
                </div>
                <div className="separator-full m-0"></div>
                <div className="d-flex justify-content-between">
                  {" "}
                  <span>Արտաքին հետ․ կարգավիճակ </span>{" "}
                  <span>{modalInfo.externalStatus}</span>
                </div>
                <div className="separator-full m-0"></div>
                <div className="d-flex justify-content-between">
                  {" "}
                  <span>Վճարման կոդ </span>{" "}
                  <span>{modalInfo?.authcode}</span>
                </div>
                <div className="separator-full m-0"></div>
                <div className="d-flex justify-content-between">
                  {" "}
                  <span>Վճարման տեսակը </span>{" "}
                  <span>{modalInfo.paymentMethod}</span>
                </div>
                <div className="separator-full m-0"></div>
                <div className="d-flex justify-content-between">
                  <span>Վճարման ամսաթիվը </span>{" "}
                  <span>{moment.utc(modalInfo.paymentDate).format('DD-MM-YYYY HH:mm')}</span>
                </div>
                <div className="separator-full m-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer ">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setModalInfo(false)}
        >
          Փակել
        </button>
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default DiagnosticsInfoModal
