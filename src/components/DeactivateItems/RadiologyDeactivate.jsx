import React from 'react'
import { Modal } from "react-bootstrap";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
function RadiologyDeactivate({
  handleCloseDeactivateModal,
  rowData,
  refreshData,
}) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { radiologyId } = rowData;

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
  const handleDoctorVistStatus = async (data) => {
    try {
      const response = await axiosPrivate.post(
        "/radiologyStatusChange",
        { id: radiologyId, visitStatus: data },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      refreshData();
      handleCloseDeactivateModal(false);
      notify(`Այցելության կարգավիճակը փոխված է`);
    } catch (err) {
      console.log(err);
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
      onHide={() => handleCloseDeactivateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
          Բժշկի այցելություն
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Այցելության նույնականացման համար։{rowData.radiologyId}</p>
        <p>Այցելության ամսաթիվ։{rowData?.visitDate && moment.utc(rowData?.visitDate).format('DD-MM-YYYY HH:mm')}</p>
        <p>Բժշկի անունը։{rowData?.doctorName}</p>
        <p>Այցելուի անունը։{rowData?.clientFirstName+" "+rowData?.clientLastName +" "+ rowData?.clientMidName}</p>

        <div className="modal-footer align-items-center d-flex">
          {rowData.visitStatus === "Active" && (
            <button
              type="button"
              onClick={() => handleDoctorVistStatus("Cancelled")}
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Չեղարկել այցելությունը
            </button>
          )}
          {rowData.visitStatus === "Cancelled" && (
            <button
              type="button"
              onClick={() => handleDoctorVistStatus("Active")}
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Ակտիվացնել այցելությունը
            </button>
          )}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleCloseDeactivateModal(false)}
          >
            Փակել
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RadiologyDeactivate
