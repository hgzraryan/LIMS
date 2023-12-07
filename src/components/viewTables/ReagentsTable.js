/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import ComponentToConfirm from "../ComponentToConfirm";
import { useBlockLayout, useResizeColumns, useRowSelect, useSortBy, useTable } from "react-table";
import { Checkbox } from "../Checkbox";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { ColumnFilter } from "../ColumnFilter";

function ReagentsTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  reagents,
  setReagents,
  getReagents,
}) {
  const columns = useMemo(
    () => [
      {
        Header: (event) => (
          <>
            <div>Անվանում</div>
            <ColumnFilter
              event={event}
              setData={setReagents}
              data={reagents}
              getData={() => getReagents()}
            />
          </>
        ),
        accessor: "product_name",
        sortable: true,
        width:200
      },
      {
        Header: (event) => (
          <>
            <div>Արժեք</div>
            <ColumnFilter
              event={event}
              setData={setReagents}
              data={reagents}
              getData={() => getReagents()}
            />
          </>
        ),
        accessor: "price",
        width:200
      },
      {
        Header: (event) => (
          <>
            <div>Չափման միավոր</div>
            <ColumnFilter
              event={event}
              setData={setReagents}
              data={reagents}
              getData={() => getReagents()}
            />
          </>
        ),
        accessor: "quantity_unit",
        sortable: true,
        width:200
      },
      {
        Header: (event) => (
          <>
            <div>Չափման տեսակ</div>
            <ColumnFilter
              event={event}
              setData={setReagents}
              data={reagents}
              getData={() => getReagents()}
            />
          </>
        ),
        accessor: "unit",
        sortable: true,
        width:200
      },
      {
        Header: (event) => (
          <>
            <div>Կիրառություն</div>
            <ColumnFilter
              event={event}
              setData={setReagents}
              data={reagents}
              getData={() => getReagents()}
            />
          </>
        ),
        accessor: "used_for",
        sortable: true,
        width:250
      },
      {
        Header: (event) => (
          <>
            <div>Արժույթ</div>
            <ColumnFilter
              event={event}
              setData={setReagents}
              data={reagents}
              getData={() => getReagents()}
            />
          </>
        ),
        accessor: "currency",
        width:200
      },
      {
        Header: (event) => (
          <>
            <div>Նկարագիր</div>
            <ColumnFilter
              event={event}
              setData={setReagents}
              data={reagents}
              getData={() => getReagents()}
            />
          </>
        ),
        accessor: "description",
        width:200
      },
      {
        Header: (event) => (
          <>
            <div>Թողարկող</div>
            <ColumnFilter
              event={event}
              setData={setReagents}
              data={reagents}
              getData={() => getReagents()}
            />
          </>
        ),
        accessor: "vendor",
        width:200
      },
      {
        Header: "Գործողություններ",
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
        width:200
      },
    ],
    []
  );
  const defaultColumn = useMemo(
    () => ({
      minWidth: 20,
      width: 20,
      maxWidth: 600
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: reagents, 
      defaultColumn      
    },
    useBlockLayout,useResizeColumns,useSortBy,
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
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
              
                
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span className="sorting_asc"></span>
                        ) : (
                          <span className="sorting_desc"></span>
                          )
                          ) : (
                            <span className="sorting"></span>
                            )}
    
                            {column.render("Header")}
                            <div
                  {...column.getResizerProps() }
                  className={`resizer ${
                    column.isResizing ? "isResizing" : ""
                  }`}
                  />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {reagents?.length && (
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

export default ReagentsTable;
