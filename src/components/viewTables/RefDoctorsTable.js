import React, { useMemo } from "react";
import ComponentToConfirm from "../ComponentToConfirm";
import { useBlockLayout, useFilters, useResizeColumns, useRowSelect, useSortBy, useTable } from "react-table";
import { Checkbox } from "../Checkbox";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { ColumnFilter } from "../ColumnFilter";
function RefDoctorsTable({confirmRef,
    selectedItem,
    selectedItemId,
    handleDeleteItem,
    handleOpenModal,
    handleCloseModal,
    refDoctors,
    setRefDoctors,
    //getAgents
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
                
                <div  className="columnHeader">ID</div>
              </>
            ),
            accessor: "refDoctorId",
            sortable: true,
            width: 80,
            Filter: ({ column: { id } })=>(
              <ColumnFilter
                id={id}
                setData={setRefDoctors}
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
            accessor: "fullName",
            sortable: true,
            width: 500,
            Filter: ({ column: { id } })=>(
              <ColumnFilter
                id={id}
                setData={setRefDoctors}
              />
            ),
          },
          {
            Header: (event) => (
              <>
                <div>Էլ․ հասցե</div>
              </>
            ),
            accessor: "email",
            width: 300,
            // Cell: ({ row }) => (
            //   <div className="d-flex align-items-center">
            //     {row.original?.contact?.phone}
            //   </div>
            // ),
            Filter: ({ column: { id } })=>(
              <ColumnFilter
                id={id}
                setData={setRefDoctors}
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
            width: 300,
            // Cell: ({ row }) => (
            //   <div className="d-flex align-items-center">
            //     {row.original?.contact?.phone}
            //   </div>
            // ),
            Filter: ({ column: { id } })=>(
              <ColumnFilter
                id={id}
                setData={setRefDoctors}
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
            width: 300,
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
          data: refDoctors, 
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
          {refDoctors?.length && (
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
                 {/* <ComponentToConfirm
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
                handleDeleteItem={handleDeleteItem}
                selectedItemId={selectedItemId}
                confirmUserRef={confirmRef}
                keyName={selectedItem.name}
                delId={selectedItem.agentId}
              /> */}
                </tbody>
              )}
        </table>
  )
}

export default RefDoctorsTable