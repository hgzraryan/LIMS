/* eslint-disable jsx-a11y/anchor-is-valid */
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import DoctorsTable from "../viewTables/DoctorsTable";
import useGetData from "../../hooks/useGetData";
import useDeleteData from "../../hooks/useDeleteData";
import AddDoctor from "./AddDoctor";
import ReactPaginate from "react-paginate";
const DOCTORS_URL = "/doctors";
const tmpDoctors = [
  {
    name: "Vachik Gabrielyan",
    email: "Vach@mail.ru",
    speciality: "Վիրաբույժ",
    mobile: "+37488574859",
    joining_date: "2024-01-19",
    qualification: "AAA",
    license_number: "A5178-01",
    address: "ք․Երևան, Պարոնյան 5-4",
    gender: "Արական",
    date_of_birth: "1974-02-24",
    emergency_contact_name: "Բաբկեն Մկրտչյան",
    emergency_contact_number: "+37488458652",
    profile_picture_url: "url",
    is_active: "ակտիվ",
    created_at: "2024-01-19",
    updated_at: "----------",
  },
];
function Doctors() {
  const [doctors, setDoctors] = useState(tmpDoctors);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const confirmAgentsRef = useRef("");
  const handleOpenModal = (doctor) => {
    setSelectedItemId(true);
    setSelectedItem((prev) => doctor);
  };
  const handleCloseModal = () => {
    setSelectedItemId(null);
  };
  /*------------------------------------------------*/
  const handleToggleCreateModal = (value) => {
    setIsOpen((prev) => value);
  };
  //     const {
  //       data: doctors,
  //       setData: setDoctors,
  //       getData: getDoctors,
  //       count
  //     } = useGetData(DOCTORS_URL);
  //   console.log(doctors)
  //     const { handleDeleteItem } = useDeleteData(
  //       "/agents",
  //       confirmAgentsRef,
  //       selectedItem,
  //       setSelectedItemId,
  //       doctors,
  //       setDoctors,
  //       "name"
  //     );
  //-------------------------PAGINATION---------------------------//
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const pagesVisited = currentPage * usersPerPage;
  const currentDoctors = tmpDoctors.slice(
    pagesVisited,
    pagesVisited + usersPerPage
  );
  const pageCount = Math.ceil(doctors.length / usersPerPage);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
    //updateUsersCount();
  };
  //--------------------------------------------------------------//
  //-------------------------

  const refreshPage = () => {
    let paglink = document.querySelectorAll(".page-item");
    paglink[0].firstChild.click();
  };
  //-------------------
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
                    <h1>Բժիշկներ</h1>
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
                        Բժիշկ
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {isOpen && (
                    <AddDoctor
                      handleToggleCreateModal={handleToggleCreateModal}
                      //getDoctors={() => getDoctors()}
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
                    <DoctorsTable
                      confirmRef={confirmAgentsRef}
                      selectedItem={selectedItem}
                      selectedItemId={selectedItemId}
                      //handleDeleteItem={handleDeleteItem}
                      handleOpenModal={handleOpenModal}
                      handleCloseModal={handleCloseModal}
                      doctors={currentDoctors}
                      setDoctors={setDoctors}
                      //getDoctors={getDoctors}
                    />
                    //TODO need to check after Backend endpoit registration
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
  );
}

export default Doctors;
