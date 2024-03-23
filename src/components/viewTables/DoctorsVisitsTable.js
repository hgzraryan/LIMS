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

function DoctorsVisitsTable({
    selectedItem,
    selectedItemId,
    handleDeleteItem,
    handleOpenModal,
    handleCloseModal,
    doctorsVisits,
    setDoctorsVisits,
    //getDoctorsVisits
}) {
  const navigate = useNavigate()
  const [modalInfo, setModalInfo] = useState("");
  
  const handlePatientsDetail = async (patientId) => {  
    //  navigate(`/patients/${patientId}`)
      
  };
  const handleOpenInfoModal = (data) => {
    
    setModalInfo((prev) => data);
  };
  const handleDoctorInfo = async ({doctorId})=>{
    navigate(`/doctors/5`)
    }
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
            accessor: "doctorsVisitsId",
            sortable: true,
            width: 60,
            Filter: ({ column: { id } })=>(
              <ColumnFilter
                id={id}
                setData={setDoctorsVisits}
                placeholder={'ID'}
              />
            ),
          },
          {
            Header: (event) => (
              <>
                
                <div  className="columnHeader">Անուն ազգանուն</div>
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
                onClick={()=>handlePatientsDetail(row.original?.patientData?.patientId)}
                style={{ cursor: 'pointer', textDecoration:'underline' }}
              >
                {row.original?.patientData?.name}
              </div>
            ),
          },
          {
            Header: (event) => (
              <>
                <div>Էլ․ հասցե</div>
              </>
            ),
            accessor: "email",
            width: 200,
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
                {row.original?.patientData?.contact?.email}
              </div>
            ),
            Filter: ({ column: { id } })=>(
              <ColumnFilter
                id={id}
                setData={setDoctorsVisits}
                placeholder = "Էլ․ հասցե"
              />
            ),
          },
          {
            Header: (event) => (
              <>
                <div>Հեռախոս</div>
              </>
            ),
            accessor: "phone",
            width: 200,            
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
                {row.original?.patientData?.contact?.phone}
              </div>
            ),
            Filter: ({ column: { id } })=>(
              <ColumnFilter
                id={id}
                setData={setDoctorsVisits}
                placeholder = "Հեռախոս"
              />
            ),
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
                  handleDoctorInfo(row.original);
                }}
                style={{ cursor: 'pointer' ,textDecoration:'underline'}}
              >
                {row.original.doctorName}
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
                    href="edit-contact.html"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <FeatherIcon icon="edit" />
                      </span>
                    </span>
                  </a>
                </div>
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
          defaultColumn      
        },
        useFilters,useBlockLayout,useResizeColumns,useSortBy,
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
                       <div className="d-flex justify-content-between">  <span>Այցի ամսաթիվ </span> <span>{modalInfo?.visitDate}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Հաջորդ այց </span> <span>{modalInfo?.nextVisit}</span></div>
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
       
        <table  className="table nowrap w-100 mb-5 dataTable no-footer" {...getTableProps()} >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps({style:{width:'100%'}})}>
                {headerGroup.headers.map((column) => (
                  <th  {...column.getHeaderProps(column.getSortByToggleProps({
                    style: column.style // Apply custom style to the column header
                  }))}>
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
          {doctorsVisits?.length && (
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps({style:{width:'100%'}})}>
                      {row.cells.map(cell => {
                        return <td {...cell.getCellProps({
                          style: cell.column.style // Apply custom style to the column cells
                        })}>{cell.render('Cell')}</td>
                      })}
                    </tr>
                  )
                })}
              
                </tbody>
              )}{" "}
        </table>
        </>
      );
}

export default DoctorsVisitsTable
