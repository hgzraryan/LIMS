/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import ComponentToConfirm from "../ComponentToConfirm";
import { useBlockLayout, useFilters, useResizeColumns, useRowSelect, useSortBy, useTable } from "react-table";
import { Checkbox } from "../Checkbox";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { ColumnFilter } from "../ColumnFilter";

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
          />
        ),
      },
      {
        Header: (event) => (
          <>
            
            <div className="columnHeader">Դասակարգ</div>
          </>
        ),
        accessor: "referenceRange",
        width:300,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setResearches}
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
        width:300,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setResearches}
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
        width:300,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setResearches}
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
  );
}

export default ResearchListsTable;
