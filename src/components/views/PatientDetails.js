/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
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
const customData = [
  {
    date: "15.06.2021",
    researches: [
      {
        researchName: "Կրեատինինկինազա",
        analysisResult: 8.88,
        referenceRange: "4.0-10.0",
        units: "10^9/L",
        shortName: "WBC",
      },
      {
        shortName: "RBC",
        researchName: "Էրիթրոցիտների ընդհանուր քանակ",
        analysisResult: 6.09,
        referenceRange: ["men 4.0-10.0", "women 4,6-6,2"],
        units: "10^9/L",
      },
    ],
  },
  {
    date: "04.11.2023",
    researches: [
      {
        shortName: "WBC",
        researchName: "Լեյկոցիտների ընդհանուր քանակ",
        analysisResult: 8.88,
        referenceRange: "4.0-10.0",
        units: "10^9/L",
      },
      {
        shortName: "RBC",
        researchName: "Էրիթրոցիտների ընդհանուր քանակ",
        analysisResult: 6.09,
        referenceRange: ["men 4.0-10.0", "women 4,6-6,2"],
        units: "10^9/L",
      },
      {
        shortName: "MCV ",
        researchName: "Էրիթրոցիտի միջին ծավալը փորձանմուշի  ընդհանուր ծավալում",
        analysisResult: 83.7 ,
        referenceRange: "80-100",
        units: "fl",
      },
      {
        shortName: "WBC",
        researchName: "Լեյկոցիտների ընդհանուր քանակ",
        analysisResult: 8.88,
        referenceRange: "4.0-10.0",
        units: "10^9/L",
      },
      {
        shortName: "WBC",
        researchName: "Լեյկոցիտների ընդհանուր քանակ",
        analysisResult: 8.88,
        referenceRange: "4.0-10.0",
        units: "10^9/L",
      },
      {
        shortName: "WBC",
        researchName: "Լեյկոցիտների ընդհանուր քանակ",
        analysisResult: 8.88,
        referenceRange: "4.0-10.0",
        units: "10^9/L",
      },
    
    ],
  },
];
function PatientDetails() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [research, setResearch] = useState([]);
  const [patientDetails, setPatientDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(
    Math.round((window.innerHeight / 100) * 1.5)
  );
  const pageCount = 1;
  //const pageCount = Math.ceil(useersCount/usersPerPage)
  const handleOpenModal = (data) => {
    setIsOpen(true);
    setResearch((prev) => data.researches);
    console.log("**********");
    console.log("", data);
    console.log("**********");
  };
  // const {
  //   data: patientDetail
  // } = useGetData(`/patients+${id}`,currentPage,usersPerPage);

  console.log("**********");
  console.log("patientDetail", customData.length);
  console.log("**********");

  const columns = useMemo(
    () => [
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Ամսաթիվ</div>
          </>
        ),
        accessor: "date",
        sortable: true,
        width: 400,
        Filter: ({ column: { id } }) => <></>,
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Ախտորոշումներ</div>
          </>
        ),
        Cell: ({ row }) => (
          <div className="d-flex">
            <BiSolidInfoCircle
              cursor={"pointer"}
              size={"1.5rem"}
              onClick={() => handleOpenModal(row.original)}
            />
          </div>
        ),
        accessor: "researches",
        style: {
          // Custom style for the 'description' column
        },
        width: 300,
        Filter: ({ column: { id } }) => <></>,
      },
    ],
    []
  );
  const columns1 = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "shortName",
      },
      {
        Header: "Անվանում",
        accessor: "researchName",
      },
      {
        Header: "Արդյունք",
        accessor: "analysisResult",
      },
      {
        Header: "նորմա",
        accessor: "referenceRange",
      },
      {
        Header: "չ/մ",
        accessor: "units",
      },
    ],
    []
  );
  const { getTableProps:getTableProps1, getTableBodyProps:getTableBodyProps1, headerGroups:headerGroups1, rows:rows1, prepareRow:prepareRow1 } =
  useTable({
    columns:columns1,
    data: research,
  });
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
      data: customData,
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
      {isOpen && (
        <Modal show={() => true} size="xl" onHide={() => setIsOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ width: "100%", textAlign: "center" }}>
              Ախտորոշումներ
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <table
              className="table"
              style={{
                border: "1px solid black",
                fontSize: "12px",
                color: "#000",
                marginTop: "10px",
              }}
              
            >
              <thead>
                {headerGroups1.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps1()}>
                {rows1.map((row, i) => {
                  prepareRow1(row);
                  return (
                    <tr key={i} {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            style={{ border: "1px solid black" }}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="contact-body contact-detail-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="d-flex flex-xxl-nowrap flex-wrap">
                  <div className="contact-info w-100">
                    <div className="d-flex justify-content-center align-items-center"></div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      <div className="d-flex justify-content-between align-items-center ms-4 me-4">
        <h4>{patientDetails.name || "Կիրակոսյան Մերուժան Վարդազարի"}</h4>
        <span>
          Հեռ․ {patientDetails.name || "022 565848" + ","}
          <span className="ms-3">
            Էլ․ Հասցե {patientDetails.email || "Meruj107@mal.ru"}
          </span>
        </span>
      </div>
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
                    // className={`resizer ${
                    //   column.isResizing ? "isResizing" : ""
                    // }`}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {customData?.length && (
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
          </tbody>
        )}{" "}
      </table>
    </>
  );
}

export default PatientDetails;
