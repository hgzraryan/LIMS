/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useRef, useState } from "react";
import {
  useBlockLayout,
  useFilters,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { Checkbox } from "../Checkbox";
import PatientInfo from "../PatientInfo";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { BiSolidInfoCircle } from "react-icons/bi";
import { ComponentToPrint } from "../ComponentToPrint";
import ReactToPrint from "react-to-print";
import { ColumnFilter } from "../ColumnFilter";
import "../../dist/css/data-table.css";
import {  useNavigate } from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Modal } from "react-bootstrap";
import DefaultProfileImage from "../../../src/dist/img/Missing.svg";
function PatientsTable({
  selectedItem,
  handleOpenModal,
  handleCloseModal,
  researchState,
  patients,
  setPatients,
}) {
  const axiosPrivate = useAxiosPrivate()

  const navigate = useNavigate();
  const [modalInfo, setModalInfo] = useState("");
  const handleOpenInfoModal = (user) => {
    
    setModalInfo((prev) => user);
  };
  const handlePatientsDetail = async (patientId) => {

  console.log('**********');
  console.log('patientId',patientId);
  console.log('**********',);
  
    try {
      const response = await axiosPrivate.get(`/patients/${patientId}`, );
      console.log(response.data); 
      navigate(`/patients/${patientId}`)
      
    } catch (err) {
      console.log(err)
      // if (!err?.response) {
      //   setErrMsg("No Server Response");
      // } else if (err.response?.status === 409) {
      //   setErrMsg("Username Taken");
      // } else {
      //   setErrMsg(" Failed");
      // }
    }
  };
  const ComponentToPrintWrapper = ({ user }) => {
    // 1.
    let componentRef = useRef(null); // 2.
    return (
      <div style={{ display: "flex" }}>
        <ReactToPrint
          trigger={() => (
            <a
              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
              data-bs-toggle="tooltip"
              data-placement="top"
              title=""
              data-bs-original-title="Archive"
              href="#"
            >
              <span className="icon">
                <span className="feather-icon">
                  <FeatherIcon icon="printer" />
                </span>
              </span>
            </a>
          )}
          content={() => componentRef.current}
        />
        <div style={{ display: "none" }}>
          <ComponentToPrint ref={componentRef} value={user} />
        </div>
      </div>
    );
  };
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 20,
      maxWidth: 400,
    }),
    []
  );  
  const columns = useMemo(
    () => [
      {
        Header: (event,) => (
          <>
            
              <div className="columnHeader">ID</div>
            
          </>
        ),
        accessor: "patientId",
        sortable: true,
        width: 100,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setPatients}
          />
        ),
      },
      {
        Header: (event,) => (
          <>
            
              <div className="columnHeader">Անուն</div>
            
          </>
        ),
        accessor: "firstName",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setPatients}
          />
        ),
        Cell: ({ row }) => (
          <div
            onClick={()=>handlePatientsDetail(row.original.patientId)}
            style={{ cursor: 'pointer', textDecoration:'underline' }}
          >
            {row.original.firstName}
          </div>
        ),

      },
      {
        Header: (event) => (
          <div style={{overflow:'hidden'}}>
            
              <span className="columnHeader">Ազգանուն</span>
          </div>
        ),
        accessor: "lastName",
        width: 300,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setPatients}
          />
        ),        
      },
      {
        Header: (event) => (
          <>
           
            <div className="columnHeader">Հայրանուն</div>
          </>
        ),
        accessor: "midName",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setPatients}
          />
        ),
      },
      {
        Header: (event) => (
          <>
           
            <div className="columnHeader">Էլ․ հասցե</div>
          </>
        ),
        accessor: "email",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setPatients}
          />
        ),
        Cell: ({ row }) => <div>{row.original?.contact?.email}</div>,

      },
      {
        Header: (event) => (
          <>
            
            <div className="columnHeader">Տարիք</div>
            
          </>
        ),
        accessor: "age",
        sortable: true,
        width: 200,

        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setPatients}
          />
        ),
      },
      // {
      //   Header: (event) => (
      //     <>
      //       <div className="columnHeader">Ախտորոշումներ</div>
      //     </>
      //   ),
      //   Cell: ({ row }) => (
      //     <div className="d-flex">
      //       <div className="pe-2">{row.original.researchList.length}</div>
      //       <BiSolidInfoCircle
      //         cursor={"pointer"}
      //         size={"1.5rem"}
      //         onClick={() => handleOpenModal(row.original)}
      //       />
      //     </div>
      //   ),
      //   accessor: "researchList",
      //   width: 200,
      //   Filter: ({ column: { id } }) => <></>,
      // },
      // {
      //   Header: (event) => (
      //     <>
      //       <div className="columnHeader">Արժեք (դրամ)</div>
      //     </>
      //   ),
      //   Cell: ({ row }) => <div>{row.original.totalPrice}</div>,
      //   accessor: "totalPrice",
      //   width: 200,
      //   Filter: ({ column: { id } }) => <></>,

      // },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Կարգաբերումներ</div>
          </>
        ),
        
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
              <ComponentToPrintWrapper user={row.original} />
             
              {/*
                        <a className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Archive" href="#"><span className="icon"><span className="feather-icon"><FeatherIcon icon="archive" /></span></span></a>
                        <a className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Edit" href="edit-contact.html"><span className="icon"><span className="feather-icon"><FeatherIcon icon="edit" /></span></span></a>
                        <a className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Delete" href="#"><span className="icon"><span className="feather-icon"><FeatherIcon icon="trash" /></span></span></a>
                      */}
            </div>
            
            <div className="dropdown">
              <button
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="more-vertical" />
                  </span>
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <a className="dropdown-item" href="edit-contact.html">
                  <span className="feather-icon dropdown-icon">
                    <FeatherIcon icon="list" />
                    <FeatherIcon icon="edit" />
                  </span>
                  <span>Edit Contact</span>
                </a>
                <a className="dropdown-item" href="#">
                  <span className="feather-icon dropdown-icon">
                    <FeatherIcon icon="list" />
                    <i data-feather="trash-2"></i>
                  </span>
                  <span>Delete</span>
                </a>
                <a className="dropdown-item" href="#">
                  <span className="feather-icon dropdown-icon">
                    <FeatherIcon icon="list" />
                    <i data-feather="copy"></i>
                  </span>
                  <span>Duplicate</span>
                </a>
                <div className="dropdown-divider"></div>
                <h6 className="dropdown-header dropdown-header-bold">
                  Change Labels
                </h6>
                <a className="dropdown-item" href="#">
                  Design
                </a>
                <a className="dropdown-item" href="#">
                  Developer
                </a>
                <a className="dropdown-item" href="#">
                  Inventory
                </a>
                <a className="dropdown-item" href="#">
                  Human Resource
                </a>
              </div>
            </div>
          </div>
        ),
        accessor: "options",
        width: 200,
        disableSortBy: true,
        Filter: ({ column: { id } }) => <></>,

      },
    ],
    [navigate, setPatients]
    );
    
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      state,
    setGlobalFilter,
    prepareRow,
    selectedFlatRows,
    toggleHideColumn,
  } = useTable(
    {
      columns,
      data: patients,
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
  // console.log(selectedFlatRows);
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
                          src={DefaultProfileImage}
                          className="avatar_upload_preview"
                          alt="preview"
                        />
                  </div>
                  <div className="w-100">
                       <div className="d-flex justify-content-between">  <span>ID </span> <span>{modalInfo.patientId}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Անուն Ազգանուն Հայրանուն </span> <span>{modalInfo.lastName} {modalInfo.firstName} {modalInfo.midName}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Ծննդյան ամսաթիվ </span> <span>{modalInfo.dateOfBirth}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Սեռ </span> <span>{modalInfo.gender}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Գրանցվել է </span> <span>{modalInfo.createdAt}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Հասցե </span> <span>{modalInfo.contact?.address?.city}, {modalInfo.contact?.address?.street}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Էլ․ Հասցե </span> <span>{modalInfo.contact?.email}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Հեռախոս </span> <span>{modalInfo.contact?.phone}</span></div>
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
              <th  {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div>
                    {column.id !== "selection" && (
                      <>
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    
                    <div  style={{
                      marginTop: "2px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                      <div>{column.render("Header")}</div>
                      
                        <div style={{paddingTop:'20px'}} >
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
      {patients?.length && (
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
          <PatientInfo
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            researchState={researchState}
            />
        </tbody>
      )}{" "}
    </table>
      </>
  );
}

export default PatientsTable;
