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
import { BiSolidInfoCircle } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import infoModalImg from "../../../src/dist/svg/organizationsSvg.svg";
import "../../dist/css/data-table.css";
import { useNavigate } from "react-router-dom";

function OrganizationsTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  organizations,
  setOrganizations,
  getOrganizations,
}) {
  const navigate = useNavigate()
  const [modalInfo, setModalInfo] = useState("");
  const handleOpenInfoModal = (data) => {
    
    setModalInfo((prev) => data);
  };
  const handleOrganizationsDetail = (organizationId) =>{
    try {
      // const response = await axiosPrivate.get(`/patients/${patientId}`, );
       //console.log(response.data); 
       navigate(`/organizations/${organizationId}`)
       
     } catch (err) {
       console.log(err)
       // if (!err?.response) {
       //   setErrMsg("No Server Response");
       // } else if (err.response?.status === 409) {
       //   setErrMsg("Username Taken");
       // } else {
       //   setErrMsg(" Failed");
       // }
     }
   };
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
            <div className="columnHeader">ID</div>
          </>
        ),
        accessor: "organizationId",
        sortable: true,
        width: 60,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setOrganizations} placeholder={'ID'}/>
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Անվանում</div>
          </>
        ),
        accessor: "name",
        sortable: true,
        width: 400,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setOrganizations} 
          placeholder = "Անվանում"/>
        ),
        Cell: ({ row }) => (
          <div
            onClick={()=>handleOrganizationsDetail(row.original.organizationId)}
            style={{ cursor: 'pointer', textDecoration:'underline' }}
          >
            {row.original.name}
          </div>
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
            {row.original?.contactPerson?.email}
          </div>
        ),
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setOrganizations}
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
        accessor: "mobile",
        width: 200,
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            {row.original?.contactPerson?.phone}
          </div>
        ),
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setOrganizations}
            placeholder = "Հեռախոս"
          />
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Գրանցված է</div>
          </>
        ),
 
        accessor: "createdAt",
        width: 200,
        Filter: ({ column: { id } }) => (
          <ColumnFilter 
          id={id} 
          setData={setOrganizations}
          placeholder = "Գրանցված է"
          />
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
          <ColumnFilter 
          id={id} 
          setData={setOrganizations}
          placeholder = "Նկարագիր"
          />
        ),
      },
      {
        Header: (event) => <div className="columnHeader">Գործողություններ</div>,
        accessor: "actions",
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
        width: 300,
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
      data: organizations,
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
    <>
    {
      modalInfo && (
        <Modal
      show={() => true}
      size="md"
      onHide={() => setModalInfo(false)}
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
                          width={"150px"}
                          height={"200px"}
                          style={{
                            borderRadius: "5px",
                          }}
                          src={infoModalImg}
                          className="infoImg"
                          alt="infoImg"
                        />
                  </div>
                  <div className="w-100">
                       <div className="d-flex justify-content-between">  <span>ID </span> <span>{modalInfo.organizationId}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Անվանում </span> <span>{modalInfo.name}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Գրանցվել է </span> <span>{modalInfo.createdAt}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Հասցե </span> <span>{modalInfo.address?.city}, {modalInfo.address?.street}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Փոստային համար </span> <span>{modalInfo.address?.zipCode}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Էլ․ Հասցե </span> <span>{modalInfo?.email}</span></div>
                       <div className="separator-full m-0"></div>
                       <div className="d-flex justify-content-between">  <span>Հեռախոս </span> <span>{modalInfo?.phone}</span></div>
                       <div className="separator-full m-0"></div> 
                       <div className="d-flex justify-content-between">  <span>Նկարագրություն </span> <span>{modalInfo.description}</span></div>
                       <div className="separator-full m-0"></div> 
                       <div className="d-flex justify-content-between">  <span>Պատասխանատու անձ</span> <span>{modalInfo.contactPerson?.name}</span></div>
                       <div className="separator-full m-0"></div> 
                       <div className="d-flex justify-content-between">  <span>Հեռախոս </span> <span>{modalInfo.contactPerson?.phone}</span></div>
                       <div className="separator-full m-0"></div>                  
                       <div className="d-flex justify-content-between">  <span>Էլ․ Հասցե </span> <span>{modalInfo.contactPerson?.email}</span></div>
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
      {organizations?.length && (
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
            keyName={selectedItem.name}
            delId={selectedItem.organizationId}
          />
        </tbody>
      )}{" "}
    </table>
    </>
  );
}
 
export default OrganizationsTable;