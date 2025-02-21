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
import { BiSolidInfoCircle } from "react-icons/bi";
import "../../dist/css/data-table.css";
import emptyTable from "../../dist/svg/emptyTable.svg";
import { ROLES } from "../../utils/constants";
import RadiologyServiceEditModal from "../EditViews/RadiologyServiceEditModal";
import RadiologyServiceInfoModal from "../infoModals/RadiologyServiceInfoModal";

function RaddiologyServicesTable({
  confirmRef,
  selectedItem,
  selectedItemId,
  handleDeleteItem,
  handleOpenModal,
  handleCloseModal,
  radiologyServices,
  setRadiologyServices,
  refreshData,
  dataReceived,
}) {
  const [modalInfo, setModalInfo] = useState("");
  const [editRow, setEditRow] = useState(false);
  const storedUserRoles = JSON.parse(localStorage.getItem("userRoles"));
  const [superAdmin, setSuperAdmin] = useState(
    storedUserRoles.includes(ROLES?.SuperAdmin)
  );
  const handleOpenEditModal = (value) => {
    setEditRow((prev) => value);
  };
  const handleOpenInfoModal = (user) => {
    setModalInfo((prev) => user);
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
  const columns = useMemo(
    () => [
      {
        Header: (event) => (
          <>
            <div className="columnHeader">ID</div>
          </>
        ),
        accessor: "radiologyServiceId",
        sortable: true,
        width: 80,
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Ներքին կոդ</div>
          </>
        ),
        accessor: "localCode",
        sortable: true,
        width: 130,
      },
      // {
      //   Header: (event) => (
      //     <>

      //       <div className="columnHeader">ԲԳԿ ԿՈԴ</div>
      //     </>
      //   ),
      //   accessor: "partnerCode",
      //   disableSortBy: true,
      //   width:130,
      // },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Ծառ. անվանում</div>
          </>
        ),
        accessor: "serviceName",
        width: 300,
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Հապավում</div>
          </>
        ),
        accessor: "shortName",
        width: 150,
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Գին</div>
          </>
        ),
        accessor: "price",
        width: 100,
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Առքի գին</div>
          </>
        ),
        accessor: "purchasePrice",
        width: 150,
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Կատեգորիա</div>
          </>
        ),
        accessor: "categoryName",
        width: 200,
      },

      // {
      //   Header: (event) => (
      //     <>

      //       <div className="columnHeader">Սրվակ</div>
      //     </>
      //   ),
      //   accessor: "vial",
      //   width:100,
      // },
      // {
      //   Header: (event) => (
      //     <>

      //       <div className="columnHeader">Նմուշ․ ժամկետը</div>
      //     </>
      //   ),
      //   accessor: "samplingPeriod",
      //   width:200,
      // },
      // {
      //   Header: (event) => (
      //     <>

      //       <div className="columnHeader">Հետ․ Նախապատրաստում</div>
      //     </>
      //   ),
      //   accessor: "researchPrepSub",
      //   width:250,
      // },
      // {
      //   Header: (event) => (
      //     <>

      //       <div className="columnHeader">Դասակարգ</div>
      //     </>
      //   ),
      //   accessor: "category",
      //   width:150,
      // },
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
                href="#"
                onClick={() => handleOpenEditModal(row.original)}
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="edit" />
                  </span>
                </span>
              </a>
              {!!superAdmin && (
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
              )}
            </div>
          </div>
        ),
        disableSortBy: true,
        width: 200,
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
      data: radiologyServices,
      //data: customResearchData,
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
      {!!editRow && (
        <RadiologyServiceEditModal
          radiologyService={editRow}
          setEditRow={setEditRow}
          refreshData={refreshData}
        />
      )}
      {!!modalInfo && (
        <RadiologyServiceInfoModal
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
        />
      )}
      <ComponentToConfirm
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
        handleDeleteItem={handleDeleteItem}
        selectedItemId={selectedItemId}
        confirmUserRef={confirmRef}
        keyName={selectedItem.serviceName}
        delId={selectedItem.radiologyServiceId}
      />
      <table
        className="table nowrap w-100 mb-5 dataTable no-footer"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) =>  (
            <tr {...headerGroup.getHeaderGroupProps()} key={'headerGroup'+headerGroup?.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={'column'+column?.id}>
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
                      {column.id !== "patientId" && (
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
                      )}
                    </div>
                  )}
                  <div
                    {...column.getResizerProps({
                      onClick(ev) {
                        ev.stopPropagation();
                      },
                    })}
                    className={`resizer ${
                      column.isResizing ? "isResizing" : ""
                    }`}
                  />
                </th>
              )
              )}
            </tr>
          )
          
          )}
        </thead>
        {radiologyServices?.length > 0 ? (
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell,i) => {
                    return (
                      <td {...cell.getCellProps()} key={i}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        ) : dataReceived ? (
          <tr className="table-placeholder">
            <td className="table-cell">
              <div className="empty-normal">
                <div className="empty-image d-flex justify-content-center align-items-center">
                  <img src={emptyTable} alt="emptyTable" />
                </div>
                <div className="empty-description d-flex justify-content-center align-items-center mb-2">
                  Տվյալներ չկան
                </div>
              </div>
            </td>
          </tr>
        ) : (
          <></>
        )}
      </table>
    </>
  );
}

export default RaddiologyServicesTable;
