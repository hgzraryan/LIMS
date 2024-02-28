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
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
                {row.original?.patientData?.name}
              </div>
            ),
            Filter: ({ column: { id } })=>(
              <ColumnFilter
                id={id}
                setData={setDoctorsVisits}
                placeholder = "Անուն ազգանուն"
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
            width: 200,
            Cell: ({ row }) => (
              <div className="d-flex align-items-center">
                {row.original?.patientData?.email}
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
                {row.original?.patientData?.phone}
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
            accessor: "doctorsName",
            width: 280,
            Filter: ({ column: { id } })=>(
              <ColumnFilter
                id={id}
                setData={setDoctorsVisits}
                placeholder = "Բժիշկ"
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
      );
}

export default DoctorsVisitsTable
