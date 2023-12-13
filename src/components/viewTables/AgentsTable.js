/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import ComponentToConfirm from "../ComponentToConfirm";
import { useBlockLayout, useFilters, useResizeColumns, useRowSelect, useSortBy, useTable } from "react-table";
import { Checkbox } from "../Checkbox";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { ColumnFilter } from "../ColumnFilter";


function AgentsTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  agents,
  setAgents,
  getAgents
}) {
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
            
            <div  className="columnHeader">Անուն</div>
          </>
        ),
        accessor: "name",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setAgents}
          />
        ),
      },

      {
        Header: (event) => (
          <>
           
            <div  className="columnHeader">Նկարագիր</div>
          </>
        ),
        accessor: "description",
        width: 500,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setAgents}
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
        width: 200,
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
                onClick={() => handleOpenModal(row.values)}
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
      data: agents, 
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
  console.log(selectedFlatRows);
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
      {agents?.length && (
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
            userName={selectedItem.username}
            userId={selectedItem._id}
          />
            </tbody>
          )}{" "}
    </table>
  );
}

export default AgentsTable;
