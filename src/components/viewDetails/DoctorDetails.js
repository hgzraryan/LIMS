/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import ComponentToConfirm from "../ComponentToConfirm";
import {
  useBlockLayout,
  useFilters,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import doctorSamplePhoto from "../../dist/img/doctorSamplePhoto.jpg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import mobileSvg from "../../dist/svg/mobileSvg.svg";
import emailSvg from "../../dist/svg/emailSvg.svg";
import LoadingSpinner from "../LoadingSpinner";
import missingAvatar from "../../dist/img/Missing.svg";
import profileBgImg from "../../dist/img/profile-bg.jpg";

import { Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import moment from "moment";
import MyBigCalendar from "../MyBigCalendar";
const customAppointData = [
  { time: "10:00AM", available: true },
  { time: "10:15AM", available: true },
  { time: "10:30AM", available: true },
  { time: "10:45AM", available: true },
  { time: "11:00AM", available: true },
  { time: "11:15AM", available: true },
  { time: "11:30AM", available: true },
  { time: "11:45AM", available: true },
  { time: "10:00AM", available: true },
  { time: "10:15AM", available: true },
  { time: "10:30AM", available: true },
  { time: "10:45AM", available: true },
  { time: "11:00AM", available: true },
  { time: "11:15AM", available: true },
  { time: "11:30AM", available: true },
  { time: "11:45AM", available: true },
];
function DoctorDetails() {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [research, setResearch] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [usersPerPage, setUsersPerPage] = useState(
    Math.round((window.innerHeight / 100) * 1.5)
  );
  const pageCount = 1;
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(customAppointData);
  const [activeLink, setActiveLink] = useState('tab_summery');

  const [pageTab, setPageTab] = useState('tab_summery')

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
    setPageTab(linkId)
  };

  const handleRadioChange = (index) => {
    const updatedSchedule = [...customAppointData];
    updatedSchedule[index].available = !updatedSchedule[index].available;
    setSelectedOption(updatedSchedule);
  };
  //const pageCount = Math.ceil(useersCount/usersPerPage)
  const handleOpenModal = (data) => {
    setIsOpen(true);
    setResearch((prev) => data.researches);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(`/doctors/${id}`);
        setIsLoading(false);
        setDoctorDetails((prevUsers) => response.data);
        // setCurrentPage((prev) => prev = 1);
      } catch (err) {
        console.error(err);
        //navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getData();
  }, []);



  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="hk-pg-body p-2 " >
              <div className="profile-wrap "  >
                <div className="profile-img-wrap">
                  <img
                    className="img-fluid rounded-5"
                    src={profileBgImg}
                    alt="Description"
                  />
                </div>
                <div className="profile-intro">
                  <div className="card card-flush mw-400p bg-transparent ">
                    <div className="card-body">
                      <div className="avatar avatar-xxl avatar-rounded position-relative mb-2">
                        <img
                          src={missingAvatar}
                          alt="user"
                          className="avatar-img border border-4 border-white"
                        />
                        <span className="badge badge-indicator badge-success  badge-indicator-xl position-bottom-end-overflow-1 me-1"></span>
                      </div>
                      <h4>
                        {" "}
                        {doctorDetails.doctorName}
                        <i
                          className="bi-check-circle-fill fs-6 text-blue"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Top endorsed"
                        ></i>
                      </h4>

                      <ul className="list-inline fs-7 mt-2 mb-0">
                        <li className="list-inline-item d-sm-inline-block d-block mb-sm-0 mb-1 me-3">
                          <img
                            src={mobileSvg}
                            width="15px"
                            height="15px"
                            alt="mobile"
                            className="me-2"
                          />
                          <span style={{ fontSize: "1.1rem" }}>
                            {doctorDetails?.contact?.phone || ""}
                          </span>
                        </li>

                        <li className="list-inline-item d-sm-inline-block d-block mb-sm-0 mb-1 me-3">
                          <img
                            src={emailSvg}
                            width="15px"
                            height="15px"
                            alt="email"
                            className="me-2"
                          />
                          <span style={{ fontSize: "1.1rem" }}>
                            {doctorDetails?.contact?.email || ""}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <header className="profile-header">
                  <ul className="nav nav-line nav-tabs nav-icon nav-light h-100 d-md-flex d-none">
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeLink === "tab_summery" ? "active" : ""
                          }`}
                        onClick={() => handleLinkClick("tab_summery")}
                        data-bs-toggle="tab"
                        href="#"
                      >
                        <span className="nav-icon-wrap">
                          <span className="feather-icon">
                            <FeatherIcon icon="zap" />
                          </span>
                        </span>
                        <span className="nav-link-text">Գլխավոր</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeLink === "tab_calendar" ? "active" : ""
                          }`}
                        onClick={() => handleLinkClick("tab_calendar")}
                        data-bs-toggle="tab"
                        href="#"
                      >
                        <span className="nav-icon-wrap">
                          <span className="feather-icon">
                            <FeatherIcon icon="zap" />
                          </span>
                        </span>
                        <span className="nav-link-text">Օրացույց</span>
                      </a>
                    </li>
                  </ul>
                </header>
                <div className="row">
                  {pageTab === "tab_summery" && (
                    <>
                      <div className="col-lg-4 mb-lg-0 mb-3">
                        <div className="card card-border mb-lg-4 mb-3">
                          <div className="card-header card-header-action"></div>

                          <ul className="list-group list-group-flush">
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-geo-alt-fill text-disabled me-2"></i>
                                <span className="text-muted">Նույնականացման համար:</span>
                              </span>
                              <span className="ms-2">
                                {doctorDetails?.doctorId}
                              </span>
                            </li>
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-geo-alt-fill text-disabled me-2"></i>
                                <span className="text-muted">Հասցե:</span>
                              </span>
                              <span className="ms-2">
                                {doctorDetails?.contact?.address?.country + ", " + doctorDetails?.contact?.address?.city}
                              </span>
                            </li>
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-calendar-check-fill text-disabled me-2"></i>
                                <span className="text-muted">Սեռ:</span>
                              </span>
                              <span className="ms-2">{doctorDetails?.gender === 'Male' ? 'Արական' : 'Իգական'}</span>
                            </li>
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-house-door-fill text-disabled me-2"></i>
                                <span className="text-muted">Գրանցման ամսաթիվ:</span>
                              </span>
                              <span className="ms-2">{moment.utc(doctorDetails?.joiningDate).format('DD-MM-YYYY HH:mm')}</span>
                            </li>
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-briefcase-fill text-disabled me-2"></i>
                                <span className="text-muted">Ծննդյան ամսաթիվ:</span>
                              </span>
                              <span className="ms-2">{moment.utc(doctorDetails?.dateOfBirth).format('DD-MM-YYYY')}</span>
                            </li>
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-briefcase-fill text-disabled me-2"></i>
                                <span className="text-muted">Լիցենզիայի համար:</span>
                              </span>
                              <span className="ms-2">{doctorDetails?.licenseNumber}</span>
                            </li>
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-briefcase-fill text-disabled me-2"></i>
                                <span className="text-muted">Ընտանեկան կարգավիճակ:</span>
                              </span>
                              <span className="ms-2">{doctorDetails?.maritalStatus === 'married' ? 'Ամուսնացած' :'Չամուսնացած'}</span>
                            </li>
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-briefcase-fill text-disabled me-2"></i>
                                <span className="text-muted">Մասնագիտացում:</span>
                              </span>
                              <span className="ms-2">{doctorDetails?.specialty}</span>
                            </li>
                            <li className="list-group-item border-0">
                              <span>
                                <i className="bi bi-briefcase-fill text-disabled me-2"></i>
                                <span className="text-muted">Որակավորում:</span>
                              </span>
                              <span className="ms-2">{doctorDetails?.qualification}</span>
                            </li>


                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-8 ">
                          <div style={{ height: 600}}>
                            <MyBigCalendar/>
                          </div>
                      </div>
                      {/* <div className="col-lg-8">
                        <div className="card card-border card-profile-feed mb-lg-4 mb-3">
                          <div className="card-header card-header-action">
                            <div className="media align-items-center">
                              <p>Ժամանակացույց</p>
                            </div>
                            <div className="card-action-wrap"></div>
                          </div>
                          <div className="card-body">
                            <section
                              style={{
                                backgroundColor: "white",
                                margin: "10px 50px 50px 50px",
                                // width: "100%",
                                borderRadius: "5px",
                                boxShadow: " 3px 3px  5px 3px #C5CDD4",
                                display: 'flex'
                              }}
                            >
                              <div className="d-flex justify-content-between p-2 flex-column">
                                <header className="d-flex justify-content-between">
                                  <h3>Մայիս 06, 2024</h3>
                                  <Button>Saturday</Button>
                                </header>
                                <div className="separator m-0"></div>

                                <main style={{ display: 'flex', flexWrap: 'wrap' }}>
                                  {selectedOption &&
                                    selectedOption.map((el, index) => {
                                      return (
                                        <div key={index}
                                          style={{
                                            width: '80px',
                                            height: '25px',
                                            padding: '0 .2rem',
                                            backgroundColor: el?.available === false ? 'rgb(93,60,85)' : 'rgb(10,110,126)',
                                            borderRadius: '.3rem',
                                            margin: '.5rem',
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                            textDecoration: el?.available === false ? 'line-through' : 'none'

                                          }}
                                        >
                                          <input
                                            type="radio"
                                            style={{ cursor: 'pointer' }}
                                            id={`slot-${index}`}
                                            name="appointment-slot"
                                            value={el.time}
                                            checked={!el.available}
                                            onChange={() => handleRadioChange(index)} />
                                          <span
                                            style={{
                                              color: "#fff" || "#000",
                                              fontSize: ".8rem",
                                            }}
                                          >
                                            {el.time}
                                          </span>
                                        </div>
                                      );
                                    })}
                                </main>
                                <div className="separator m-0"></div>
                                <footer className="d-flex justify-content-center">
                                  <div className="d-flex" style={{ marginRight: "30px" }}>
                                    <div
                                      className="square"
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        backgroundColor: "rgb(10,110,126)",
                                        borderRadius: ".3rem",
                                        marginRight: ".3rem",
                                      }}
                                    ></div>
                                    <p>Հասանելի է</p>
                                  </div>
                                  <div className="d-flex">
                                    <div
                                      className="square"
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        backgroundColor: "rgb(93,60,85)",
                                        borderRadius: ".3rem",
                                        marginRight: ".3rem",
                                      }}
                                    ></div>
                                    <span>Հասանելի չէ</span>
                                  </div>
                                </footer>
                              </div>
                            </section>
                            
                          
                          </div>
                          <div className="card-footer justify-content-between"></div>
                        </div>
                      </div> */}
                    </>
                  )}
                  {pageTab ==='tab_calendar' &&
                          
                          <div style={{ height: 700}}>
                            <MyBigCalendar/>
                          </div>
                        }
                </div>
              </div>
            </div>
            
          </>
        )}
      </Suspense>
    </>
  );
}

export default DoctorDetails;
