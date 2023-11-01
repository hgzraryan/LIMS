/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FeatherIcon from "feather-icons-react";
import LoadingSpinner from "../LoadingSpinner";
import ReactPaginate from "react-paginate";
import Loading from "../Loading";
import { useSortBy, useTable } from "react-table";
import AddEquipment from "../views/AddEquipment";
import { Dropdown } from "react-bootstrap";
import useDeleteData from "../../hooks/useDeleteData";
import useGetData from "../../hooks/useGetData";
import ComponentToConfirm from "../ComponentToConfirm";

const EQUIPMENTS_URL = "/equipmentList";

const Equipments = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const confirmResearchRef = useRef("");

  const handleOpenModal = (data) => {
    setSelectedItemId(true);
    setSelectedItem((prev) => data);
    console.log(data);
  };
  const handleCloseModal = () => {
    setSelectedItemId(null);
  };
  /*------------------------------------------------*/
  const handleToggleCreateModal = (value) => {
    setIsOpen((prev) => value);
  };
  const {
    data: equipments,
    setData: setEquipments,
    hasMore,
    getData: getEquipments,
  } = useGetData(EQUIPMENTS_URL);

  const { handleDeleteItem } = useDeleteData(
    "/equipments",
    confirmResearchRef,
    selectedItem,
    setSelectedItemId,
    equipments,
    setEquipments,
    "username" //TODO need to correct for prices
  );
  //-------------------------
  const refreshPage = () => {
    let paglink = document.querySelectorAll(".page-item");
    paglink[0].firstChild.click();
  };
  //-------------------
  const [showCreateNew, setIsActive] = useState(false);
  const CreateNew = (event) => {
    setIsActive((current) => !current);
  };

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
        Header: "Սարքի անվանումը",
        accessor: "name",
        sortable: true,
      },
      {
        Header: "Նկարագիր",
        accessor: "description",
        sortable: true,
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
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                data-bs-toggle="tooltip"
                onClick={() => handleOpenModal(row.values)}
                data-placement="top"
                title=""
                data-bs-original-title="Delete"
                href="#"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <FeatherIcon icon="trash" />
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
        data: equipments,
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
                    <h1>Սարքավորումներ</h1>
                  </a>
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
                        Սարքավորում
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {isOpen && (
                    <AddEquipment
                      handleToggleCreateModal={handleToggleCreateModal}
                      getEquipments={() => getEquipments()}
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
                      dataLength={equipments.length}
                      next={()=>getEquipments("check")}
                      hasMore={hasMore}
                      loader={<Loading />}
                      scrollableTarget="scrollableDiv"
                      endMessage={
                        <p>Տվյալներ չեն հայտնաբերվել բեռնելու համար:</p>
                      }
                    >
                      <table className="table table-striped">
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
                        {equipments?.length && (
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
                            <ComponentToConfirm
                              handleCloseModal={handleCloseModal}
                              handleOpenModal={handleOpenModal}
                              handleDeleteItem={handleDeleteItem}
                              selectedItemId={selectedItemId}
                              confirmUserRef={confirmResearchRef}
                              userName={selectedItem.name}
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

export default Equipments;
