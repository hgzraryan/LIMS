/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useRef, useState } from "react";
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
import { v4 as uuidv4 } from "uuid";
import { data } from "../StatusBoard/data";
import { data1 } from "../StatusBoard/data";
import { Modal } from "react-bootstrap";
import EditModal from "../views/EditModal";
import diagnoseSvg from "../../../src/dist/img/diagnose.svg";
import ReactToPrint from "react-to-print";
import { ResultToPrintComponent } from "../ResultToPrintComponent";
import ComponentToPrintResultWrapper from "../ComponentToPrintResultWrapper";
import { useGetFullData } from "../../hooks/useGetFullData";
import { PATIENTS_URL } from "../../utils/constants";
import { checkPatients } from "../../redux/features/patients/patientsSlice";
const ResearchData = [
  {
    researchId: "23001",
    patientId: "01",
    description: "asdasdsadas",
    additional: "Approved",
    researchList: data,
  },
  {
    researchId: "23002",
    patientId: "",
    description: "asdasdsadas",
    additional: "Approved",
    researchList: data1,
  },
  {
    researchId: "23003",
    patientId: "529",
    description: "asdasdsadas",
    additional: "Approved",
    researchList: [
      { id: uuidv4(), name: "Հետազոտություն111" },
      { id: uuidv4(), name: "Հետազոտություն222" },
      { id: uuidv4(), name: "Հետազոտություն333" },
      { id: uuidv4(), name: "Հետազոտություն444" },
    ],
  },
  {
    researchId: "23004",
    patientId: "01",
    description: "asdasdsadas",
    additional: "Approved",
    researchList: [
      { id: uuidv4(), name: "Հետազոտություն1111" },
      { id: uuidv4(), name: "Հետազոտություն2222" },
      { id: uuidv4(), name: "Հետազոտություն3333" },
      { id: uuidv4(), name: "Հետազոտություն4444" },
    ],
  },
];

function DiagnosticsTable({
  confirmRef,
  handleDeleteItem,
  diagnostics,
  setDiagnostics,
  handleCloseModal,
  handleOpenModal,
  selectedItemId,
  selectedItem,
  patients
}) {
  const [resData,setResData]=useState(ResearchData)
  const [selectedItem1, setSelectedItem1] = useState("");
  const [selectedItemId1, setSelectedItemId1] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [editRow, setEditRow] = useState(false);
  const [modalInfo, setModalInfo] = useState("");

 
  const handleOpenInfoModal = (user) => {
    
    setModalInfo((prev) => user);
  };
  const handleOpenStatusModal = (user) => {
    setSelectedItem1((prev) => user);
  };
  const handleCloseStatusModal = () => {
    setSelectedItem1("");
  };
  const handleOpenEditModal = (value) =>{
    setEditRow(prev => value)
  }
  const handleCloseEditModal = () =>{
    setEditRow(false)
  }
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 20,
      maxWidth: 600,
    }),
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "diagnosticstId",
        sortable: true,
        width: 60,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDiagnostics} placeholder={'ID'}/>
        ),
      },
      {
        Header: "Հաճախորդի ID",
        accessor: "patientId",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDiagnostics} />
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
          <ColumnFilter id={id} setData={setDiagnostics} />
        ),
      },
      {
        Header: "Տեսակ",
        accessor: "class",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDiagnostics} />
        ),
      },
      {
        Header: "Կարգավիճակ",
        accessor: "internalStatus",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDiagnostics} />
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
                onClick={() => handleOpenEditModal(row)}
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="edit" />
                  </span>
                </span>
              </a>
              {!row.original.patientId &&
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
              }
              <ComponentToPrintResultWrapper data={row.original} patients={patients}/>
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
 {
      modalInfo && (
        <Modal
      show={() => true}
      size="md"
      onHide={() => setModalInfo(false)}
    >
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
                       <div className="d-flex justify-content-between">  <span>ID</span> <span>{modalInfo.diagnosticsId}</span></div>
                       <div className="separator-full m-0"></div>                  
                       <div className="d-flex justify-content-between">  <span>Ախտորոշման Տեսակը </span> <span>{modalInfo.class}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Բժիշկ </span> <span>{modalInfo.patientId}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Հաճախորդի ID </span> <span>{modalInfo.doctors[0]}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Գրանցվել է </span> <span>{modalInfo.createdAt}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Հաճախորդի ID </span> <span>{modalInfo.patientId}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>ներքին հետ․ կարգավիճակ </span> <span>{modalInfo.internalStatus}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Արտաքին հետ․ կարգավիճակ </span> <span>{modalInfo.externalStatus}</span></div>
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
      )
    }
    <table
      className="table nowrap w-100 mb-5 dataTable no-footer"
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
                  className={`resizer ${column.isResizing ? "isResizing" : ""}`}
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
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
          {
  editRow && 
  <EditModal

  handleCloseEditModal={handleCloseEditModal}
  rowData={editRow.values}
  />
}
          <ResearchViewBoard
            selectedItem={selectedItem1}
            handleCloseStatusModal={handleCloseStatusModal}
            selectedItemId={selectedItemId1}
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
      )}{" "}
    </table>
    
    </>
  );
}

export default DiagnosticsTable;
