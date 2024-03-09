import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MissingAvatar from "../../dist/img/Missing.svg";
import mobileSvg from "../../dist/svg/mobileSvg.svg";
import emailSvg from "../../dist/svg/emailSvg.svg";
import LoadingSpinner from "../LoadingSpinner";
const customData = [
    {    
      diagnosticsId:11,
      date: "15.06.2021",
      diagnosticsType:'Արտաքին',
      partner:'Diagen',
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
        diagnosticsId:862,
      date: "04.11.2023",
      diagnosticsType:'Ներքին',
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
          analysisResult: 83.7,
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
    {    
        diagnosticsId:46,
      date: "15.06.2020",
      diagnosticsType:'Արտաքին',
      partner:'Dialab',
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
        diagnosticsId:129,
      date: "04.11.2023",
      diagnosticsType:'Ներքին',
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
          analysisResult: 83.7,
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
    {
        diagnosticsId:40,
      date: "04.11.2023",
      diagnosticsType:'Ներքին',
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
          analysisResult: 83.7,
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
function OrganizationDetails() {
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [research, setResearch] = useState([]);
    const [patientDetails, setPatientDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(
      Math.round((window.innerHeight / 100) * 1.5)
    );
    const handleDiagnosticssDetails = async (diagnosticsId) => {  
       try {
          //const response = await axiosPrivate.get(`/diagnostics/${id}`, );
        //   console.log(response.data); 
        navigate(`/diagnostics/${diagnosticsId}`)
        
       } catch (err) {
      //    console.log(err)
      //   // if (!err?.response) {
      //   //   setErrMsg("No Server Response");
      //   // } else if (err.response?.status === 409) {
      //   //   setErrMsg("Username Taken");
      //   // } else {
      //   //   setErrMsg(" Failed");
      //   // }
       }
    };
    const pageCount = 1;
    //const pageCount = Math.ceil(useersCount/usersPerPage)
    const handleOpenModal = (data) => {
      setIsOpen(true);
      setResearch((prev) => data.researches);
    };
    useEffect(() => {
      const getData = async () => {
        try {
          //const response = await axiosPrivate.get(`/organizations/${id}`);
          const response = await axiosPrivate.get(`/patients/${id}`);
          setIsLoading(false);
          setPatientDetails((prevUsers) => response.data.jsonString);
          // setCurrentPage((prev) => prev = 1);
        } catch (err) {
          console.error(err);
          //navigate("/login", { state: { from: location }, replace: true });
        }
      };
      getData();
    }, []);
    // useEffect(() => {
    //   const getData = async () => {
    //     try {
    //       const response = await axiosPrivate.get(`/diagnostics/${id}`);
    //       console.log(response)
    //       // setIsLoading(false);
    //       // setPatientDetails((prevUsers) => response.data.jsonString);
    //       // setCurrentPage((prev) => prev = 1);
    //     } catch (err) {
    //       console.error(err);
    //       //navigate("/login", { state: { from: location }, replace: true });
    //     }
    //   };
    //   getData();
    // }, []);
  
    const columns = useMemo(
      () => [
        {
          Header: (event) => (
            <>
              <div className="columnHeader">ID</div>
            </>
          ),
          accessor: "diagnosticsId",
          sortable: true,
          width: 60,
          Cell: ({ row }) => (
            <div
              onClick={()=>handleDiagnosticssDetails(row.original.diagnosticsId)}
              style={{ cursor: 'pointer', textDecoration:'underline' }}
            >
              {row.original.diagnosticsId}
            </div>
          ),
          Filter: ({ column: { id } }) => <></>,
        },
        {
          Header: (event) => (
            <>
              <div className="columnHeader">Ամսաթիվ</div>
            </>
          ),
          accessor: "date",
          sortable: true,
          width: 250,
          Filter: ({ column: { id } }) => <></>,
        },
        {
          Header: (event) => (
            <>
              <div className="columnHeader">Տեսակ</div>
            </>
          ),
          accessor: "diagnosticsType",
          sortable: true,
          width: 200,
          Filter: ({ column: { id } }) => <></>,
        },
        {
          Header: (event) => (
            <>
              <div className="columnHeader">Գործընկեր</div>
            </>
          ),
          accessor: "partner",
          sortable: true,
          width: 200,
          Filter: ({ column: { id } }) => <></>,
        },
        {
          Header: (event) => (
            <>
              <div className="columnHeader">Հետազոտություններ</div>
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
          width: 200,
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
    const {
      getTableProps: getTableProps1,
      getTableBodyProps: getTableBodyProps1,
      headerGroups: headerGroups1,
      rows: rows1,
      prepareRow: prepareRow1,
    } = useTable({
      columns: columns1,
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
            width:60
          },
          ...columns,
        ]);
      }
    );
    return (
      <>
      <Suspense fallback={<LoadingSpinner />}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
        <div
          className="d-flex justify-content-center align-items-stretch"
          style={{ backgroundColor: "#dae4ed", height: "100vh" }}
        >
          <div
            className="main "
            style={{
              backgroundColor: "white",
              margin: "50px",
              width: "100%",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            {isOpen && (
              <Modal show={() => true} size="xl" onHide={() => setIsOpen(false)}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ width: "100%", textAlign: "center" }}>
                  Հետազոտություններ
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
            {Object.keys(patientDetails).length && (
              <div className="d-flex justify-content-between align-items-stretch ms-4 me-4">
                <div className="d-flex">
                  <div>
                    <img
                      src={MissingAvatar}
                      alt="MissingAvatar"
                      width="200px"
                      height="300px"
                    />
                  </div>
  
                  <div className="d-flex  flex-column justify-content-center align-content-center ms-5">
                    <p style={{ fontSize: "2.5rem" }}>
                      {patientDetails.lastName +
                        " " +
                        patientDetails.firstName +
                        " " +
                        patientDetails.midName || "Կիրակոսյան Մերուժան Վարդազարի"}
                    </p>
                    <div className="d-flex mb-1">
                      <img
                        src={mobileSvg}
                        width="25px"
                        height="25px"
                        alt="mobile"
                        className="me-2"
                      />
                      <p style={{ fontSize: "1.1rem" }}>{patientDetails?.contact?.phone || "011111111,"}</p>
                    </div>
                    <div className="d-flex">
                    <img src={emailSvg} width='25px' height="25px" alt="email" className="me-2"/>
                    <p style={{ fontSize: "1.1rem" }}>{patientDetails?.contact?.email || "aaa107@mal.ru"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
              <section className="d-flex flex-column">

<div className="d-flex justify-content-center align-items-center" style={{border:'1px solid #000',borderRadius:'16px'}} ><h3>Ախտորոշումներ</h3></div>
<div >
<table
  className="table nowrap w-100 mb-5 dataTable no-footer"
  {...getTableProps()}
>
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr
        {...headerGroup.getHeaderGroupProps({
          style: { width: "100%" },
        })}
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
                    {column.canFilter
                      ? column.render("Filter")
                      : null}
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
</div>
</section>
          </div>
        </div>  
      )}
      </Suspense>
      </>
    );
}

export default OrganizationDetails
