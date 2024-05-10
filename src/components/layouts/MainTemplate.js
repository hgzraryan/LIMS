/* eslint-disable jsx-a11y/anchor-is-valid */
import {  useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import React, { Suspense, useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoadingSpinner from "../LoadingSpinner";
import { checkUsersCount, selectUsersCount } from "../../redux/features/users/usersCountSlice";
import { checkPatientsCount, selectPatientsCount } from "../../redux/features/patients/patientsCountSlice";
import { checkAgentsCount } from "../../redux/features/agents/agentsCountSlice";
import { checkDoctorCount } from "../../redux/features/doctor/doctorCountSlice";
import { checkEquipmentCount } from "../../redux/features/equipment/equipmentCountSlice";
import { checkOrganisationCount } from "../../redux/features/organisation/organisationCountSlice";
import { checkReagentsCount } from "../../redux/features/reagents/reagentsCountSlice";
import { checkDiagnosticsCount } from "../../redux/features/diagnostics/diagnosticsCountSlice";
import { useDispatch, useSelector } from "react-redux";
import { checkResearchListCount } from "../../redux/features/researches/researchListCountSlice";
import { checkMedicalServicesCount } from "../../redux/features/medicalServices/medicalServicesSlice";
import { checkDoctorsVisitCount } from "../../redux/features/DoctorsVisit/DoctorsVisitSlice";
import sidePatientSvg from '../../dist/svg/sidePatients.svg'
import sideDoctorVisitSvg from '../../dist/svg/sideDoctorVisit.svg'
import sideAgentsSvg from '../../dist/svg/sideAgents.svg'
import sideOrganizationsSvg from '../../dist/svg/sideOrganizations.svg'
import controlPanelSvg from '../../dist/svg/controlPanel.svg'
import sideMedInstitutionsSvg from '../../dist/svg/sideMedInstitutions.svg'
import sideDoctorsSvg from '../../dist/svg/sideDoctors.svg'
import sideSamplesSvg from '../../dist/svg/sideSamples.svg'
import sideReportsSvg from '../../dist/svg/sideReports.svg'
import sideUsersSvg from '../../dist/svg/sideUsers.svg'
import sideSetupSvg from '../../dist/svg/sideSetup.svg'
import sideDiagnosticsSvg from '../../dist/svg/sideDiagnostics.svg'
import packageJson from '../../../package.json';
import { checkRefDoctorsCount } from "../../redux/features/refDoctors/refDoctorsCountSlice";
const MainTemplate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();
    const axiosPrivate = useAxiosPrivate();
    const [userData,setUserData]=useState('')
    //const {userId} = userData
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (storedData) {
        setUserData(storedData);
      }
    }, []);
    //-------------------
    const dispatch = useDispatch()
    const patientsCount = useSelector(selectPatientsCount)
    const usersCount = useSelector(selectUsersCount)

    //-------------------
    const handleUserPage = async(userId) =>{      
        navigate(`/users/${userId}`)
    }
    //-------------------
    const [isActive, setIsActive] = useState(false);
	const menuClick = event => {
		setIsActive(current => !current);
	};
	
	const [misActive, msetIsActive] = useState(false);
	const mmenuClick = event => {
		msetIsActive(current => !current);
	};
	
    //---------------------------------------------//
	const [misActive1, msetIsActive1] = useState(false);
	const [sisActive1, ssetIsActive1] = useState(false);

    const handleSubmenuClick = (menu,subMenu) => {
        ssetIsActive1(subMenu)
        msetIsActive1(menu)
    }
	const [doctorsDropDownMenu, setdoctorsDropDownMenu] = useState(true);
	const doctorsDropDownMenuClick = event => {
		setdoctorsDropDownMenu(current => !current);
	};
	const [reportsDropDownMenu, setReportsDropDownMenu] = useState(true);
	const reportsDropDownMenuClick = event => {
		setReportsDropDownMenu(current => !current);
	};
   //--------------------------------------
	useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
		const getAllCount = async () => {
            try {
                const response = await axiosPrivate.get('/allCount', {
                    signal: controller.signal
                });

              isMounted && dispatch(checkAgentsCount(response.data?.agentsCount));
              isMounted && dispatch(checkDiagnosticsCount(response.data?.diagnosticsCount));
				      isMounted && dispatch(checkDoctorCount(response.data?.doctorCount));
				      isMounted && dispatch(checkRefDoctorsCount(response.data?.refDoctorsCount));
				      isMounted && dispatch(checkEquipmentCount(response.data?.equipmentCount));
				      isMounted && dispatch(checkOrganisationCount(response.data?.organisationCount));
				      isMounted && dispatch(checkPatientsCount(response.data?.patientsCount));
				      isMounted && dispatch(checkReagentsCount(response.data?.reagentsCount));
				      isMounted && dispatch(checkUsersCount(response.data?.usersCount));
				      isMounted && dispatch(checkResearchListCount(response.data?.researchListCount));
				      isMounted && dispatch(checkMedicalServicesCount(response.data?.medicalServicesCount));
				      isMounted && dispatch(checkDoctorsVisitCount(response.data?.doctorsVisitCount));
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getAllCount();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    return (
      <section>
        {/* Wrapper */}
        <div
          className="hk-wrapper"
          data-layout="vertical"
          data-layout-style={misActive ? "collapsed" : "default"}
          data-hover={misActive ? "active" : ""}
          data-menu="light"
          data-footer="simple"
        >
          {/* Top Navbar */}

          {/* /Top Navbar */}
          <nav className="hk-navbar navbar navbar-expand-xl navbar-light fixed-top">
            <div className="container-fluid">
              {/* Start Nav */}
              <div className="nav-start-wrap">
                <button
                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover navbar-toggle d-xl-none"
                  onClick={mmenuClick}
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
                  {/*
                                <li className="nav-item">
                                    <a href="email.html" className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"><span className="icon"><span className=" position-relative"><span className="feather-icon"><i data-feather="inbox"></i></span><span className="badge badge-sm badge-soft-primary badge-sm badge-pill position-top-end-overflow-1">4</span></span></span></a>
                                </li>
                            
                                <li className="nav-item">
                                    <div className="dropdown dropdown-notifications">
                                        <a href="#" className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret" data-bs-toggle="dropdown" data-dropdown-animation role="button" aria-haspopup="true" aria-expanded="false"><span className="icon"><span className="position-relative"><span className="feather-icon"><i data-feather="bell"></i></span><span className="badge badge-success badge-indicator position-top-end-overflow-1"></span></span></span></a>
                                        <div className="dropdown-menu dropdown-menu-end p-0">
                                            <h6 className="dropdown-header px-4 fs-6">Notifications<a href="#" className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"><span className="icon"><span className="feather-icon"><i data-feather="settings"></i></span></span></a>
                                            </h6>
                                            <div data-simplebar className="dropdown-body  p-2">
                                                <a href="#" className="dropdown-item">
                                                    <div className="media">
                                                        <div className="media-head">
                                                            <div className="avatar avatar-rounded avatar-sm">
                                                                <img src="dist/img/avatar2.jpg" alt="user" className="avatar-img"/>
                                                            </div>
                                                        </div>
                                                        <div className="media-body">
                                                            <div>
                                                                <div className="notifications-text">Morgan Freeman accepted your invitation to join the team</div>
                                                                <div className="notifications-info">
                                                                    <span className="badge badge-soft-success">Collaboration</span>
                                                                    <div className="notifications-time">Today, 10:14 PM</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    <div className="media">
                                                        <div className="media-head">
                                                            <div className="avatar  avatar-icon avatar-sm avatar-success avatar-rounded">
                                                                <span className="initial-wrap">
                                                                    <span className="feather-icon"><i data-feather="inbox"></i></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="media-body">
                                                            <div>
                                                                <div className="notifications-text">New message received from Alan Rickman</div>
                                                                <div className="notifications-info">
                                                                    <div className="notifications-time">Today, 7:51 AM</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    <div className="media">
                                                        <div className="media-head">
                                                            <div className="avatar  avatar-icon avatar-sm avatar-pink avatar-rounded">
                                                                <span className="initial-wrap">
                                                                    <span className="feather-icon"><i data-feather="clock"></i></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="media-body">
                                                            <div>
                                                                <div className="notifications-text">You have a follow up with Jampack Head on Friday, Dec 19 at 9:30 am</div>
                                                                <div className="notifications-info">
                                                                    <div className="notifications-time">Yesterday, 9:25 PM</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    <div className="media">
                                                        <div className="media-head">
                                                            <div className="avatar avatar-sm avatar-rounded">
                                                                <img src="dist/img/avatar3.jpg" alt="user" className="avatar-img"/>
                                                            </div>
                                                        </div>
                                                        <div className="media-body">
                                                            <div>
                                                                <div className="notifications-text">Application of Sarah Williams is waiting for your approval</div>
                                                                <div className="notifications-info">
                                                                    <div className="notifications-time">Today 10:14 PM</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    <div className="media">
                                                        <div className="media-head">
                                                            <div className="avatar avatar-sm avatar-rounded">
                                                                <img src="dist/img/avatar10.jpg" alt="user" className="avatar-img"/>
                                                            </div>
                                                        </div>
                                                        <div className="media-body">
                                                            <div>	
                                                                <div className="notifications-text">Winston Churchil shared a document with you</div>
                                                                <div className="notifications-info">
                                                                    <span className="badge badge-soft-violet">File Manager</span>
                                                                    <div className="notifications-time">2 Oct, 2021</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="dropdown-item">
                                                    <div className="media">
                                                        <div className="media-head">
                                                            <div className="avatar  avatar-icon avatar-sm avatar-danger avatar-rounded">
                                                                <span className="initial-wrap">
                                                                    <span className="feather-icon"><i data-feather="calendar"></i></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="media-body">
                                                            <div>	
                                                                <div className="notifications-text">Last 2 days left for the project to be completed</div>
                                                                <div className="notifications-info">
                                                                    <span className="badge badge-soft-orange">Updates</span>
                                                                    <div className="notifications-time">14 Sep, 2021</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="dropdown-footer"><a href="#"><u>View all notifications</u></a></div>
                                        </div>
                                    </div>
                                </li>
                                */}
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
                      >
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
                                <span className="initial-wrap">{}</span>
                              </div>
                            </div>
                            <div className="media-body">
                              <div className="fs-7">{}</div>
                              <div style={{ color: "black" }}>
                                <p style={{ textDecoration:'underline', cursor:'pointer'}} onClick={()=>handleUserPage(userData?.userId)}>

                                {userData?.firstname + " "}
                                {userData?.lastname}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                                            {/* <div className="dropdown-divider"></div>
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
          {/* Vertical Nav */}
          <div className="hk-menu">
            {/* Brand */}
            <div className="menu-header">
              <span>
                <a className="navbar-brand" href="/dashboard">
                  <img
                    className="brand-img img-fluid"
                    src="/dist/img/icon.svg"
                    alt="brand"
                  />
                  <img
                    className="brand-img img-fluid"
                    src="/dist/img/text.svg"
                    alt="brand"
                  />
                </a>
                <button
                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover navbar-toggle"
                  onClick={mmenuClick}
                >
                  <span className="icon">
                    <span className="svg-icon fs-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-arrow-bar-to-left"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <line x1="10" y1="12" x2="20" y2="12"></line>
                        <line x1="10" y1="12" x2="14" y2="16"></line>
                        <line x1="10" y1="12" x2="14" y2="8"></line>
                        <line x1="4" y1="4" x2="4" y2="20"></line>
                      </svg>
                    </span>
                  </span>
                </button>
              </span>
            </div>
            {/* /Brand */}

            {/* Main Menu */}
            <div data-simplebar className="nicescroll-bar">
              <div className="menu-content-wrap">
                <div className="menu-group">
                  <ul className="navbar-nav flex-column">
                    <li className="nav-item">
                      <Link
                        className={
                          misActive1 === "/" || location.pathname === "/"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="./"
                        onClick={() => handleSubmenuClick("home", "")}
                      >
                        <span className="nav-icon-wrap">
                          <span className="svg-icon" style={{fontWeight:'bolder'}}>
                            <img width={'25px'} height={'25px'} src={controlPanelSvg} alt="controlPanelSvg" style={{fontWeight:'bolder'}}/>
                          </span>
                        </span>
                        <span className="nav-link-text">Կառ․ վահանակ</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-gap"></div>
                <div className="menu-group">
                  <div className="nav-header">
                    <span>Գործիքակազմ</span>
                  </div>
                  <ul className="navbar-nav flex-column">
                    <li className="nav-item">
                      <Link
                        className={
                          misActive1 === "patients" ||
                          location.pathname === "/patients"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="./patients"
                        onClick={() => handleSubmenuClick("patients", "")}
                      >
                        <span className="nav-icon-wrap position-relative">
                          <span className="svg-icon">
                            <span className="badge badge-sm badge-primary badge-sm badge-pill position-top-end-overflow">
                              {patientsCount}
                            </span>
                            <img width={'25px'} height={'25px'} src={sidePatientSvg} alt="sidePatientSvg"/>
                          </span>
                        </span>
                        <span className="nav-link-text">Այցելուներ</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={
                          misActive1 === "diagnostics" ||
                          location.pathname === "/diagnostics"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="./diagnostics"
                        onClick={() => handleSubmenuClick("diagnostics", "")}
                      >
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                          <img width={'25px'} height={'25px'} src={sideDiagnosticsSvg} alt="controlPanelSvg" style={{fontWeight:'bolder'}}/>
                          </span>
                        </span>
                        <span className="nav-link-text">Ախտորոշումներ</span>
                      </Link>
                      <Link
                        className={
                          misActive1 === "doctorsVisits" ||
                          location.pathname === "/doctorsVisits"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="./doctorsVisits"
                        onClick={() => handleSubmenuClick("doctorsVisits", "")}
                      >
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                          <img width={'25px'} height={'25px'} src={sideDoctorVisitSvg} alt="sideDoctorVisitSvg"/>
                         
                          </span>
                        </span>
                        <span className="nav-link-text">Բժշկի այցելություններ</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={
                          misActive1 === "agents" ||
                          location.pathname === "/agents"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="./agents"
                        onClick={() => handleSubmenuClick("agents", "")}
                      >
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                          <img width={'25px'} height={'25px'} src={sideAgentsSvg} alt="sideAgentsSvg"/>
                          </span>
                        </span>
                        <span className="nav-link-text">Գործընկերներ</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={
                          misActive1 === "organizations" ||
                          location.pathname === "/organizations"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="./organizations"
                        onClick={() => handleSubmenuClick("organizations", "")}
                      >
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                          <img width={'25px'} height={'25px'} src={sideOrganizationsSvg} alt="sideOrganizationsSvg"/>
                          </span>
                        </span>
                        <span className="nav-link-text">Պատվիրատուներ</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                              <Link
                                className={
                                  sisActive1 === "medInstitutions" ||
                                  location.pathname ===
                                    "/medInstitutions"
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                                to="/medInstitutions"
                                onClick={() =>
                                  handleSubmenuClick(
                                    "settings",
                                    "medInstitutions"
                                  )
                                }
                              >
                                 <span className="nav-icon-wrap">
                          <span className="svg-icon">
                          <img width={'25px'} height={'25px'} src={sideMedInstitutionsSvg} alt="sideMedInstitutionsSvg"/>
                          </span>
                        </span>
                                <span className="nav-link-text">Բուժհաստատություններ</span>
                              </Link>
                            </li>
                    <li className="nav-item">
                      <a
                        className={
                          misActive1 === "doctors"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        href="#"
                        data-bs-toggle="collapse"
                        onClick={doctorsDropDownMenuClick}
                        data-bs-target="#dash_integ"
                      >
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                          <img width={'25px'} height={'25px'} src={sideDoctorsSvg} alt="sideDoctorsSvg"/>
                          </span>
                        </span>
                        <span className="nav-link-text">Բժիշկներ</span>
                      </a>
                      <ul
                        id="dash_integ"
                        className={
                          doctorsDropDownMenu
                            ? "nav flex-column collapse  nav-children"
                            : "nav flex-column collapse  nav-children show"
                        }
                      >
                        <li className="nav-item">
                          <ul className="nav flex-column">
                         
                            <li className="nav-item">
                              <Link
                                className={
                                  sisActive1 === "list" ||
                                  location.pathname ===
                                    "/doctors/list"
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                                to="./doctors/list"
                                onClick={() =>
                                  handleSubmenuClick(
                                    "doctors",
                                    "list"
                                  )
                                }
                              >
                                <span className="nav-link-text">
                                  Բժիշկների ցանկ
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className={
                                  sisActive1 === "refDoctors" ||
                                  location.pathname === "/doctors/refDoctors"
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                                to="./doctors/refDoctors"
                                onClick={() =>
                                  handleSubmenuClick("doctors", "refDoctors")
                                }
                              >
                                <span className="nav-link-text">
                                  Ուղղորդող բժիշկներ
                                </span>
                              </Link>
                            </li>
                            {/* <li className="nav-item">
                              <Link
                                className={
                                  sisActive1 === "Զբաղվածություն" ||
                                  location.pathname === "/doctors/employment"
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                                to="./doctors/employment"
                                onClick={() =>
                                  handleSubmenuClick("doctors", "employment")
                                }
                              >
                                <span className="nav-link-text">
                                Զբաղվածություն
                                </span>
                              </Link>
                            </li> */}
                            
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={
                          misActive1 === "samples" ||
                          location.pathname === "/samples"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="./samples"
                        onClick={() => handleSubmenuClick("samples", "")}
                      >
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                          <img width={'25px'} height={'25px'} src={sideSamplesSvg} alt="sideSamplesSvg"/>                           
                          </span>
                        </span>
                        <span className="nav-link-text">Նմուշառումներ</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          misActive1 === "reports"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        href="#"
                        data-bs-toggle="collapse"
                        onClick={reportsDropDownMenuClick}
                        data-bs-target="#dash_integ"
                      >
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                          <img width={'25px'} height={'25px'} src={sideReportsSvg} alt="sideReportsSvg"/>              
                          </span>
                        </span>
                        <span className="nav-link-text">Հաշվետվություններ</span>
                      </a>
                      <ul
                       className={
                        reportsDropDownMenu
                          ? "nav flex-column collapse  nav-children"
                          : "nav flex-column collapse  nav-children show"
                      }
                      >
                        <li className="nav-item">
                          <ul className="nav flex-column">
                            <li className="nav-item">
                              <Link
                                className={
                                  sisActive1 === "export" || 
                                  location.pathname === "/reports/export"
                                    ? "nav-link active"
                                    : "nav-link"
                                }
                                to="/reports/export"
                              >
                                <span
                                  className="nav-link-text"
                                  onClick={() =>
                                    handleSubmenuClick("reports", "export")
                                  }
                                >
                                  Արտահանում
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={
                          misActive1 === "users" ||
                          location.pathname === "/users"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/users"
                        onClick={() => handleSubmenuClick("users", "")}
                      >
                        <span className="nav-icon-wrap position-relative">
                          <span className="svg-icon">
                            <span className="badge badge-sm badge-primary badge-sm badge-pill position-top-end-overflow">
                              {usersCount}
                            </span>
                            <img width={'25px'} height={'25px'} src={sideUsersSvg} alt="sideUserssSvg"/>     
                          </span>
                        </span>
                        <span className="nav-link-text">Աշխատակիցներ</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={
                          misActive1 === "setup"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        to="/setup"
                        onClick={() => handleSubmenuClick("setup", "")}
                      >
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                          <img width={'25px'} height={'25px'} src={sideSetupSvg} alt="sideSetupSvg"/>
                          </span>
                        </span>
                        <span className="nav-link-text">Կարգաբերումներ</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Main Menu */}
            <div className="menu-footer"><p style={{fontSize:'12px',marginLeft:'5px'}}>V{packageJson?packageJson?.version:''} Rev{packageJson?packageJson?.revision:''}</p></div>
          </div>
          <div id="hk_menu_backdrop" className="hk-menu-backdrop"></div>
          {/* /Vertical Nav */}

          {/* Chat Popup */}
          <div className="hk-chatbot-popup">
            <header>
              <div className="chatbot-head-top">
                <a
                  className="btn btn-sm btn-icon btn-dark btn-rounded"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-horizontal"></i>
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    <i className="dropdown-icon zmdi zmdi-notifications-active"></i>
                    <span>Send push notifications</span>
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="dropdown-icon zmdi zmdi-volume-off"></i>
                    <span>Mute Chat</span>
                  </a>
                </div>
                <span className="text-white">Chat with Us</span>
                <a
                  id="minimize_chatbot"
                  href="#"
                  className="btn btn-sm btn-icon btn-dark btn-rounded"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="minus"></i>
                    </span>
                  </span>
                </a>
              </div>
              <div className="separator-full separator-light mt-0 opacity-10"></div>
              <div className="media-wrap">
                <div className="media">
                  <div className="media-head">
                    <div className="avatar avatar-sm avatar-soft-primary avatar-icon avatar-rounded position-relative">
                      <span className="initial-wrap">
                        <i className="ri-customer-service-2-line"></i>
                      </span>
                      <span className="badge badge-success badge-indicator badge-indicator-lg badge-indicator-nobdr position-bottom-end-overflow-1"></span>
                    </div>
                  </div>
                  <div className="media-body">
                    <div className="user-name">Chat Robot</div>
                    <div className="user-status">Online</div>
                  </div>
                </div>
              </div>
            </header>
            <div className="chatbot-popup-body">
              <div data-simplebar className="nicescroll-bar">
                <div>
                  <div className="init-content-wrap">
                    <div className="card card-shadow">
                      <div className="card-body">
                        <p className="card-text">
                          Hey I am chat robot 😈
                          <br />
                          Do yo have any question regarding our tools?
                          <br />
                          <br />
                          Select the topic or start chatting.
                        </p>
                        <button className="btn btn-block btn-primary text-nonecase start-conversation">
                          Start a conversation
                        </button>
                      </div>
                    </div>
                    <div className="btn-wrap">
                      <button className="btn btn-soft-primary text-nonecase btn-rounded start-conversation">
                        <span>
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="eye"></i>
                            </span>
                          </span>
                          <span className="btn-text">Just browsing</span>
                        </span>
                      </button>
                      <button className="btn btn-soft-danger text-nonecase btn-rounded start-conversation">
                        <span>
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="credit-card"></i>
                            </span>
                          </span>
                          <span className="btn-text">
                            I have a question regarding pricing
                          </span>
                        </span>
                      </button>
                      <button className="btn btn-soft-warning text-nonecase btn-rounded start-conversation">
                        <span>
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="cpu"></i>
                            </span>
                          </span>
                          <span className="btn-text">
                            Need help for technical query
                          </span>
                        </span>
                      </button>
                      <button className="btn btn-soft-success text-nonecase btn-rounded start-conversation">
                        <span>
                          <span className="icon">
                            <span className="feather-icon">
                              <i data-feather="zap"></i>
                            </span>
                          </span>
                          <span className="btn-text">
                            I have a pre purchase question
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                  <ul className="list-unstyled d-none">
                    <li className="media sent">
                      <div className="media-body">
                        <div className="msg-box">
                          <div>
                            <p>I have a plan regarding pricing</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="media received">
                      <div className="avatar avatar-xs avatar-soft-primary avatar-icon avatar-rounded">
                        <span className="initial-wrap">
                          <i className="ri-customer-service-2-line"></i>
                        </span>
                      </div>
                      <div className="media-body">
                        <div className="msg-box">
                          <div>
                            <p>
                              Welcome back!
                              <br />
                              Are you looking to upgrade your existing plan?
                            </p>
                          </div>
                        </div>
                        <div className="msg-box typing-wrap">
                          <div>
                            <div className="typing">
                              <div className="dot"></div>
                              <div className="dot"></div>
                              <div className="dot"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <footer>
              <div className="chatbot-intro-text fs-7">
                <div className="separator-full separator-light"></div>
                <p className="mb-2">
                  This is jampack's beta version please sign up now to get early
                  access to our full version
                </p>
                <a className="d-block mb-2" href="#">
                  <u>Give Feedback</u>
                </a>
              </div>
              <div className="input-group d-none">
                <div className="input-group-text overflow-show border-0">
                  <button
                    className="btn btn-icon btn-flush-dark flush-soft-hover btn-rounded dropdown-toggle no-caret"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="share"></i>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-icon avatar-xs avatar-soft-primary avatar-rounded me-3">
                          <span className="initial-wrap">
                            <i className="ri-image-line"></i>
                          </span>
                        </div>
                        <div>
                          <span className="h6 mb-0">
                            Photo or Video Library
                          </span>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-icon avatar-xs avatar-soft-info avatar-rounded me-3">
                          <span className="initial-wrap">
                            <i className="ri-file-4-line"></i>
                          </span>
                        </div>
                        <div>
                          <span className="h6 mb-0">Documents</span>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-icon avatar-xs avatar-soft-success avatar-rounded me-3">
                          <span className="initial-wrap">
                            <i className="ri-map-pin-line"></i>
                          </span>
                        </div>
                        <div>
                          <span className="h6 mb-0">Location</span>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="/contact">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-icon avatar-xs avatar-soft-blue avatar-rounded me-3">
                          <span className="initial-wrap">
                            <i className="ri-contacts-line"></i>
                          </span>
                        </div>
                        <div>
                          <span className="h6 mb-0">Contact</span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <input
                  type="text"
                  id="input_msg_chat_popup"
                  name="send-msg"
                  className="input-msg-send form-control border-0 shadow-none"
                  placeholder="Type something..."
                />
                <div className="input-group-text overflow-show border-0">
                  <button className="btn btn-icon btn-flush-dark flush-soft-hover btn-rounded">
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="smile"></i>
                      </span>
                    </span>
                  </button>
                </div>
              </div>
              <div className="footer-copy-text">
                Powered by
                <a className="brand-link" href="#">
                  <img src="/dist/img/logo-light.png" alt="logo-brand" />
                </a>
              </div>
            </footer>
          </div>
          {/*
                <a href="#" className="btn btn-icon btn-floating btn-primary btn-lg btn-rounded btn-popup-open">
                    <span className="icon">
                        <span className="feather-icon"><i data-feather="message-circle"></i></span>
                    </span>
                </a>
                */}
          <div className="chat-popover shadow-xl">
            <p>
              Try Jampack Chat for free and connect with your customers now!
            </p>
          </div>
          {/* /Chat Popup */}

          {/* Main Content */}
          <div className="hk-pg-wrapper ">
            {/*<div className="container-xxl">*/}
            <Suspense fallback={<LoadingSpinner />}>
              <Outlet />
            </Suspense>
          </div>
          {/* Page Footer */}
          <div className="hk-footer">
            <footer className="container-xxl footer">
              <div className="row">
                <div className="col-xl-8 text-center">
                  <p className="footer-text pb-0">
                    <span className="copy-text">
                      Vteam LIMS © {new Date().getFullYear()}
                    </span>
                    <span className="footer-link-sep">|</span>
                    <a href="/privacy-policy" className="" target="_blank">
                      Գաղտնիության քաղաքականություն
                    </a>
                    {/*
                                        <span className="footer-link-sep">|</span><a href="#" className="" target="_blank">T&C</a>
                                        <span className="footer-link-sep">|</span><a href="#" className="" target="_blank">System Status</a>
                                        */}
                  </p>
                </div>
              </div>
            </footer>
          </div>
          {/* Page Footer */}
          {/*</div>*/}
          {/* /Main Content */}
        </div>
        {/* /Wrapper */}
      </section>
    );
}

export default MainTemplate