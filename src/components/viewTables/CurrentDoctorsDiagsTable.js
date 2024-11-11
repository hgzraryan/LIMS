/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import DiagnosticsDeactivate from "../DeactivateItems/DiagnosticsDeactivate";
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
import DiagnosticsInfoModal from "../infoModals/DiagnosticsInfoModal";
import { DIAGNOSTICS_URL, DIAGNOSTICS__SEARCH_URL, ROLES } from "../../utils/constants";
import DiagnosticsEditModal from "../EditViews/DiagnosticsEditModal";
import emptyTable from "../../dist/svg/emptyTable.svg"
import sonographyIcon from "../../dist/svg/ultrasonography.png"
import DiscountModal from "../DiscountModal";
import DiagTransferModal from "../DiagTransferModal";

function CurrentDoctorsDiagsTable({
    confirmRef,
    handleDeleteItem,
    diagnostics,
    setDiagnostics,
    handleCloseModal,
    handleOpenModal,
    selectedItemId,
    selectedItem,
    refreshData,
    dataCount,
    handleSearchPageCount,
    dataReceived
  
  }) {
    const navigate = useNavigate();
    const [noData, setNoData] = useState(false);
    const [selectedItem1, setSelectedItem1] = useState("");
    const [deactivateRow, setDeactivateRow] = useState(false);
    const [modalInfo, setModalInfo] = useState("");
    const [modalPrint, setModalPrint] = useState("");
    const [openPosModal, setOpenPosModal] = useState(false);
    const [filterData, setFilterData] = useState({});
    const [filterDataJSON, setFilterDataJSON] = useState('');
    const [editRow, setEditRow] = useState(false);
    const [discount, setDiscount] = useState(false);
    const [transfer, setTransfer] = useState(false);
    
    const storedUserRoles = JSON.parse(localStorage.getItem('userRoles'));
    const [superAdmin,setSuperAdmin]=useState(storedUserRoles?.includes(ROLES?.SuperAdmin))
  
    const handleOpenTransferModal = (e,value) => {
      e.stopPropagation()
      setTransfer((prev) => value);
    };
    const handleOpenEditModal = (value) => {
      setEditRow((prev) => value);
    };
    const handleOpenDiscountModal = (value) => {
      console.log(value)
      setDiscount((prev) => value);
    };
    const handleOpenInfoModal = (e,data) => {
      e.stopPropagation()
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
      setDeactivateRow((prev) => value);
    };
    const handleCloseDeactivateModal = () => {
      setDeactivateRow(false);
    };
    const handlePosPay = (e,diagnosticsId) => {
      e.stopPropagation()
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
        Filter: ({ column: { id } }) => <></>,
  
      }),
      []
    );
    
    const handleDiagnosticsDetails = async (diagnosticsId) => {
      navigate(`/doctorsTemplete/diagnostics/${diagnosticsId}`);
    };
    const handleClientDetails = async (rowData) => {
      const { clientId } = rowData;
      const { clientType } = rowData;
      clientType === "patient"
        ? navigate(`/doctorsTemplete/patients/${clientId}`)
        // :
        // clientType === "organization"
        // ? navigate(`/organizations/${clientId}`)
        :<></>
    };
 
  
  
    const CheckboxFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
      const [toggleFilterModal, setToggleFilterModal] = useState(false);
      const modalRef = useRef();
  
      const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach(row => {
          options.add(row.values[id]);
        });
        return [...options.values()];
      }, [id, preFilteredRows]);
    
      const handleCheckboxChange = (option) => {
        setFilter((old = []) => {
          if (old.includes(option)) {
            return old.filter(item => item !== option);
          } else {
            return [...old, option];
          }
        });
      };
      const handleFilterClick = (e) => {
        e.stopPropagation();
        setToggleFilterModal((prev) => !prev);
      };
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setToggleFilterModal(false);
        }
      };
    
      useEffect(() => {
        if (toggleFilterModal) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [toggleFilterModal]);
      return (
        <div style={{ position: "relative" }}>
         <span
          className="d-flex justify-content-center align-items-center"
          onClick={handleFilterClick}
          style={{ 
            //backgroundColor: `${filterData ? '#4eafcb' : ''}`, 
            padding: '5px', 
            borderRadius: '5px' }}
        >
          <FeatherIcon icon="filter" width={15} height={15} />
        </span>
        {toggleFilterModal && (
          <div
          ref={modalRef}
          style={{
            position: "absolute",
            display:'flex',
            flexDirection:'column',
            padding: "8px 20px",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            boxShadow: "0 6px 16px 0 rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          {options.map((option, i) => (
            <label key={i}>
              <input
                type="checkbox"
                checked={filterValue ? filterValue.includes(option) : false}
                onChange={() => handleCheckboxChange(option)}
                style={{marginRight:'10px'}}
                />
              {option==="Active"?"Ակտիվ":"Չեղարկված"}
            </label>
          ))}
          </div>
        )}
        </div>
        
      );
    };
    const columns = useMemo(
      () => [
        {
          Header: "ID",
          accessor: "diagnosticsId",
          sortable: true,
          width: 80,
          Filter: ({ column: { id } }) => (
            <ColumnFilter id={id} 
            setData={setDiagnostics} 
            placeholder={"ID"}
            getUrl = {DIAGNOSTICS_URL}
            searchUrl = {DIAGNOSTICS__SEARCH_URL} 
            handleSearchPageCount={(val)=>handleSearchPageCount(val)}
              filterData={filterData}
              setFilterData={(newFilterData) => {
                  setFilterDataJSON(JSON.stringify({...filterData, ...newFilterData}))
                  setFilterData(newFilterData)   
              }}
  
            />
          ),
  
          Cell: ({ row }) => (
            
              <div
                onClick={() =>
                  handleDiagnosticsDetails(row.original.diagnosticsId)
                }
                style={{display:'flex', cursor: "pointer", textDecoration: "underline" ,gap:'5px'}}
              >
                <div>
  
                {row.original.diagnosticsId}
                </div>
                <div>
                {/* {!row.original?.init?.sono &&
                  <img src={sonographyIcon} alt="sonographyIcon" width={'20px'} height={'20px'} />} */}
              </div>
              </div>
          ),
        },
        {
          Header: "Այցելու",
          accessor: "clientName",
          sortable: true,
          width: 300,
          // Filter: ({ column}) => (
          //   <ColumnFilter
          //     id={column.id}
          //     setData={setDiagnostics}
          //     placeholder="Այցլու"
          //     getUrl = {DIAGNOSTICS_URL}
          //     searchUrl = {DIAGNOSTICS__SEARCH_URL}
          //   />
          // ),
          Cell: ({ row }) => (
            <>
              <div
                onClick={() => handleClientDetails(row.original)}
                style={{ cursor: "pointer",  }}
              >
                {row.original.clientType === "organization" ? (
                  <img
                    src={organizationsSvg}
                    alt="organizationIcon"
                    width={25}
                    height={25}
                    className="me-2"
                  />
                ) : row.original.clientType === "patient"?(
                  <img
                    src={patientSvg}
                    alt="patientIcon"
                    width={25}
                    height={25}
                    className="me-2"
                  />
                ):'Առանց այցելու'}
                {row.original?.clientType==='patient'
                ? row.original?.clientFirstName + " " +
                row.original?.clientLastName +  " " +
                row.original?.clientMidName
                :row.original?.clientType==='organization'
                ?'Պատվիրատու'
              :''}
              </div>
            </>
          ),
        },
        {
          Header: "Հետազոտություններ",
          accessor: "researchList",
          disableSortBy: true,
          width: 180,
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
          // Filter: ({ column: { id } }) => <></>,
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
        },
        {
          Header: "Գրանցման ամսաթիվ",
          accessor: "diagnosisDate",
          width: 200,
          // Filter: ({ column: { id } }) => (
          //   <ColumnFilter
          //     id={id}
          //     setData={setDiagnostics}
          //     placeholder="Գրանցման ամսաթիվ"
          //     getUrl = {DIAGNOSTICS_URL}
          //     searchUrl = {DIAGNOSTICS__SEARCH_URL}
          //   />
          // ),
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
          width: 150,
          // Filter: ({ column: { id } }) => (
          //   <ColumnFilter 
          //   id={id} 
          //   setData={setDiagnostics} 
          //   placeholder="Տեսակ"
          //   getUrl = {DIAGNOSTICS_URL}
          //   searchUrl = {DIAGNOSTICS__SEARCH_URL} />
          // ),
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
          Filter: CheckboxFilter,
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
                <BiSolidInfoCircle
                  cursor={"pointer"}
                  size={"1.5rem"}
                  title="info"
                  color="gray"
                  onClick={(e) => handleOpenInfoModal(e,row.original)}
                />
            </div>
          ),
          disableSortBy: true,
          width: 150,
          Filter: ({ column: { id } }) => <></>,
        },
      ],
      [diagnostics,setDiagnostics,filterDataJSON,filterData,handleSearchPageCount]
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
      {!!deactivateRow && (
        <DiagnosticsDeactivate
          handleCloseDeactivateModal={handleCloseDeactivateModal}
          rowData={deactivateRow}
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


        {!!modalInfo && (
          <DiagnosticsInfoModal modalInfo={modalInfo} setModalInfo={setModalInfo}/>
        )}
        {!!modalPrint && (
          <ResearchesPrint modalPrint={modalPrint} setModalPrint={setModalPrint} />
        )}
        <table
          className="table nowrap w-100 mb-5 dataTable no-footer diagTable"
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
                            <div style={{ paddingTop: "20px" }} >
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <span className="sorting_asc" ></span>
                                ) : (
                                  <span className="sorting_desc" ></span>
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
          {diagnostics?.length > 0 ? (
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
          ):dataReceived?(
            <tr class="table-placeholder">
              <td class="table-cell" >
                <div class="empty-normal">
                  <div class="empty-image d-flex justify-content-center align-items-center">
                    <img src={emptyTable} alt='emptyTable'/>
                  </div>
                  <div class="empty-description d-flex justify-content-center align-items-center mb-2">Տվյալներ չկան</div>
                </div>
              </td>
            </tr>
           ):<></>}       
        </table>
      </>
    );
  }

export default CurrentDoctorsDiagsTable
