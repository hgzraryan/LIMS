import React, { Suspense, useMemo, useState } from "react";
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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import "../../dist/css/data-table.css";

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
  const axiosPrivate = useAxiosPrivate()  
  const navigate = useNavigate();
  const [openModal,setOpenModal]=useState(false)
  const [modalInfo,setModalInfo]=useState({})
  const [imageUrl, setImageUrl] = useState(MissingAvatar);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 20,
      maxWidth: 600,
    }),
    []
  );
  const handleDoctorInfo = async ({doctorId})=>{
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
            alt="User Photo"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        ),
        width: 65,
        disableSortBy: true,
        Filter: ({ column: { id } }) => <></>,
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">ID</div>
          </>
        ),
        accessor: "doctorId",
        width: 60,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setDoctors} 
          placeholder={'ID'}/>
        ),
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
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setDoctors}
          placeholder = "Անուն հայրանուն ազգանուն" />
        ),
        Cell: ({ row }) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleDoctorInfo(row.original);
            }}
            style={{ cursor: 'pointer' ,textDecoration:'underline'}}
          >
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
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setDoctors}
          placeholder = "Մասնագիտացում" />
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
          <ColumnFilter 
          id={id} 
          setData={setDoctors}
          placeholder = "Որակավորում" />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Հեռախոս</div>
          </>
        ),
        accessor: "mobile",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setDoctors}
          placeholder = "Հեռախոս" />
        ),
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
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setDoctors}
          placeholder = "Կարգավիճակ" />
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
      {openModal && (
        <Modal
          show={() => true}
          size="xs"
          onHide={() => setOpenModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ width: "100%", textAlign: "center" }}>
              {modalInfo.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="contact-body contact-detail-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="d-flex flex-xxl-nowrap flex-wrap">
                  <div className="contact-info w-100">
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        width={"200px"}
                        height={"300px"}
                        style={{
                          borderRadius: "5px",
                        }}
                        src={imageUrl}
                        className="avatar_upload_preview"
                        alt="preview"
                      />
                    </div>
                    <div className="w-100">
                      {/* Render additional information here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
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
                keyName={selectedItem.doctorName}
                delId={selectedItem.doctorId}
              />
            </tbody>
          )}{" "}
        </table>
    </>
  );
}

export default DoctorsTable;