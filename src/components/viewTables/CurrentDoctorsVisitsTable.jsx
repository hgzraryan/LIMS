import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useBlockLayout, useFilters, useResizeColumns, useRowSelect, useSortBy, useTable } from 'react-table';
import { Checkbox } from '../Checkbox';
import CreatePayByPos from '../CreatePayByPos';
import DoctorVisitDeactivate from '../DeactivateItems/DoctorVisitDeactivate';
import DoctorVisitsPrint from '../views/DoctorVisitsPrint';
import DoctorVisitsInfoModal from '../infoModals/DoctorVisitsInfoModal';
import "../../dist/css/data-table.css";
import cancelledSvg from "../../dist/svg/cancelled.svg";
import isActiveSvg from "../../dist/svg/isActive.svg";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import emptyTable from "../../dist/svg/emptyTable.svg"
import ProgressBar from '../ProgressBar';

function CurrentDoctorsVisitsTable({ doctorsVisits, setDoctorsVisits, refreshData,handleSearchPageCount,
    dataReceived }) {
    const navigate = useNavigate();
    const [modalInfo, setModalInfo] = useState("");
    const [DisableRowData, setDisableRowData] = useState(false);
    const [modalPrint, setModalPrint] = useState("");
    const [openPosModal, setOpenPosModal] = useState(false);
    const [filterData, setFilterData] = useState({});
    const [filterDataJSON, setFilterDataJSON] = useState('');
  
    const handleClosePosPay = () => {
      setOpenPosModal(false);
    };
  
    const handleOpenPrintModal = (data) => {
      setModalPrint((prev) => data);
    };
    const handlePatientsDetail = async (patientId) => {
      navigate(`/doctorsTemplete/patients/${patientId}`);
    };
    
    const handleVisitsDetail = async (patientId) => {
        
      navigate(`/doctorsTemplete/doctorsVisits/${patientId}`);
    };
    const handleOpenDeactivateModal = (value) => {
      setDisableRowData((prev) => value);
    };
    const handleCloseDeactivateModal = (value) => {
      setDisableRowData((prev) => value);
    };
    const defaultColumn = React.useMemo(
      () => ({
        minWidth: 20,
        width: 20,
        maxWidth: 600,
        Filter: ({ column: { id } }) => <></>,
      }),
      []
    );
    const columns = useMemo(
      () => [
        {
          Header: (event) => (
            <>
              <div className="columnHeader">ID</div>
            </>
          ),
          accessor: "doctorsVisitId",
          sortable: true,
          width: 80,
        //   Filter: ({ column: { id } }) => (
        //     <ColumnFilter id={id} 
        //     setData={setDoctorsVisits} 
        //     placeholder={"ID"}
        //     getUrl = {DOCTORSVISITS_URL}
        //     searchUrl = {
        //       DOCTORSVISITS__SEARCH_URL
        //       //DOCTORSVISITS__SEARCH_URL
        //     } 
        //     handleSearchPageCount={(val)=>handleSearchPageCount(val)}
        //     filterData={filterData}
        //     setFilterData={(newFilterData) => {
        //         setFilterDataJSON(JSON.stringify({...filterData, ...newFilterData}))
        //         setFilterData(newFilterData)   
        //     }}
  
          
        //     />
        //   ),
          Cell: ({ row }) => (
            <>
              <div
                onClick={() => handleVisitsDetail(row.original.doctorsVisitId)}
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
              <div className="columnHeader">Այցելու</div>
            </>
          ),
          accessor: "name",
          sortable: true,
          width: 280,
          Cell: ({ row }) => (
            <div
              onClick={() => handlePatientsDetail(row.original?.clientId)}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {row.original?.clientLastName +
                " " +
                row.original?.clientFirstName +
                " " +
                row.original?.clientMidName}
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
                {row.original?.originalPrice &&
                !(row.original?.originalPrice === row.original?.totalPrice) ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row-reverse",
                      fontSize: "14px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#bb86fc",
                        borderRadius: "8px",
                        padding: "0 10px 0 10px",
                        margin: "0 0 -3px 0",
                        zIndex: "9999",
                        color: "white",
                        textDecoration: "line-through",
                      }}
                    >
                      <p> {row.original?.originalPrice}</p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="d-flex">
                  <ProgressBar
                    totalPrice={row.original?.totalPrice || 0}
                    totalPayed={row.original?.totalPayed || 0}
                  />
                </div>
              </div>
            </>
          ),
        },
        {
          Header: (event) => (
            <>
              <div className="columnHeader">Այցի ամսաթիվ</div>
            </>
          ),
          accessor: "visitDate",
          width: 200,
          // Filter: ({ column: { id } }) => (
          //   <ColumnFilter
          //     id={id}
          //     setData={setDoctorsVisits}
          //     placeholder="Այցի ամսաթիվ"
          //   />
          // ),
          Cell: ({ row }) => (
            <div className="d-flex justify-content-center align-items-center flex-column">
              {row.original?.visitDate && moment.utc(row.original?.visitDate).format("DD-MM-YYYY HH:mm")}
            </div>
          ),
        },
        {
          Header: (event) => (
            <>
              <div className="columnHeader">Հաջորդ այց</div>
            </>
          ),
          accessor: "nextVisit",
          width: 200,
        },
        {
          Header: (event) => (
            <>
              <div className="columnHeader">Գործողություններ</div>
            </>
          ),
          accessor: "actions",
          width: 200,
          Cell: ({ row }) => (
            <div className="d-flex align-items-center">
             
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
              </>
            </div>
          ),
          disableSortBy: true,
        },
      ],
      [doctorsVisits,setDoctorsVisits,filterDataJSON,filterData,handleSearchPageCount]
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
        {!!openPosModal && (
          <CreatePayByPos
            actionData={openPosModal}
            handleClosePosPay={handleClosePosPay}
            refreshData={refreshData}
          />
        )}
        {!!DisableRowData && (
          <DoctorVisitDeactivate
            handleCloseDeactivateModal={handleCloseDeactivateModal}
            rowData={DisableRowData}
            refreshData={refreshData}
          />
        )}
        {!!modalPrint && (
          <DoctorVisitsPrint
            modalPrint={modalPrint}
            setModalPrint={setModalPrint}
          />
        )}
        {!!modalInfo && (
          <DoctorVisitsInfoModal
            modalInfo={modalInfo}
            setModalInfo={setModalInfo}
          />
        )}
        <table
          className="table nowrap w-100 mb-5 dataTable no-footer diagTable"
          {...getTableProps()}
        >
           <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={'headerGroup'+headerGroup?.id}>
              {headerGroup.headers.map((column) => (
                <th  {...column.getHeaderProps(column.getSortByToggleProps())} key={'column'+column?.id}>
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
                      {...column.getResizerProps({onClick(ev){ev.stopPropagation()}})}
                      className={`resizer ${
                      column.isResizing ? "isResizing" : ""
                    }`}
                    />
                  </th>
              ))}
            </tr>
          ))}
        </thead>
          {doctorsVisits?.length > 0 ? (
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  const rowProps = row.getRowProps();
                  const visitStatus = row.original?.visitStatus === "Cancelled";
                  // const diagStatus = row.original.patientId > 'Cancelled';
                  return (
                    <tr
                    key={'row'+row?.id}
                      {...rowProps}
                      style={{
                        backgroundColor: visitStatus
                          ? "rgb(255, 99, 71, 0.2)"
                          : "inherit",
                        borderStyle: "none !important",
                      }}
                    >
                      {row.cells.map((cell,i) => {
                        return (
                          <td {...cell.getCellProps()} key={i}>{cell.render("Cell")}</td>
                        );
                      })}
                    </tr>
                  );
                })}
               </tbody>
           ):dataReceived?(
            <tr className="table-placeholder">
              <td className="table-cell" >
                <div className="empty-normal">
                  <div className="empty-image d-flex justify-content-center align-items-center">
                    <img src={emptyTable} alt='emptyTable'/>
                  </div>
                  <div className="empty-description d-flex justify-content-center align-items-center mb-2">Տվյալներ չկան</div>
                </div>
              </td>
            </tr>
           ):<></>}        
        </table>
      </>
    );
  }

export default CurrentDoctorsVisitsTable
