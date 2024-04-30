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
import DiagnosticsDeactivate from "../DeactivateItems/DiagnosticsDeactivate";
import diagnoseSvg from "../../../src/dist/img/diagnose.svg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import "../../dist/css/data-table.css";
import organizationsSvg from "../../dist/svg/organizationsSvg.svg";
import patientSvg from "../../dist/svg/patientSvg.svg";
import ResearchesPrint from "../views/ResearchesPrint";
import ProgressBar from "../ProgressBar";
import moment from "moment";
import cancelledSvg from "../../dist/svg/cancelled.svg";
import isActiveSvg from "../../dist/svg/isActive.svg";
import posTerminalSvg from "../../dist/svg/posTerminal.svg";
import CreatePayByPos from "../CreatePayByPos";


function DiagnosticsTable({
  confirmRef,
  handleDeleteItem,
  diagnostics,
  setDiagnostics,
  handleCloseModal,
  handleOpenModal,
  selectedItemId,
  selectedItem,
  refreshData,
}) {
  const navigate = useNavigate();
  const [selectedItem1, setSelectedItem1] = useState("");
  const [selectedItemId1, setSelectedItemId1] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [editRow, setEditRow] = useState(false);
  const [modalInfo, setModalInfo] = useState("");
  const [modalPrint, setModalPrint] = useState("");
  const [openPosModal, setOpenPosModal] = useState(false);

  const handleOpenInfoModal = (data) => {
    setModalInfo((prev) => data);
  };
 
  const handleOpenPrintModal = (data) => {
    setModalPrint((prev) => data);
    
  };
  const handleOpenStatusModal = (data) => {
    setSelectedItem1((prev) => data);
  };
  const handleCloseStatusModal = () => {
    setSelectedItem1("");
  };
  const handleOpenDeactivateModal = (value) => {
    setEditRow((prev) => value);
  };
  const handleCloseDeactivateModal = () => {
    setEditRow(false);
  };
  const handlePosPay = (diagnosticsId) => {
    setOpenPosModal(diagnosticsId);
  };
  const handleClosePosPay = () => {
    setOpenPosModal(false);
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
    navigate(`/diagnostics/${diagnosticsId}`);
  };
  const handleClientDetails = async (rowData) => {
    
    const { clientId } = rowData;
    const { clientType } = rowData;
    clientType === "patient"
      ? navigate(`/patients/${clientId}`)
      : navigate(`/organizations/${clientId}`);
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
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "diagnosticsId",
        sortable: true,
        width: 80,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDiagnostics} placeholder={"ID"} />
        ),
        Cell: ({ row }) => (
          <>
            <div
              onClick={() =>
                handleDiagnosticsDetails(row.original.diagnosticsId)
              }
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {row.original.diagnosticsId}
            </div>
          </>
        ),
      },
      {
        Header: "Այցելու",
        accessor: "patientId",
        sortable: true,
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter
            id={id}
            setData={setDiagnostics}
            placeholder="Այցլու"
          />
        ),
        Cell: ({ row }) => (
          <>
            <div
              onClick={() => handleClientDetails(row.original)}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {row.original.clientType === "organization" ? (
                <img
                  src={organizationsSvg}
                  alt="organizationIcon"
                  width={25}
                  height={25}
                  className="me-2"
                />
              ) : (
                <img
                  src={patientSvg}
                  alt="patientIcon"
                  width={25}
                  height={25}
                  className="me-2"
                />
              )}
              {row.original.clientFirstName + " " +row.original.clientLastName +  " " +row.original.clientMidName}
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
          <>
            {row.original?.diagStatus === "Active" && (
              <div className="d-flex justify-content-center align-items-center">
                {/* <div className="pe-2">{row.original.statusBoard.length}</div> */}
                <MdViewKanban
                  cursor={"pointer"}
                  size={"1.5rem"}
                  onClick={() => handleOpenStatusModal(row.original)}
                />
              </div>
            )}
          </>
        ),
        Filter: ({ column: { id } }) => <></>,
      },
      {
        Header: "Վճարում",
        accessor: "paymentProgress",
        disableSortBy: true,
        width: 200,
        Cell: ({ row }) => (
          <>
            <div className="d-flex justify-content-center align-items-center flex-column">
              {row.original?.originalPrice && !(row.original?.originalPrice === row.original?.totalPrice) ? (
                <div style={{width:'100%',display:'flex',
                flexDirection:'row-reverse',fontSize:'14px'}}>

                
                <div
                  style={{
                    backgroundColor: "#bb86fc",
                    borderRadius: "8px",
                    padding: "0 10px 0 10px",
                    margin: "0 0 -3px 0",
                    zIndex: "9999",
                    color:'white',
                    textDecoration:'line-through',
                    
                  }}
                >
                 <p> {row.original?.originalPrice}</p>
                </div>
                </div>
              ):''
              }
              <div className='d-flex'>
              <ProgressBar totalPrice ={row.original?.totalPrice||0} totalPayed={row.original?.totalPayed||0}/>
              </div>

            </div>
          </>
        ),
        Filter: ({ column: { id } }) => <></>,
      },
      {
        Header: "Գրանցման ամսաթիվ",
        accessor: "diagnosisDate",
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter
            id={id}
            setData={setDiagnostics}
            placeholder="Գրանցման ամսաթիվ"
          />
        ),
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center align-items-center">
            {/* {new Date()} */}
            {moment(row.original?.diagnosisDate).format('YYYY-MM-DD HH:mm')}
          </div>
        ),
      },
      {
        Header: "Տեսակ",
        accessor: "class",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDiagnostics} placeholder="Տեսակ" />
        ),
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center align-items-center">
            {row.original?.class === "Internal"
              ? "Ներքին"
              : row.original?.class === "External"
              ? "Արտաքին"
              : row.original?.class === "Other"
              ? "Այլ"
              : ""}
          </div>
        ),
      },
      {
        Header: "Կարգավիճակ",
        accessor: "diagStatus",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter
            id={id}
            setData={setDiagnostics}
            placeholder="Կարգավիճակ"
          />
        ),
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center align-items-center">
            {row.original?.diagStatus === "Active" ? "Ակտիվ" : "Չեղարկված"}
          </div>
        ),
      },
      {
        Header: "Գործողություններ",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <div className="d-flex">
            <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-placement="top"
                title="Deactivate"
                href="#"
                onClick={() => handleOpenDeactivateModal(row.original)}
              >
                 <span className="icon">
                  <span className="feather-icon">
                   {row.original?.diagStatus==="Active" ?<img src={isActiveSvg} width={'20px'} height={'20px'} alt="isActiveSvg"/>:row.original?.diagStatus==="Cancelled"? <img width={'20px'} height={'20px'} src={cancelledSvg} alt="cancelledSvg"/> : 'black' }
                  </span>
                </span>
              </a>

              </div>

              <div className="d-flex">

              <BiSolidInfoCircle
                cursor={"pointer"}
                size={"1.5rem"}
                title="info"
                onClick={() => handleOpenInfoModal(row.original)}
              />
            </div>

            {row.original?.diagStatus === "Active" && (
                <>
            <div className="d-flex">
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
                <div className="d-flex">
              
                <img title="POS" style={{cursor:'pointer'}} width='20xp' height='20px' src={posTerminalSvg} alt='posTerminalSvg' onClick={()=>handlePosPay(row.original)}/>
                </div>                  
                </>
                )}
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
    {openPosModal && (
      <CreatePayByPos actionData={openPosModal} handleClosePosPay={handleClosePosPay} refreshData={refreshData}/>         
    )

    }
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
      )}
      {modalPrint && (
        <Modal show={() => true} size="xl" onHide={() => setModalPrint(false)}>
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
                    <ResearchesPrint
                      modalPrint={modalPrint}
                      setModalPrint={setModalPrint}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer "></div>
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
        {diagnostics?.length > 0 ? (
          <>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const rowProps = row.getRowProps();
              const diagStatus = row.original.diagStatus === "Cancelled";
              // const diagStatus = row.original.patientId > 'Cancelled';
              return (
                <tr
                  {...rowProps}
                  style={{
                    backgroundColor: diagStatus
                      ? "rgb(255, 99, 71, 0.2)"
                      : "inherit",
                    borderStyle: "none !important",
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
            {editRow && (
              <DiagnosticsDeactivate
                handleCloseDeactivateModal={handleCloseDeactivateModal}
                rowData={editRow}
                refreshData={refreshData}
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
            </>
        ) : (
          ""
        )}
      </table>
    </>
  );
}

export default DiagnosticsTable;
