import { useNavigate, useLocation,Outlet } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import React, {  useEffect, useRef, useState,Suspense } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MissingImg from "../../dist/img/Missing.svg";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { ColumnFilter } from "../ColumnFilter";
import './work.css'
import { BiSolidInfoCircle } from "react-icons/bi";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {  momentLocalizer } from 'react-big-calendar';
import ProgressBar from "../ProgressBar";
import DoctorVisitsInfoModal from "../infoModals/DoctorVisitsInfoModal";
import sideDoctorVisitSvg from '../../dist/svg/sideDoctorVisit.svg'
import sideDiagnosticsSvg from '../../dist/svg/sideDiagnostics.svg'
import organizationsSvg from "../../dist/svg/organizationsSvg.svg";
import patientSvg from "../../dist/svg/patientSvg.svg";
import LoadingSpinner from "../LoadingSpinner";

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
  const [userData,setUserData]=useState('')
  const [modalInfo, setModalInfo] = useState("");
  const [doctorDetails, setDoctorDetails] = useState([]);

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

  return (
    <>
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
                             // onClick={() => handleUserPage(userData?.userId)}
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
                    </div>
                    <div className="contact-more-info">
                      <ul className="nav nav-tabs nav-line nav-icon nav-light">
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
