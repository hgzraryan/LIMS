import React, { useMemo, useState } from 'react'
import { Checkbox } from '../Checkbox';
import moment from "moment";
import { Modal } from "react-bootstrap";
import { ColumnFilter } from "../ColumnFilter";
import { useBlockLayout, useFilters, useResizeColumns, useRowSelect, useSortBy, useTable } from "react-table";
import ComponentToConfirm from "../ComponentToConfirm";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { BiSolidInfoCircle } from 'react-icons/bi';
import PackagesSvg  from '../../dist/svg/packages.svg'
import "../../dist/css/data-table.css";
import emptyTable from "../../dist/svg/emptyTable.svg"


function PackagesTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  packages,
  setPackages,
  refreshData,
  dataReceived
}) {
  //const [packages, setPackages] = useState(customData);
  const [modalInfo, setModalInfo] = useState("");
  const [editRow, setEditRow] = useState(false);
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
      accessor: "packageId",
      sortable: true,
      width:80,
    },
    {
      Header: (event) => (
        <>
          
          <div className="columnHeader">Անվանում</div>
        </>
      ),
      accessor: "packageName",
      sortable: true,
      width:800,
    },
    {
      Header: (event) => (
        <>
          
          <div className="columnHeader">Գին</div>
        </>
      ),
      accessor: "price",
      width:200,
    },
    {
      Header: (event) => (
        <>
          
          <div className="columnHeader">Ծառ․</div>
        </>
      ),
      accessor: "mServices",
      width:100,
      Cell: ({ row }) => (
        <div className="d-flex align-items-center justify-content-center">
          {row.original?.mServices?.length}
        </div>
      ),
    },
    {
      Header: (event) => (
        <>
          
          <div className="columnHeader">Հետ․</div>
        </>
      ),
      accessor: "resList",
      width:100,
      Cell: ({ row }) => (
        <div className="d-flex align-items-center justify-content-center">
          {row.original?.resList?.length}
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
      Cell: ({ row }) => (
        <div className="d-flex align-items-center">
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
          </div> */}
        </div>
      ),
      disableSortBy: true,
      width:200,
    },
  ],
  []
);
console.log(packages)
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
     data: packages, 
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
     size="xl"
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
                         src={PackagesSvg}
                         className="avatar_upload_preview"
                         alt="preview"
                       />
                 </div>
                 <div className="w-100">
                      <div className="d-flex justify-content-between">  <span> Ծառայություններ </span> 
                        <ol>
                      <span>{modalInfo?.mServices?.map((el,index)=>
                          <li key={index}>
                          {el.serviceName}
                          </li>
                      )}
                        </span>
                        </ol>
                        </div>
                      <div className="separator-full m-0"></div>
                      <div className="d-flex justify-content-between">  <span> Հետազոտություններ </span> 
                        <ol>
                      <span>{modalInfo?.resList?.map((el,index)=>
                          <li key={index}>
                          {el.researchName}
                          </li>
                      )}
                        </span>
                        </ol>
                        </div>  
                        <div className="separator-full m-0"></div>
                        <div className="d-flex justify-content-between">  <span>Հավելյալ տեղեկություն </span> <span>{modalInfo?.additional}</span></div>
   
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
   {/* {
     editRow &&(
       <ResearchListEditModal researchList={editRow} setEditRow={setEditRow} refreshData={refreshData}/>
     )
   } */}
            <ComponentToConfirm
           handleCloseModal={handleCloseModal}
           handleOpenModal={handleOpenModal}
           handleDeleteItem={handleDeleteItem}
           selectedItemId={selectedItemId}
           confirmUserRef={confirmRef}
           keyName={selectedItem.researchName}
           delId={selectedItem.researchListId}
           />
   <table  className="table nowrap w-100 mb-5 dataTable no-footer" {...getTableProps()} >
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
     {packages?.length>0? (
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
  )
}

export default PackagesTable
