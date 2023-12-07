/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import ComponentToConfirm from "../ComponentToConfirm";
import { useBlockLayout, useResizeColumns, useRowSelect, useSortBy, useTable } from "react-table";
import { Checkbox } from "../Checkbox";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { ColumnFilter } from "../ColumnFilter";

function PricesTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  prices,
  setPrices,
  getPrices,
}) {
  const columns = useMemo(
    () => [
      {
        Header: (event) => (
          <>
            <div>Անվանում</div>
            <ColumnFilter
              event={event}
              setData={setPrices}
              data={prices}
              getData={() => getPrices()}
            />
          </>
        ),
        accessor: "name",
        sortable: true,
        width:200
      },
      {
        Header: (event) => (
          <>
            <div>Արժեք</div>
            <ColumnFilter
              event={event}
              setData={setPrices}
              data={prices}
              getData={() => getPrices()}
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
              setData={setPrices}
              data={prices}
              getData={() => getPrices()}
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
            <div>Արժույթ</div>
            <ColumnFilter
              event={event}
              setData={setPrices}
              data={prices}
              getData={() => getPrices()}
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
              setData={setPrices}
              data={prices}
              getData={() => getPrices()}
            />
          </>
        ),
        accessor: "description",
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
      data: prices, 
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
      {prices?.length && (
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

export default PricesTable;
