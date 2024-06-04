/* eslint-disable jsx-a11y/anchor-is-valid */
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
import { Modal } from "react-bootstrap";
import MissingAvatar from "../../dist/img/Missing.svg";
import { useNavigate } from "react-router-dom";
import "../../dist/css/data-table.css";
import DoctorEditModal from "../EditViews/DoctorEditModal";

function DoctorsTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  doctors,
  setDoctors,
  refreshData
}) {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(MissingAvatar);
  const [editRow, setEditRow] = useState(false);

  const handleOpenEditModal = (value) => {
      setEditRow((prev) => value);
    };
    const defaultColumn = React.useMemo(
      () => ({
        minWidth: 20,
        width: 20,
        maxWidth: 600,
        Filter: ({ column: { id } }) => <></>,
  
      }),
      []
    );
  const handleDoctorInfo = async (doctorId)=>{
  navigate(`/doctors/${doctorId}`)
  }
  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "photo", 
        Cell: ({ row }) => (
          <img
            src={row.original.photo || DefaultProfileImage}
            alt="UserImg"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        ),
        width: 65,
        disableSortBy: true,
        
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">ID</div>
          </>
        ),
        accessor: "doctorId",
        width: 80,
        
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Անուն հայրանուն ազգանուն</div>
          </>
        ),
        accessor: "doctorName",
        sortable: true,
        width: 300,
        
        Cell: ({ row }) => (
          <div>
            {row.original.doctorName}
          </div>
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Մասնագիտացում</div>
          </>
        ),
        accessor: "specialty",
        width: 300,
        
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Որակավորում</div>
          </>
        ),
        accessor: "qualification",
        width: 300,
        
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Հեռախոս</div>
          </>
        ),
        accessor: "mobile",
        width: 200,
        
        Cell: ({ row }) => (
          <div>
            {row.original.contact?.phone}
          </div>
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Կարգավիճակ</div>
          </>
        ),
        accessor: "isActive",
        style: {
          // Custom style for the 'description' column
        },
        width: 200,
        
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
                href="#"
                onClick={() => handleOpenEditModal(row.original)}
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
 {
      editRow &&(
        <DoctorEditModal doctor={editRow} setEditRow={setEditRow} refreshData={refreshData}/>
      )
    }
        <table
          className="table nowrap w-100 mb-5 dataTable no-footer"
          {...getTableProps()}
        >
           <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th  {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.id !== "selection" && (
                  <div className="d-flex justify-content-between ">
                      
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
                        </div>
                        {column.id!=="patientId" && 
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
                          }

                        </div>
                    )}
                  <div
                    {...column.getResizerProps({onClick(ev){ev.stopPropagation()}})}
                    className={`resizer ${
                    column.isResizing ? "isResizing" : ""
                  }`}
                  />
                </th>
            ))}
          </tr>
        ))}
      </thead>
          {doctors?.length>0 ? (
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                    {...cell.getCellProps({style:cell.column?.id === "actions"
                    ? undefined
                    : { cursor:'pointer' },
                      onClick:
                        cell.column?.id === "actions"
                          ? undefined
                          : () => handleDoctorInfo(row.original?.doctorId), 
                    })}
                  >{cell.render("Cell")}</td>
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
                keyName={selectedItem.doctorName}
                delId={selectedItem.doctorId}
              />
            </tbody>
          ):''}
        </table>
    </>
  );
}

export default DoctorsTable;