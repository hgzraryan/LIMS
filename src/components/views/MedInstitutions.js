/* eslint-disable jsx-a11y/anchor-is-valid */
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import React, { useRef, useState } from 'react'
import ReactPaginate from 'react-paginate';
import MedInstitutionsTable from '../viewTables/MedInstitutionsTable';
import { Dropdown } from "react-bootstrap";
import AddMedinstitution from '../addViews/AddMedinstitution';
import { MEDINSTITUTIONS_URL } from '../../utils/constants';
import useDeleteData from '../../hooks/useDeleteData';
import useGetData from '../../hooks/useGetData';


function MedInstitutions() {
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const confirmgetMedInstitutionsRef = useRef("");
    const [currentPage, setCurrentPage] = useState(0);  
    const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
    // const medInstitutionsCount = useSelector(selectMedinstitutions)
    // const pageCount = Math.ceil(medInstitutionsCount/usersPerPage)
    
    const {
      data: medInstitutions,
      setData: setMedInstitutions,
      getData: getMedInstitutions,
    } = useGetData(MEDINSTITUTIONS_URL,currentPage,usersPerPage);
    const handleToggleCreateModal = (value) => {
      setIsOpen((prev) => value);
    };
  
    const { handleDeleteItem } = useDeleteData(
      MEDINSTITUTIONS_URL,
      confirmgetMedInstitutionsRef,
      selectedItem,
      setSelectedItemId,
      medInstitutions,
      setMedInstitutions,
      'institutionName',
      getMedInstitutions
    );
    const handleCloseModal = () => {
      setSelectedItemId(null);
    };
    const handleOpenModal = (user) => {
        setSelectedItemId(true);
        setSelectedItem((prev) => user);
      };
      const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
        //updateUsersCount(); 
       }
       const refreshPage = () => {
        let paglink = document.querySelectorAll(".page-item");
        paglink[0].firstChild.click();
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
                    <h1>Բուժ. հաստատություններ</h1>
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
                      Բուժ․ հաստատություն
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {isOpen && (
                    <AddMedinstitution
                      handleToggleCreateModal={handleToggleCreateModal}
                      //getMedInstitutions={() => getMedInstitutions()}
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
                      <MedInstitutionsTable
                        confirmRef={confirmgetMedInstitutionsRef}
                        selectedItem={selectedItem}
                        selectedItemId={selectedItemId}
                        handleDeleteItem={handleDeleteItem}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                        medInstitutions={medInstitutions}
                        setMedInstitutions={setMedInstitutions}
                        //getMedInstitutions={getMedInstitutions}
                      />
                      <ReactPaginate
                        previousLabel = {"Հետ"}    
                        nextLabel = {"Առաջ"}
                        pageCount = {1}
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
  )
}

export default MedInstitutions
