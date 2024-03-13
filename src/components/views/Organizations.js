/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import FeatherIcon from "feather-icons-react";
import LoadingSpinner from "../LoadingSpinner";
import ReactPaginate from "react-paginate";
import Loading from "../Loading";
import { Dropdown } from "react-bootstrap";
import useGetData from "../../hooks/useGetData";
import useDeleteData from "../../hooks/useDeleteData";
import AddOrganization from "../addViews/AddOrganizations";
import OrganizationsTable from "../viewTables/OrganizationsTable";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSelector } from "react-redux";
import { selectOrganisationCount } from "../../redux/features/organisation/organisationCountSlice";
import { ORGANIZATIONS_URL } from "../../utils/constants";

const Organizations = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const confirmOrganizationRef = useRef("");
  const organisationCount = useSelector(selectOrganisationCount)
  const [currentPage, setCurrentPage] = useState(0);  
  const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
  const pageCount = Math.ceil(organisationCount/usersPerPage)
  
  const {
    data: organizations,
    setData: setOrganizations,
    getData: getOrganizations,
  } = useGetData(ORGANIZATIONS_URL,currentPage,usersPerPage);
  
  const handleOpenModal = (user) => {
    setSelectedItemId(true);
    setSelectedItem((prev) => user);
  };
  const handleCloseModal = () => {
    setSelectedItemId(null);
  };
  /*------------------------------------------------*/
  const handleToggleCreateModal = (value) => {
    setIsOpen((prev) => value);
  };

  const { handleDeleteItem } = useDeleteData(
    ORGANIZATIONS_URL,
    confirmOrganizationRef,
    selectedItem,
    setSelectedItemId,
    organizations,
    setOrganizations,
    "name",
    getOrganizations
  );
  //-------------------------

  const refreshPage = () => {
    let paglink = document.querySelectorAll(".page-item");
    paglink[0].firstChild.click();
  };
  //-------------------
 //-------------------------PAGINATION---------------------------//
 const handlePageClick = ({ selected: selectedPage }) => {
   setCurrentPage(selectedPage);
   //updateUsersCount();
}
 //--------------------------------------------------------------//
  //-------------------
  const [showCreateNew, setIsActive] = useState(false);
  const CreateNew = (event) => {
    setIsActive((current) => !current);
  };

  //-------------------

  return (
    <HelmetProvider>
    <div>
	<Helmet>
		<meta charSet="utf-8" />
		<title>Vteam LIMS | Organisations</title>
		<link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
	</Helmet>
      <div className="contactapp-wrap">
        <div className="contactapp-content">
          <div className="contactapp-detail-wrap w-100">
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
                    <h1>Պատվիրատուներ</h1>
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
                      Պատվիրատու
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {isOpen && (
                    <AddOrganization
                      handleToggleCreateModal={handleToggleCreateModal}
                      getOrganizations={() => getOrganizations()}
                    />
                  )}
                </div>
              </div>
              <div className="contact-options-wrap">
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
              </div>
            </header>
            <div className="contact-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="contact-list-view">
                  <div
                    id="scrollableDiv"
                    style={{ height: "80vh", overflow: "auto" }}
                  >
                      <OrganizationsTable
                        confirmRef={confirmOrganizationRef}
                        selectedItem={selectedItem}
                        selectedItemId={selectedItemId}
                        handleDeleteItem={handleDeleteItem}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                        organizations={organizations}
                        setOrganizations={setOrganizations}
                        getOrganizations={getOrganizations}
                      />
                    <ReactPaginate
                                           previousLabel = {"Հետ"}    
                                           nextLabel = {"Առաջ"}
                                            pageCount = {pageCount}
                                            onPageChange = {handlePageClick}
                                            initialPage = {0}
                                            containerClassName={"pagination"}
                                            pageLinkClassName = {"page-link"}
                                            pageClassName = {"page-item"}
                                            previousLinkClassName={"page-link"}
                                            nextLinkClassName={"page-link"}
                                            disabledLinkClassName={"disabled"}
                                            //activeLinkClassName={"active"}
                                            activeClassName={"active"}
											/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </HelmetProvider>
  );
};

export default Organizations;
