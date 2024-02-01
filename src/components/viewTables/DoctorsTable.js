import React, { useMemo, useState } from "react";
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
import DefaultProfileImage from "../../../src/dist/img/Missing.svg";

function DoctorsTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  doctors,
  setDoctors,
  // getDoctors
}) {
  const defaultColumn = React.useMemo(
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
        Header: "",
        accessor: "photo", 
        Cell: ({ row }) => (
          <img
            src={row.values.photo || DefaultProfileImage}
            alt="User Photo"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        ),
        width: 100,
        disableSortBy: true,
        Filter: ({ column: { id } }) => <></>,
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Նկար</div>
          </>
        ),
        accessor: "profile_picture_url",
        sortable: true,
        width: 400,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Անուն</div>
          </>
        ),
        accessor: "name",
        sortable: true,
        width: 400,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Մասնագիտություն</div>
          </>
        ),
        accessor: "specialty",
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Որակավորում</div>
          </>
        ),
        accessor: "qualification",
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Լիցենզավորման համար</div>
          </>
        ),
        accessor: "license_number",
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Գրանցման ամսաթիվ</div>
          </>
        ),
        accessor: "joining_date",
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Հասցե</div>
          </>
        ),
        accessor: "address",
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Սեռ</div>
          </>
        ),
        accessor: "gender",
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Էլ․ հասցե</div>
          </>
        ),
        accessor: "email",
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Հեռախոս</div>
          </>
        ),
        accessor: "mobile",
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Ծննդյան ամսաթիվ</div>
          </>
        ),
        accessor: "date_of_birth",
        style: {
          // Custom style for the 'description' column
        },
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Լրացուցիչ կոնտակտ</div>
          </>
        ),
        accessor: "emergency_contact_name",
        style: {
          // Custom style for the 'description' column
        },
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Լրացուցիչ կոնտակտի հեռախոս</div>
          </>
        ),
        accessor: "emergency_contact_number",
        style: {
          // Custom style for the 'description' column
        },
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Կարգավիճակ</div>
          </>
        ),
        accessor: "is_active",
        style: {
          // Custom style for the 'description' column
        },
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Ստեղծման ամսաթիվ</div>
          </>
        ),
        accessor: "created_at",
        style: {
          // Custom style for the 'description' column
        },
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Թարմացման ամսաթիվ</div>
          </>
        ),
        accessor: "updated_at",
        style: {
          // Custom style for the 'description' column
        },
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDoctors} />
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
      data: doctors,
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

  return (
    <>
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
                    className={`resizer ${
                      column.isResizing ? "isResizing" : ""
                    }`}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {doctors?.length && (
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
    </>
  );
}

export default DoctorsTable;
