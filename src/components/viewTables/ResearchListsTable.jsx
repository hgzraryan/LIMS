import React, { useMemo, useState } from "react";
import ComponentToConfirm from "../ComponentToConfirm";
import { useBlockLayout, useFilters, useResizeColumns, useRowSelect, useSortBy, useTable } from "react-table";
import { Checkbox } from "../Checkbox";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { ColumnFilter } from "../ColumnFilter";
import { BiSolidInfoCircle } from "react-icons/bi";
import researchSvg from "../../../src/dist/img/research.svg";
import "../../dist/css/data-table.css";
import { Modal } from "react-bootstrap";
import ResearchListEditModal from "../EditViews/ResearchListEditModal";
import moment from "moment";
import emptyTable from "../../dist/svg/emptyTable.svg"
import { ROLES } from "../../utils/constants";

function ResearchListsTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  researches,
  setResearches,
  refreshData,
  dataReceived
}) {
  const [modalInfo, setModalInfo] = useState("");
  const [editRow, setEditRow] = useState(false);
  const storedUserRoles = JSON.parse(localStorage.getItem('userRoles'));
  const [superAdmin,setSuperAdmin]=useState(storedUserRoles.includes(ROLES?.SuperAdmin))
  const handleOpenEditModal = (value) => {
      setEditRow((prev) => value);
    };
  const handleOpenInfoModal = (user) => {    
    setModalInfo((prev) => user);
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
        accessor: "researchListId",
        sortable: true,
        width:80,
      },
      // {
      //   Header: (event) => (
      //     <>            
      //       <div className="columnHeader">Ներքին կոդ</div>
      //     </>
      //   ),
      //   accessor: "localCode",
      //   sortable: true,
      //   width:130,
      // },
      // {
      //   Header: (event) => (
      //     <>
            
      //       <div className="columnHeader">ԲԳԿ ԿՈԴ</div>
      //     </>
      //   ),
      //   accessor: "partnerCode",
      //   disableSortBy: true,
      //   width:130,
      // },
      {
        Header: (event) => (
          <>
            
            <div className="columnHeader">Անվանում</div>
          </>
        ),
        accessor: "researchName",
        sortable: true,
        width:300,
      },
      // {
      //   Header: (event) => (
      //     <>
            
      //       <div className="columnHeader">Լաբ. / Ծառ.</div>
      //     </>
      //   ),
      //   accessor: "laboratoryService",
      //   sortable: true,
      //   width:200,
      // },
      // {
      //   Header: (event) => (
      //     <>
            
      //       <div className="columnHeader">Դասկարգի անվ․</div>
      //     </>
      //   ),
      //   accessor: "categoryName",
      //   width:200,
      // },
      {
        Header: (event) => (
          <>            
            <div className="columnHeader">Ծառ. անվանում</div>
          </>
        ),
        accessor: "serviceName",
        width:300,
      },
      {
        Header: (event) => (
          <>            
            <div className="columnHeader">Հապավում</div>
          </>
        ),
        accessor: "shortName",
        width:150,
      },
      {
        Header: (event) => (
          <>
            
            <div className="columnHeader">Գին</div>
          </>
        ),
        accessor: "price",
        width:100,
      },
      // {
      //   Header: (event) => (
      //     <>
            
      //       <div className="columnHeader">Առքի գին</div>
      //     </>
      //   ),
      //   accessor: "purchasePrice",
      //   width:150,
      // },
      // {
      //   Header: (event) => (
      //     <>
            
      //       <div className="columnHeader">Հրապ․ առավել. ժամկետ</div>
      //     </>
      //   ),
      //   accessor: "deliveryTimeLimit",
      //   width:200,
      // },
      {
        Header: (event) => (
          <>
            
            <div className="columnHeader">Կենսանյութ</div>
          </>
        ),
        accessor: "biomaterial",
        width:200,
      },
      // {
      //   Header: (event) => (
      //     <>
            
      //       <div className="columnHeader">Սրվակ</div>
      //     </>
      //   ),
      //   accessor: "vial",
      //   width:100,
      // }, 
      // {
      //   Header: (event) => (
      //     <>
            
      //       <div className="columnHeader">Նմուշ․ ժամկետը</div>
      //     </>
      //   ),
      //   accessor: "samplingPeriod",
      //   width:200,
      // },
      // {
      //   Header: (event) => (
      //     <>
            
      //       <div className="columnHeader">Հետ․ Նախապատրաստում</div>
      //     </>
      //   ),
      //   accessor: "researchPrepSub",
      //   width:250,
      // },
      // {
      //   Header: (event) => (
      //     <>
            
      //       <div className="columnHeader">Դասակարգ</div>
      //     </>
      //   ),
      //   accessor: "category",
      //   width:150,
      // },
     
      {
        Header: (event) => (
          <>
            
            <div className="columnHeader">Հետ․ տեսակ</div>
          </>
        ),
        accessor: "class",
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
        width:200,
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Գործողություններ</div>
          </>
        ),
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
              {!!superAdmin &&
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                data-bs-toggle="tooltip"
                onClick={() => handleOpenModal(row.original)}
                data-placement="top"
                title=""
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
            </div>
          </div>
        ),
        disableSortBy: true,
        width:200,
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
       data: researches, 
      //data: customResearchData, 
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
  return (
    <>
     {!!modalInfo && (
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
                          src={researchSvg}
                          className="avatar_upload_preview"
                          alt="preview"
                        />
                  </div>
                  <div className="w-100">
                       <div className="d-flex justify-content-between">  <span> ID </span> <span>{modalInfo.researchListId}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span> Ներքին կոդ </span> <span>{modalInfo.localCode}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span> ԲԳԿ ԿՈԴ </span> <span>{modalInfo.partnerCode}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span> Հապավում </span> <span>{modalInfo.shortName}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Դասակարգ</span> <span>{modalInfo.category}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Դասակարգի անվանում</span> <span>{modalInfo.categoryName}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Տեսակ</span> <span>{modalInfo.class==='Internal'?'Ներքին':modalInfo.class==='External'?'Արտաքին':'Այլ'}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Անվանում</span> <span>{modalInfo.researchName}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Ծառայության անվանում</span> <span>{modalInfo.serviceName}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Առաքման ժամկետ </span> <span>{modalInfo.deliveryTimeLimit}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Լաբորատոր ծառայություն</span> <span>{modalInfo.laboratoryService}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Սրվակ</span> <span>{modalInfo.vial}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Կենսանյութ</span> <span>{modalInfo.biomaterial}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Առքի գին</span> <span>{modalInfo.purchasePrice}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Արժեք </span> <span>{modalInfo.price}</span></div>
                       <div className="separator-full m-0"></div>                  
                       <div className="d-flex justify-content-between">  <span>Նմուշառման ժամկետ </span> <span>{modalInfo.samplingPeriod}</span></div>
                       <div className="separator-full m-0"></div>                  
                       <div className="d-flex justify-content-between">  <span>Նախապատրաստում </span> <span>{modalInfo.researchPrepSub}</span></div>
                       <div className="separator-full m-0"></div>                  
                       <div className="d-flex justify-content-between">  <span>Գրանցված է </span> <span>{modalInfo.createdAt && moment.utc(modalInfo.createdAt).format('DD-MM-YYYY HH:mm')}</span></div>
                       <div className="separator-full m-0"></div>   
                       <div className="d-flex justify-content-between">  <span>Վերջին թարմացում</span> <span>{modalInfo?.updatedAt && moment.utc(modalInfo?.updatedAt).format('DD-MM-YYYY HH:mm')}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Հավելյալ տեղեկություն </span> <span>{modalInfo?.additional}</span></div>
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
    {!!editRow &&(
        <ResearchListEditModal researchList={editRow} setEditRow={setEditRow} refreshData={refreshData}/>
      )
    }
    <ComponentToConfirm
   handleCloseModal={handleCloseModal}
   handleOpenModal={handleOpenModal}
   handleDeleteItem={handleDeleteItem}
   selectedItemId={selectedItemId}
   confirmUserRef={confirmRef}
   keyName={selectedItem.researchName}
   delId={selectedItem.researchListId}
   />
    <table  className="table nowrap w-100 mb-5 dataTable no-footer" {...getTableProps()}  >
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
      {researches?.length>0? (
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} key={'row'+row?.id}>
                  {row.cells.map((cell,i) => {
                    return <td {...cell.getCellProps()} key={i}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
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

export default ResearchListsTable;
