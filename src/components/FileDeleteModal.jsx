import React, { useRef } from 'react'
import { Modal } from "react-bootstrap";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function FileDeleteModal({deleteFileId,keyName,handleCloseModal,setDownloadFiles,downloadFiles}) {
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const confirmRef =useRef()

    const handleDelete = async () => { 
        console.log(confirmRef)  
        if(confirmRef.current==='remove')    {
            try {
                const response = await axiosPrivate.delete('delExtResult', {
                    data: { fileId: deleteFileId },
                });
            const files = downloadFiles?.filter((el)=>el.fileId!==deleteFileId)
            setDownloadFiles(files);
            handleCloseModal()
        }catch (err) {
            console.error(err);
        }  
    } else if(!confirmRef?.current.length) {
        Swal.fire(
          {
            confirmButtonColor: '#f44336',
            text:"Մուտքագրեք անհրաճեշտ տվյալները "
          });
      } else {
        Swal.fire(
          {
            confirmButtonColor: '#f44336',
            text:"Մուտքագրեք ճիշտ տվյալները "
          });
      }
      };
  return (
    <Modal show={deleteFileId !== null} size="xl" onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        Հեռացում
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
                            <div className="form-group center">
                              <label
                                className="form-label"
                                htmlFor="confirmUser"
                              >
                                {`Հեռացման համար խնդրում ենք մուտքագրել "remove" տեքստը`}
                              </label>
                              <input
                                ref={confirmRef}
                                type="text"
                                name="name"
                                placeholder="Մուտքագրել պահանջվող տեքստը"
                                id="confirmUser"
                                className="form-control w-50"
                                autoComplete="off"
                                value={confirmRef.value}
                                onChange={(e) =>
                                  (confirmRef.current = e.target.value)
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
                    onClick={handleDelete}
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Ջնջել
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
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
  )
}

export default FileDeleteModal
