/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import LoadingSpinner from "../LoadingSpinner";
import axios from "./../../api/axios";
import Loading from "../Loading";
import { useTable, useSortBy } from "react-table";
import CreatePatient from "./CreatePatient"
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "./../ComponentToPrint";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const REGISTER_URL = "/register";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [reserarchesArray, setResearchesArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const multiselectRef = useRef("");
  const [isOpen, setIsOpen] = useState(false);

  const errRef = useRef("");
  const userRef = useRef("");
  const firstnameRef = useRef("");
  const lastnameRef = useRef("");
  const mnameRef = useRef("");
  const ageRef = useRef("");
  const emailRef = useRef("");
  const addressRef = useRef("");
  const researchesRef = useRef("");

  let researchState = {
    options: [
      {
        name: "Կարիոտիպի հետազոտում պերիֆերիկ արյան լիմֆոցիտներում (քանակական և որակական փոփոխություններ) ",
        id: 1,
        category: "Գենետիկա ",
      },
      {
        name: "Կարիոտիպի հետազոտում պերիֆերիկ արյան լիմֆոցիտներում (քանակական և որակական փոփոխություններ) / զույգ",
        id: 2,
        category: "Գենետիկա ",
      },
      {
        name: "Պտղի կարիոտիպի հետազոտում (քանակական և որակական փոփոխություններ) շուրջպտղային հեղուկում",
        id: 3,
        category: "Գենետիկա ",
      },
      {
        name: "Կարիոտիպի հետազոտում պերիֆերիկ արյան լիմֆոցիտներում (քանակական և որակական փոփոխություններ)",
        id: 4,
        category: "Գենետիկա ",
      },
      {
        name: "Անեուպլոիդիաների (13, 18, 21, X/Y) ախտորոշում պտղի մոտ FISH մեթոդով",
        id: 5,
        category: "Գենետիկա ",
      },
      {
        name: "Վիլյամս, Պրադեր-Վիլլի, Անգելման, Դի-Ջորջ միկրոդելեցիոն սինդրոմների ախտորոշում FISH մեթոդով, յուրաքանչյուրը",
        id: 6,
        category: "Գենետիկա ",
      },
      {
        name: "Արյան ընդհանուր հետազոտություն",
        id: 7,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Արյան խումբ/ռեզուս, ABO/Rh",
        id: 8,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Մեզի ընդհանուր հետազոտություն",
        id: 9,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Մեզի երկբաժին հետազոտություն",
        id: 10,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Միզասեռական քսուկների մանրադիտակային հետազոտություն",
        id: 11,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Սպերմոգրամմա",
        id: 12,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "MAR-թեստ, IgG+Սպերմոգրամմա",
        id: 13,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "MAR-թեստ, IgG/IgA+Սպերմոգրամմա",
        id: 14,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Բջջաբանական հետազոտություն (Հեղուկային)",
        id: 15,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Բջջաբանական հետազոտություն+ՄՊՎ ԴՆԹ",
        id: 16,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Շագանակագեղձի հյութի մանրադիտակային հետազոտություն",
        id: 17,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Եղունգների մանրէաբանական հետազոտություն (սնկեր)",
        id: 18,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Դեմոդեկոզ (Հրաչյա Քոչար մ/ճ)",
        id: 19,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      { name: "Սրատուտ", id: 20, category: "Ընդհանուր կլինիկական քննություն " },
      {
        name: "Կոպրոգրամմա",
        id: 21,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Հելմինթների ձվեր",
        id: 22,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Հելմինթների ձվեր (10)",
        id: 23,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Կղանքի թաքնված արյան թեստ",
        id: 24,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Պրոկալցիտոնին",
        id: 25,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Ինտերլեյկին-6",
        id: 26,
        category: "Ընդհանուր կլինիկական քննություն ",
      },
      {
        name: "Մասնակի ակտիվացված տրոմբոպլասթինային ժամանակ",
        id: 27,
        category: "Կոագուլոգրամմա",
      },
      {
        name: "MHO Պրոտրոմբին/ ինդեքս/ INR",
        id: 28,
        category: "Կոագուլոգրամմա",
      },
      { name: "Պրոտրոմբինային ժամանակ", id: 29, category: "Կոագուլոգրամմա" },
      { name: "Ֆիբրինոգեն", id: 30, category: "Կոագուլոգրամմա" },
      { name: "D - Դիմեր", id: 31, category: "Կոագուլոգրամմա" },
      { name: "Գայլախտային հակամակարդիչ", id: 32, category: "Կոագուլոգրամմա" },
      { name: "Պրոտեին С", id: 33, category: "Կոագուլոգրամմա" },
      { name: "Պրոտեին S", id: 34, category: "Կոագուլոգրամմա" },
      { name: "Հակաթրոմբին III", id: 35, category: "Կոագուլոգրամմա" },
    ],
  };
  /*------------------ tiny mce --------------------*/
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  /*------------------------------------------------*/

  /*------------------ print component --------------------*/
  const ComponentToPrintWrapper = ({ user }) => {
    // 1.
    const componentRef = useRef(); // 2.

    return (
      <div style={{ display: "flex" }}>
        <ReactToPrint
          trigger={() => (
            <a
              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
              data-bs-toggle="tooltip"
              data-placement="top"
              title=""
              data-bs-original-title="Archive"
              href="#"
            >
              <span className="icon">
                <span className="feather-icon">
                  <FeatherIcon icon="printer" />
                </span>
              </span>
            </a>
          )}
          content={() => componentRef.current}
        />
        <div style={{ display: "none" }}>
          <ComponentToPrint ref={componentRef} value={user} />
        </div>
      </div>
    );
  };
  /*------------------------------------------------*/

  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const formData = new FormData();

  const handleToggleCreateModal = (value) => {
    setIsOpen((prev) => value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPatient = {
      user: userRef.current,
      pwd: addressRef.current,
      firstname: firstnameRef.current,
      lastname: lastnameRef.current,
      roles: researchesRef.current,
    };

    formData.append("text", JSON.stringify(newPatient));
    try {
      await axios.post(REGISTER_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      navigate("/patients", { state: { from: location }, replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg(" Failed");
      }
    }
  };
  const onResearchSelect = (data) => {
    let researchessArr = [];
    for (let research of data) {
      researchessArr.push(Object.values(research)[0]);
    }
    setResearchesArray((prev) => (prev = researchessArr));
  };
  const onResearchDelete = (data) => {
    let researchessArr = [];
    for (let research of data) {
      researchessArr.push(Object.values(research)[0]);
    }
    setResearchesArray((prev) => (prev = researchessArr));

    //reset selected options colors
    const elems = document.querySelectorAll(".chips");
    elems.forEach((element) => {
      element.classList.remove("chips");
    });
  };
  const onAdd = (e) => {
    researchesRef.current = reserarchesArray;
    //multiselectRef.current.resetSelectedValues()
    const elems = document.querySelectorAll(".chip");
    elems.forEach((element) => {
      element.classList.add("chips");
    });
  };

  const pagesVisited = currentPage * usersPerPage;
  const currentUsers = patients.slice(pagesVisited, pagesVisited + usersPerPage);
  const pageCount = Math.ceil(patients.length / usersPerPage);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPatients = async () => {
      try {
        const response = await axiosPrivate.post("/patients", {
          signal: controller.signal,
          page: currentPage,
          onPage: 1,
        });
        setTimeout(() => {
          if (
            response.data.jsonString.length === 0 ||
            response.data.jsonString.length < 12
          ) {
            setHasMore(false);
          }
          setPatients((prevUsers) => [...prevUsers, ...response.data.jsonString]);
          setCurrentPage((prev) => prev + 1);
        }, 500);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getPatients();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const getPatients = async () => {
    try {
      const response = await axiosPrivate.post("/patients", {
        page: currentPage,
        onPage: usersPerPage,
      });
      setTimeout(() => {
        if (
          response.data.jsonString.length === 0 ||
          response.data.jsonString.length < 12
        ) {
          setHasMore(false);
        }
        setPatients((prevUsers) => [...prevUsers, ...response.data.jsonString]);
        setCurrentPage((prev) => prev + 1);
      }, 500);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  //-------------------------

  const refreshPage = () => {
    let paglink = document.querySelectorAll(".page-item");
    paglink[0].firstChild.click();
  };
  //-------------------

  //-------------------
  const [showCreateNew, setIsActive] = useState(false);
  const CreateNew = (event) => {
    setIsActive((current) => !current);
  };

  //-------------------

  const columns = React.useMemo(
    () => [
      {
        Header: () => (
          <input
            type="checkbox"
            className="form-check-input check-select-all"
          />
        ),
        Cell: () => (
          <input
            type="checkbox"
            className="form-check-input check-select-all"
          />
        ),
        accessor: "select",
        disableSortBy: true,
      },
      {
        Header: "Անուն",
        accessor: "firstName",
        sortable: true,

      },
      {
        Header: "Ազգանուն",
        accessor: "lastName",
        sortable: true,

      },
      {
        Header: "Հայրանուն",
        accessor: "midName",
        sortable: true,

      },
      {
        Header: "Էլ․ հասցե",
        accessor: "email",
        sortable: true,

      },
      {
        Header: "Տարիք",
        accessor: "age",
        sortable: true,

      },
      {
        Header: "Հետազոտություններ",
        accessor: "researchlist",
      },
      {
        Header: "Կարգաբերումներ",
        accessor: "options",
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <ComponentToPrintWrapper user={row.values} />

              {/*
                <a className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Archive" href="#"><span className="icon"><span className="feather-icon"><FeatherIcon icon="archive" /></span></span></a>
                 <a className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Edit" href="edit-contact.html"><span className="icon"><span className="feather-icon"><FeatherIcon icon="edit" /></span></span></a>
                 <a className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Delete" href="#"><span className="icon"><span className="feather-icon"><FeatherIcon icon="trash" /></span></span></a>
                */}
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
        disableSortBy: true,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: patients,
      },
      useSortBy
    );

  return (
    <div>
      <div className="contactapp-wrap">
        <div className="contactapp-content">
          <div className="contactapp-detail-wrap">
            <header className="contact-header">
              <div className="d-flex align-items-center">
                <div className="dropdown">
                  <a
                    className="contactapp-title link-dark"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <h1>Հիվանդներ</h1>
                  </a>
                  {/*
									<div className={showUserMenu ? 'dropdown-menu show' : 'dropdown-menu'} >
										<a className="dropdown-item" href="#"><span className="feather-icon dropdown-icon"><FeatherIcon icon="users" /></span><span>Users1</span></a>
										<a className="dropdown-item" href="#"><span className="feather-icon dropdown-icon"><FeatherIcon icon="star" /></span><span>Users2</span></a>
										<a className="dropdown-item" href="#"><span className="feather-icon dropdown-icon"><FeatherIcon icon="archive" /></span><span>Users3</span></a>
										<a className="dropdown-item" href="#"><span className="feather-icon dropdown-icon"><FeatherIcon icon="edit" /></span><span>Users4</span></a>
									</div>
									*/}
                </div>
                <div className="dropdown ms-3">
                  <button
                    className="btn btn-sm btn-outline-secondary flex-shrink-0 dropdown-toggle d-lg-inline-block d-none"
                    data-bs-toggle="dropdown"
                    onClick={CreateNew}
                  >
                    Գրանցել նոր
                  </button>
                  <div
                    className={
                      showCreateNew ? "dropdown-menu show" : "dropdown-menu"
                    }
                    data-popper-placement="bottom"
                  >
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => setIsOpen(true)}
                    >
                      <span className="feather-icon dropdown-icon"></span>
                      <span>Հիվանդի</span>
                    </a>
                    {isOpen && 
                    <CreatePatient
                      handleToggleCreateModal={handleToggleCreateModal}
                      researchState={researchState}
                      onResearchSelect={onResearchSelect}
                      onResearchDelete={onResearchDelete}
                      onAdd={onAdd}
                      handleSubmit={handleSubmit}
                      editorRef={editorRef}
                      multiselectRef={multiselectRef}
                      firstnameRef={firstnameRef}
                      lastnameRef={lastnameRef}
                      mnameRef={mnameRef}
                      ageRef={ageRef}
                      emailRef={emailRef}
                      addressRef={addressRef}
                    />
                    }
                  </div>
                </div>
              </div>
              <div className="contact-options-wrap">
                <a
                  className="btn btn-icon btn-flush-dark flush-soft-hover dropdown-toggle no-caret active"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <FeatherIcon icon="list" />
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item active" href="contact.html">
                    <span className="feather-icon dropdown-icon">
                      <FeatherIcon icon="list" />
                    </span>
                    <span>List View</span>
                  </a>
                  <a className="dropdown-item" href="contact-cards.html">
                    <span className="feather-icon dropdown-icon">
                      <FeatherIcon icon="grid" />
                    </span>
                    <span>Grid View</span>
                  </a>
                  <a className="dropdown-item" href="#">
                    <span className="feather-icon dropdown-icon">
                      <FeatherIcon icon="server" />
                    </span>
                    <span>Compact View</span>
                  </a>
                </div>
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret d-sm-inline-block d-none"
                  href="#"
                  data-bs-toggle="tooltip"
                  data-placement="top"
                  onClick={refreshPage}
                  title=""
                  data-bs-original-title="Refresh"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <FeatherIcon icon="refresh-cw" />
                    </span>
                  </span>
                </a>
                <div className="v-separator d-lg-block d-none"></div>
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret  d-lg-inline-block d-none  ms-sm-0"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  <span
                    className="icon"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Manage Contact"
                  >
                    <span className="feather-icon">
                      <FeatherIcon icon="settings" />
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="#">
                    Manage User
                  </a>
                  <a className="dropdown-item" href="#">
                    Import
                  </a>
                  <a className="dropdown-item" href="#">
                    Export
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Send Messages
                  </a>
                  <a className="dropdown-item" href="#">
                    Delegate Access
                  </a>
                </div>
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret d-lg-inline-block d-none"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  <span
                    className="icon"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="More"
                  >
                    <span className="feather-icon">
                      <FeatherIcon icon="more-vertical" />
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="profile.html">
                    <span className="feather-icon dropdown-icon">
                      <FeatherIcon icon="star" />
                      <i data-feather="star"></i>
                    </span>
                    <span>Stared Contacts</span>
                  </a>
                  <a className="dropdown-item" href="#">
                    <span className="feather-icon dropdown-icon">
                      <FeatherIcon icon="archive" />
                      <i data-feather="archive"></i>
                    </span>
                    <span>Archive Contacts</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="email.html">
                    <span className="feather-icon dropdown-icon">
                      <FeatherIcon icon="slash" />
                      <i data-feather="slash"></i>
                    </span>
                    <span>Block Content</span>
                  </a>
                  <a className="dropdown-item" href="email.html">
                    <span className="feather-icon dropdown-icon">
                      <FeatherIcon icon="external-link" />
                      <i data-feather="external-link"></i>
                    </span>
                    <span>Feedback</span>
                  </a>
                </div>
                <a
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable d-sm-inline-block d-none"
                  href="#"
                  data-bs-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-bs-original-title="Collapse"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <FeatherIcon icon="list" />
                      <i data-feather="chevron-up"></i>
                    </span>
                    <span className="feather-icon d-none">
                      <FeatherIcon icon="list" />
                      <i data-feather="chevron-down"></i>
                    </span>
                  </span>
                </a>
              </div>
            </header>
            <div className="contact-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="contact-list-view">
                  <div
                    id="scrollableDiv"
                    style={{ height: "80vh", overflow: "auto" }}
                  >
                    <InfiniteScroll
                      dataLength={patients.length}
                      next={getPatients}
                      hasMore={hasMore}
                      loader={<Loading />}
                      scrollableTarget="scrollableDiv"
                      endMessage={
                        <p>Տվյալներ չեն հայտնաբերվել բեռնելու համար:</p>
                      }
                    >
                      <table className="table nowrap w-100 mb-5 dataTable no-footer">
                      <thead>
                          {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                <th
                                  {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                  )}
                                >                                 
                                    {column.isSorted
                                      ? column.isSortedDesc
                                        ? <span className="sorting_asc" ></span>
                                        : <span className="sorting_desc" ></span>
                                      : <span className="sorting" ></span>}
                                      {column.render("Header")}
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        {patients?.length && (
                          <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                              prepareRow(row);
                              return (
                                <tr {...row.getRowProps()}>
                                  {row.cells.map((cell) => {
                                    return (
                                      <td {...cell.getCellProps()}>
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
                    </InfiniteScroll>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Patients;
