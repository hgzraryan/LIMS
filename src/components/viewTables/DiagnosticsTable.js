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
import ResearchViewBoard from "../StatusBoard/ResearchViewBoard";
import { v4 as uuidv4 } from "uuid";
import { data } from "../StatusBoard/data";
import { data1 } from "../StatusBoard/data";
import { Modal } from "react-bootstrap";
import EditModal from "../views/EditModal";
const ResearchData = [
  {
    researchId: "23001",
    patientId: "01",
    description: "asdasdsadas",
    additional: "Approved",
    researchList: data,
  },
  {
    researchId: "23002",
    patientId: "",
    description: "asdasdsadas",
    additional: "Approved",
    researchList: data1,
  },
  {
    researchId: "23003",
    patientId: "529",
    description: "asdasdsadas",
    additional: "Approved",
    researchList: [
      { id: uuidv4(), name: "Հետազոտություն111" },
      { id: uuidv4(), name: "Հետազոտություն222" },
      { id: uuidv4(), name: "Հետազոտություն333" },
      { id: uuidv4(), name: "Հետազոտություն444" },
    ],
  },
  {
    researchId: "23004",
    patientId: "01",
    description: "asdasdsadas",
    additional: "Approved",
    researchList: [
      { id: uuidv4(), name: "Հետազոտություն1111" },
      { id: uuidv4(), name: "Հետազոտություն2222" },
      { id: uuidv4(), name: "Հետազոտություն3333" },
      { id: uuidv4(), name: "Հետազոտություն4444" },
    ],
  },
];

function DiagnosticsTable({
  confirmRef,
  handleDeleteItem,
  diagnostics,
  setDiagnostics,
  handleCloseModal,
  handleOpenModal,
  selectedItemId,
  selectedItem,
}) {
  const [resData,setResData]=useState(ResearchData)
  const [selectedItem1, setSelectedItem1] = useState("");
  const [selectedItemId1, setSelectedItemId1] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [editRow, setEditRow] = useState(false);
//  console.log(resData)
  const handleOpenStatusModal = (user) => {
    setSelectedItem1((prev) => user);
  };
  const handleCloseStatusModal = () => {
    setSelectedItem1("");
  };
  const handleOpenEditModal = (value) =>{
    setEditRow(prev => value)
  }
  const handleCloseEditModal = () =>{
    setEditRow(false)
  }
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
        Header: "Ախտորոշման ID",
        accessor: "_id",
        sortable: true,
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDiagnostics} />
        ),
      },
      {
        Header: "Հաճախորդի ID",
        accessor: "patientId",
        sortable: true,
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDiagnostics} />
        ),
      },
      {
        Header: "Հետազոտություններ",
        accessor: "researchList",
        sortable: true,
        width: 300,
        Cell: ({ row }) => (
          <div className="d-flex">
            <div className="pe-2">{row.values.researchList.length}</div>
            <BiSolidInfoCircle
              cursor={"pointer"}
              size={"1.5rem"}
              onClick={() => handleOpenStatusModal(row.values)}
            />
          </div>
        ),
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setDiagnostics} />
        ),
      },
      {
        Header: "Նկարագիր",
        accessor: "description",
        width: 400,
        Filter: ({ column: { id } }) => <></>,
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
                href="#"
                onClick={() => handleOpenEditModal(row)}
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="edit" />
                  </span>
                </span>
              </a>
              {!row.values.patientId &&
              <a
              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
              data-bs-toggle="tooltip"
              onClick={() => handleOpenModal(row.values)}
              data-placement="top"
              title="Delete"
              data-bs-original-title="Delete"
              href="#"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="trash" />
                  </span>
                </span>
              </a>
              }
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                onClick={() => console.log('send report')}
                data-placement="top"
                title="Send"
                href="#"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="send" />
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
      data: ResearchData,
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
                  className={`resizer ${column.isResizing ? "isResizing" : ""}`}
                />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {ResearchData?.length && (
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
          {
  editRow && 
  <EditModal

  handleCloseEditModal={handleCloseEditModal}
  rowData={editRow.values}
  />
}
          <ResearchViewBoard
            selectedItem={selectedItem1}
            handleCloseStatusModal={handleCloseStatusModal}
            selectedItemId={selectedItemId1}
            setResearches={setDiagnostics}
            researches={diagnostics}
          />

          <ComponentToConfirm
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            handleDeleteItem={handleDeleteItem}
            selectedItemId={selectedItemId}
            confirmUserRef={confirmRef}
            keyName={selectedItem.patientId}
            delId={selectedItem._id}
          />
        </tbody>
      )}{" "}
    </table>
    
    </>
  );
}

export default DiagnosticsTable;
