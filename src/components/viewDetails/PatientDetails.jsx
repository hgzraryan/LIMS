import React, { useState, useMemo, useEffect, Suspense, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { Modal } from "react-bootstrap";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import missingAvatar from "../../dist/img/Missing.svg";
import mobileSvg from "../../dist/svg/mobileSvg.svg";
import emailSvg from "../../dist/svg/emailSvg.svg";
import LoadingSpinner from "../LoadingSpinner";
import profileBgImg from "../../dist/img/profile-bg.jpg";
import moment from "moment";
// import {generateToken,messaging} from '../firbase'
// import {onMessage} from "firebase/messaging"
function PatientDetails() {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [research, setResearch] = useState([]);
  const [patientDetails, setPatientDetails] = useState([]);
  const [patientDiagnostics, setPatientDiagnostics] = useState([]);
  const [patientVisits, setPatientVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLink, setActiveLink] = useState('tab_summery'); 
  const [pageTab, setPageTab] = useState('tab_summery')
  const checkIfDoctorRef = useRef()
  useEffect(()=>{
    checkIfDoctorRef.current = location.pathname?.includes('doctorarea')

  },[])
  
//   useEffect(()=>{
// generateToken()
// onMessage(messaging,(payload)=>{
//   console.log(payload)
// })
//   },[])
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
  const handleVisitsDetail = async (patientId) => {  
    navigate(`/doctorsVisits/${patientId}`)
     
 };

  //const pageCount = 1;
  //const pageCount = Math.ceil(useersCount/usersPerPage)
  const handleOpenDiagModal = (data) => {
    setIsOpen(true);
    setResearch((prev) => data.statusBoard[4]?.researches);
  };
  const handleOpenVisitModal = (data) => {
    // setIsOpen(true);
    // setResearch((prev) => data.statusBoard[4]?.researches);
    //console.log(data)
  };
  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
    setPageTab(linkId)
  };
  useEffect(() => {

    const fetchData = async () => {
      try {
        const patientsResp = await axiosPrivate.get(checkIfDoctorRef.current?`/patients/doctorarea/${id}`:`/patients/${id}`);
        setPatientDetails((prev) => patientsResp?.data?.jsonString);

        const patientDiagnosticsResp = await axiosPrivate.get(checkIfDoctorRef.current?`/getDiagnosticsByCid/doctorarea/${id}/patient`:`/getDiagnosticsByCid/${id}/patient`);
        setPatientDiagnostics((prev) => patientDiagnosticsResp.data);

        const patientVisitsResp = await axiosPrivate.get(checkIfDoctorRef.current?`/getVisitsByid/patient/doctorarea/${id}`:`/getVisitsByid/patient/${id}`);
        setPatientVisits(patientVisitsResp.data);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    setTimeout(() => {
      fetchData();
    }, 500);
  }, [navigate]);

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
        Cell:({row})=>(
          <>{row.original.createdAt.split("T").join(' ').split('.',1)}</>
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
              onClick={() => handleOpenDiagModal(row.original)}
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
        accessor: "name",
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
  const columns2 = useMemo(
    () => [
      {
        Header: (event) => (
          <>
            <div className="columnHeader">ID</div>
          </>
        ),
        accessor: "doctorsVisitId",
        sortable: true,
        width: 80,
        Cell: ({ row }) => (
          <div
            onClick={() => handleVisitsDetail(row.original.doctorsVisitId)}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            {row.original.doctorsVisitId}
          </div>
        ),
        Filter: ({ column: { id } }) => <></>,
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Գրանցման ամսաթիվ</div>
          </>
        ),
        Cell:({row})=>(
          <>
          {row.original?.createdAt && moment.utc(row.original?.createdAt).format('DD-MM-YYYY HH:mm')}
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
            <div className="columnHeader">Այցի ամսաթիվ</div>
          </>
        ),
        Cell:({row})=>(
          <>
          {row.original?.visitDate && moment.utc(row.original?.visitDate).format('DD-MM-YYYY HH:mm')}
          </>
        ),
        accessor: "visitDate",
        sortable: true,
        width: 250,
        Filter: ({ column: { id } }) => <></>,
        
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Բուժ․ ծառայություններ</div>
          </>
        ),
        Cell: ({ row }) => (
          <div className="d-flex">
            <BiSolidInfoCircle
              cursor={"pointer"}
              size={"1.5rem"}
              onClick={() => handleOpenVisitModal(row.original)}
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
    getTableProps:getTableProps2,
    getTableBodyProps:getTableBodyProps2,
    headerGroups:headerGroups2,
    rows:rows2,
    prepareRow:prepareRow2,
  } = useTable(
    {
      columns:columns2,
      data: patientVisits,
    },
    useFilters,
    useBlockLayout,
    useResizeColumns,
    useSortBy,
    useRowSelect,
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     {
    //       id: "selection",
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <Checkbox {...getToggleAllRowsSelectedProps()} />
    //       ),
    //       Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
    //       width: 60
    //     },
    //     ...columns2,
    //   ]);
    // }
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
              {...getTableProps1()}
            >
              <thead>
                {headerGroups1.map((headerGroup) => (
                  <tr key={'headerGroup'+headerGroup?.id} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th key={'column'+column?.id}{...column.getHeaderProps()}>
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
                      {row.cells.map((cell,i) => {
                        return (
                          <td
                          key={i}
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
                      <div className="d-flex justify-content-center align-items-center">
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
                        </div>
                      </li>
                      {patientDetails?.contact?.addPhone &&
                      <li className="list-inline-item d-sm-inline-block d-block mb-sm-0 mb-1 me-3 mt-0">
                        <div className="d-flex justify-content-center align-items-center">

                        <img
                          src={mobileSvg}
                          width="15px"
                          height="15px"
                          alt="mobile"
                          className="me-2"
                          />
                        <span style={{ fontSize: "1.1rem" }}>
                          {patientDetails?.contact?.addPhone || ""}
                        </span>
                          </div>
                      </li>
}
                      <li className="list-inline-item d-sm-inline-block d-block mb-sm-0 mb-1 me-3">
                      <div className="d-flex justify-content-center align-items-center">
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
                        </div>
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
                      <span className="nav-link-text d-flex">Ախտորոշումներ 
                      {patientDiagnostics?.length 
                      ?<div 
                      className="d-flex justify-content-center align-items-center" 
                      style={{
                        marginLeft:'5px',
                        width:'20px',
                        height:'20px', 
                        border:'2px solid #4eafcb',
                        borderRadius:'100px',
                        fontWeight:'bold',
                        color:'#4eafcb',
                        paddingTop:'1px'
                        }}>{patientDiagnostics?.length}</div>
                      :<></>}</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="tab"
                      href="#"
                      className={`nav-link ${
                        activeLink === "tab_doctorsVisits" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("tab_doctorsVisits")}
                    >
                      <span className="nav-icon-wrap">
                          <span className="svg-icon">
                          <svg fill="#000000" width="800px" height="800px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="46.3" cy="36.3" r="16"/>
                            <path d="M66.6,51.1A11.39,11.39,0,0,0,55.2,62.5c0,7.7,8.1,15,10.6,16.9a1.09,1.09,0,0,0,1.5,0c2.5-2,10.6-9.2,10.6-16.9A11.25,11.25,0,0,0,66.6,51.1Zm0,16a4.7,4.7,0,1,1,4.7-4.7A4.76,4.76,0,0,1,66.6,67.1Z"/>
                          <path d="M50.4,79.7h1.4c5.2-.5,2.4-3.7,2.4-3.7h0c-3.2-4.6-5-9.1-5-13.5a13.74,13.74,0,0,1,.6-4.2c.2-2-.6-2.5-1-2.7h-.2a18.48,18.48,0,0,0-2.4-.1,24.26,24.26,0,0,0-24,20.9c0,1.2.4,3.5,4.2,3.5H50.2C50.2,79.7,50.3,79.7,50.4,79.7Z"/></svg>
                          </span>
                        </span>
                      <span className="nav-link-text d-flex">Բժշկի այցելություններ
                      {(patientVisits?.length>0) 
                      ?<div 
                      className="d-flex justify-content-center align-items-center" 
                      style={{
                        marginLeft:'5px',
                        width:'20px',
                        height:'20px', 
                        border:'2px solid #4eafcb',
                        borderRadius:'100px',
                        fontWeight:'bold',
                        color:'#4eafcb',
                        paddingTop:'1px'
                        }}>{patientVisits?.length}</div>
                      :<></>}</span>
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
              <div className="row">
                {pageTab === "tab_summery" && (
                  <>
                    <div className="col-lg-4 mb-lg-0 mb-3">
                      <div className="card card-border mb-lg-4 mb-3">
                        <div className="card-header card-header-action"></div>

                        <ul className="list-group list-group-flush">
                        <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-file-earmark-person text-disabled me-2"></i>                              
                              <span className="text-muted">Նույնականացման համար:</span>
                            </span>
                            <span className="ms-2">
                            {patientDetails?.patientId}
                            </span>
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
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-gender-ambiguous text-disabled me-2"></i>
                              <span className="text-muted">Սեռ:</span>
                            </span>
                            <span className="ms-2">{patientDetails?.gender === 'Male' ? 'Արական' :patientDetails?.gender === 'Female'? 'Իգական':''}</span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                            <i className="bi bi-file-earmark-person text-disabled me-2"></i>                              
                              <span className="text-muted">Տարիք:</span>
                            </span>
                            <span className="ms-2">{patientDetails?.age}</span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi  bi-calendar-event text-disabled me-2"></i>
                              <span className="text-muted">Ծննդյան ամսաթիվ:</span>
                            <span className="ms-2">{patientDetails?.dateOfBirth && moment.utc(patientDetails?.dateOfBirth).format('DD-MM-YYYY')}</span></span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-file-earmark-person text-disabled me-2"></i>
                              <span className="text-muted">Անձնագիր:</span>
                            <span className="ms-2">{patientDetails?.contact?.passport}</span></span>
                          </li>
                          {patientDetails?.respPersonFullName &&
                          <>
                            <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-file-earmark-person text-disabled me-2"></i>
                              <span className="text-muted">Ծննողի ԱԱՀ:</span>
                            <span className="ms-2">{patientDetails?.respPersonFullName}</span></span>
                          </li>
                            <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-file-earmark-person text-disabled me-2"></i>
                              <span className="text-muted">Ծննողի անձնագիր:</span>
                            <span className="ms-2">{patientDetails?.respPersonPassport}</span></span>
                          </li>
                          </>
                          }
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-calendar-event text-disabled me-2"></i>
                              <span className="text-muted">Գրանցման ամսաթիվ:</span>
                            </span>
                            <span className="ms-2">{patientDetails?.createdAt && moment.utc(patientDetails?.createdAt).format('DD-MM-YYYY HH:mm')}</span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-calendar-event text-disabled me-2"></i>
                              <span className="text-muted">
                                Վերջին թարմացում:
                              </span>
                            </span>
                            <span className="ms-2">
                            {patientDetails?.updatedAt && moment.utc(patientDetails?.updatedAt).format('DD-MM-YYYY HH:mm')}
                            </span>
                          </li>
                          {(patientDetails?.referrer || patientDetails?.extraReferrer) ?
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-calendar-event text-disabled me-2"></i>
                              <span className="text-muted">
                              Տեղեկացվածության աղբյուր:
                              </span>
                            </span>
                            <span className="ms-2">
                            {patientDetails?.referrer || patientDetails?.extraReferrer}
                            </span>
                          </li>
                          :<></>}
                          
                        </ul>
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
                          <ul>
                            <li>
                              <p className="card-text mb-5">
                               {patientDetails?.additional}
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="card-footer justify-content-between"></div>
                      </div>
                    </div>
                  </>
                )}
                {pageTab === "tab_diagnostics" && (
                  <section className="d-flex flex-column">
                    {/* <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ border: "1px solid #000", borderRadius: "16px" }}
                    >
                      <h4>Ախտորոշումներ</h4>
                    </div> */}
                    <div>
                      <table
                        className="table nowrap w-100 mb-5 dataTable no-footer"
                        {...getTableProps()}
                      >
                        <thead>
                          {headerGroups.map((headerGroup) => (
                            <tr
                            key={'headerGroup'+headerGroup?.id}
                              {...headerGroup.getHeaderGroupProps({
                                style: { width: "100%" },
                              })}
                            >
                              {headerGroup.headers.map((column) => (
                                <th
                                key={'column'+column?.id}
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
                        {patientDiagnostics?.length ? (
                          <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                              prepareRow(row);
                              return (
                                <tr
                                key={'row'+row?.id}
                                  {...row.getRowProps({
                                    style: { width: "100%" },
                                  })}
                                >
                                  {row.cells.map((cell,i) => {
                                    return (
                                      <td
                                      key={i}
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
                        ):''}
                      </table>
                    </div>
                  </section>
                )}
                {pageTab === "tab_doctorsVisits" && (
                  <section className="d-flex flex-column">

                    <div>
                      <table
                        className="table nowrap w-100 mb-5 dataTable no-footer"
                        {...getTableProps2()}
                      >
                        <thead>
                          {headerGroups2.map((headerGroup) => (
                            <tr
                            key={'headerGroup'+headerGroup?.id}
                              {...headerGroup.getHeaderGroupProps({
                                style: { width: "100%" },
                              })}
                            >
                              {headerGroup.headers.map((column) => (
                                <th
                                key={'column'+column?.id}
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
                        {patientVisits?.length ? (
                          <tbody {...getTableBodyProps2()}>
                            {rows2.map((row) => {
                              prepareRow2(row);
                              return (
                                <tr
                                key={'row'+row?.id}
                                  {...row.getRowProps({
                                    style: { width: "100%" },
                                  })}
                                >
                                  {row.cells.map((cell,i) => {
                                    return (
                                      <td
                                      key={i}
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
                        ):''}
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
