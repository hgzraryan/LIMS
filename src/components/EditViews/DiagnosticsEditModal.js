import React from 'react'
import { Modal } from 'react-bootstrap'

function DiagnosticsEditModal({handleCloseEditModal,rowData}) {
  const handleDisableDiagnose = (data) => {
 
    handleCloseEditModal(false);
  };
    console.log(rowData)
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
        {console.log(rowData)}
        <p>Ախտորոշման նույնականացման համար։{rowData.diagnosticsId}</p>
        <p>Ախտորոշման ամսաթիվ։{rowData.diagnosisDate}</p>
        <p>Ախտորոշման տեսակը։{rowData.internalStatus}</p>
      <div className="separator-full"></div>

<div className="modal-footer align-items-center">
  <button
    type="button"
    className="btn btn-secondary"
    onClick={() => handleCloseEditModal(false)}
  >
    Փակել
  </button>
  <button
    type="button"
    onClick={() => handleDisableDiagnose(true)}
    className="btn btn-primary"
    data-bs-dismiss="modal"
  >
    Չեղարկել ախտորոշումը
  </button>
</div>
      </Modal.Body>
    </Modal>
  )
}

export default DiagnosticsEditModal
