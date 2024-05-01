/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react'
import { Checkbox } from '../Checkbox';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import {
    useBlockLayout,
    useFilters,
    useResizeColumns,
    useRowSelect,
    useSortBy,
    useTable,
  } from "react-table";
import { ColumnFilter } from '../ColumnFilter';
import "../../dist/css/data-table.css";
import { useNavigate } from 'react-router-dom';
import { BiSolidInfoCircle } from 'react-icons/bi';
import { Modal } from 'react-bootstrap';
import ProgressBar from '../ProgressBar';
import moment from 'moment';
import DoctorVisitsPrint from '../views/DoctorVisitsPrint';
import DoctorVisitDeactivate from '../DeactivateItems/DoctorVisitDeactivate';
import cancelledSvg from "../../dist/svg/cancelled.svg";
import isActiveSvg from "../../dist/svg/isActive.svg";
import posTerminalSvg from "../../dist/svg/posTerminal.svg";
import CreatePayByPos from '../CreatePayByPos';

function DoctorsVisitsTable({
    doctorsVisits,
    setDoctorsVisits,
    refreshData
}) {
  const navigate = useNavigate()
  const [modalInfo, setModalInfo] = useState("");
  const [DisableRowData, setDisableRowData] = useState(false);
  const [modalPrint, setModalPrint] = useState("");
  const [openPosModal, setOpenPosModal] = useState(false);

  const handlePosPay = (actionData) => {
      setOpenPosModal(actionData);
    };
    const handleClosePosPay = () => {
      setOpenPosModal(false);
    };
               
  
 const handleOpenPrintModal = (data) => {
    setModalPrint((prev) => data);
  };
  const handlePatientsDetail = async (patientId) => {  
     navigate(`/patients/${patientId}`)
      
  };
  const handleVisitsDetail = async (patientId) => {  
     navigate(`/doctorsVisits/${patientId}`)
      
  };
  const handleOpenInfoModal = (data) => {
    
    setModalInfo((prev) => data);
  };
  const handleOpenDeactivateModal = (value) => {
    setDisableRowData((prev) => value);
  };
  const handleDoctorInfo = async (doctorId)=>{
    navigate(`/doctors/${doctorId}`)
    }
    const handleCloseDeactivateModal = (value) => {
      setDisableRowData((prev) => value);
    };
    const defaultColumn = React.useMemo(
        () => ({
          minWidth: 20,
          width: 20,
          maxWidth: 600
        }),
        []
      );
      const columns = useMemo(
        () => [
          {
            Header: (event) => (
              <>
                
                <div  className="columnHeader">ID</div>
              </>
            ),
            accessor: "doctorsVisitId",
            sortable: true,
            width: 80,
            Filter: ({ column: { id } })=>(
              <ColumnFilter
                id={id}
                setData={setDoctorsVisits}
                placeholder={'ID'}
              />
            ),
            Cell: ({ row }) => (
              <>
                <div
                  onClick={() =>
                    handleVisitsDetail(row.original.doctorsVisitId)
                  }
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {row.original.doctorsVisitId}
                </div>
              </>
            ),
          },
          {
            Header: (event) => (
              <>
                
                <div  className="columnHeader">Այցելու</div>
              </>
            ),
            accessor: "name",
            sortable: true,
            width: 280,
            Filter: ({ column: { id } })=>(
              <ColumnFilter
                id={id}
                setData={setDoctorsVisits}
                placeholder = "Անուն ազգանուն"
              />
            ),
            Cell: ({ row }) => (
              <div
                onClick={()=>handlePatientsDetail(row.original?.clientId)}
                style={{ cursor: 'pointer', textDecoration:'underline' }}
              >
                {row.original?.clientLastName+" " +row.original?.clientFirstName+" " +row.original?.clientMidName}
              </div>
            ),
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
            Header: (event) => (
              <>
               
                <div  className="columnHeader">Այցի ամսաթիվ</div>
              </>
            ),
            accessor: "visitDate",
            width: 200,
            Filter: ({ column: { id } })=>(
              <ColumnFilter
              id={id}
              setData={setDoctorsVisits}
              placeholder = "Այցի ամսաթիվ"
              />
              ),
              Cell: ({ row }) => (
                
                <div className="d-flex justify-content-center align-items-center flex-column">
                {moment.utc(row.original?.visitDate).format('DD-MM-YYYY HH:mm') }
                  
                </div>
              ),
            },
            {
              Header: (event) => (
                <>
                 
                  <div  className="columnHeader">Հաջորդ այց</div>
                </>
              ),
              accessor: "nextVisit",
              width: 200,
              Filter: ({ column: { id } })=>(
                <ColumnFilter
                  id={id}
                  setData={setDoctorsVisits}
                  placeholder = "Հաջորդ այց"
                />
              ),
            },
            {
            Header: (event) => (
              <>
               
                <div  className="columnHeader">Բժիշկ</div>
              </>
            ),
            accessor: "doctorName",
            width: 280,
            Filter: ({ column: { id } })=>(
              <ColumnFilter
                id={id}
                setData={setDoctorsVisits}
                placeholder = "Բժիշկ"
              />
            ),
            Cell: ({ row }) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleDoctorInfo(row.original.doctorId);
                }}
                style={{ cursor: 'pointer' ,textDecoration:'underline'}}
              >
                {row.original?.doctorName}
              </div>
            ),
          },
          {
            Header: (event) => (
              <>
                <div className="columnHeader">Գործողություններ</div>
              </>
            ),
            accessor: "actions",
            width: 300,
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
                   {row.original?.visitStatus==="Active" 
                   ?<img src={isActiveSvg} width={'20px'} height={'20px'} alt="isActiveSvg"/>
                   :row.original?.visitStatus==="Cancelled"
                   ? <img width={'20px'} height={'20px'} src={cancelledSvg} alt="cancelledSvg"/> 
                   : '' }
                  </span>
                </span>
              </a>

              </div>
                 <div className="d-flex">
              <BiSolidInfoCircle
              cursor={"pointer"}
              size={"1.5rem"}
              onClick={() => handleOpenInfoModal(row.original)}
            />
            </div>  
                {/* <div className="d-flex">
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
                </div> */}
                {/* {row.original?.visitStatus === "Active" && ( */}
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
                  <div className="d-flex">
              
                <img title="POS" style={{cursor:'pointer'}} width='20xp' height='20px' src={posTerminalSvg} alt='posTerminalSvg' onClick={()=>handlePosPay(row.original)}/>
                </div> 
                </>
              {/* )} */}
              </div>
            ),
            disableSortBy: true,
            Filter: ({ column: { id } })=>(
              <></>
            ),
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
          data: doctorsVisits,
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
          {openPosModal && (
      <CreatePayByPos actionData={openPosModal} handleClosePosPay={handleClosePosPay} refreshData={refreshData}/>         
    )

    }
          {DisableRowData && (
              <DoctorVisitDeactivate
                handleCloseDeactivateModal={handleCloseDeactivateModal}
                rowData={DisableRowData}
                refreshData={refreshData}
              />
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
                    <DoctorVisitsPrint
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
         {
      modalInfo && (
        <Modal
      show={() => true}
      size="md"
      onHide={() => setModalInfo(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ width: "100%", textAlign: "center" }}>
        {modalInfo?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>        
          <div className="contact-body contact-detail-body">
            <div data-simplebar className="nicescroll-bar">
              <div className="d-flex flex-xxl-nowrap flex-wrap">
                <div className="contact-info w-100">
                  <div className="d-flex justify-content-center align-items-center">
                  <h3>{modalInfo?.patientData?.name}</h3>
                    {/* <img
                          width={"150px"}
                          height={"200px"}
                          style={{
                            borderRadius: "5px",
                          }}
                          src={DefaultProfileImage}
                          className="avatar_upload_preview"
                          alt="preview"
                        /> */}
                  </div>
                  <div className="w-100">
                  <div className="modal-body">
                       <div className="d-flex justify-content-between">  <span> Այցելության ID </span> <span>{modalInfo.doctorsVisitId}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Տարիք </span> <span>{modalInfo?.patientData?.age}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Սեռ </span> <span>{modalInfo?.patientData?.gender}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Էլ․ Հասցե </span> <span>{modalInfo?.patientData?.contact?.email}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Հեռախոս </span> <span>{modalInfo?.patientData?.contact?.phone}</span></div>
                       <div className="separator-full m-0"></div>                  
                       <div className="d-flex justify-content-between">  <span>Բժիշկ </span> <span>{modalInfo.doctorName}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Այցի ամսաթիվ </span> <span>{moment.utc(modalInfo?.visitDate).format('DD-MM-YYYY HH:mm')}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Հաջորդ այց </span> <span>{modalInfo?.nextVisit ? moment.utc(modalInfo?.nextVisit).format('DD-MM-YYYY HH:mm'):''}</span></div>
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
                        <span>{modalInfo.paymentDate?.split("T").join(' ').split('.',1)}</span>
                      </div>
                      <div className="separator-full m-0"></div>
                  </div>
                  <div className="modal-body">
                        <h2 className='d-flex justify-content-center align-items-center'> Բժշկի Նշանակումներ</h2>
                   
                        <ul className='fw-bold'>Նշանակումներ
                        {modalInfo?.doctorsAppointments?.instructions && modalInfo?.doctorsAppointments?.instructions.map((el)=>(
                                <li style={{fontWeight:'normal',listStyle:'inside'}}>{el}</li>
                                ))
                              }  
                        </ul>
                        <ul className='fw-bold'>Դեղամիջոցներ
                        {modalInfo?.doctorsAppointments?.medicine && modalInfo?.doctorsAppointments?.medicine.map((el)=>(
                                <li style={{fontWeight:'normal',listStyle:'inside'}}>{el}</li>
                                ))
                        }  
                        </ul>
                        <ul className='fw-bold'>Հետազոտություններ
                        {modalInfo?.doctorsAppointments?.researches && modalInfo?.doctorsAppointments?.researches.map((el)=>(
                                <li style={{fontWeight:'normal',listStyle:'inside'}}>{el}</li>
                                ))
                              }  
                        </ul>
                  </div>
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
          {doctorsVisits?.length>0? (
            <>
               
                <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const rowProps = row.getRowProps();
              const visitStatus = row.original?.visitStatus === "Cancelled";
              // const diagStatus = row.original.patientId > 'Cancelled';
              return (
                <tr
                  {...rowProps}
                  style={{
                    backgroundColor: visitStatus
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
            </>
              ):''}
        </table>
        </>
      );
}

export default DoctorsVisitsTable
