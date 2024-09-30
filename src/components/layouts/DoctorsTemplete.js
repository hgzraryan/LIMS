/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate, useLocation,Outlet } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import React, {  useEffect, useRef, useMemo, useState,Suspense } from "react";
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
import LoadingSpinner from "../LoadingSpinner";

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

            const diagnosticsResp = await axiosPrivate.get(`getDiagnosticsByDid/doctor/${storedData?.doctorId}`);
            setDiagnostics(diagnosticsResp?.data?.jsonString);
            console.log(diagnosticsResp)
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
  const handleVisitsClick = (linkId) => {
    navigate(`/doctorsTemplete/doctorsVisits/page/1`)

    setActiveLink(linkId); 
    setPageTab(linkId)
  };
  const handleDiagsClick = (linkId) => {
    navigate(`/doctorsTemplete/diagnostics/page/1`)

    setActiveLink(linkId); 
    setPageTab(linkId)
  };
  const handleCalendarClick = (linkId) => {
    navigate(`/doctorsTemplete/calendar`)

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
    navigate(`/doctorsTemplete/doctorsVisits/${patientId}`);
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
      // {
      //   Header: "Հետազոտություններ",
      //   accessor: "researchList",
      //   disableSortBy: true,
      //   width: 200,
      //   Cell: ({ row }) => (
      //     <>
      //       {row.original?.diagStatus === "Active" && (
      //         <div className="d-flex justify-content-center align-items-center">
      //           {/* <div className="pe-2">{row.original.statusBoard.length}</div> */}
      //           <MdViewKanban
      //             cursor={"pointer"}
      //             size={"1.5rem"}
      //             onClick={() => handleOpenStatusModal(row.original)}
      //           />
      //         </div>
      //       )}
      //     </>
      //   ),
      // },
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
                        <p style={{fontWeight:'700', fontStyle:'italic'}}>Անձնական տվյալներ</p>
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
                          <p style={{fontWeight:'700', fontStyle:'italic'}}>Մասնագիտական տվյալներ</p>
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
                        {/* <li className="nav-item">
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
                        </li> */}
                        <li className="nav-item">
                          <a 
                          data-bs-toggle="tab" href="#"
                          className={`nav-link ${activeLink === 'tab_doctorVisits' ? 'active' : ''}`}
                          onClick={() => handleVisitsClick('tab_doctorVisits')}
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
                          onClick={() => handleDiagsClick('tab_diagnostics')}
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
                          onClick={() => handleCalendarClick('tab_calendar')}
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
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="tab_summery"
                        >
                        </div>
                      </div>
                      <div className="activity-wrap">
                        {/* {
                          pageTab ==='tab_summery' &&

                        <div class="work">
                          <div class="experience">
                            <h3><i class="fa fa-briefcase" style={{color:'#5b979a'}}></i></h3>
                            <p style={{color:'red'}}>Տեստային ինֆորմացիա</p>
                            <ul>
                              <li><span>Բժիշկ հոգեբան -<br />ԲԳԹ</span><small>Էրեբունի բժշկական կենտրոն</small><small>Ապր. 2018 - Հիմա</small></li>
                              <li><span>Բժիշկ հոգեբան</span><small>Հանրապետական հիվանդանոց</small><small>Հուն. 2018 - Ապր. 2018</small></li>
                              <li><span>Պրակտիկանտ - Հոգեբան</span><small>Հանրապետական հիվանդանոց</small><small>Օգ. 2017 - Դեկ. 2017</small></li>
                            </ul>
                          </div>
                        </div>
                        } */}
                        {/* {
                          pageTab ==='tab_doctorVisits' &&
                          <CustomTable data={doctorsVisits} column={doctorsVisitColumns}/>

                        } */}
                        {/* {
                          pageTab ==='tab_diagnostics' &&
                          <CustomTable data={diagnostics} column={diagnosticsColumns}/>
                        } */}
                        {/* {
                          pageTab ==='tab_calendar' &&

                          <div className="App">
                          <div style={{ height: 500 }}>
                            <MyBigCalendar doctorId={userData?.doctorId}/>
                          </div>
                        </div>
                        } */}
                        <div className="hk-pg-wrapper pt-0">
            {/*<div className="container-xxl">*/}
            <Suspense fallback={<LoadingSpinner/>}>
              <Outlet />
            </Suspense>
          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default DoctorsTemplete;
