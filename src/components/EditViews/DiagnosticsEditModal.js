import React from 'react'
import { Modal } from 'react-bootstrap'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function DiagnosticsEditModal({handleCloseEditModal,rowData,getDiagnostics}) {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate();
  const {diagnosticsId} =rowData
  const handleDisableDiagnose = (data) => {
 
    handleCloseEditModal(false);
  };
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
  const handleDiagnosticssDetails = async (data) => {  
    
    try {
      const response = await axiosPrivate.post("/diagStatusChange",{id:diagnosticsId,diagStatus:data},{
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      } );
      getDiagnostics()
      handleDisableDiagnose(true)
      notify(
        `Ախտորոշման կարգավիճակը փոխված է`
      );
      
    } catch (err) {
      console.log(err)
      // navigate(`/diagnostics/${diagnosticsId}`)
      // if (!err?.response) {
        //   setErrMsg("No Server Response");
        // } else if (err.response?.status === 409) {
          //   setErrMsg("Username Taken");
          // } else {
            //   setErrMsg(" Failed");
      // }
    }
  };
  return (
    <Modal
    show={() => true}
    size="xs"
    onHide={() =>handleCloseEditModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Հետազոտություն
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Ախտորոշման նույնականացման համար։{rowData.diagnosticsId}</p>
        <p>Ախտորոշման ամսաթիվ։{rowData.diagnosisDate}</p>
        <p>Ախտորոշման տեսակը։{rowData.internalStatus}</p>
      <div className="separator-full"></div>

<div className="modal-footer align-items-center d-flex">
{rowData.diagStatus ==="Active" && 
  <button
    type="button"
    onClick={()=>handleDiagnosticssDetails('Cancelled')}
    className="btn btn-primary"
    data-bs-dismiss="modal"
  >
    Չեղարկել ախտորոշումը
  </button>
}
{rowData.diagStatus ==="Cancelled" && 
  <button
  type="button"
  onClick={()=>handleDiagnosticssDetails('Active')}
  className="btn btn-primary"
  data-bs-dismiss="modal"
  >
    Ակտիվացնել ախտորոշումը
  </button>
  }
  <button
    type="button"
    className="btn btn-secondary"
    onClick={() => handleCloseEditModal(false)}
  >
    Փակել
  </button>
</div>
      </Modal.Body>
    </Modal>
  )
}

export default DiagnosticsEditModal
