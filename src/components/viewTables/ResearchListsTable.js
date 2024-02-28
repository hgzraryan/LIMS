/* eslint-disable jsx-a11y/anchor-is-valid */
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

function ResearchListsTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  researches,
  setResearches,
  getResearches,
}) {
  const [modalInfo, setModalInfo] = useState("");
  const handleOpenInfoModal = (user) => {    
    setModalInfo((prev) => user);
  };
  const defaultColumn = useMemo(
    () => ({
      minWidth: 20,
      width: 20,
      maxWidth: 1000
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
        width:60,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setResearches}
            placeholder={'ID'}
          />
        ),
      },
      {
        Header: (event) => (
          <>
            
            <div className="columnHeader">Հապավումը</div>
          </>
        ),
        accessor: "shortName",
        sortable: true,
        width:200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setResearches}
            placeholder={'Հապավումը'}

          />
        ),
      },
      {
        Header: (event) => (
          <>
            
            <div className="columnHeader">Անվանումը</div>
          </>
        ),
        accessor: "researchName",
        sortable: true,
        width:200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setResearches}
            placeholder={'Անվանումը'}

          />
        ),
      },
      {
        Header: (event) => (
          <>            
            <div className="columnHeader">Նորմա</div>
          </>
        ),
        accessor: "referenceRange",
        width:200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setResearches}
            placeholder={'Նորմա'}

          />
        ),
      },
      {
        Header: (event) => (
          <>
            
            <div className="columnHeader">Դասակարգ</div>
          </>
        ),
        accessor: "category",
        width:200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setResearches}
            placeholder={'Դասակարգ'}

          />
        ),
      },
      {
        Header: (event) => (
          <>
            
            <div className="columnHeader">Չափման միավոր</div>
          </>
        ),
        accessor: "units",
        width:200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setResearches}
            placeholder={'Չափման միավոր'}

          />
        ),
      },
      {
        Header: (event) => (
          <>
            
            <div className="columnHeader">Արժույթ</div>
          </>
        ),
        accessor: "currencyCode",
        width:100,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setResearches}
            placeholder={'Արժույթ'}

          />
        ),
      },
      {
        Header: (event) => (
          <>
            
            <div className="columnHeader">Գին</div>
          </>
        ),
        accessor: "researchesPrice",
        width:100,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setResearches}
            placeholder={'Գին'}

          />
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
            </div>
          </div>
        ),
        disableSortBy: true,
        width:200,
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
      data: researches, 
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
                          src={researchSvg}
                          className="avatar_upload_preview"
                          alt="preview"
                        />
                  </div>
                  <div className="w-100">
                       <div className="d-flex justify-content-between">  <span> ID </span> <span>{modalInfo.researchListId}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span> Հապավում </span> <span>{modalInfo.shortName}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Անվանում</span> <span>{modalInfo.researchName}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Նորմա </span> <span>{modalInfo.referenceRange}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Դասակարգ</span> <span>{modalInfo.category}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Չափման միավոր</span> <span>{modalInfo.units}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Արժույթ</span> <span>{modalInfo.currencyCode}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Արժեք </span> <span>{modalInfo.researchesPrice}</span></div>
                       <div className="separator-full m-0"></div>                  
                       <div className="d-flex justify-content-between">  <span>Գրանցված է </span> <span>{modalInfo.createdAt}</span></div>
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
    <table  className="table nowrap w-100 mb-5 dataTable no-footer" {...getTableProps()} >
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
      {researches?.length && (
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
             <ComponentToConfirm
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            handleDeleteItem={handleDeleteItem}
            selectedItemId={selectedItemId}
            confirmUserRef={confirmRef}
            keyName={selectedItem.researchName}
            delId={selectedItem.researchListId}
            />
            </tbody>
          )}{" "}
    </table>
          </>
  );
}

export default ResearchListsTable;
