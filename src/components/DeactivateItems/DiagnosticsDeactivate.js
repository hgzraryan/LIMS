import React from "react";
import { Modal } from "react-bootstrap";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

function DiagnosticsDeactivate({
  handleCloseDeactivateModal,
  rowData,
  refreshData,
}) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { diagnosticsId } = rowData;

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
  const handleDiagnosticsStatus = async (data) => {
    try {
      const response = await axiosPrivate.post(
        "/diagStatusChange",
        { id: diagnosticsId, diagStatus: data },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      handleCloseDeactivateModal(false);
      refreshData();
      notify(`Ախտորոշման կարգավիճակը փոխված է`);
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
          Հետազոտություն
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Ախտորոշման նույնականացման համար։{rowData.diagnosticsId}</p>
        <p>Ախտորոշման ամսաթիվ։{rowData?.diagnosisDate && moment.utc(rowData?.diagnosisDate).format('DD-MM-YYYY HH:mm')}</p>
        <p>Ախտորոշման տեսակը։{rowData.internalStatus}</p>
        <div className="separator-full"></div>

        <div className="modal-footer align-items-center d-flex">
          {rowData.diagStatus === "Active" && (
            <button
              type="button"
              onClick={() => handleDiagnosticsStatus("Cancelled")}
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Չեղարկել ախտորոշումը
            </button>
          )}
          {rowData.diagStatus === "Cancelled" && (
            <button
              type="button"
              onClick={() => handleDiagnosticsStatus("Active")}
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Ակտիվացնել ախտորոշումը
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
  );
}

export default DiagnosticsDeactivate;
