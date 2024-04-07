/* eslint-disable jsx-a11y/anchor-is-valid */
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
import missingAvatar from "../../dist/img/Missing.svg";
import mobileSvg from "../../dist/svg/mobileSvg.svg";
import emailSvg from "../../dist/svg/emailSvg.svg";
import LoadingSpinner from "../LoadingSpinner";
import profileBgImg from "../../dist/img/profile-bg.jpg";
const customData = [
  {

    additional: "",
    class: "Internal",
    clientId: 4,
    clientType:
      "patient",
    createdAt
      :
      "2024-03-12T18:21:53.654Z",
    diagStatus
      :
      "Active",
    diagnosisDate
      :
      "2024-03-12T18:21:53.644Z",
    diagnosticsId
      :
      21,
    diagnosticsName
      :
      "asdas",
    doctors
      :
      [5],
    externalStatus
      :
      null,
    generationDate
      :
      "2024-03-12T18:21:53.644Z",
    internalStatus
      :
      "Approval",
    researchIds
      :
      ["3"],
    totalPrice
      :
      10,
    updatedAt
      :
      "2024-03-12T18:31:09.344Z",
    __v
      :
      0,
    _id
      :
      "65f09d4161d66ef0b594445a",
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
    diagnosticsId: 862,
    date: "04.11.2023",
    diagnosticsType: 'Ներքին',
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
    diagnosticsId: 46,
    date: "15.06.2020",
    diagnosticsType: 'Արտաքին',
    partner: 'Dialab',
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
    diagnosticsId: 129,
    date: "04.11.2023",
    diagnosticsType: 'Ներքին',
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
    diagnosticsId: 40,
    date: "04.11.2023",
    diagnosticsType: 'Ներքին',
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
function PatientDetails() {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [research, setResearch] = useState([]);
  const [patientDetails, setPatientDetails] = useState([]);
  const [patientDiagnostics, setPatientDiagnostics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeLink, setActiveLink] = useState('tab_summery'); 
  const [pageTab, setPageTab] = useState('tab_summery')
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
    setResearch((prev) => data.statusBoard[4]?.researches);
  };
  const handleLinkClick = (linkId) => {
    //     tab_summery
    // tab_patients
    // tab_calendar
    // tab_timeLine
    setActiveLink(linkId);
    setPageTab(linkId)
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(`/patients/${id}`);
        setIsLoading(false);
        setPatientDetails((prev) => response.data.jsonString);
        // setCurrentPage((prev) => prev = 1);
      } catch (err) {
        console.error(err);
        //navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(`/getDiagnosticsByCid/${id}/patient`);
        setIsLoading(false);
        setPatientDiagnostics((prev) => response.data);
        // setCurrentPage((prev) => prev = 1);
      } catch (err) {
        console.error(err);
        //navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getData();
  }, []);

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
        width: 80,
        Cell: ({ row }) => (
          <div
            onClick={() => handleDiagnosticssDetails(row.original.diagnosticsId)}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
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
        accessor: "createdAt",
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
        accessor: "class",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } }) => <></>,
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center align-items-center">
            {row.original?.class === 'Internal' ? 'Ներքին' :
              row.original?.class === 'External' ? 'Արտաքին' :
                row.original?.class === 'Other' ? 'Այլ' : ''}
          </div>
        ),
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
      data: patientDiagnostics,
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
          width: 60
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
      <Suspense fallback={<LoadingSpinner />}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="hk-pg-body p-2">
            <div className="profile-wrap">
              <div className="profile-img-wrap">
                <img
                  className="img-fluid rounded-5"
                  src={profileBgImg}
                  alt="Description"
                />
              </div>
              <div className="profile-intro">
                <div className="card card-flush mw-400p bg-transparent">
                  <div className="card-body">
                    <div className="avatar avatar-xxl avatar-rounded position-relative mb-2">
                      <img
                        src={missingAvatar}
                        alt="user"
                        className="avatar-img border border-4 border-white"
                      />
                      <span className="badge badge-indicator badge-success  badge-indicator-xl position-bottom-end-overflow-1 me-1"></span>
                    </div>
                    <h4>
                      {" "}
                      {patientDetails.lastName +
                        " " +
                        patientDetails.firstName +
                        " " +
                        patientDetails.midName ||
                        "Կիրակոսյան Մերուժան Վարդազարի"}
                      <i
                        className="bi-check-circle-fill fs-6 text-blue"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-bs-original-title="Top endorsed"
                      ></i>
                    </h4>

                    <ul className="list-inline fs-7 mt-2 mb-0">
                      <li className="list-inline-item d-sm-inline-block d-block mb-sm-0 mb-1 me-3">
                        <img
                          src={mobileSvg}
                          width="15px"
                          height="15px"
                          alt="mobile"
                          className="me-2"
                        />
                        <span style={{ fontSize: "1.1rem" }}>
                          {patientDetails?.contact?.phone || ""}
                        </span>
                      </li>

                      <li className="list-inline-item d-sm-inline-block d-block mb-sm-0 mb-1 me-3">
                        <img
                          src={emailSvg}
                          width="15px"
                          height="15px"
                          alt="email"
                          className="me-2"
                        />
                        <span style={{ fontSize: "1.1rem" }}>
                          {patientDetails?.contact?.email || ""}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <header className="profile-header">
                <ul className="nav nav-line nav-tabs nav-icon nav-light h-100 d-md-flex d-none">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeLink === "tab_summery" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("tab_summery")}
                      data-bs-toggle="tab"
                      href="#"
                    >
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <FeatherIcon icon="zap" />
                        </span>
                      </span>
                      <span className="nav-link-text">Գլխավոր</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="tab"
                      href="#"
                      className={`nav-link ${
                        activeLink === "tab_diagnostics" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("tab_diagnostics")}
                    >
                      <span className="nav-icon-wrap">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <svg
                              fill="#000000"
                              width="23"
                              height="23"
                              viewBox="0 0 512 512"
                              id="Layer_1"
                              version="1.1"
                            >
                              <g>
                                <g>
                                  <g>
                                    <rect
                                      x="210.464"
                                      y="46.307"
                                      transform="matrix(-0.8935 -0.449 0.449 -0.8935 417.2299 376.1477)"
                                      width="85.498"
                                      height="184.595"
                                    />
                                    <rect
                                      x="83.863"
                                      y="313.827"
                                      width="134.1"
                                      height="34.2"
                                    />
                                    <path
                                      d="M405.663,277.327c0-60.6-31.9-113.9-79.7-143.8l-18.7,36.9c34.6,23,57.6,62.2,57.6,106.9c0,70.7-57.5,128.2-128.2,128.2
			c-34.6,0-65.7-13.6-88.6-35.7h-53.2c16.3,24.9,39.2,45.5,66.1,58.7h-38.1v61h225.8v-61h-35.7
			C367.563,400.927,405.663,343.427,405.663,277.327z"
                                    />

                                    <rect
                                      x="277.843"
                                      y="7.844"
                                      transform="matrix(-0.8935 -0.449 0.449 -0.8935 555.6599 173.8512)"
                                      width="41.199"
                                      height="26.399"
                                    />

                                    <rect
                                      x="216.894"
                                      y="240.196"
                                      transform="matrix(0.449 -0.8935 0.8935 0.449 -106.2222 341.1332)"
                                      width="13.2"
                                      height="32.999"
                                    />

                                    <rect
                                      x="158.474"
                                      y="225.818"
                                      transform="matrix(-0.8935 -0.4491 0.4491 -0.8935 225.362 525.2878)"
                                      width="33.001"
                                      height="20.2"
                                    />
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </span>
                        </span>
                      </span>
                      <span className="nav-link-text">Ախտորոշումներ</span>
                    </a>
                  </li>
                  {/* <li className="nav-item">
                <a 
                          className={`nav-link ${activeLink === 'tab_calendar' ? 'active' : ''}`}
                          onClick={() => handleLinkClick('tab_calendar')}
                           data-bs-toggle="tab" 
                           href="#">
                            <span className="nav-icon-wrap">
                              <span className="feather-icon">
                                <FeatherIcon icon='calendar' />
                              </span>
                            </span>
                            <span className="nav-link-text">Օրացույց</span>
                          </a>
								</li> */}
                </ul>
              </header>
              <div className="row mt-7">
                {pageTab === "tab_summery" && (
                  <>
                    <div className="col-lg-4 mb-lg-0 mb-3">
                      <div className="card card-border mb-lg-4 mb-3">
                        <div className="card-header card-header-action"></div>

                        <ul className="list-group list-group-flush">
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-calendar-check-fill text-disabled me-2"></i>
                              <span className="text-muted">Went to:</span>
                            </span>
                            <span className="ms-2">Oh, Canada</span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-briefcase-fill text-disabled me-2"></i>
                              <span className="text-muted">Worked at:</span>
                            </span>
                            <span className="ms-2">Companey</span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-house-door-fill text-disabled me-2"></i>
                              <span className="text-muted">Lives in:</span>
                            </span>
                            <span className="ms-2">San Francisco, CA</span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-geo-alt-fill text-disabled me-2"></i>
                              <span className="text-muted">Հասցե:</span>
                            </span>
                            <span className="ms-2">
                              {patientDetails?.contact?.address?.country + ", " + patientDetails?.contact?.address?.city}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="card card-border mb-lg-4 mb-3">
                        <div className="card-header card-header-action">
                          <h6>
                            Links
                            <span className="badge badge-sm badge-light me-1">
                              5
                            </span>
                          </h6>
                          <div className="card-action-wrap">
                            <a href="#">View all</a>
                          </div>
                        </div>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item border-0">
                            <div className="media align-items-center">
                              <div className="media-head me-3">
                                <div className="avatar avatar-sm avatar-primary avatar-rounded">
                                  <span className="initial-wrap">G</span>
                                </div>
                              </div>
                              <div className="media-body">
                                <span className="d-block text-capitalize text-truncate mw-150p">
                                  Google
                                </span>
                                <span className="d-block text-muted fs-7 text-truncate mw-150p">
                                  google.com
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item border-0">
                            <div className="media align-items-center">
                              <div className="media-head me-3">
                                <div className="avatar avatar-sm avatar-pink avatar-rounded">
                                  <span className="initial-wrap">AR</span>
                                </div>
                              </div>
                              <div className="media-body">
                                <span className="d-block text-capitalize text-truncate mw-150p">
                                  Improve Your Business
                                </span>
                                <span className="d-block text-muted fs-7 text-truncate mw-150p">
                                  yahoo.com
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item border-0">
                            <div className="media align-items-center">
                              <div className="media-head me-3">
                                <div className="avatar avatar-sm avatar-warning avatar-rounded">
                                  <span className="initial-wrap">PR</span>
                                </div>
                              </div>
                              <div className="media-body">
                                <span className="d-block text-capitalize text-truncate mw-150p">
                                  Cast The Cookware
                                </span>
                                <span className="d-block text-muted fs-7 text-truncate mw-150p">
                                  yahoo.com
                                </span>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item border-0">
                            <div className="media align-items-center">
                              <div className="media-head me-3">
                                <div className="avatar avatar-sm avatar-success avatar-rounded">
                                  <span className="initial-wrap">PR</span>
                                </div>
                              </div>
                              <div className="media-body">
                                <span className="d-block text-capitalize text-truncate mw-150p">
                                  The Universe Thought Sds
                                </span>
                                <span className="d-block text-muted fs-7 text-truncate mw-150p">
                                  facebook.com
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="card bg-primary text-center">
                        <div className="twitter-slider-wrap card-body">
                          <div className="twitter-icon text-center mb-3">
                            <i className="fab fa-twitter"></i>
                          </div>
                          <div
                            id="tweets_fetch"
                            className="owl-carousel light-owl-dots owl-theme"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="card card-border card-profile-feed mb-lg-4 mb-3">
                        <div className="card-header card-header-action">
                          <div className="media align-items-center">
                            <p>Հավելյալ տեղեկատվություն</p>
                          </div>
                          <div className="card-action-wrap"></div>
                        </div>
                        <div className="card-body">
                          <ol>
                            <li>
                              <p className="card-text mb-5">
                                Այցելուն ունի ||| կարգի հաշմանդամություն
                              </p>
                            </li>
                          </ol>
                        </div>
                        <div className="card-footer justify-content-between"></div>
                      </div>
                    </div>
                  </>
                )}
                {pageTab === "tab_diagnostics" && (
                  <section className="d-flex flex-column">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ border: "1px solid #000", borderRadius: "16px" }}
                    >
                      <h4>Ախտորոշումներ</h4>
                    </div>
                    <div>
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
                                <tr
                                  {...row.getRowProps({
                                    style: { width: "100%" },
                                  })}
                                >
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
                )}
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
}

export default PatientDetails;
