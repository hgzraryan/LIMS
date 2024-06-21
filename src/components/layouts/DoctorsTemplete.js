/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import React, {  useEffect, useRef, useMemo, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { selectUserLoginData } from "../../redux/features/users/userLoginDataSlice";
import doctorSampleImg from "../../dist/img/doctorSamplePhoto.jpg";
import MissingImg from "../../dist/img/Missing.svg";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import {
  useBlockLayout,
  useFilters,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { ColumnFilter } from "../ColumnFilter";
import './work.css'
import { BiSolidInfoCircle } from "react-icons/bi";
import { Checkbox } from "../Checkbox";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {  momentLocalizer } from 'react-big-calendar';
import MyBigCalendar from "../MyBigCalendar";
import { DOCTORSVISITS_URL, DOCTORSVISITS__SEARCH_URL } from "../../utils/constants";
import ProgressBar from "../ProgressBar";
import DoctorVisitsInfoModal from "../infoModals/DoctorVisitsInfoModal";
import sideDoctorVisitSvg from '../../dist/svg/sideDoctorVisit.svg'
import sideDiagnosticsSvg from '../../dist/svg/sideDiagnostics.svg'
import CustomTable from "../CustomTable";
import organizationsSvg from "../../dist/svg/organizationsSvg.svg";
import { MdViewKanban } from "react-icons/md";

import patientSvg from "../../dist/svg/patientSvg.svg";

// import 'react-big-calendar/lib/sass/styles';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles';
const customData = [
  {
    patientId:12001,
firstName:'Արման',
lastName: 'Պետրոսյան',
midName: 'Սերոբի',
email:'Arm@AdsClick.er',
age:25
}
]

const DoctorsTemplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();

  const intupAvatarRef = useRef(null);
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(MissingImg);
  const formData = new FormData();
  const fileReader = new FileReader();
  const [activeLink, setActiveLink] = useState('tab_summery'); // Default active link
  const [pageTab,setPageTab] =useState('tab_summery')
  const [patients,setPatients] =useState([])
  const localizer = momentLocalizer(moment);
  const [userData,setUserData]=useState('')
  const [modalInfo, setModalInfo] = useState("");
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [doctorsVisits, setDoctorsVisits] = useState([]);
  const [diagnostics, setDiagnostics] = useState([]);
  const [selectedItem1, setSelectedItem1] = useState("");

 const handleOpenStatusModal = (data) => {
    setSelectedItem1((prev) => data);
  };
    //const {userId} = userData
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (storedData) {
        setUserData(storedData);
        const fetchData = async () => {
          try {
            //----------------------get doctors details----------------------------------------------------------------
        
            const response = await axiosPrivate.get(`/doctors/doctorarea/${storedData?.doctorId}`);
            //setIsLoading(false);
            setDoctorDetails((prevUsers) => response?.data?.jsonString);
            console.log(response?.data?.jsonString)
              //--------------------------------------------------------------------------------------
            //----------------------get doctors visits----------------------------------------------------------------

            const doctorVisitsResp = await axiosPrivate.get(`getVisitsByid/doctor/${storedData?.doctorId}`);
            setDoctorsVisits(doctorVisitsResp?.data?.jsonString);
    console.log(doctorVisitsResp)
            //--------------------------------------------------------------------------------------
            //----------------------get diagnostics----------------------------------------------------------------

            //const diagnosticsResp = await axiosPrivate.get(`getVisitsByid/doctor/25`);
            //setDiagnostics(patientsResp?.data?.jsonString);
            //console.log(diagnosticsResp)
            //--------------------------------------------------------------------------------------


          } catch (err) {
            console.log(err);
            navigate("/login", { state: { from: location }, replace: true });
          }
        };
        setTimeout(() => {
          fetchData();
        }, 500);
      }

    }, []);

  

  const handlePatientsDetails = async (patientId) => {  
    navigate(`/patients/${patientId}`)
};
  const handleLinkClick = (linkId) => {
    setActiveLink(linkId); 
    setPageTab(linkId)
  };
  const handleUserPage = async (userId) => {
    try {
      // const response = await axiosPrivate.get(`/patients/${userId}`, );
      //console.log(response.data);
      //navigate(`/users/${userId}`)
      navigate(`/users/${userData.userId}`);
    } catch (err) {
      console.log(err);
      // if (!err?.response) {
      //   setErrMsg("No Server Response");
      // } else if (err.response?.status === 409) {
      //   setErrMsg("Username Taken");
      // } else {
      //   setErrMsg(" Failed");
      // }
    }
  };
    //-------------------
    const [isActive, setIsActive] = useState(false);
    const menuClick = (event) => {
      setIsActive((current) => !current);
    };
    //---------------------------------------------//
  
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  //-------------------------------------------------------------------------
  fileReader.onloadend = () => {
    setImageUrl(fileReader.result);
  };

  const handleChangeFile = async (event) => {
    console.log(event);
    const image = event.target.files[0];
    if (!image.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setImage(image);
    try {
      formData.append("image", event.target.files[0]);
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (image) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setImageUrl(result);
        }
      };
      fileReader.readAsDataURL(image);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [image]);

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (event.dataTransfer.files && event.dataTransfer.files.length) {
      setImage(event.dataTransfer.files[0]);
      fileReader.readAsDataURL(event.dataTransfer.files[0]);
    }
  };
  const handleDragEmpty = (event) => {
    event.preventDefault();
    if (event.stopPropagation) {
      event.stopPropagation();
    }
  };
  const handleDoctorInfo = async (doctorId) => {
    navigate(`/doctors/${doctorId}`);
  };
  const handlePatientsDetail = async (patientId) => {
    navigate(`/patients/doctorarea/${patientId}`);
  };
  const handleVisitsDetail = async (patientId) => {
    navigate(`/doctorsVisits/${patientId}`);
  };
  const handleOpenInfoModal = (data) => {
    setModalInfo((prev) => data);
  };

  const doctorsVisitColumns = useMemo(
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
        // Filter: ({ column: { id } }) => (
        //   <ColumnFilter id={id} 
        //   setData={setDoctorsVisits} 
        //   placeholder={"ID"}
        //   getUrl = {DOCTORSVISITS_URL}
        //   searchUrl = {
        //     DOCTORSVISITS__SEARCH_URL
        //     //DOCTORSVISITS__SEARCH_URL
        //   } 
        //   handleSearchPageCount={(val)=>handleSearchPageCount(val)}
        //   filterData={filterData}
        //   setFilterData={(newFilterData) => {
        //       setFilterDataJSON(JSON.stringify({...filterData, ...newFilterData}))
        //       setFilterData(newFilterData)   
        //   }}

        
        //   />
        // ),
        Cell: ({ row }) => (
          <>
            <div
              onClick={() => handleVisitsDetail(row.original.doctorsVisitId)}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {row.original.doctorsVisitId}
            </div>
          </>
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Այցելու</div>
          </>
        ),
        accessor: "name",
        sortable: true,
        width: 280,
        // Filter: ({ column: { id } }) => (
        //   <ColumnFilter
        //     id={id}
        //     setData={setDoctorsVisits}
        //     placeholder="Անուն ազգանուն"
        //   />
        // ),
        Cell: ({ row }) => (
          <div
            onClick={() => handlePatientsDetail(row.original?.clientId)}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {row.original?.clientLastName +
              " " +
              row.original?.clientFirstName +
              " " +
              row.original?.clientMidName}
          </div>
        ),
      },
      {
        Header: "Վճարում",
        accessor: "paymentProgress",
        disableSortBy: true,
        width: 200,
        Cell: ({ row }) => (
          <>
            <div className="d-flex justify-content-center align-items-center flex-column">
              {row.original?.originalPrice &&
              !(row.original?.originalPrice === row.original?.totalPrice) ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row-reverse",
                    fontSize: "14px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#bb86fc",
                      borderRadius: "8px",
                      padding: "0 10px 0 10px",
                      margin: "0 0 -3px 0",
                      zIndex: "9999",
                      color: "white",
                      textDecoration: "line-through",
                    }}
                  >
                    <p> {row.original?.originalPrice}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="d-flex">
                <ProgressBar
                  totalPrice={row.original?.totalPrice || 0}
                  totalPayed={row.original?.totalPayed || 0}
                />
              </div>
            </div>
          </>
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Այցի ամսաթիվ</div>
          </>
        ),
        accessor: "visitDate",
        width: 200,
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center align-items-center flex-column">
            {row.original?.visitDate && moment.utc(row.original?.visitDate).format("DD-MM-YYYY HH:mm")}
          </div>
        ),
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Հաջորդ այց</div>
          </>
        ),
        accessor: "nextVisit",
        width: 200,
      },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Բժիշկ</div>
          </>
        ),
        accessor: "doctorName",
        width: 280,
        Cell: ({ row }) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleDoctorInfo(row.original.doctorId);
            }}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {row.original?.doctorName}
          </div>
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
              {/* <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-placement="top"
                title="Deactivate"
                href="#"
                onClick={() => handleOpenDeactivateModal(row.original)}
              >
                <span className="icon">
                  <span className="feather-icon">
                    {row.original?.visitStatus === "Active" ? (
                      <img
                        src={isActiveSvg}
                        width={"20px"}
                        height={"20px"}
                        alt="isActiveSvg"
                      />
                    ) : row.original?.visitStatus === "Cancelled" ? (
                      <img
                        width={"20px"}
                        height={"20px"}
                        src={cancelledSvg}
                        alt="cancelledSvg"
                      />
                    ) : (
                      ""
                    )}
                  </span>
                </span>
              </a> */}
            </div>
            <div className="d-flex">
              <BiSolidInfoCircle
                cursor={"pointer"}
                size={"1.5rem"}
                onClick={() => handleOpenInfoModal(row.original)}
              />
            </div>
            {/* <div className="d-flex">
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
                </div> */}
            {/* {row.original?.visitStatus === "Active" && ( */}
            <>
              {/* <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-placement="top"
                title="Print"
                href="#"
                onClick={() => handleOpenPrintModal(row.original)}
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="printer" />
                  </span>
                </span>
              </a> */}
              {/* {!(row.original?.totalPrice <= row.original?.totalPayed) ? (
                <div className="d-flex">
                  <img
                    title="POS"
                    style={{ cursor: "pointer" }}
                    width="20xp"
                    height="20px"
                    src={posTerminalSvg}
                    alt="posTerminalSvg"
                    onClick={() => handlePosPay(row.original)}
                  />
                </div>
              ) : (
                ""
              )} */}
            </>
            {/* )} */}
          </div>
        ),
        disableSortBy: true,
      },
    ],
    []
  ); 
  const handleDiagnosticsDetails = async (diagnosticsId) => {
    navigate(`/diagnostics/${diagnosticsId}`);
  };
  const handleClientDetails = async (rowData) => {
    const { clientId } = rowData;
    const { clientType } = rowData;
    clientType === "patient"
      ? navigate(`/patients/${clientId}`)
      // :
      // clientType === "organization"
      // ? navigate(`/organizations/${clientId}`)
      :<></>
  };
  const diagnosticsColumns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "diagnosticsId",
        sortable: true,
        width: 80,
        

        Cell: ({ row }) => (
          <>
            <div
              onClick={() =>
                handleDiagnosticsDetails(row.original.diagnosticsId)
              }
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {row.original.diagnosticsId}
            </div>
          </>
        ),
      },
      {
        Header: "Այցելու",
        accessor: "clientName",
        sortable: true,
        width: 300,
        // Filter: ({ column}) => (
        //   <ColumnFilter
        //     id={column.id}
        //     setData={setDiagnostics}
        //     placeholder="Այցլու"
        //     getUrl = {DIAGNOSTICS_URL}
        //     searchUrl = {DIAGNOSTICS__SEARCH_URL}
        //   />
        // ),
        Cell: ({ row }) => (
          <>
            <div
              onClick={() => handleClientDetails(row.original)}
              style={{ cursor: "pointer",  }}
            >
              {row.original.clientType === "organization" ? (
                <img
                  src={organizationsSvg}
                  alt="organizationIcon"
                  width={25}
                  height={25}
                  className="me-2"
                />
              ) : row.original.clientType === "patient"?(
                <img
                  src={patientSvg}
                  alt="patientIcon"
                  width={25}
                  height={25}
                  className="me-2"
                />
              ):'Առանց այցելու'}
              {row.original?.clientType==='patient'
              ? row.original?.clientFirstName + " " +
              row.original?.clientLastName +  " " +
              row.original?.clientMidName
              :row.original?.clientType==='organization'
              ?'Պատվիրատու'
            :''}
            </div>
          </>
        ),
      },
      {
        Header: "Հետազոտություններ",
        accessor: "researchList",
        disableSortBy: true,
        width: 200,
        Cell: ({ row }) => (
          <>
            {row.original?.diagStatus === "Active" && (
              <div className="d-flex justify-content-center align-items-center">
                {/* <div className="pe-2">{row.original.statusBoard.length}</div> */}
                <MdViewKanban
                  cursor={"pointer"}
                  size={"1.5rem"}
                  onClick={() => handleOpenStatusModal(row.original)}
                />
              </div>
            )}
          </>
        ),
        // Filter: ({ column: { id } }) => <></>,
      },
      {
        Header: "Վճարում",
        accessor: "paymentProgress",
        disableSortBy: true,
        width: 200,
        Cell: ({ row }) => (
          <>
            <div className="d-flex justify-content-center align-items-center flex-column">
              {row.original?.originalPrice && !(row.original?.originalPrice === row.original?.totalPrice) ? (
                <div style={{width:'100%',display:'flex',
                flexDirection:'row-reverse',fontSize:'14px'}}>

                
                <div
                  style={{
                    backgroundColor: "#bb86fc",
                    borderRadius: "8px",
                    padding: "0 10px 0 10px",
                    margin: "0 0 -3px 0",
                    zIndex: "9999",
                    color:'white',
                    textDecoration:'line-through',
                    
                  }}
                >
                 <p> {row.original?.originalPrice}</p>
                </div>
                </div>
              ):''
              }
              <div className='d-flex'>
              <ProgressBar totalPrice ={row.original?.totalPrice||0} totalPayed={row.original?.totalPayed||0}/>
              </div>

            </div>
          </>
        ),
      },
      {
        Header: "Գրանցման ամսաթիվ",
        accessor: "diagnosisDate",
        width: 200,
        // Filter: ({ column: { id } }) => (
        //   <ColumnFilter
        //     id={id}
        //     setData={setDiagnostics}
        //     placeholder="Գրանցման ամսաթիվ"
        //     getUrl = {DIAGNOSTICS_URL}
        //     searchUrl = {DIAGNOSTICS__SEARCH_URL}
        //   />
        // ),
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center align-items-center">
            {/* {new Date()} */}
            {moment(row.original?.diagnosisDate).format('YYYY-MM-DD HH:mm')}
          </div>
        ),
      },
      {
        Header: "Տեսակ",
        accessor: "class",
        width: 180,
        // Filter: ({ column: { id } }) => (
        //   <ColumnFilter 
        //   id={id} 
        //   setData={setDiagnostics} 
        //   placeholder="Տեսակ"
        //   getUrl = {DIAGNOSTICS_URL}
        //   searchUrl = {DIAGNOSTICS__SEARCH_URL} />
        // ),
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center align-items-center">
            {row.original?.class === "Internal"
              ? "Ներքին"
              : row.original?.class === "External"
              ? "Արտաքին"
              : row.original?.class === "Other"
              ? "Այլ"
              : ""}
          </div>
        ),
      },
      {
        Header: "Կարգավիճակ",
        accessor: "diagStatus",
        width: 200,
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center align-items-center">
            {row.original?.diagStatus === "Active" ? "Ակտիվ" : "Չեղարկված"}
          </div>
        ),
      },
      {
        Header: "Գործողություններ",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <div className="d-flex">
       

              </div>

              <div className="d-flex">

              <BiSolidInfoCircle
                cursor={"pointer"}
                size={"1.5rem"}
                title="info"
                onClick={() => handleOpenInfoModal(row.original)}
              />
            </div>

            {row.original?.diagStatus === "Active" && (
                <>
            <div className="d-flex">
                  {/* <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title="Print"
                    href="#"
                    onClick={() => handleOpenPrintModal(row.original)}
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <FeatherIcon icon="printer" />
                      </span>
                    </span>
                  </a> */}
                
              
            
              {/*
              //TODO Delete diagnostics option
              {!row.original.patientId && (
                <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                data-bs-toggle="tooltip"
                onClick={() => handleOpenModal(row.original)}
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
              )} */}
            </div>
           
                </>
                )}
          </div>
        ),
        disableSortBy: true,
        width: 200,
        Filter: ({ column: { id } }) => <></>,
      },
    ],
    []
  );

  return (
    <>
      {!!modalInfo && (
        <DoctorVisitsInfoModal
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
        />
      )}
    <div className="hk-wrapper" data-layout="vertical">
      <nav className="hk-navbar navbar navbar-expand-xl navbar-light fixed-top">
        <div className="container-fluid">
          {/* Start Nav */}
          <div className="nav-start-wrap">
            <button
              className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover navbar-toggle d-xl-none"
              
            >
              <span className="icon">
                <span className="feather-icon">
                  {/*<i data-feather="align-left"></i>*/}
                  <i className="fas fa-align-left"></i>
                </span>
              </span>
            </button>
            {/* Search */}

            {/* /Search */}
          </div>
          {/* /Start Nav */}
          {/* End Nav */}
          <div className="nav-end-wrap" onClick={menuClick}>
            <ul className="navbar-nav flex-row">
              <li className="nav-item">
                <div className="dropdown ps-2">
                  <a
                    className=" dropdown-toggle no-caret"
                    href="#"
                    role="button"
                    data-bs-display="static"
                    data-bs-toggle="dropdown"
                    data-dropdown-animation
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                  ><span>{doctorDetails?.doctorName+" "}</span>
                    <div className="avatar avatar-rounded avatar-xs">
                      <img
                        src="/dist/img/avatar12.jpg"
                        alt="user"
                        className="avatar-img"
                      />
                    </div>
                  </a>
                  <div
                    className={
                      isActive
                        ? "dropdown-menu dropdown-menu-end show showSlow"
                        : "dropdown-menu dropdown-menu-end showSlow"
                    }
                  >
                    <div className="p-2">
                      <div className="media">
                        <div className="media-head me-2">
                          <div className="avatar avatar-primary avatar-sm avatar-rounded">
                            <span className="initial-wrap">{ }</span>
                          </div>
                        </div>
                        <div className="media-body">
                          <div className="fs-7">{ }</div>
                          <div style={{ color: "black" }}>
                            <p
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={() => handleUserPage(userData?.userId)}
                            >
                              {/* {userData?.firstname + " "}
                                {userData?.lastname} */}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="profile.html">Profile</a>
                                                <a className="dropdown-item" href="/privacy-policy">
                                                <span className="me-2">Offers</span>
                                                <span className="badge badge-sm badge-soft-pink">2</span>
                                                </a>
                                                <div className="dropdown-divider"></div>
                                                <h6 className="dropdown-header">Manage Account</h6>
                                                <a className="dropdown-item" href="/privacy-policy"><span className="dropdown-icon feather-icon"><i data-feather="credit-card"></i></span><span>Payment methods</span></a>
                                                <a className="dropdown-item" href="/privacy-policy"><span className="dropdown-icon feather-icon"><i data-feather="check-square"></i></span><span>Subscriptions</span></a>
                                                <a className="dropdown-item" href="/privacy-policy"><span className="dropdown-icon feather-icon"><i data-feather="settings"></i></span><span>Settings</span></a>
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item" href="/privacy-policy"><span className="dropdown-icon feather-icon"><i data-feather="tag"></i></span><span>Raise a ticket</span></a>
                                                <div className="dropdown-divider"></div>
                                              */}
                    <a className="dropdown-item" href="/support">
                      Օգնություն և սպասարկում
                    </a>
                    <a
                      href="/login"
                      className="d-block fs-8 link-secondary"
                      onClick={signOut}
                    >
                      <u>Դուրս գալ</u>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {/* /End Nav */}
        </div>
      </nav>
      <div className="hk-pg-wrapper pb-0 " >
        <div className="contactapp-wrap " style={{ height: '100%' }} >
          <div className="contactapp-content p-0" >
            <div className="contactapp-detail-wrap"  >
              {/* <header className="contact-header">
          <div className="d-flex align-items-center">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb  mb-0">
                <li className="breadcrumb-item"><a href="contact.html">Contacts</a></li>
                <li className="breadcrumb-item active" aria-current="page">Morgan Freeman</li>
              </ol>
            </nav>
          </div>
          <div className="contact-options-wrap">	
            <div className="d-flex fs-7 align-items-center">1 of 30</div>
            <a className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover contactapp-info-toggle" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Previous"><span className="icon"><span className="feather-icon"><i data-feather="chevron-left"></i></span></span></a>
            <a className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover contactapp-info-toggle" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Next"><span className="icon"><span className="feather-icon"><i data-feather="chevron-right"></i></span></span></a>
            <a className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Collapse">
              <span className="icon">
                <span className="feather-icon"><i data-feather="chevron-up"></i></span>
                <span className="feather-icon d-none"><i data-feather="chevron-down"></i></span>
              </span>
            </a>
          </div>
          <div className="hk-sidebar-togglable"></div>
        </header> */}
              <div className="contact-body contact-detail-body">
                <div data-simplebar className="nicescroll-bar">
                  <div className="d-flex flex-xxl-nowrap flex-wrap">
                    <div className="contact-info " style={{maxWidth:'400px'}}>

                      {/* <div className="dropdown action-btn">
                  <button aria-expanded="false" data-bs-toggle="dropdown" className="btn btn-light dropdown-toggle " type="button">Action</button>
                  <div role="menu" className="dropdown-menu">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Separated link</a>
                  </div>
                </div> */}
                      <div className="text-center mt-5">
                        <div className="dropify-circle edit-img">
                          <img
                            width={"130px"}
                            height={"130px"}
                            style={{
                              borderRadius: "50%",
                              cursor: "pointer",
                              boxShadow:'5px 0px 10px gray',
                              objectFit: "cover",
                            }}
                            onClick={() => intupAvatarRef.current.click()}
                            src={imageUrl}
                            className="avatar_upload_preview"
                            alt="preview"
                            onDrop={handleDrop}
                            onDragEnter={handleDragEmpty}
                            onDragOver={handleDragEmpty}
                          />
                          <input
                            hidden
                            type="file"
                            ref={intupAvatarRef}
                            onChange={handleChangeFile}
                            className="dropify-1"
                          //data-default-file="dist/img/avatar2.jpg"
                          />
                        </div>
                        <div className="cp-name text-truncate mt-3">
                          {doctorDetails?.doctorName}
                        </div>
                        {/* <p>No phone calls Always busy</p> */}
                        <div
                          className="rating rating-yellow my-rating-4"
                          data-rating="3"
                        ></div>
                        <ul className="hk-list hk-list-sm justify-content-center mt-2">
                          <li>
                            <a
                              className="btn btn-icon btn-soft-primary btn-rounded"
                              href="#"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  <FeatherIcon icon="mail" />
                                </span>
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              className="btn btn-icon btn-soft-success btn-rounded"
                              href="#"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  <FeatherIcon icon="phone" />
                                </span>
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              className="btn btn-icon btn-soft-danger btn-rounded"
                              href="#"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  <FeatherIcon icon="video" />
                                </span>
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <a href="#">Profile Information</a>
                          <button
                            className="btn btn-xs btn-icon btn-rounded btn-light"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Edit"
                          >
                            <span
                              className="icon"
                              data-bs-toggle="modal"
                              data-bs-target="#editInfo"
                            >
                              <span className="feather-icon">
                                <FeatherIcon icon="edit-2" />
                              </span>
                            </span>
                          </button>
                        </div>
                        <div className="card-body">
                          <ul className="cp-info">
                            <li>
                              <span>Էլ․ հասցե</span>
                              <span>{doctorDetails?.contact?.email}</span>
                            </li>
                            <li>
                              <span>Հեռախոս</span>
                              <span>{doctorDetails?.contact?.phone}</span>
                            </li>
                            <li>
                              <span>Հասցե</span>
                              <span>
                                {doctorDetails?.contact?.address?.city},
                                {doctorDetails?.contact?.address?.street}, </span>
                            </li>
                          <li>
                            <span>Ծննդյան ամսաթիվ</span>
                            <span>{moment(doctorDetails?.dateOfBirth).format('DD-MM-YYYY')}</span>
                          </li>
                          </ul>
                        </div>
                      </div>
                      <div className="separator-full"></div>
                      <div className="card">
                        <div className="card-header">
                          <a href="#">More Info</a>
                          <button
                            className="btn btn-xs btn-icon btn-rounded btn-light"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Edit"
                          >
                            <span
                              className="icon"
                              data-bs-toggle="modal"
                              data-bs-target="#moreContact"
                            >
                              <span className="feather-icon">
                                <FeatherIcon icon="edit-2" />
                              </span>
                            </span>
                          </button>
                        </div>
                        <div className="card-body">
                          <ul className="cp-info">
                            <li>
                              <span>Մասնագիտություն</span>
                              <span>{doctorDetails?.specialty}</span>
                            </li>
                            {/* <li>
                              <span>Կազմակերպություն</span>
                              <span>Էվա լաբ</span>
                            </li> */}
                            <li>
                              <span>Որակավորում</span>
                              <span>{doctorDetails?.qualification}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="separator-full"></div>
                      {/* <div className="card">
                        <div className="card-header">
                          <a href="#">Tags</a>

                        </div>
                        <div className="card-body">
                          <span className="badge badge-soft-warning">
                            Ադմին
                          </span>
                          <span className="badge badge-soft-violet">
                            Բժիշկ
                          </span>
                          <span className="badge badge-soft-danger">
                            Հաստատող
                          </span>
                        </div>
                      </div>
                      <div className="separator-full"></div> */}
                      {/* <div className="card">
                        <div className="card-header">
                          <a href="#">Սոցիալական Էջ</a>
                          <button
                            className="btn btn-xs btn-icon btn-rounded btn-light"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Add Tags"
                          >
                            <span
                              className="icon"
                              data-bs-toggle="modal"
                              data-bs-target="#tagsInput"
                            >
                              <span className="feather-icon">
                                <FeatherIcon icon="plus" />

                              </span>
                            </span>
                          </button>
                        </div>
                        <div className="card-body">
                          <ul className="hk-list hk-list-sm">
                            <li>
                              <button className="btn btn-icon btn-rounded btn-primary">
                                <span className="icon">
                                  <i className="fab fa-behance"></i>
                                </span>
                              </button>
                            </li>
                            <li>
                              <button className="btn btn-icon btn-rounded btn-warning">
                                <span className="icon">
                                  <i className="fab fa-google-drive"></i>
                                </span>
                              </button>
                            </li>
                            <li>
                              <button className="btn btn-icon btn-rounded btn-info">
                                <span className="icon">
                                  <i className="fab fa-dropbox"></i>
                                </span>
                              </button>
                            </li>
                            <li>
                              <button className="btn btn-icon btn-rounded btn-dark">
                                <span className="icon">
                                  <i className="fab fa-github"></i>
                                </span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="separator-full"></div> */}
                      {/* <div className="card">
                        <div className="card-header">
                          <a href="#">Կենսագրություն</a>
                          <button
                            className="btn btn-xs btn-icon btn-rounded btn-light"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Edit"
                          >
                            <span
                              className="icon"
                              data-bs-toggle="modal"
                              data-bs-target="#addBio"
                            >
                              <span className="feather-icon">
                                <FeatherIcon icon="edit-2" />
                              </span>
                            </span>
                          </button>
                        </div>
                        <div className="card-body">
                          <p>
                            Hello there, Morgan Freeman is a full-stack frontend
                            developer working under pressure is his quality.
                          </p>
                        </div>
                      </div> */}
                      <div className="separator-full"></div>
                    </div>
                    <div className="contact-more-info">
                      <ul className="nav nav-tabs nav-line nav-icon nav-light">
                        <li className="nav-item">
                          <a
                            className={`nav-link ${activeLink === 'tab_summery' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('tab_summery')}
                            data-bs-toggle="tab"
                            href="#"

                          >
                            <span className="nav-icon-wrap">
                              <span className="feather-icon">
                                <FeatherIcon icon='zap' />
                              </span>
                            </span>
                            <span className="nav-link-text">Գլխավոր</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a 
                          data-bs-toggle="tab" href="#"
                          className={`nav-link ${activeLink === 'tab_doctorVisits' ? 'active' : ''}`}
                          onClick={() => handleLinkClick('tab_doctorVisits')}
                          >
                            <span className="nav-icon-wrap">
                              <span className="feather-icon">
                              <img width={'25px'} height={'25px'} src={sideDoctorVisitSvg} alt="sideDoctorVisitSvg"/>
                              </span>
                            </span>
                            <span className="nav-link-text">Այցելություններ</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a 
                          data-bs-toggle="tab" href="#"
                          className={`nav-link ${activeLink === 'tab_diagnostics' ? 'active' : ''}`}
                          onClick={() => handleLinkClick('tab_diagnostics')}
                          >
                            <span className="nav-icon-wrap">
                              <span className="feather-icon">
                              <img width={'25px'} height={'25px'} src={sideDiagnosticsSvg} alt="controlPanelSvg" style={{fontWeight:'bolder'}}/>
                              </span>
                            </span>
                            <span className="nav-link-text">Ախտորոշումներ</span>
                          </a>
                        </li>
                        <li className="nav-item">
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
                        </li>
                      </ul>
                      <div className="tab-content mt-7">
                        <div
                          className="tab-pane fade show active"
                          id="tab_summery"
                        >
                        </div>
                      </div>
                      <div className="activity-wrap mt-7">
                        {
                          pageTab ==='tab_summery' &&

                        <div class="work">
                          <div class="experience">
                            <h3><i class="fa fa-briefcase" style={{color:'#5b979a'}}></i></h3>
                            <ul>
                              <li><span>Բժիշկ հոգեբան -<br />ԲԳԹ</span><small>Էրեբունի բժշկական կենտրոն</small><small>Ապր. 2018 - Հիմա</small></li>
                              <li><span>Բժիշկ հոգեբան</span><small>Հանրապետական հիվանդանոց</small><small>Հուն. 2018 - Ապր. 2018</small></li>
                              <li><span>Պրակտիկանտ - Հոգեբան</span><small>Հանրապետական հիվանդանոց</small><small>Օգ. 2017 - Դեկ. 2017</small></li>
                            </ul>
                          </div>
                        </div>
                        }
                        {
                          pageTab ==='tab_doctorVisits' &&
                          <CustomTable data={doctorsVisits} column={doctorsVisitColumns}/>

                        }
                        {
                          pageTab ==='tab_diagnostics' &&
                          <CustomTable data={customData} column={diagnosticsColumns}/>
                        }
                        {
                          pageTab ==='tab_calendar' &&

                          <div className="App">
                          <div style={{ height: 500 }}>
                            <MyBigCalendar doctorId={userData?.userId}/>
                          </div>
                        </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Profile Information --> */}
            <div
              className="modal fade"
              id="editInfo"
              tabindex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title">Profile Information</h6>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="row gx-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input
                              className="form-control"
                              type="text"
                              value="Mandaline"
                              placeholder="First Name"
                              name="name"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input
                              className="form-control"
                              type="text"
                              value="Shane"
                              placeholder="Last Name"
                              name="lastname"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Email ID</label>
                            <input
                              className="form-control"
                              type="email"
                              value="contct@hencework.com"
                              placeholder="Email Id"
                              name="emailid"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Phone</label>
                            <input
                              className="form-control"
                              type="text"
                              value="+91-25-4125-2365"
                              placeholder="Phone No"
                              name="phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-sm-12">
                          <label className="form-label">Location</label>
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              value="Lane 1"
                              placeholder="Line 1"
                              name="add1"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              value="Newyork"
                              placeholder="Line 2"
                              name="add2"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer align-items-center">
                    <button type="button" className="btn btn-secondary">
                      Discard
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /Profile Information --> */}

            {/* <!-- More Info --> */}
            <div
              className="modal fade"
              id="moreContact"
              tabindex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title">Profile Information</h6>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="row gx-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Designation</label>
                            <input
                              className="form-control"
                              type="text"
                              value="Mandaline"
                              placeholder="First Name"
                              name="name1"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Company</label>
                            <input
                              className="form-control"
                              type="text"
                              value="Shane"
                              placeholder="Last Name"
                              name="lastname1"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Language</label>
                            <input
                              className="form-control"
                              type="email"
                              value="contct@hencework.com"
                              placeholder="Email Id"
                              name="emailid1"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Birthday</label>
                            <input
                              className="form-control"
                              type="text"
                              value="10/24/1984"
                              placeholder="Phone No"
                              name="birthday1"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer align-items-center">
                    <button type="button" className="btn btn-secondary">
                      Discard
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /More Info --> */}

            {/* <!-- Add Bio --> */}
            <div
              className="modal fade"
              id="tagsInput"
              tabindex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title">Tags</h6>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="row gx-3">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <select
                              id="input_tags"
                              className="form-control"
                              multiple="multiple"
                            >
                              <option selected="selected">Collaborator</option>
                              <option>Designer</option>
                              <option selected="selected">
                                React Developer
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer align-items-center">
                    <button type="button" className="btn btn-secondary">
                      Discard
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /Tags --> */}

            {/* <!-- Add Bio --> */}
            <div
              className="modal fade"
              id="addBio"
              tabindex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title">Biography</h6>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="row gx-3">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              rows="4"
                              placeholder="Add Bio"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer align-items-center">
                    <button type="button" className="btn btn-secondary">
                      Discard
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /Add Bio --> */}

            {/* <!-- Edit Info --> */}
            <div
              id="add_new_contact"
              className="modal fade add-new-contact"
              tabindex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h5 className="mb-5">Create New Conatct</h5>
                    <form>
                      <div className="row gx-3">
                        <div className="col-sm-2 form-group">
                          <div className="dropify-square">
                            <input type="file" className="dropify-1" />
                          </div>
                        </div>
                        <div className="col-sm-10 form-group">
                          <textarea
                            className="form-control mnh-100p"
                            rows="4"
                            placeholder="Add Biography"
                          ></textarea>
                        </div>
                      </div>
                      <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
                        <span>Basic Info</span>
                      </div>
                      <div className="row gx-3">
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label className="form-label">Middle Name</label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Email ID</label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Phone</label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label className="form-label">City</label>
                            <select className="form-select">
                              <option selected="">--</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label className="form-label">State</label>
                            <select className="form-select">
                              <option selected="">--</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label className="form-label">Country</label>
                            <select className="form-select">
                              <option selected="">--</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
                        <span>Company Info</span>
                      </div>
                      <div className="row gx-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Company Name</label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Designation</label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Website</label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="form-label">Work Phone</label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
                        <span>Additional Info</span>
                      </div>
                      <div className="row gx-3">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Tags</label>
                            <select
                              id="input_tags_2"
                              className="form-control"
                              multiple="multiple"
                            ></select>
                            <small className="form-text text-muted">
                              You can add upto 4 tags per contact
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="row gx-3">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Facebook"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Twitter"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="LinkedIn"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Gmail"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer align-items-center">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Discard
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Create Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /Edit Info --> */}

            {/* <!-- Add Label --> */}
            <div
              id="add_new_label"
              className="modal fade"
              tabindex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-sm"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h6 className="text-uppercase fw-bold mb-3">Add Label</h6>
                    <form>
                      <div className="row gx-3">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Label Name"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary float-end"
                        data-bs-dismiss="modal"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Add Label --> */}

            {/* <!-- Add Tag --> */}
            <div
              id="add_new_tag"
              className="modal fade"
              tabindex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-sm"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h6 className="text-uppercase fw-bold mb-3">Add Tag</h6>
                    <form>
                      <div className="row gx-3">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <select
                              id="input_tags_3"
                              className="form-control"
                              multiple="multiple"
                            >
                              <option selected="selected">Collaborator</option>
                              <option selected="selected">Designer</option>
                              <option selected="selected">
                                React Developer
                              </option>
                              <option selected="selected">Promotion</option>
                              <option selected="selected">Advertisement</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary float-end"
                        data-bs-dismiss="modal"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Add Tag --> */}
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default DoctorsTemplete;
