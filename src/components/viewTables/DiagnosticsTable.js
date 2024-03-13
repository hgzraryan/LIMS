/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import ComponentToConfirm from "../ComponentToConfirm";
import {
  useBlockLayout,
  useFilters,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { Checkbox } from "../Checkbox";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { ColumnFilter } from "../ColumnFilter";
import { BiSolidInfoCircle } from "react-icons/bi";
import { MdViewKanban } from "react-icons/md";
import ResearchViewBoard from "../StatusBoard/ResearchViewBoard";
import { Modal } from "react-bootstrap";
import DiagnosticsEditModal from "../EditViews/DiagnosticsEditModal";
import diagnoseSvg from "../../../src/dist/img/diagnose.svg";
import ResultData from "../ResultData";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import "../../dist/css/data-table.css";
import organizationsSvg from '../../dist/svg/organizationsSvg.svg'
import patientSvg from '../../dist/svg/patientSvg.svg'
import ResearchesPrint from "../views/ResearchesPrint";


function DiagnosticsTable({
  confirmRef,
  handleDeleteItem,
  diagnostics,
  setDiagnostics,
  handleCloseModal,
  handleOpenModal,
  selectedItemId,
  selectedItem,
  getDiagnostics
}) {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate();
  const [selectedItem1, setSelectedItem1] = useState("");
  const [selectedItemId1, setSelectedItemId1] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [editRow, setEditRow] = useState(false);
  const [modalInfo, setModalInfo] = useState("");
  const [modalResult, setModalResult] = useState("");
  const [modalPrint, setModalPrint] = useState("");
  const [disable, setDisable] = useState(false);
  // const ComponentToPrintWrapper = ({ diagData }) => {
    
  //   // 1.
  //   let componentRef = useRef(null); // 2.
  //   return (
  //     <div style={{ display: "flex" }}>
  //       <ReactToPrint
  //         trigger={() => (
  //           <a
  //             className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
  //             data-bs-toggle="tooltip"
  //             data-placement="top"
  //             title=""
  //             data-bs-original-title="Archive"
  //             href="#"
  //           >
  //             <span className="icon">
  //               <span className="feather-icon">
  //                 <FeatherIcon icon="printer" />
  //               </span>
  //             </span>
  //           </a>
  //         )}
  //         content={() => componentRef.current}
  //       />
  //       <div style={{ display: "none" }}>
  //         <ComponentToPrint ref={componentRef} value={diagData} />
  //       </div>
  //     </div>
  //   );
  // };
  const handleOpenInfoModal = (data) => {
    setModalInfo((prev) => data);
  };
  const handleOpenResultModal = (data) => {
    setModalResult((prev) => data);
  };
  const handleOpenPrintModal = (data) => {
    setModalPrint((prev) => data);
  };
  const handleSendResult = () => {
    const resultData = document.getElementById('resultData');
    console.log(JSON.stringify(resultData))
  };
  const handleOpenStatusModal = (data) => {
    setSelectedItem1((prev) => data);
  };
  const handleCloseStatusModal = () => {
    setSelectedItem1("");
  };
  const handleOpenEditModal = (value) => {
    setEditRow((prev) => value);
  };
  const handleCloseEditModal = () => {
    setEditRow(false);
  };
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 20,
      maxWidth: 600,
    }),
    []
  );
  const handleDiagnosticsDetails = async (diagnosticsId) => {  

      navigate(`/diagnostics/${diagnosticsId}`)
      
  };
  const handleClientDetails = async (rowData) => {  
   const {clientId}=rowData
   const {clientType}=rowData
    clientType === 'patient'
    ? navigate(`/patients/${clientId}`)
    :navigate(`/organizations/${clientId}`)
  };

  const sendPDFToBackend = (pdfData) => {

    // console.log(pdfData)
    // axiosPrivate('/endpoint', {
    //   method: 'POST',
    //   body: pdfData
    // })
    // .then(response => {
    //   if (response.ok) {
    //     alert('PDF sent to backend successfully');
    //   } else {
    //     alert('Failed to send PDF to backend');
    //   }
    // })
    // .catch(error => {
    //   console.error('Error sending PDF to backend:', error);
    //   alert('Failed to send PDF to backend');
    // });
  }

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "diagnosticsId",
        sortable: true,
        width: 60,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDiagnostics} placeholder={"ID"} />
        ),
        Cell: ({ row }) => (
          <>
           
              <div
              onClick={()=>handleDiagnosticsDetails(row.original.diagnosticsId)}
              style={{ cursor: 'pointer', textDecoration:'underline' }}
            >
              
              {row.original.diagnosticsId}
            </div>
           
          </>
        ),
      },
      {
        Header: "Հաճախորդի ID",
        accessor: "patientId",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDiagnostics} 
          placeholder = "Հաճախորդի ID" />
        ),
        Cell: ({ row }) => (
          <>
           
              <div
              onClick={()=>handleClientDetails(row.original)}
              style={{ cursor: 'pointer', textDecoration:'underline' }}
            >
               {row.original.clientType === "organization"
              ?<img src={organizationsSvg} alt='organizationIcon' width={25} height={25} className="me-2"/>
              :<img  src={patientSvg} alt='patientIcon' width={25} height={25} className="me-2"/>
              }
              {row.original.clientId}
            </div>
           
          </>
        ),
      },
      {
        Header: "Հետազոտություններ",
        accessor: "researchList",
        disableSortBy: true,
        width: 200,
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center align-items-center">
            {/* <div className="pe-2">{row.original.statusBoard.length}</div> */}
            <MdViewKanban
              cursor={"pointer"}
              size={"1.5rem"}
              onClick={() => handleOpenStatusModal(row.original)}
            />
          </div>
        ),
        Filter: ({ column: { id } }) => <></>,
      },
      {
        Header: "Գրանցման ամսաթիվ",
        accessor: "diagnosisDate",
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDiagnostics} placeholder = "Գրանցման ամսաթիվ" />
        ),
      },
      {
        Header: "Տեսակ",
        accessor: "class",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDiagnostics}  placeholder = "Տեսակ"/>
        ),
      },
      {
        Header: "Կարգավիճակ",
        accessor: "diagStatus",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDiagnostics} placeholder = "Կարգավիճակ"/>
        ),
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center align-items-center">
            {row.original?.diagStatus === "Active" 
            ? "Ակտիվ"
            : "Չեղարկված"  }
          </div>
        ),
      },
      {
        Header: "Գործողություններ",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <BiSolidInfoCircle
                cursor={"pointer"}
                size={"1.5rem"}
                onClick={() => handleOpenInfoModal(row.original)}
              />
            </div>
            
            <div className="d-flex">
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-placement="top"
                title="Edit"
                href="#"
                onClick={() => handleOpenEditModal(row.original)}
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="edit" />
                  </span>
                </span>
              </a>
              {/* <ComponentToPrintWrapper diagData={row.original} /> */}
              {row.original?.diagStatus === "Active" &&
              <>
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-placement="top"
                title="Print"
                href="#"
                onClick={() => handleOpenPrintModal(row.original)}
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="printer" />
                  </span>
                </span>
              </a>
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-placement="top"
                title="send"
                href="#"
                onClick={() => handleOpenResultModal(row.original)}
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="send" />
                  </span>
                </span>
              </a>
              </>
              }
               {/*
              //TODO Delete diagnostics option
              {!row.original.patientId && (
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                  data-bs-toggle="tooltip"
                  onClick={() => handleOpenModal(row.original)}
                  data-placement="top"
                  title="Delete"
                  data-bs-original-title="Delete"
                  href="#"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <FeatherIcon icon="trash" />
                    </span>
                  </span>
                </a>
              )} */}
            </div>

           
          </div>
        ),
        disableSortBy: true,
        width: 200,
        Filter: ({ column: { id } }) => <></>,
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    toggleHideColumn,
  } = useTable(
    {
      columns,
      data: diagnostics,
      defaultColumn,
    },
    useFilters,
    useBlockLayout,
    useResizeColumns,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  return (
    <>
      {modalInfo && (
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
                        <span>{modalInfo.class}</span>
                      </div>
                      <div className="separator-full m-0"></div>
                      <div className="d-flex justify-content-between">
                        {" "}
                        <span>Բժիշկ </span> <span>{modalInfo.doctors[0]}</span>
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
                        <span>{modalInfo.createdAt}</span>
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
      )}
      {modalResult && (
        <Modal show={() => true} size="xl" onHide={() => setModalResult(false)} >
          <Modal.Header closeButton>
            <Modal.Title
              style={{ width: "100%", textAlign: "center" }}
            ></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="contact-body contact-detail-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="d-flex flex-xxl-nowrap flex-wrap">
                  <div className="contact-info w-100">
                    <ResultData modalResult={modalResult} setModalResult={setModalResult} />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer ">
             
            </div>
          </Modal.Body>
        </Modal>
      )}
      {modalPrint && (
        <Modal show={() => true} size="xl" onHide={() => setModalPrint(false)} >
          <Modal.Header closeButton>
            <Modal.Title
              style={{ width: "100%", textAlign: "center" }}
            ></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="contact-body contact-detail-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="d-flex flex-xxl-nowrap flex-wrap">
                  <div className="contact-info w-100">
                    <ResearchesPrint modalPrint={modalPrint}  setModalPrint={setModalPrint} />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer ">
             
            </div>
          </Modal.Body>
        </Modal>
      )}
      <table
        className="table nowrap w-100 mb-5 dataTable no-footer diagTable"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div>
                    {column.id !== "selection" && (
                      <>
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div>

                        <div
                          style={{
                            marginTop: "2px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>{column.render("Header")}</div>

                          <div style={{ paddingTop: "20px" }}>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <span className="sorting_asc"></span>
                              ) : (
                                <span className="sorting_desc"></span>
                              )
                            ) : (
                              <span className="sorting"></span>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${
                      column.isResizing ? "isResizing" : ""
                    }`}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {diagnostics?.length && (
          <tbody {...getTableBodyProps()}>
             {rows.map((row) => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            const diagStatus = row.original.diagStatus ==='Cancelled'; 
           // const diagStatus = row.original.patientId > 'Cancelled'; 
            return (
              <tr {...rowProps} style={{ backgroundColor: diagStatus ? "rgb(255, 99, 71, 0.2)" : "inherit", borderStyle:'none !important' }}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
            {editRow && (
              <DiagnosticsEditModal
                handleCloseEditModal={handleCloseEditModal}
                rowData={editRow}
                getDiagnostics={getDiagnostics}
              />
            )}
            <ResearchViewBoard
              selectedItem={selectedItem1}
              setSelectedItem={setSelectedItem1}
              handleCloseStatusModal={handleCloseStatusModal}
              setResearches={setDiagnostics}
              researches={diagnostics}
            />

            <ComponentToConfirm
              handleCloseModal={handleCloseModal}
              handleOpenModal={handleOpenModal}
              handleDeleteItem={handleDeleteItem}
              selectedItemId={selectedItemId}
              confirmUserRef={confirmRef}
              keyName={selectedItem.diagnosticsName}
              delId={selectedItem.diagnosticstId}
            />
          </tbody>
        )}
      </table>
    </>
  );
}

export default DiagnosticsTable;
