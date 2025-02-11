import moment from 'moment';
import React from 'react'
import { Modal } from 'react-bootstrap';

function RadiologiesInfoModal({modalInfo,setModalInfo}) {
  return (
    <Modal
    show={() => true}
    size="md"
    onHide={() => setModalInfo(false)}
  >
    <Modal.Header closeButton>
      <Modal.Title style={{ width: "100%", textAlign: "center" }}>
      {modalInfo?.name}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>        
        <div className="contact-body contact-detail-body">
          <div data-simplebar className="nicescroll-bar">
            <div className="d-flex flex-xxl-nowrap flex-wrap">
              <div className="contact-info w-100">
                <div className="d-flex justify-content-center align-items-center">
                <h3>{modalInfo?.clientFirstName+" "+modalInfo?.clientLastName + " "+modalInfo?.clientMidName +" "}</h3>
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
                     <div className="d-flex justify-content-between">  <span> Այցելության ID </span> <span>{modalInfo.radiologyId}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Տարիք </span> <span>{modalInfo?.clientAge}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Սեռ </span> <span>{modalInfo?.clientGender}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Հեռախոս </span> <span>{modalInfo?.clientTel}</span></div>
                     <div className="separator-full m-0"></div>                  
                     <div className="d-flex justify-content-between">  <span>Բժիշկ </span> <span>{modalInfo.doctorName}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Այցի ամսաթիվ </span> <span>{modalInfo?.visitDate && moment.utc(modalInfo?.visitDate).format('DD-MM-YYYY HH:mm')}</span></div>
                     <div className="separator-full m-0"></div>
                     <div className="d-flex justify-content-between">  <span>Վերջին թարմացում</span> <span>{modalInfo?.updatedAt && moment.utc(modalInfo?.updatedAt).format('DD-MM-YYYY HH:mm')}</span></div>
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
                      <span>{modalInfo.paymentDate?.split("T").join(' ').split('.',1)}</span>
                    </div>
                    <div className="separator-full m-0"></div>
                </div>
                <div className="modal-body">
                      <h2 className='d-flex justify-content-center align-items-center'> Բժշկի Նշանակումներ</h2>
                 
                      <ul className='fw-bold'>Նշանակումներ
                      {modalInfo?.doctorsAppointments?.instructions && modalInfo?.doctorsAppointments?.instructions.map((el)=>(
                              <li style={{fontWeight:'normal',listStyle:'inside'}}>{el}</li>
                              ))
                            }  
                      </ul>
                      <ul className='fw-bold'>Դեղամիջոցներ
                      {modalInfo?.doctorsAppointments?.medicine && modalInfo?.doctorsAppointments?.medicine.map((el)=>(
                              <li style={{fontWeight:'normal',listStyle:'inside'}}>{el}</li>
                              ))
                      }  
                      </ul>
                      <ul className='fw-bold'>Հետազոտություններ
                      {modalInfo?.doctorsAppointments?.researches && modalInfo?.doctorsAppointments?.researches.map((el)=>(
                              <li style={{fontWeight:'normal',listStyle:'inside'}}>{el}</li>
                              ))
                            }  
                      </ul>
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

export default RadiologiesInfoModal
