/* eslint-disable jsx-a11y/anchor-is-valid */
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import React, { useRef, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { selectDoctorCount } from '../../redux/features/doctor/doctorCountSlice';
import DoctorsVisitsTable from '../viewTables/DoctorsVisitsTable';
const CustomData=[
  {
      patientData:{
        name:"Անուշ Ռազմիկի Գաբրիելյան",
        email:"Anka1942@as.tu",
        phone:"+3748596584",
        //patient's all data
      },
      visitDate:"24-02-2024",
      doctorsName:"Կարինե Սամվելի Մանւկյան",
      doctorsAppointments:[
        {
          instructions:'Դիետիկ սնունդ',
          medicine:'Մեզիմ ֆոռտե',
          researches:['Արյան ընդհանուր հետազոտություն']
      }
    ],
    nextVisit:'24-03-2024',
  }
]
function DoctorsVisits() {
    const [doctorsVisits,setDoctorsVisits]= useState(CustomData)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedItemId, setSelectedItemId] = useState(null);
    const confirmDoctorsRef = useRef("");
    const doctorCount = useSelector(selectDoctorCount)
    const [currentPage, setCurrentPage] = useState(0);  
    const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100) * 1.5));
    const pageCount = Math.ceil(doctorCount/usersPerPage)
    const handlePageClick = ({ selected: selectedPage }) => {
       setCurrentPage(selectedPage);
       //updateUsersCount();
     };
     const handleOpenModal = (user) => {
      setSelectedItemId(true);
      setSelectedItem((prev) => user);
    };
    const handleCloseModal = () => {
      setSelectedItemId(null);
    };
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
                        <h1>Բժշկի այցելություններ</h1>
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
                            Այցելություն
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
    
                      {/* {isOpen && (
                        <AddVisit
                          handleToggleCreateModal={handleToggleCreateModal}
                          getDoctors={() => getDoctors()}
                        />
                      )} */}
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
                        <DoctorsVisitsTable
                          //confirmRef={confirmDoctorsRef}
                          selectedItem={selectedItem}
                          selectedItemId={selectedItemId}
                          //handleDeleteItem={handleDeleteItem}
                          handleOpenModal={handleOpenModal}
                          handleCloseModal={handleCloseModal}
                          doctorsVisits={doctorsVisits}
                          setDoctorsVisits={setDoctorsVisits}
                          //getDoctorsVisits={getDoctorsVisits}
                        />
                        <ReactPaginate
                                               previousLabel = {"Հետ"}    
                                               nextLabel = {"Առաջ"}
                                                pageCount = {4}
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

export default DoctorsVisits
