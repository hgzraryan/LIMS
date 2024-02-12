/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FeatherIcon from "feather-icons-react";
import Loading from "../Loading";
import { Dropdown } from "react-bootstrap";
import useGetData from "../../hooks/useGetData";
import useDeleteData from "../../hooks/useDeleteData";
import DiagnosticsTable from "../viewTables/DiagnosticsTable";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

import AddDiagnostic from "./AddDiagnostic";
import { selectDiagnosticsCount} from "../../redux/features/diagnostics/diagnosticsCountSlice";
import { selectResearches } from "../../redux/features/researches/researchesSlice";
import { selectPatients } from "../../redux/features/patients/patientsSlice";
const Diagnostics_URL = "/diagnostics";
//const PATIENTS_URL = "/patients";
//const GET_RESEARCHES = "/researchLists";

const Diagnostics = () => {
  //const [researchesState] = useGetResearchList(GET_RESEARCHES)
  const researchesState= useSelector(selectResearches)
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const confirmDiagnosticRef = useRef("");
  const diagnosticsCount = useSelector(selectDiagnosticsCount)
  const [currentPage, setCurrentPage] = useState(0);  
  const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100) * 1.5));
  const pageCount = Math.ceil(diagnosticsCount/usersPerPage)
  const patients = useSelector(selectPatients)

  const {
    data: diagnostics,
    setData: setDiagnostics,
    getData: getDiagnostics,
  } = useGetData(Diagnostics_URL,currentPage,usersPerPage);

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
  // const {
  //   data: patients,
  // } = useGetData(PATIENTS_URL);

  const { handleDeleteItem } = useDeleteData(
    Diagnostics_URL,
    confirmDiagnosticRef,
    selectedItem,
    setSelectedItemId,
    diagnostics,
    setDiagnostics,
    "name"
  );
   //-------------------------PAGINATION---------------------------//
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
                    <AddDiagnostic
                      handleToggleCreateModal={handleToggleCreateModal}
                      getDiagnostics={() => getDiagnostics()}
                      researchesState={researchesState}
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
                     
                      <DiagnosticsTable
                        confirmRef={confirmDiagnosticRef}
                        selectedItem={selectedItem}
                        selectedItemId={selectedItemId}
                        setSelectedItemId={setSelectedItemId}
                        setSelectedItem={setSelectedItem}
                        diagnostics={diagnostics}
                        handleDeleteItem={handleDeleteItem}
                        setDiagnostics={setDiagnostics}
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
export default Diagnostics;
