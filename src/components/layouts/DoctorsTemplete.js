/* eslint-disable jsx-a11y/anchor-is-valid */
import {  useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import React, { Suspense, useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoadingSpinner from "../LoadingSpinner";
import { useGetFullData } from "../../hooks/useGetFullData";
import { useSelector } from "react-redux";
import { selectUserLoginData } from "../../redux/features/users/userLoginDataSlice";



const DoctorsTemplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();
  const userLoginData = useSelector(selectUserLoginData)

  //-------------------

  const [doctorsState] = useGetFullData()
   //const [refDoctorsState] = useGetFullData(REFDOCTORS_URL,checkRefDoctors)
  //-------------------
  const handleUserPage = async(userId) =>{
    try {
     // const response = await axiosPrivate.get(`/patients/${userId}`, );
      //console.log(response.data); 
      //navigate(`/users/${userId}`)
      navigate(`/users/2095`)
      
    } catch (err) {
      console.log(err)
      // if (!err?.response) {
      //   setErrMsg("No Server Response");
      // } else if (err.response?.status === 409) {
      //   setErrMsg("Username Taken");
      // } else {
      //   setErrMsg(" Failed");
      // }
    }
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

const [dropDownMenu2, dropDownMenu2IsActive] = useState(false);
const dropDownMenu2Click = event => {
  dropDownMenu2IsActive(current => !current);
};
 //--------------------------------------

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
                            <p style={{ color: "black" }}>
                              <p style={{ textDecoration:'underline', cursor:'pointer'}} onClick={()=>handleUserPage(2095)}>

                              {userLoginData?.firstname + " "}
                              {userLoginData?.lastname}
                              </p>
                            </p>
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
                        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="46.3" cy="36.3" r="16"/>
                          <path d="M66.6,51.1A11.39,11.39,0,0,0,55.2,62.5c0,7.7,8.1,15,10.6,16.9a1.09,1.09,0,0,0,1.5,0c2.5-2,10.6-9.2,10.6-16.9A11.25,11.25,0,0,0,66.6,51.1Zm0,16a4.7,4.7,0,1,1,4.7-4.7A4.76,4.76,0,0,1,66.6,67.1Z"/>
                        <path d="M50.4,79.7h1.4c5.2-.5,2.4-3.7,2.4-3.7h0c-3.2-4.6-5-9.1-5-13.5a13.74,13.74,0,0,1,.6-4.2c.2-2-.6-2.5-1-2.7h-.2a18.48,18.48,0,0,0-2.4-.1,24.26,24.26,0,0,0-24,20.9c0,1.2.4,3.5,4.2,3.5H50.2C50.2,79.7,50.3,79.7,50.4,79.7Z"/></svg>
                        </span>
                      </span>
                      <span className="nav-link-text">Բժշկի այցելություններ</span>
                    </Link>
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
                                <path d="M398.4,468.9H113.6c-15.4,0-29.7-7.6-38.3-20.4s-10.3-28.9-4.5-43.2l100.8-248.7c3.7-9.2,5.6-19,5.6-29V97.8h-11.1    c-15.1,0-27.3-12.3-27.3-27.3c0-15.1,12.3-27.3,27.3-27.3h179.8c15.1,0,27.3,12.3,27.3,27.3c0,15.1-12.3,27.3-27.3,27.3h-11.1    v29.8c0,10,1.9,19.7,5.6,29l100.8,248.8c5.8,14.3,4.1,30.4-4.5,43.2C428.2,461.3,413.8,468.9,398.4,468.9z M166.1,58.1    c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h18.6c4.1,0,7.5,3.4,7.5,7.5v37.4c0,11.9-2.3,23.6-6.7,34.6L84.6,411    c-4,9.8-2.9,20.4,3,29.2s15.3,13.8,25.9,13.8h284.9c10.6,0,20-5,25.9-13.8s7-19.4,3-29.2L326.5,162.2c-4.5-11-6.7-22.7-6.7-34.6    V90.3c0-4.1,3.4-7.5,7.5-7.5h18.6c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3L166.1,58.1L166.1,58.1z" />
                              </g>
                              <g>
                                <path d="M377.1,281.6h-49.4c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5h49.4c4.1,0,7.5,3.4,7.5,7.5S381.2,281.6,377.1,281.6z" />
                              </g>
                              <g>
                                <path d="M287,281.6H132c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5h155c4.1,0,7.5,3.4,7.5,7.5S291.1,281.6,287,281.6z" />
                              </g>
                            </g>
                          </svg>
                        </span>
                      </span>
                      <span className="nav-link-text">Նմուշառումներ</span>
                    </Link>   
                  </li>
                  <li className="nav-item">
                    <a
                      className={
                        misActive1 === "settings"
                          ? "nav-link active"
                          : "nav-link"
                      }
                      href="#"
                      data-bs-toggle="collapse"
                      onClick={dropDownMenu2Click}
                      data-bs-target="#dash_integ"
                    >
                      <span className="nav-icon-wrap">
                        <span className="svg-icon">
                          <svg
                            fill="#000000"
                            height="800px"
                            width="800px"
                            id="Capa_1"
                            viewBox="0 0 482.568 482.568"
                          >
                            <g>
                              <g>
                                <path
                                  d="M116.993,203.218c13.4-1.8,26.8,2.8,36.3,12.3l24,24l22.7-22.6l-32.8-32.7c-5.1-5.1-5.1-13.4,0-18.5s13.4-5.1,18.5,0
                              l32.8,32.8l22.7-22.6l-24.1-24.1c-9.5-9.5-14.1-23-12.3-36.3c4-30.4-5.7-62.2-29-85.6c-23.8-23.8-56.4-33.4-87.3-28.8
                              c-4.9,0.7-6.9,6.8-3.4,10.3l30.9,30.9c14.7,14.7,14.7,38.5,0,53.1l-19,19c-14.7,14.7-38.5,14.7-53.1,0l-31-30.9
                              c-3.5-3.5-9.5-1.5-10.3,3.4c-4.6,30.9,5,63.5,28.8,87.3C54.793,197.518,86.593,207.218,116.993,203.218z"
                                />
                                <path
                                  d="M309.193,243.918l-22.7,22.6l134.8,134.8c5.1,5.1,5.1,13.4,0,18.5s-13.4,5.1-18.5,0l-134.8-134.8l-22.7,22.6l138.9,138.9
                              c17.6,17.6,46.1,17.5,63.7-0.1s17.6-46.1,0.1-63.7L309.193,243.918z"
                                />
                                <path
                                  d="M361.293,153.918h59.9l59.9-119.7l-29.9-29.9l-119.8,59.8v59.9l-162.8,162.3l-29.3-29.2l-118,118
                              c-24.6,24.6-24.6,64.4,0,89s64.4,24.6,89,0l118-118l-29.9-29.9L361.293,153.918z"
                                />
                              </g>
                            </g>
                          </svg>
                        </span>
                      </span>
                      <span className="nav-link-text">Կարգաբերումներ</span>
                    </a>
                    <ul
                      id="dash_integ"
                      className={
                        dropDownMenu2
                          ? "nav flex-column collapse  nav-children"
                          : "nav flex-column collapse  nav-children show"
                      }
                    >
                      <li className="nav-item">
                        <ul className="nav flex-column">
                          {/* <li className="nav-item">
                            <Link
                              className={
                                sisActive1 === "prices" ||
                                location.pathname === "/settings/prices"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              to="./settings/prices"
                              onClick={() =>
                                handleSubmenuClick("settings", "prices")
                              }
                            >
                              <span className="nav-link-text">
                                Գնացուցակներ
                              </span>
                            </Link>
                          </li> */}
                          
                          <li className="nav-item">
                            <Link
                              className={
                                sisActive1 === "researchlists" ||
                                location.pathname ===
                                  "/settings/researchlists"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              to="./settings/researchlists"
                              onClick={() =>
                                handleSubmenuClick(
                                  "settings",
                                  "researchlists"
                                )
                              }
                            >
                              <span className="nav-link-text">
                                Հետ․ տեսակներ
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            
            </div>
          </div>
          {/* /Main Menu */}
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
        <div className="hk-pg-wrapper">
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

export default DoctorsTemplete