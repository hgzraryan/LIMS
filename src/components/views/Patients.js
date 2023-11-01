/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef,useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import LoadingSpinner from "../LoadingSpinner";
import axios from "./../../api/axios";
import Loading from "../Loading";
import { useTable, useSortBy } from "react-table";
import CreatePatient from "./CreatePatient";
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "./../ComponentToPrint";
import { Dropdown } from "react-bootstrap";
import { BiSolidInfoCircle } from "react-icons/bi";
import PatientInfo from "../PatientInfo";
import { useDispatch, useSelector } from "react-redux";

import {
  reserchesList,
  selectResearches,
} from "../../redux/features/researches/researchesSlice";
import useGetData from "../../hooks/useGetData";
const GET_RESEARCHES = "/researchLists";
const PATIENTS_URL = "/patients";

const Patients = () => {
  const researchState = useSelector(selectResearches);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
/*-----------------------------------------------------Get Researches----------------------------------------------------*/
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getResearches = async () => {
      try {
        const response = await axiosPrivate.post(GET_RESEARCHES, {
          signal: controller.signal,
        });

        isMounted && dispatch(reserchesList(response.data.jsonString));
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getResearches();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  /*--------------------------------------------------------------------------------------------------------------------*/
  /*------------------ print component --------------------*/
  const ComponentToPrintWrapper = ({ user }) => {
    // 1.
    let componentRef = useRef(null); // 2.
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
  const handleToggleCreateModal = (value) => {
    setIsOpen((prev) => value);
  };
  const {
    data: patients,
    setData: setPatients,
    hasMore,
    getData: getPatients,
  } = useGetData(PATIENTS_URL);
  //-------------------------
  const handleOpenModal = (user) => {
    setSelectedItem((prev) => user);
  };
  const handleCloseModal = () => {
    setSelectedItem(null);
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

  const columns = useMemo(
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
        accessor: "researchList",
        Cell: ({ row }) => (
          <div className="d-flex">
            <div className="pe-2">{row.values.researchList.length}</div>
            <BiSolidInfoCircle
              cursor={"pointer"}
              size={"1.5rem"}
              onClick={() => handleOpenModal(row.values)}
            />
          </div>
        ),
      },
      {
        Header: "Արժեք (դրամ)",
        accessor: "totalPrice",
        Cell: ({ row }) => <div>{row.values.totalPrice}</div>,
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
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="btn btn-sm btn-outline-secondary flex-shrink-0 dropdown-toggle d-lg-inline-block d-none"
                    >
                      Գրանցել նոր
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setIsOpen(true)}>
                        Հիվանդի
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {isOpen && (
                    <CreatePatient
                      handleToggleCreateModal={handleToggleCreateModal}
                      getPatients={()=>getPatients()}
                      researchState={researchState}
                      //errMsg={errMsg}
                    />
                  )}
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
                      next={()=>getPatients('check')}
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
                                  {column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <span className="sorting_asc"></span>
                                    ) : (
                                      <span className="sorting_desc"></span>
                                    )
                                  ) : (
                                    <span className="sorting"></span>
                                  )}
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
                            <PatientInfo
                              selectedItem={selectedItem}
                              handleCloseModal={handleCloseModal}
                              researchState={researchState}
                            />
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
