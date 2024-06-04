/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { ColumnFilter } from "../ColumnFilter";
import "../../dist/css/data-table.css";
import {  useNavigate } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import DefaultProfileImage from "../../../src/dist/img/Missing.svg";
import PatientEditModal from "../EditViews/PatientEditModal";
import moment from "moment";
import { PATIENTS_URL, PATIENTS__SEARCH_URL } from "../../utils/constants";
import { axiosPrivate } from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useDebounce from "../../hooks/useDebounce";


function PatientsTable({
  selectedItem,
  handleOpenModal,
  handleCloseModal,
  researchState,
  patients,
  setPatients,
  refreshData,
  handleSearchPageCount
}) {
  const navigate = useNavigate();
  const [modalInfo, setModalInfo] = useState("");
  const [editRow, setEditRow] = useState(false);
  const [filterData, setFilterData] = useState({});
  //console.log(filterData)
  const handleOpenEditModal = (value) => {
      setEditRow((prev) => value);
    };
  const handleOpenInfoModal = (user) => {
    
    setModalInfo((prev) => user);
  };
  const handlePatientsDetail = async (patientId) => {  
      navigate(`/patients/${patientId}`)
  };
 
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 20,
      maxWidth: 400,
      Filter: ({ column: { id } }) => <></>,
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
        //sortable: true,
        disableSortBy: true,
        width: 80,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setPatients}
            data={patients}
            placeholder={'ID'}
            getUrl={PATIENTS_URL}
            searchUrl={PATIENTS__SEARCH_URL}
            handleSearchPageCount={(data)=>handleSearchPageCount(data)}
            filterData={filterData}
            setFilterData={(newFilterData) => {
              if(Object.values(newFilterData).length>1 || Object.values(newFilterData).length===0){
                setFilterData(newFilterData)
              }else{
                setFilterData((prevFilterData) => {
                  return {...newFilterData };
                })
              }
             
            }}
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
        Filter: ({ column: { id },column })=>(
          <ColumnFilter
          column={column}
            id={id}
            setData={setPatients}
            data={patients}
            placeholder={'Անուն'}
            getUrl={PATIENTS_URL}
            searchUrl={PATIENTS__SEARCH_URL}
            handleSearchPageCount={(val)=>handleSearchPageCount(val)}
            filterData={filterData}
            setFilterData={(newFilterData) => {
              
              if(Object.values(newFilterData).length>1 || Object.values(newFilterData).length===0){
                setFilterData(newFilterData)
              }else{
                setFilterData((prevFilterData) => {
                  return { ...newFilterData };
                })
              }
             
            }}

          />
        ),
        Cell: ({ row }) => (
          <div
            // onClick={()=>handlePatientsDetail(row.original.patientId)}
            // style={{ cursor: 'pointer', textDecoration:'underline' }}
          >
            {row.original.firstName}{<span className="sorting_asc"></span>}
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
            data={patients}
            placeholder={'Ազգանուն'}
            getUrl={PATIENTS_URL}
            searchUrl={PATIENTS__SEARCH_URL}
            handleSearchPageCount={(val)=>handleSearchPageCount(val)}
            filterData={filterData}
            setFilterData={(newFilterData) => {
              if(Object.values(newFilterData).length>1 || Object.values(newFilterData).length===0){
                setFilterData(newFilterData)
              }else{
                setFilterData((prevFilterData) => {
                  return { ...newFilterData };
                })
              }
             
            }}

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
            data={patients}
            placeholder={'Հայրանուն'}
            getUrl={PATIENTS_URL}
            searchUrl={PATIENTS__SEARCH_URL}
            handleSearchPageCount={(val)=>handleSearchPageCount(val)}
            filterData={filterData}
            setFilterData={(newFilterData) => {
              
              if(Object.values(newFilterData).length>1 || Object.values(newFilterData).length===0){
                setFilterData(newFilterData)
              }else{
                setFilterData((prevFilterData) => {
                  return {...newFilterData };
                })
              }
             
            }}
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
            data={patients}
            placeholder={'Էլ․ հասցե'}
            getUrl={PATIENTS_URL}
            searchUrl={PATIENTS__SEARCH_URL}
            handleSearchPageCount={(val)=>handleSearchPageCount(val)}
            filterData={filterData}
            setFilterData={(newFilterData) => {
              if(Object.values(newFilterData).length>1 || Object.values(newFilterData).length===0){
                setFilterData(newFilterData)
              }else{
                setFilterData((prevFilterData) => {
                  return {...newFilterData };
                })
              }
             
            }}
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
            data={patients}
            placeholder={'Տարիք'}
            getUrl={PATIENTS_URL}
            searchUrl={PATIENTS__SEARCH_URL}
            handleSearchPageCount={(val)=>handleSearchPageCount(val)}
            filterData={filterData}
            setFilterData={(newFilterData) => {
              if(Object.values(newFilterData).length>1 || Object.values(newFilterData).length===0){
                setFilterData(newFilterData)
              }else{
                setFilterData((prevFilterData) => {
                  return { ...newFilterData };
                })
              }
             
            }}

          />
        ),
      },
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
    [setPatients,Object.keys(filterData)[0],filterData,patients]
    );
     console.log(filterData)
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
                       <div className="d-flex justify-content-between">  <span>Ծննդյան ամսաթիվ </span> <span>{modalInfo.dateOfBirth && moment.utc(modalInfo.dateOfBirth).format('DD-MM-YYYY')}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Սեռ </span> <span>{(modalInfo.gender==='Male')?'Արական':'Իգական'}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Գրանցվել է </span> <span>{modalInfo.createdAt && moment.utc(modalInfo.createdAt).format('DD-MM-YYYY HH:mm')}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Վերջին թարմացում</span> <span>{modalInfo?.updatedAt && moment.utc(modalInfo?.updatedAt).format('DD-MM-YYYY HH:mm')}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Հասցե </span> <span>{modalInfo.contact?.address?.city}, {modalInfo.contact?.address?.street}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Էլ․ Հասցե </span> <span>{modalInfo.contact?.email}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Հեռախոս </span> <span>{modalInfo.contact?.phone}</span></div>
                       <div className="separator-full m-0"></div>                  
                       <div className="d-flex justify-content-between">  <span>Հեռախոս </span> <span>{modalInfo.additional}</span></div>
                       <div className="separator-full m-0"></div>                  
                       <div className="d-flex justify-content-between">  <span>Տեղեկացվածության աղբյուր</span> <span>{modalInfo?.referrer || modalInfo?.extraReferrer}</span></div>
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
    {
      editRow &&(
        <PatientEditModal patient={editRow} setEditRow={setEditRow} refreshData={refreshData}/>
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
                    {column.id !== "selection" && (
                  <div className="d-flex justify-content-between ">
                      
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
                        </div>
                        {column.id!=="patientId" && 
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
                          }

                        </div>
                    )}
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
      {patients?.length>0? (
        <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps({style:cell.column?.id === "options"
                    ? undefined
                    : { cursor:'pointer' },
                      onClick:
                        cell.column?.id === "options"
                          ? undefined
                          : () => handlePatientsDetail(row.original?.patientId), 
                    })}
                  >
                    {cell.render("Cell")}
                  </td>
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
       ):''}
    </table>
      </>
  );
}

export default PatientsTable;
