/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FeatherIcon from "feather-icons-react";
import Loading from "../Loading";
import { Dropdown } from "react-bootstrap";
import useGetData from "../../hooks/useGetData";
import useDeleteData from "../../hooks/useDeleteData";
import ResearchesTable from "../viewTables/ResearchesTable";
import AddResearch from "./AddResearch";
import ReactPaginate from "react-paginate";
import { useGetResearchList } from "../../hooks/useGetResearchList";
const RESEARCHES_URL = "/research";
const PATIENTS_URL = "/patients";
const GET_RESEARCHES = "/researchLists";

const Researches = () => {
  const [researchState] = useGetResearchList(GET_RESEARCHES)
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const confirmResearchesRef = useRef("");

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
  const {
    data: researches,
    setData: setResearches,
    getData: getResearches,
  } = useGetData(RESEARCHES_URL);
  const {
    data: patients,
    setData: setPatients,
  } = useGetData(PATIENTS_URL);

  const { handleDeleteItem } = useDeleteData(
    RESEARCHES_URL,
    confirmResearchesRef,
    selectedItem,
    setSelectedItemId,
    researches,
    setResearches,
    "name"
  );
   //-------------------------PAGINATION---------------------------//
   const [currentPage, setCurrentPage] = useState(0);  
   const [usersPerPage, setUsersPerPage] = useState(10);
  
 
   const pagesVisited = currentPage * usersPerPage
   const currentResearches = researches.slice(pagesVisited,pagesVisited+usersPerPage)
   const pageCount = Math.ceil(researches.length/usersPerPage)
 
   const handlePageClick = ({ selected: selectedPage }) => {
     setCurrentPage(selectedPage);
     //updateUsersCount();
 }
   //--------------------------------------------------------------//
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
                    <h1>Ախտորոշումներ</h1>
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
                        Ախտորոշում
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {isOpen && (
                    <AddResearch
                      handleToggleCreateModal={handleToggleCreateModal}
                      getResearches={() => getResearches()}
                      researchState={researchState}
                      patients={patients}
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
                     
                      <ResearchesTable
                        confirmRef={confirmResearchesRef}
                        selectedItem={selectedItem}
                        selectedItemId={selectedItemId}
                        setSelectedItemId={setSelectedItemId}
                        setSelectedItem={setSelectedItem}
                        researches={currentResearches}
                        handleDeleteItem={handleDeleteItem}
                        setResearches={setResearches}
                        handleCloseModal={handleCloseModal}
                        handleOpenModal={handleOpenModal}
                      />
                         <ReactPaginate
                                            previousLabel = {"Previous"}    
                                            nextLabel = {"Next"}
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
  );
};
export default Researches;
