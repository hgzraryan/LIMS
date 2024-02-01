/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useRef } from "react";
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

function PatientsTable({
  selectedItem,
  handleOpenModal,
  handleCloseModal,
  researchState,
  patients,
  setPatients,
}) {
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
      },
      {
        Header: (event) => (
          <div style={{overflow:'hidden'}}>
            
              <span className="columnHeader">Ազգանուն</span>
          </div>
        ),
        accessor: "lastName",
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
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Ախտորոշումներ</div>
          </>
        ),
        Cell: ({ row }) => (
          <div className="d-flex">
            <div className="pe-2">{row.values.researchList.length}</div>
            <BiSolidInfoCircle
              cursor={"pointer"}
              size={"1.5rem"}
              onClick={() => handleOpenModal(row.values)}
            />
          </div>
        ),
        accessor: "researchList",
        width: 200,
        Filter: ({ column: { id } }) => <></>,
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Արժեք (դրամ)</div>
          </>
        ),
        Cell: ({ row }) => <div>{row.values.totalPrice}</div>,
        accessor: "totalPrice",
        width: 200,
        Filter: ({ column: { id } }) => <></>,

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
              <ComponentToPrintWrapper user={row.values} />

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
    []
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
  );
}

export default PatientsTable;
