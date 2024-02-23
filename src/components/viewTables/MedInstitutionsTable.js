import React, { useMemo, useState } from "react";
import { ColumnFilter } from "../ColumnFilter";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import {
  useBlockLayout,
  useFilters,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { Checkbox } from "../Checkbox";
import { BiSolidInfoCircle } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import DefaultProfileImage from "../../../src/dist/img/Missing.svg";
import ComponentToConfirm from "../ComponentToConfirm";

function MedInstitutionsTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  medInstitutions,
  setMedInstitutions,
  //getMedinstitutions //"//comment":{
}) {
  const [modalInfo, setModalInfo] = useState("");
  const handleOpenInfoModal = (user) => {
    setModalInfo((prev) => user);
  };

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
        Header: (event) => (
          <>
            <div className="columnHeader">ID</div>
          </>
        ),
        accessor: "medInstitutionId",
        sortable: true,
        width: 80,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setMedInstitutions} placeholder={"ID"} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Անվանում</div>
          </>
        ),
        accessor: "medInstitutionName",
        sortable: true,
        width: 400,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setMedInstitutions} />
        ),
      },

      {
        Header: (event) => (
          <>
            <div>Հասցե</div>
          </>
        ),
        accessor: "address",
        width: 300,
        // Cell: ({ row }) => (
        //   <div className="d-flex align-items-center">
        //     {row.original?.contact?.email}
        //   </div>
        // ),
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setMedInstitutions} />
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
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setMedInstitutions} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div>Հեռախոս</div>
          </>
        ),
        accessor: "phone",
        width: 230,
        // Cell: ({ row }) => (
        //   <div className="d-flex align-items-center">
        //     {row.original?.contact?.phone}
        //   </div>
        // ),
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setMedInstitutions} />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Գործողություններ</div>
          </>
        ),
        accessor: "actions",
        width: 250,
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <BiSolidInfoCircle
                cursor={"pointer"}
                size={"1.5rem"}
                onClick={() => handleOpenInfoModal(row.original)}
              />
            </div>
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
      data: medInstitutions,
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
  console.log(selectedFlatRows);
  return (
    <>
      {modalInfo && (
        <Modal show={() => true} size="md" onHide={() => setModalInfo(false)}>
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
                        width={"150px"}
                        height={"200px"}
                        style={{
                          borderRadius: "5px",
                        }}
                        src={DefaultProfileImage}
                        className="avatar_upload_preview"
                        alt="preview"
                      />
                    </div>
                    <div className="w-100">
                      <div className="d-flex justify-content-between">
                        {" "}
                        <span> ID </span> <span>{modalInfo.refDoctorsId}</span>
                      </div>
                      <div className="separator-full m-0"></div>
                      <div className="d-flex justify-content-between">
                        {" "}
                        <span> Անուն ազգանուն </span>{" "}
                        <span>{modalInfo.doctorName}</span>
                      </div>
                      <div className="separator-full m-0"></div>
                      <div className="d-flex justify-content-between">
                        {" "}
                        <span>Աշխատավայր </span>{" "}
                        <span>{modalInfo.medInstitution}</span>
                      </div>
                      <div className="separator-full m-0"></div>
                      <div className="d-flex justify-content-between">
                        {" "}
                        <span>Հասցե </span>{" "}
                        <span>
                          {modalInfo.contact?.address?.city},{" "}
                          {modalInfo.contact?.address?.street}
                        </span>
                      </div>
                      <div className="separator-full m-0"></div>
                      <div className="d-flex justify-content-between">
                        {" "}
                        <span>Էլ․ հասցե</span>{" "}
                        <span>{modalInfo?.contact?.email}</span>
                      </div>
                      <div className="separator-full m-0"></div>
                      <div className="d-flex justify-content-between">
                        {" "}
                        <span>Հեռախոս</span>{" "}
                        <span>{modalInfo?.contact?.phone}</span>
                      </div>
                      <div className="separator-full m-0"></div>
                      <div className="d-flex justify-content-between">
                        {" "}
                        <span>Գրանցված է </span>{" "}
                        <span>{modalInfo.createdAt}</span>
                      </div>
                      <div className="separator-full m-0"></div>
                      <div className="d-flex justify-content-between">
                        {" "}
                        <span>Այլ </span> <span>{modalInfo.additional}</span>
                      </div>
                      <div className="separator-full m-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer ">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setModalInfo(false)}
              >
                Փակել
              </button>
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
            <tr
              {...headerGroup.getHeaderGroupProps({ style: { width: "100%" } })}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps({
                      style: column.style, // Apply custom style to the column header
                    })
                  )}
                >
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
        {medInstitutions?.length && (
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps({ style: { width: "100%" } })}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          style: cell.column.style, // Apply custom style to the column cells
                        })}
                      >
                        {cell.render("Cell")}
                      </td>
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
              keyName={selectedItem.institutionName}
              delId={selectedItem.medInstitutionsId}
            />
          </tbody>
        )}
        
      </table>
    </>
  );
}

export default MedInstitutionsTable;
