/* eslint-disable jsx-a11y/anchor-is-valid */
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import React, { useRef, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import ReactPaginate from 'react-paginate'
import { Dropdown } from "react-bootstrap";
import useGetData from '../../hooks/useGetData';
import { useSelector } from 'react-redux';
import AddPackages from '../addViews/AddPackages';
import { PACKAGES_URL } from '../../utils/constants';
import PackagesTable from '../viewTables/PackagesTable';
import useDeleteData from '../../hooks/useDeleteData';

function Packages() {
    //const researchListCount = useSelector(selectResearchListCount)
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const confirmResearchRef = useRef("");  
    const [currentPage, setCurrentPage] = useState(0);  
    const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
    //const pageCount = Math.ceil(packagesCount/usersPerPage)
    // const {
    //     data: packages,
    //     setData: setPackages,
    //     refreshData
    //   } = useGetData(PACKAGES_URL,currentPage,usersPerPage);
      const handleToggleCreateModal = (value) => {
        setIsOpen((prev) => value);
      };

    //   const { handleDeleteItem } = useDeleteData(
    //     RESEARCHLISTS_URL,
    //     confirmResearchRef,
    //     selectedItem,
    //     setSelectedItemId,
    //     researchList,
    //     setResearches,
    //     "researchName",
    //     getResearches 
    //   );
    const handleOpenModal = (user) => {
        setSelectedItemId(true);
        setSelectedItem((prev) => user);
      };
      const handleCloseModal = () => {
        setSelectedItemId(null);
      };
      const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
        //updateUsersCount();
    }
    const refreshPage = () => {
        //refreshData()
        let paglink = document.querySelectorAll(".page-item");
        paglink[0]?.firstChild.click();
      };
  return (
    <HelmetProvider>
    <div>
      <div>

     <Helmet>
    <meta charSet="utf-8" />
    <title>Vteam LIMS | Researches Packages</title>
    <link rel="icon" type="image/x-icon" href="../dist/img/favicon.ico"></link>
    </Helmet>
      </div>
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
                <h1>Փաթեթների տեսակներ</h1>
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
                    Փաթեթ
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
              {isOpen && (
                <AddPackages
                handleToggleCreateModal={handleToggleCreateModal}
                //refreshData={() => refreshData()}

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
                     <PackagesTable
                    confirmRef={confirmResearchRef}
                    selectedItem={selectedItem}
                    selectedItemId={selectedItemId}
                    //handleDeleteItem={handleDeleteItem}
                    handleOpenModal={handleOpenModal}
                    handleCloseModal={handleCloseModal}
                    // researches={Packages}
                    // setResearches={setPackages}
                    // refreshData={refreshData}
                  />
                  <ReactPaginate
                    previousLabel = {"Հետ"}    
                    nextLabel = {"Առաջ"}
                    //pageCount = {pageCount}
                    onPageChange = {handlePageClick}
                    initialPage = {0}
                    pageRangeDisplayed={3}
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
  )
}

export default Packages
