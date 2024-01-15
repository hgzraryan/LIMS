import React from 'react'
import { Modal } from 'react-bootstrap'

function EditModal({handleCloseEditModal,rowData}) {
    console.log(rowData)
  return (
    <Modal
    show={() => true}
    size="xl"
    onHide={() =>handleCloseEditModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Հետազոտություն
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{rowData.researchId}</p>
      <div className="separator-full"></div>

<div className="modal-footer align-items-center">
  <button
    type="button"
    className="btn btn-secondary"
    onClick={() => handleCloseEditModal(false)}
  >
    Չեղարկել
  </button>
  <button
    type="button"
   // onClick={}
    className="btn btn-primary"
    data-bs-dismiss="modal"
  >
    Ավելացնել
  </button>
</div>
      </Modal.Body>
    </Modal>
  )
}

export default EditModal
