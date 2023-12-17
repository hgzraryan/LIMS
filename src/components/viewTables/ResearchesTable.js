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

function ResearchesTable({
  confirmRef,
  handleDeleteItem,
  researches,
  setResearches,
  handleCloseModal,
  handleOpenModal,
  selectedItemId,
  selectedItem,
}) {
  const [resData,setResData]=useState(ResearchData)
  const [selectedItem1, setSelectedItem1] = useState("");
  const [selectedItemId1, setSelectedItemId1] = useState(null);
//  console.log(resData)
  const handleOpenStatusModal = (user) => {
    setSelectedItem1((prev) => user);
  };
  const handleCloseStatusModal = () => {
    setSelectedItem1("");
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
        Header: "Հետազոտության ID",
        accessor: "researchId",
        sortable: true,
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setResearches} />
        ),
      },
      {
        Header: "Հիվանդի ID",
        accessor: "patientId",
        sortable: true,
        width: 300,
        Filter: ({ column: { id } }) => (
          <ColumnFilter id={id} setData={setResearches} />
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
          <ColumnFilter id={id} setData={setResearches} />
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
          <ResearchViewBoard
            selectedItem={selectedItem1}
            handleCloseStatusModal={handleCloseStatusModal}
            selectedItemId={selectedItemId1}
            setResearches={setResearches}
            researches={researches}
          />

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

export default ResearchesTable;
