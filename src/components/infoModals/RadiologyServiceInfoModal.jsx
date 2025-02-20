import moment from 'moment';
import React from 'react'
import { Modal } from 'react-bootstrap';

function RadiologyServiceInfoModal({modalInfo,setModalInfo}) {
    console.log(modalInfo)
  return (
    <Modal
    show={() => true}
    size="md"
    onHide={() => setModalInfo(false)}
  >
    <Modal.Header closeButton>
      <Modal.Title style={{ width: "100%", textAlign: "center" }}>
      {modalInfo?.serviceName}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>        
        <div className="contact-body contact-detail-body">
          <div data-simplebar className="nicescroll-bar">
            <div className="d-flex flex-xxl-nowrap flex-wrap">
              <div className="contact-info w-100">
                <div className="d-flex justify-content-center align-items-center">
                  {/* <img
                        width={"150px"}
                        height={"200px"}
                        style={{
                          borderRadius: "5px",
                        }}
                        src={DefaultProfileImage}
                        className="avatar_upload_preview"
                        alt="preview"
                      /> */}
                </div>
                <div className="w-100">
                <div className="modal-body">
                     <div className="d-flex justify-content-between">  <span> Ծառայության ID </span> <span>{modalInfo.radiologyServiceId}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Հապավում</span> <span>{modalInfo?.shortName}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Ծառայության անվանում</span> <span>{modalInfo?.serviceName}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Դասակարգի անվանում</span> <span>{modalInfo?.categoryName}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Ներքին կոդ </span> <span>{modalInfo?.localCode}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Առքի գին </span> <span>{modalInfo?.purchasePrice}</span></div>
                     <div className="separator-full m-0"></div>                  
                     <div className="d-flex justify-content-between">  <span>Արժեք </span> <span>{modalInfo.price}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Հավելյալ տվյալներ</span> <span>{modalInfo?.additional}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Ստեղծվել է</span> <span>{modalInfo?.createdAt && moment.utc(modalInfo?.createdAt).format('DD-MM-YYYY HH:mm')}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Վերջին թարմացում</span> <span>{modalInfo?.updatedAt && moment.utc(modalInfo?.updatedAt).format('DD-MM-YYYY HH:mm')}</span></div>
                     <div className="separator-full m-0"></div>
                </div>
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

export default RadiologyServiceInfoModal
