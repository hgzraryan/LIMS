/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import LoadingSpinner from "../LoadingSpinner";
import ReactPaginate from "react-paginate";
import MissingAvatar from "../../dist/img/Missing.svg";
import Multiselect from "multiselect-react-dropdown";
import axios from "../../api/axios";
import Loading from "../Loading";
import { useSortBy, useTable } from "react-table";
import { Dropdown } from "react-bootstrap";

import AddResearch from "./CreateUser";
import { useDispatch, useSelector } from "react-redux";
import {
  reserchesList,
  selectResearches,
} from "../../redux/features/researches/researchesSlice";
const GET_RESEARCHES = "/researchLists";

const Researchlists = () => {
  const [researches, setResearches] = useState([]);

  const [rolesArray, setRolesArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const multiselectRef = useRef("");
  const dispatch = useDispatch();
  const respResearches = useSelector(selectResearches);
  /*------------------ Create user Component --------------------*/
  const handleToggleCreateModal = (value) => {
    setIsOpen((prev) => value);
  };
  /*------------------------------------------------*/

  /*----------------ADD USER---------------------*/
  const errRef = useRef("");
  const user = useRef("");
  const firstname = useRef("");
  const lastname = useRef("");
  const pwd = useRef("");
  const roles = useRef("");


  const pagesVisited = currentPage * usersPerPage;
  // const currentUsers = researches.slice(
  //   pagesVisited,
  //   pagesVisited + usersPerPage
  // );
  const pageCount = Math.ceil(researches.length / usersPerPage);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getResearches = async () => {
      try {
        const response = await axiosPrivate.post(GET_RESEARCHES, {
          signal: controller.signal,
          page: currentPage,
          onPage: Math.round((window.innerHeight / 100) * 1.5),
        });
        setTimeout(() => {
          if (
            response.data.jsonString.length === 0 ||
            response.data.jsonString.length < 12
          ) {
            setHasMore(false);
          }
          isMounted && //dispatch(reserchesList(response.data.jsonString));
          console.log(response)
          setResearches((prev) => response.data.jsonString);
          setCurrentPage((prev) => prev + 1);
        }, 500);
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

  const getResearches = async (check='') => {
    try {
      const response = await axiosPrivate.post(GET_RESEARCHES, {
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
        switch (check) {
          case "check":
            setResearches((prev) => ([...prev,...response.data.jsonString]));
            //console.log(researches)
            //dispatch(reserchesList(researches));
            break;
          case "update":
            setResearches((prevUsers) => response.data.jsonString);
            console.log('update')
            setCurrentPage((prev) => prev + 1);
            break;
          default:
            setResearches((prevUsers) => response.data.jsonString);
            setCurrentPage((prev) => prev + 1);
        }
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

  const [isOpen, setIsOpen] = useState(false);
  /*
     const fetchMoreData = () => {
       setTimeout(() => {
         setItems((prevItems) => [
           ...prevItems,
           ...generateData(prevItems.length),
         ]);
       }, 1500);
     };
	 */

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
        Header: "Հետազոտության տեսակը",
        accessor: "research",
        sortable: true,
      },
      {
        Header: "Դասակարգ",
        accessor: "category_name",
      },
      {
        Header: "Գործողություններ",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-placement="top"
                title="Edit"
                href="edit-contact.html"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="edit" />
                  </span>
                </span>
              </a>
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
        data: researches,
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
                    <h1>Հետ․ տեսակներ</h1>
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
                      Ավելացնել նոր
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setIsOpen(true)}>
                        Հետազոտություն
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {isOpen && (
                    <AddResearch
                      //handleSubmit={handleSubmit}
                      //onRoleSelect={}
                      //onRoleDelete={}
                      //onAdd={onAdd}
                      //handleChangeFile={handleChangeFile}
                      //handleDrop={handleDrop}
                      //handleDragEmpty={handleDragEmpty}
                      handleToggleCreateModal={handleToggleCreateModal}
                      //imageUrl={imageUrl}
                      user={user}
                      firstname={firstname}
                      lastname={lastname}
                      pwd={pwd}
                      roles={roles}
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
                      dataLength={researches.length}
                      next={()=>getResearches('check')}
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
                                  //className="sorting"
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
                        {researches?.length && (
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

export default Researchlists;
