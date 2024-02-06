/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import ComponentToConfirm from "../ComponentToConfirm";
import {
  useBlockLayout,
  useFilters,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
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
  const defaultColumn = useMemo(
    () => ({
      minWidth: 20,
      width: 20,
      maxWidth: 600,
    }),
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Անվանում</div>
          </>
        ),
        accessor: "name",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setReagents} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Արժեք</div>
          </>
        ),
        accessor: "price",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setReagents} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Չափման միավոր</div>
          </>
        ),
        accessor: "unit",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setReagents} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Չափման տեսակ</div>
          </>
        ),
        accessor: "unitType",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setReagents} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Կիրառություն</div>
          </>
        ),
        accessor: "usage",
        sortable: true,
        width: 250,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setReagents} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Արժույթ</div>
          </>
        ),
        accessor: "currency",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setReagents} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Նկարագիր</div>
          </>
        ),
        accessor: "description",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setReagents} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Թողարկող</div>
          </>
        ),
        accessor: "producer",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setReagents} />
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
        width: 200,
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
    prepareRow,
    selectedFlatRows,
    toggleHideColumn,
  } = useTable(
    {
      columns,
      data: reagents,
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
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <div>
                  {column.id !== "selection" && (
                    <>
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
                      </div>
                    </>
                  )}
                </div>
                <div
                  {...column.getResizerProps()}
                  className={`resizer ${column.isResizing ? "isResizing" : ""}`}
                />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {reagents?.length && (
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
          <ComponentToConfirm
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            handleDeleteItem={handleDeleteItem}
            selectedItemId={selectedItemId}
            confirmUserRef={confirmRef}
            keyName={selectedItem.product_name}
            delId={selectedItem._id}
          />
        </tbody>
      )}{" "}
    </table>
  );
}

export default ReagentsTable;
