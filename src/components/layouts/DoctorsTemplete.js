/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate, Link, Outlet, useLocation, NavLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import React, { Suspense, useState, useEffect, useRef, useMemo } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LoadingSpinner from "../LoadingSpinner";
import { useSelector } from "react-redux";
import { selectUserLoginData } from "../../redux/features/users/userLoginDataSlice";
import profileBackImg from "../../dist/img/profile-bg.jpg";
import doctorSampleImg from "../../dist/img/doctorSamplePhoto.jpg";
import emptyImg from "../../dist/img/avatar2.jpg";
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
import { Calendar, momentLocalizer } from 'react-big-calendar';
import MyBigCalendar from "../MyBigCalendar";
import GanttChart from "../GanttChart";
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
  const userLoginData = useSelector(selectUserLoginData);

  const intupAvatarRef = useRef(null);
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(doctorSampleImg);
  const formData = new FormData();
  const fileReader = new FileReader();
  const [activeLink, setActiveLink] = useState('tab_summery'); // Default active link
  const [pageTab,setPageTab] =useState('tab_summery')
  const [patients,setPatients] =useState([])
  const localizer = momentLocalizer(moment);
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
      navigate(`/users/2095`);
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

  const [misActive, msetIsActive] = useState(false);
  const mmenuClick = (event) => {
    msetIsActive((current) => !current);
  };

  //---------------------------------------------//
  const [misActive1, msetIsActive1] = useState(false);
  const [sisActive1, ssetIsActive1] = useState(false);

  const handleSubmenuClick = (menu, subMenu) => {
    ssetIsActive1(subMenu);
    msetIsActive1(menu);
  };

  const [dropDownMenu2, dropDownMenu2IsActive] = useState(false);
  const dropDownMenu2Click = (event) => {
    dropDownMenu2IsActive((current) => !current);
  };
  //--------------------------------------

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
  //---------------patients table
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 20,
      maxWidth: 400,
    }),
    []
  );  
  const columns = useMemo(
    () => [
      {
        Header: (event,) => (
          <>
            
              <div className="columnHeader">ID</div>
            
          </>
        ),
        accessor: "patientId",
        sortable: true,
        width: 60,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setPatients}
            placeholder={'ID'}
          />
        ),
      },
      {
        Header: (event,) => (
          <>
            
              <div className="columnHeader">Անուն</div>
            
          </>
        ),
        accessor: "firstName",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setPatients}
            placeholder={'Անուն'}
          />
        ),
        Cell: ({ row }) => (
          <div
             onClick={()=>handlePatientsDetails(row.original.patientId)}
            style={{ cursor: 'pointer', textDecoration:'underline' }}
          >
            {row.original.firstName}
          </div>
        ),

      },
      {
        Header: (event) => (
          <div style={{overflow:'hidden'}}>
            
              <span className="columnHeader">Ազգանուն</span>
          </div>
        ),
        accessor: "lastName",
        width: 300,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setPatients}
            placeholder={'Ազգանուն'}
          />
        ),        
      },
      {
        Header: (event) => (
          <>
           
            <div className="columnHeader">Հայրանուն</div>
          </>
        ),
        accessor: "midName",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setPatients}
            placeholder={'Հայրանուն'}
          />
        ),
      },
      {
        Header: (event) => (
          <>
           
            <div className="columnHeader">Էլ․ հասցե</div>
          </>
        ),
        accessor: "email",
        sortable: true,
        width: 200,
        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setPatients}
            placeholder={'Էլ․ հասցե'}
          />
        ),
        // Cell: ({ row }) => <div>{row.original?.contact?.email}</div>,

      },
      {
        Header: (event) => (
          <>
            
            <div className="columnHeader">Տարիք</div>
            
          </>
        ),
        accessor: "age",
        sortable: true,
        width: 200,

        Filter: ({ column: { id } })=>(
          <ColumnFilter
            id={id}
            setData={setPatients}
            placeholder={'Տարիք'}
          />
        ),
      },
      // {
      //   Header: (event) => (
      //     <>
      //       <div className="columnHeader">Ախտորոշումներ</div>
      //     </>
      //   ),
      //   Cell: ({ row }) => (
      //     <div className="d-flex">
      //       <div className="pe-2">{row.original.researchList.length}</div>
      //       <BiSolidInfoCircle
      //         cursor={"pointer"}
      //         size={"1.5rem"}
      //         onClick={() => handleOpenModal(row.original)}
      //       />
      //     </div>
      //   ),
      //   accessor: "researchList",
      //   width: 200,
      //   Filter: ({ column: { id } }) => <></>,
      // },
      // {
      //   Header: (event) => (
      //     <>
      //       <div className="columnHeader">Արժեք (դրամ)</div>
      //     </>
      //   ),
      //   Cell: ({ row }) => <div>{row.original.totalPrice}</div>,
      //   accessor: "totalPrice",
      //   width: 200,
      //   Filter: ({ column: { id } }) => <></>,

      // },
      {
        Header: (event) => (
          <>
            <div className="columnHeader">Կարգաբերումներ</div>
          </>
        ),
        
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <BiSolidInfoCircle
              cursor={"pointer"}
              size={"1.5rem"}
              // onClick={() => handleOpenInfoModal(row.original)}
            />
            </div>            
            <div className="dropdown">
              <button
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="more-vertical" />
                  </span>
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <a className="dropdown-item" href="edit-contact.html">
                  <span className="feather-icon dropdown-icon">
                    <FeatherIcon icon="list" />
                    <FeatherIcon icon="edit" />
                  </span>
                  <span>Edit Contact</span>
                </a>
                <a className="dropdown-item" href="#">
                  <span className="feather-icon dropdown-icon">
                    <FeatherIcon icon="list" />
                    <i data-feather="trash-2"></i>
                  </span>
                  <span>Delete</span>
                </a>
                <a className="dropdown-item" href="#">
                  <span className="feather-icon dropdown-icon">
                    <FeatherIcon icon="list" />
                    <i data-feather="copy"></i>
                  </span>
                  <span>Duplicate</span>
                </a>
                <div className="dropdown-divider"></div>
                <h6 className="dropdown-header dropdown-header-bold">
                  Change Labels
                </h6>
                <a className="dropdown-item" href="#">
                  Design
                </a>
                <a className="dropdown-item" href="#">
                  Developer
                </a>
                <a className="dropdown-item" href="#">
                  Inventory
                </a>
                <a className="dropdown-item" href="#">
                  Human Resource
                </a>
              </div>
            </div>
          </div>
        ),
        accessor: "options",
        width: 200,
        disableSortBy: true,
        Filter: ({ column: { id } }) => <></>,

      },
    ],
    [navigate, setPatients]
    );
    
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      state,
    setGlobalFilter,
    prepareRow,
    selectedFlatRows,
    toggleHideColumn,
  } = useTable(
    {
      columns,
      data: customData,
      //data: patients,
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
    <div className="hk-wrapper" data-layout="vertical">
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
                  ><span>Սերինե Խաչիկի Մուրադյան  </span>
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
                              onClick={() => handleUserPage(2095)}
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
                          Սերինե Խաչիկի Մուրադյան
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
                              <span>Անուն</span>
                              <span>Սերինե</span>
                            </li>
                            <li>
                              <span>Ազգանուն</span>
                              <span>Մուրադյան</span>
                            </li>
                            <li>
                              <span>Էլ․ հասցե</span>
                              <span>morgan@flights.com</span>
                            </li>
                            <li>
                              <span>Հեռախոս</span>
                              <span>+374 85 96-25-62</span>
                            </li>
                            <li>
                              <span>Բնակավայր</span>
                              <span>Երևան</span>
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
                              <span>Հոգեբան</span>
                            </li>
                            <li>
                              <span>Կազմակերպություն</span>
                              <span>Էվա լաբ</span>
                            </li>
                            <li>
                              <span>Ծննդյան ամսաթիվ</span>
                              <span>28.04.1982</span>
                            </li>
                            <li>
                              <span>Երկիր</span>
                              <span>Հայաստան</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="separator-full"></div>
                      <div className="card">
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
                      <div className="separator-full"></div>
                      <div className="card">
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
                      <div className="separator-full"></div>
                      <div className="card">
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
                      </div>
                      <div className="separator-full"></div>
                      {/* <div className="card">
                        <div className="card-header">
                          <a href="#">Settings</a>
                        </div>
                        <div className="card-body">
                          <ul className="cp-action">
                            <li>
                              <a href="javascript:void(0);">
                                <span className="cp-icon-wrap">
                                  <span className="feather-icon">
                                    <i data-feather="upload"></i>
                                  </span>
                                </span>
                                Share Contact
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0);">
                                <span className="cp-icon-wrap">
                                  <span className="feather-icon">
                                    <i data-feather="heart"></i>
                                  </span>
                                </span>
                                Add to Favourites
                              </a>
                            </li>
                            <li>
                              <a
                                href="javascript:void(0);"
                                className="link-danger"
                              >
                                <span className="cp-icon-wrap">
                                  <span className="feather-icon">
                                    <i data-feather="trash"></i>
                                  </span>
                                </span>
                                Delete Contact
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div> */}
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
                          className={`nav-link ${activeLink === 'tab_patients' ? 'active' : ''}`}
                          onClick={() => handleLinkClick('tab_patients')}
                          >
                            <span className="nav-icon-wrap">
                              <span className="feather-icon">
                                <FeatherIcon icon='user' />
                              </span>
                            </span>
                            <span className="nav-link-text">Հաճախորդներ</span>
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
                        <li className="nav-item">
                          <a 
                          className={`nav-link ${activeLink === 'tab_timeLine' ? 'active' : ''}`}
                          onClick={() => handleLinkClick('tab_timeLine')} 
                          data-bs-toggle="tab" href="#">
                            <span className="nav-icon-wrap">
                              <span className="feather-icon">
                                <FeatherIcon icon='bar-chart-2' />
                              </span>
                            </span>
                            <span className="nav-link-text">Ժամանակացույց</span>
                          </a>
                        </li>
                        {/* <li className="nav-item">
                          <a className="nav-link" data-bs-toggle="tab" href="#">
                            <span className="nav-icon-wrap">
                              <span className="feather-icon">
                                <i data-feather="phone"></i>
                              </span>
                            </span>
                            <span className="nav-link-text">Calls</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-bs-toggle="tab" href="#">
                            <span className="nav-icon-wrap">
                              <span className="feather-icon">
                                <i data-feather="check-square"></i>
                              </span>
                            </span>
                            <span className="nav-link-text">Tasks</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-bs-toggle="tab" href="#">
                            <span className="nav-icon-wrap">
                              <span className="feather-icon">
                                <i data-feather="clock"></i>
                              </span>
                            </span>
                            <span className="nav-link-text">Schedule</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-bs-toggle="tab" href="#">
                            <span className="nav-icon-wrap">
                              <span className="feather-icon">
                                <i data-feather="shield"></i>
                              </span>
                            </span>
                            <span className="nav-link-text">Sales</span>
                          </a>
                        </li> */}
                      </ul>
                      <div className="tab-content mt-7">
                        <div
                          className="tab-pane fade show active"
                          id="tab_summery"
                        >
                          {/* <form>
                            <div className="row">
                              <div className="col-md-12 form-group">
                                <div className="form-label-group">
                                  <label>Write a Note</label>
                                  <small className="text-muted">1200</small>
                                </div>
                                <textarea
                                  className="form-control"
                                  rows="8"
                                  placeholder="Write an internal note"
                                ></textarea>
                              </div>
                            </div>
                            <button className="btn btn-outline-light mt-2">
                              Add Note
                            </button>
                          </form> */}
                        </div>
                      </div>
                      {/* <div className="pipeline-status-wrap mt-7">
                        <div className="title-lg mb-3">
                          Lead Pipeline Status
                        </div>
                        <ul className="pipeline-stutus">
                          <li className="completed">
                            <span>In Pipeline</span>
                          </li>
                          <li className="active">
                            <span>Follow Up</span>
                          </li>
                          <li>
                            <span>Scheduled Service</span>
                          </li>
                          <li>
                            <span>Conversation</span>
                          </li>
                          <li>
                            <span>Win/Lost</span>
                          </li>
                        </ul>
                        <div className="clearfix"></div>
                      </div> */}
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
                          pageTab ==='tab_patients' &&

                          <table
                          className="table nowrap w-100 mb-5 dataTable no-footer"
                          {...getTableProps()}
                          >
                          <thead>
                            {headerGroups.map((headerGroup) => (
                              <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                  <th  {...column.getHeaderProps(column.getSortByToggleProps())}>
                                      <div>
                                        {column.id !== "selection" && (
                                          <>
                                          <div>
                                            {column.canFilter ? column.render("Filter") : null}
                                          </div>
                                        
                                        <div  style={{
                                          marginTop: "2px",
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}>
                                          <div>{column.render("Header")}</div>
                                          
                                            <div style={{paddingTop:'20px'}} >
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
                                      className={`resizer ${
                                        column.isResizing ? "isResizing" : ""
                                      }`}
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
                                  <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                      return (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                      })}
                                  </tr>
                                );
                              })}
                              {/* <PatientInfo
                                selectedItem={selectedItem}
                                handleCloseModal={handleCloseModal}
                                researchState={researchState}
                                /> */}
                            </tbody>
                          )}{" "}
                        </table>
                        }
                        {
                          pageTab ==='tab_calendar' &&

                          <div className="App">
                          <div style={{ height: 500 }}>
                            <MyBigCalendar/>
                            {/* <Calendar
                              localizer={localizer}
                              events={events}
                              startAccessor="start"
                              endAccessor="end"
                              style={{ margin: '50px' }}
                            /> */}
                          </div>
                        </div>
                        }
                        {
                          pageTab ==='tab_timeLine' &&
<div className="tab-pane fade show active">
                          <GanttChart/>
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
    //   <section>
    //   {/* Wrapper */}
    //   <div
    //     className="hk-wrapper"
    //     data-layout="vertical"
    //     data-layout-style={misActive ? "collapsed" : "default"}
    //     data-hover={misActive ? "active" : ""}
    //     data-menu="light"
    //     data-footer="simple"
    //   >
    //     {/* Top Navbar */}

    //     {/* /Top Navbar */}
    //     <nav className="hk-navbar navbar navbar-expand-xl navbar-light fixed-top">
    //       <div className="container-fluid">
    //         {/* Start Nav */}
    //         <div className="nav-start-wrap">
    //           <button
    //             className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover navbar-toggle d-xl-none"
    //             onClick={mmenuClick}
    //           >
    //             <span className="icon">
    //               <span className="feather-icon">
    //                 {/*<i data-feather="align-left"></i>*/}
    //                 <i className="fas fa-align-left"></i>
    //               </span>
    //             </span>
    //           </button>
    //           {/* Search */}

    //           {/* /Search */}
    //         </div>
    //         {/* /Start Nav */}
    //         {/* End Nav */}
    //         <div className="nav-end-wrap" onClick={menuClick}>
    //           <ul className="navbar-nav flex-row">
    //             <li className="nav-item">
    //               <div className="dropdown ps-2">
    //                 <a
    //                   className=" dropdown-toggle no-caret"
    //                   href="#"
    //                   role="button"
    //                   data-bs-display="static"
    //                   data-bs-toggle="dropdown"
    //                   data-dropdown-animation
    //                   data-bs-auto-close="outside"
    //                   aria-expanded="false"
    //                 >
    //                   <div className="avatar avatar-rounded avatar-xs">
    //                     <img
    //                       src="/dist/img/avatar12.jpg"
    //                       alt="user"
    //                       className="avatar-img"
    //                     />
    //                   </div>
    //                 </a>
    //                 <div
    //                   className={
    //                     isActive
    //                       ? "dropdown-menu dropdown-menu-end show showSlow"
    //                       : "dropdown-menu dropdown-menu-end showSlow"
    //                   }
    //                 >
    //                   <div className="p-2">
    //                     <div className="media">
    //                       <div className="media-head me-2">
    //                         <div className="avatar avatar-primary avatar-sm avatar-rounded">
    //                           <span className="initial-wrap">{}</span>
    //                         </div>
    //                       </div>
    //                       <div className="media-body">
    //                         <div className="fs-7">{}</div>
    //                         <p style={{ color: "black" }}>
    //                           <p style={{ textDecoration:'underline', cursor:'pointer'}} onClick={()=>handleUserPage(2095)}>

    //                           {userLoginData?.firstname + " "}
    //                           {userLoginData?.lastname}
    //                           </p>
    //                         </p>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   {/*
    //                                       <div className="dropdown-divider"></div>
    //                                       <a className="dropdown-item" href="profile.html">Profile</a>
    //                                           <a className="dropdown-item" href="/privacy-policy">
    //                                           <span className="me-2">Offers</span>
    //                                           <span className="badge badge-sm badge-soft-pink">2</span>
    //                                           </a>
    //                                           <div className="dropdown-divider"></div>
    //                                           <h6 className="dropdown-header">Manage Account</h6>
    //                                           <a className="dropdown-item" href="/privacy-policy"><span className="dropdown-icon feather-icon"><i data-feather="credit-card"></i></span><span>Payment methods</span></a>
    //                                           <a className="dropdown-item" href="/privacy-policy"><span className="dropdown-icon feather-icon"><i data-feather="check-square"></i></span><span>Subscriptions</span></a>
    //                                           <a className="dropdown-item" href="/privacy-policy"><span className="dropdown-icon feather-icon"><i data-feather="settings"></i></span><span>Settings</span></a>
    //                                           <div className="dropdown-divider"></div>
    //                                           <a className="dropdown-item" href="/privacy-policy"><span className="dropdown-icon feather-icon"><i data-feather="tag"></i></span><span>Raise a ticket</span></a>
    //                                           <div className="dropdown-divider"></div>
    //                                         */}
    //                   <a className="dropdown-item" href="/support">
    //                     Օգնություն և սպասարկում
    //                   </a>
    //                   <a
    //                     href="/login"
    //                     className="d-block fs-8 link-secondary"
    //                     onClick={signOut}
    //                   >
    //                     <u>Դուրս գալ</u>
    //                   </a>
    //                 </div>
    //               </div>
    //             </li>
    //           </ul>
    //         </div>
    //         {/* /End Nav */}
    //       </div>
    //     </nav>
    //     {/* Vertical Nav */}
    //     <div className="hk-menu">
    //       {/* Brand */}
    //       <div className="menu-header">
    //         <span>
    //           <a className="navbar-brand" href="/dashboard">
    //             <img
    //               className="brand-img img-fluid"
    //               src="/dist/img/icon.svg"
    //               alt="brand"
    //             />
    //             <img
    //               className="brand-img img-fluid"
    //               src="/dist/img/text.svg"
    //               alt="brand"
    //             />
    //           </a>
    //           <button
    //             className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover navbar-toggle"
    //             onClick={mmenuClick}
    //           >
    //             <span className="icon">
    //               <span className="svg-icon fs-5">
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   className="icon icon-tabler icon-tabler-arrow-bar-to-left"
    //                   width="24"
    //                   height="24"
    //                   viewBox="0 0 24 24"
    //                   strokeWidth="2"
    //                   stroke="currentColor"
    //                   fill="none"
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                 >
    //                   <path
    //                     stroke="none"
    //                     d="M0 0h24v24H0z"
    //                     fill="none"
    //                   ></path>
    //                   <line x1="10" y1="12" x2="20" y2="12"></line>
    //                   <line x1="10" y1="12" x2="14" y2="16"></line>
    //                   <line x1="10" y1="12" x2="14" y2="8"></line>
    //                   <line x1="4" y1="4" x2="4" y2="20"></line>
    //                 </svg>
    //               </span>
    //             </span>
    //           </button>
    //         </span>
    //       </div>
    //       {/* /Brand */}

    //       {/* Main Menu */}
    //       <div data-simplebar className="nicescroll-bar">
    //         <div className="menu-content-wrap">
    //           <div className="menu-group">
    //             <ul className="navbar-nav flex-column">
    //               <li className="nav-item">

    //               </li>
    //             </ul>
    //           </div>
    //           <div className="menu-gap"></div>
    //           <div className="menu-group">
    //             <div className="nav-header">
    //               <span>Գործիքակազմ</span>
    //             </div>
    //             <ul className="navbar-nav flex-column">
    //                 <li className="nav-item">
    //                 <Link
    //                   className={
    //                     misActive1 === "doctorsVisits" ||
    //                     location.pathname === "/doctorsVisits"
    //                       ? "nav-link active"
    //                       : "nav-link"
    //                   }
    //                   to="./doctorsVisits"
    //                   onClick={() => handleSubmenuClick("doctorsVisits", "")}
    //                 >
    //                   <span className="nav-icon-wrap">
    //                     <span className="svg-icon">
    //                     <svg fill="#000000" width="800px" height="800px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    //                       <circle cx="46.3" cy="36.3" r="16"/>
    //                       <path d="M66.6,51.1A11.39,11.39,0,0,0,55.2,62.5c0,7.7,8.1,15,10.6,16.9a1.09,1.09,0,0,0,1.5,0c2.5-2,10.6-9.2,10.6-16.9A11.25,11.25,0,0,0,66.6,51.1Zm0,16a4.7,4.7,0,1,1,4.7-4.7A4.76,4.76,0,0,1,66.6,67.1Z"/>
    //                     <path d="M50.4,79.7h1.4c5.2-.5,2.4-3.7,2.4-3.7h0c-3.2-4.6-5-9.1-5-13.5a13.74,13.74,0,0,1,.6-4.2c.2-2-.6-2.5-1-2.7h-.2a18.48,18.48,0,0,0-2.4-.1,24.26,24.26,0,0,0-24,20.9c0,1.2.4,3.5,4.2,3.5H50.2C50.2,79.7,50.3,79.7,50.4,79.7Z"/></svg>
    //                     </span>
    //                   </span>
    //                   <span className="nav-link-text">Բժշկի այցելություններ</span>
    //                 </Link>
    //               </li>
    //               <li className="nav-item">
    //                 <Link
    //                   className={
    //                     misActive1 === "samples" ||
    //                     location.pathname === "/samples"
    //                       ? "nav-link active"
    //                       : "nav-link"
    //                   }
    //                   to="./samples"
    //                   onClick={() => handleSubmenuClick("samples", "")}
    //                 >
    //                   <span className="nav-icon-wrap">
    //                     <span className="svg-icon">
    //                       <svg
    //                         fill="#000000"
    //                         width="23"
    //                         height="23"
    //                         viewBox="0 0 512 512"
    //                         id="Layer_1"
    //                         version="1.1"
    //                       >
    //                         <g>
    //                           <g>
    //                             <path d="M398.4,468.9H113.6c-15.4,0-29.7-7.6-38.3-20.4s-10.3-28.9-4.5-43.2l100.8-248.7c3.7-9.2,5.6-19,5.6-29V97.8h-11.1    c-15.1,0-27.3-12.3-27.3-27.3c0-15.1,12.3-27.3,27.3-27.3h179.8c15.1,0,27.3,12.3,27.3,27.3c0,15.1-12.3,27.3-27.3,27.3h-11.1    v29.8c0,10,1.9,19.7,5.6,29l100.8,248.8c5.8,14.3,4.1,30.4-4.5,43.2C428.2,461.3,413.8,468.9,398.4,468.9z M166.1,58.1    c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h18.6c4.1,0,7.5,3.4,7.5,7.5v37.4c0,11.9-2.3,23.6-6.7,34.6L84.6,411    c-4,9.8-2.9,20.4,3,29.2s15.3,13.8,25.9,13.8h284.9c10.6,0,20-5,25.9-13.8s7-19.4,3-29.2L326.5,162.2c-4.5-11-6.7-22.7-6.7-34.6    V90.3c0-4.1,3.4-7.5,7.5-7.5h18.6c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3L166.1,58.1L166.1,58.1z" />
    //                           </g>
    //                           <g>
    //                             <path d="M377.1,281.6h-49.4c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5h49.4c4.1,0,7.5,3.4,7.5,7.5S381.2,281.6,377.1,281.6z" />
    //                           </g>
    //                           <g>
    //                             <path d="M287,281.6H132c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5h155c4.1,0,7.5,3.4,7.5,7.5S291.1,281.6,287,281.6z" />
    //                           </g>
    //                         </g>
    //                       </svg>
    //                     </span>
    //                   </span>
    //                   <span className="nav-link-text">Նմուշառումներ</span>
    //                 </Link>
    //               </li>
    //               <li className="nav-item">
    //                 <a
    //                   className={
    //                     misActive1 === "settings"
    //                       ? "nav-link active"
    //                       : "nav-link"
    //                   }
    //                   href="#"
    //                   data-bs-toggle="collapse"
    //                   onClick={dropDownMenu2Click}
    //                   data-bs-target="#dash_integ"
    //                 >
    //                   <span className="nav-icon-wrap">
    //                     <span className="svg-icon">
    //                       <svg
    //                         fill="#000000"
    //                         height="800px"
    //                         width="800px"
    //                         id="Capa_1"
    //                         viewBox="0 0 482.568 482.568"
    //                       >
    //                         <g>
    //                           <g>
    //                             <path
    //                               d="M116.993,203.218c13.4-1.8,26.8,2.8,36.3,12.3l24,24l22.7-22.6l-32.8-32.7c-5.1-5.1-5.1-13.4,0-18.5s13.4-5.1,18.5,0
    //                           l32.8,32.8l22.7-22.6l-24.1-24.1c-9.5-9.5-14.1-23-12.3-36.3c4-30.4-5.7-62.2-29-85.6c-23.8-23.8-56.4-33.4-87.3-28.8
    //                           c-4.9,0.7-6.9,6.8-3.4,10.3l30.9,30.9c14.7,14.7,14.7,38.5,0,53.1l-19,19c-14.7,14.7-38.5,14.7-53.1,0l-31-30.9
    //                           c-3.5-3.5-9.5-1.5-10.3,3.4c-4.6,30.9,5,63.5,28.8,87.3C54.793,197.518,86.593,207.218,116.993,203.218z"
    //                             />
    //                             <path
    //                               d="M309.193,243.918l-22.7,22.6l134.8,134.8c5.1,5.1,5.1,13.4,0,18.5s-13.4,5.1-18.5,0l-134.8-134.8l-22.7,22.6l138.9,138.9
    //                           c17.6,17.6,46.1,17.5,63.7-0.1s17.6-46.1,0.1-63.7L309.193,243.918z"
    //                             />
    //                             <path
    //                               d="M361.293,153.918h59.9l59.9-119.7l-29.9-29.9l-119.8,59.8v59.9l-162.8,162.3l-29.3-29.2l-118,118
    //                           c-24.6,24.6-24.6,64.4,0,89s64.4,24.6,89,0l118-118l-29.9-29.9L361.293,153.918z"
    //                             />
    //                           </g>
    //                         </g>
    //                       </svg>
    //                     </span>
    //                   </span>
    //                   <span className="nav-link-text">Կարգաբերումներ</span>
    //                 </a>
    //                 <ul
    //                   id="dash_integ"
    //                   className={
    //                     dropDownMenu2
    //                       ? "nav flex-column collapse  nav-children"
    //                       : "nav flex-column collapse  nav-children show"
    //                   }
    //                 >
    //                   <li className="nav-item">
    //                     <ul className="nav flex-column">
    //                       {/* <li className="nav-item">
    //                         <Link
    //                           className={
    //                             sisActive1 === "prices" ||
    //                             location.pathname === "/settings/prices"
    //                               ? "nav-link active"
    //                               : "nav-link"
    //                           }
    //                           to="./settings/prices"
    //                           onClick={() =>
    //                             handleSubmenuClick("settings", "prices")
    //                           }
    //                         >
    //                           <span className="nav-link-text">
    //                             Գնացուցակներ
    //                           </span>
    //                         </Link>
    //                       </li> */}

    //                       <li className="nav-item">
    //                         <Link
    //                           className={
    //                             sisActive1 === "researchlists" ||
    //                             location.pathname ===
    //                               "/settings/researchlists"
    //                               ? "nav-link active"
    //                               : "nav-link"
    //                           }
    //                           to="./settings/researchlists"
    //                           onClick={() =>
    //                             handleSubmenuClick(
    //                               "settings",
    //                               "researchlists"
    //                             )
    //                           }
    //                         >
    //                           <span className="nav-link-text">
    //                             Հետ․ տեսակներ
    //                           </span>
    //                         </Link>
    //                       </li>
    //                     </ul>
    //                   </li>
    //                 </ul>
    //               </li>
    //             </ul>
    //           </div>

    //         </div>
    //       </div>
    //       {/* /Main Menu */}
    //     </div>
    //     <div id="hk_menu_backdrop" className="hk-menu-backdrop"></div>
    //     {/* /Vertical Nav */}

    //     {/* Chat Popup */}
    //     <div className="hk-chatbot-popup">
    //       <header>
    //         <div className="chatbot-head-top">
    //           <a
    //             className="btn btn-sm btn-icon btn-dark btn-rounded"
    //             href="#"
    //             data-bs-toggle="dropdown"
    //             aria-haspopup="true"
    //             aria-expanded="false"
    //           >
    //             <span className="icon">
    //               <span className="feather-icon">
    //                 <i data-feather="more-horizontal"></i>
    //               </span>
    //             </span>
    //           </a>
    //           <div className="dropdown-menu">
    //             <a className="dropdown-item" href="#">
    //               <i className="dropdown-icon zmdi zmdi-notifications-active"></i>
    //               <span>Send push notifications</span>
    //             </a>
    //             <a className="dropdown-item" href="#">
    //               <i className="dropdown-icon zmdi zmdi-volume-off"></i>
    //               <span>Mute Chat</span>
    //             </a>
    //           </div>
    //           <span className="text-white">Chat with Us</span>
    //           <a
    //             id="minimize_chatbot"
    //             href="#"
    //             className="btn btn-sm btn-icon btn-dark btn-rounded"
    //           >
    //             <span className="icon">
    //               <span className="feather-icon">
    //                 <i data-feather="minus"></i>
    //               </span>
    //             </span>
    //           </a>
    //         </div>
    //         <div className="separator-full separator-light mt-0 opacity-10"></div>
    //         <div className="media-wrap">
    //           <div className="media">
    //             <div className="media-head">
    //               <div className="avatar avatar-sm avatar-soft-primary avatar-icon avatar-rounded position-relative">
    //                 <span className="initial-wrap">
    //                   <i className="ri-customer-service-2-line"></i>
    //                 </span>
    //                 <span className="badge badge-success badge-indicator badge-indicator-lg badge-indicator-nobdr position-bottom-end-overflow-1"></span>
    //               </div>
    //             </div>
    //             <div className="media-body">
    //               <div className="user-name">Chat Robot</div>
    //               <div className="user-status">Online</div>
    //             </div>
    //           </div>
    //         </div>
    //       </header>
    //       <div className="chatbot-popup-body">
    //         <div data-simplebar className="nicescroll-bar">
    //           <div>
    //             <div className="init-content-wrap">
    //               <div className="card card-shadow">
    //                 <div className="card-body">
    //                   <p className="card-text">
    //                     Hey I am chat robot 😈
    //                     <br />
    //                     Do yo have any question regarding our tools?
    //                     <br />
    //                     <br />
    //                     Select the topic or start chatting.
    //                   </p>
    //                   <button className="btn btn-block btn-primary text-nonecase start-conversation">
    //                     Start a conversation
    //                   </button>
    //                 </div>
    //               </div>
    //               <div className="btn-wrap">
    //                 <button className="btn btn-soft-primary text-nonecase btn-rounded start-conversation">
    //                   <span>
    //                     <span className="icon">
    //                       <span className="feather-icon">
    //                         <i data-feather="eye"></i>
    //                       </span>
    //                     </span>
    //                     <span className="btn-text">Just browsing</span>
    //                   </span>
    //                 </button>
    //                 <button className="btn btn-soft-danger text-nonecase btn-rounded start-conversation">
    //                   <span>
    //                     <span className="icon">
    //                       <span className="feather-icon">
    //                         <i data-feather="credit-card"></i>
    //                       </span>
    //                     </span>
    //                     <span className="btn-text">
    //                       I have a question regarding pricing
    //                     </span>
    //                   </span>
    //                 </button>
    //                 <button className="btn btn-soft-warning text-nonecase btn-rounded start-conversation">
    //                   <span>
    //                     <span className="icon">
    //                       <span className="feather-icon">
    //                         <i data-feather="cpu"></i>
    //                       </span>
    //                     </span>
    //                     <span className="btn-text">
    //                       Need help for technical query
    //                     </span>
    //                   </span>
    //                 </button>
    //                 <button className="btn btn-soft-success text-nonecase btn-rounded start-conversation">
    //                   <span>
    //                     <span className="icon">
    //                       <span className="feather-icon">
    //                         <i data-feather="zap"></i>
    //                       </span>
    //                     </span>
    //                     <span className="btn-text">
    //                       I have a pre purchase question
    //                     </span>
    //                   </span>
    //                 </button>
    //               </div>
    //             </div>
    //             <ul className="list-unstyled d-none">
    //               <li className="media sent">
    //                 <div className="media-body">
    //                   <div className="msg-box">
    //                     <div>
    //                       <p>I have a plan regarding pricing</p>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </li>
    //               <li className="media received">
    //                 <div className="avatar avatar-xs avatar-soft-primary avatar-icon avatar-rounded">
    //                   <span className="initial-wrap">
    //                     <i className="ri-customer-service-2-line"></i>
    //                   </span>
    //                 </div>
    //                 <div className="media-body">
    //                   <div className="msg-box">
    //                     <div>
    //                       <p>
    //                         Welcome back!
    //                         <br />
    //                         Are you looking to upgrade your existing plan?
    //                       </p>
    //                     </div>
    //                   </div>
    //                   <div className="msg-box typing-wrap">
    //                     <div>
    //                       <div className="typing">
    //                         <div className="dot"></div>
    //                         <div className="dot"></div>
    //                         <div className="dot"></div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //       <footer>
    //         <div className="chatbot-intro-text fs-7">
    //           <div className="separator-full separator-light"></div>
    //           <p className="mb-2">
    //             This is jampack's beta version please sign up now to get early
    //             access to our full version
    //           </p>
    //           <a className="d-block mb-2" href="#">
    //             <u>Give Feedback</u>
    //           </a>
    //         </div>
    //         <div className="input-group d-none">
    //           <div className="input-group-text overflow-show border-0">
    //             <button
    //               className="btn btn-icon btn-flush-dark flush-soft-hover btn-rounded dropdown-toggle no-caret"
    //               data-bs-toggle="dropdown"
    //               aria-haspopup="true"
    //               aria-expanded="false"
    //             >
    //               <span className="icon">
    //                 <span className="feather-icon">
    //                   <i data-feather="share"></i>
    //                 </span>
    //               </span>
    //             </button>
    //             <div className="dropdown-menu">
    //               <a className="dropdown-item" href="#">
    //                 <div className="d-flex align-items-center">
    //                   <div className="avatar avatar-icon avatar-xs avatar-soft-primary avatar-rounded me-3">
    //                     <span className="initial-wrap">
    //                       <i className="ri-image-line"></i>
    //                     </span>
    //                   </div>
    //                   <div>
    //                     <span className="h6 mb-0">
    //                       Photo or Video Library
    //                     </span>
    //                   </div>
    //                 </div>
    //               </a>
    //               <a className="dropdown-item" href="#">
    //                 <div className="d-flex align-items-center">
    //                   <div className="avatar avatar-icon avatar-xs avatar-soft-info avatar-rounded me-3">
    //                     <span className="initial-wrap">
    //                       <i className="ri-file-4-line"></i>
    //                     </span>
    //                   </div>
    //                   <div>
    //                     <span className="h6 mb-0">Documents</span>
    //                   </div>
    //                 </div>
    //               </a>
    //               <a className="dropdown-item" href="#">
    //                 <div className="d-flex align-items-center">
    //                   <div className="avatar avatar-icon avatar-xs avatar-soft-success avatar-rounded me-3">
    //                     <span className="initial-wrap">
    //                       <i className="ri-map-pin-line"></i>
    //                     </span>
    //                   </div>
    //                   <div>
    //                     <span className="h6 mb-0">Location</span>
    //                   </div>
    //                 </div>
    //               </a>
    //               <a className="dropdown-item" href="/contact">
    //                 <div className="d-flex align-items-center">
    //                   <div className="avatar avatar-icon avatar-xs avatar-soft-blue avatar-rounded me-3">
    //                     <span className="initial-wrap">
    //                       <i className="ri-contacts-line"></i>
    //                     </span>
    //                   </div>
    //                   <div>
    //                     <span className="h6 mb-0">Contact</span>
    //                   </div>
    //                 </div>
    //               </a>
    //             </div>
    //           </div>
    //           <input
    //             type="text"
    //             id="input_msg_chat_popup"
    //             name="send-msg"
    //             className="input-msg-send form-control border-0 shadow-none"
    //             placeholder="Type something..."
    //           />
    //           <div className="input-group-text overflow-show border-0">
    //             <button className="btn btn-icon btn-flush-dark flush-soft-hover btn-rounded">
    //               <span className="icon">
    //                 <span className="feather-icon">
    //                   <i data-feather="smile"></i>
    //                 </span>
    //               </span>
    //             </button>
    //           </div>
    //         </div>
    //         <div className="footer-copy-text">
    //           Powered by
    //           <a className="brand-link" href="#">
    //             <img src="/dist/img/logo-light.png" alt="logo-brand" />
    //           </a>
    //         </div>
    //       </footer>
    //     </div>
    //     {/*
    //           <a href="#" className="btn btn-icon btn-floating btn-primary btn-lg btn-rounded btn-popup-open">
    //               <span className="icon">
    //                   <span className="feather-icon"><i data-feather="message-circle"></i></span>
    //               </span>
    //           </a>
    //           */}
    //     <div className="chat-popover shadow-xl">
    //       <p>
    //         Try Jampack Chat for free and connect with your customers now!
    //       </p>
    //     </div>
    //     {/* /Chat Popup */}

    //     {/* Main Content */}
    //     <div className="hk-pg-wrapper">
    //       {/*<div className="container-xxl">*/}
    //       <Suspense fallback={<LoadingSpinner />}>
    //         <Outlet />
    //       </Suspense>
    //     </div>
    //     {/* Page Footer */}
    //     <div className="hk-footer">
    //       <footer className="container-xxl footer">
    //         <div className="row">
    //           <div className="col-xl-8 text-center">
    //             <p className="footer-text pb-0">
    //               <span className="copy-text">
    //                 Vteam LIMS © {new Date().getFullYear()}
    //               </span>
    //               <span className="footer-link-sep">|</span>
    //               <a href="/privacy-policy" className="" target="_blank">
    //                 Գաղտնիության քաղաքականություն
    //               </a>
    //               {/*
    //                                   <span className="footer-link-sep">|</span><a href="#" className="" target="_blank">T&C</a>
    //                                   <span className="footer-link-sep">|</span><a href="#" className="" target="_blank">System Status</a>
    //                                   */}
    //             </p>
    //           </div>
    //         </div>
    //       </footer>
    //     </div>
    //     {/* Page Footer */}
    //     {/*</div>*/}
    //     {/* /Main Content */}
    //   </div>
    //   {/* /Wrapper */}
    // </section>
  );
};

export default DoctorsTemplete;
