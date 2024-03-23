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
import { Button } from "react-bootstrap";
const customAppointData = [
  "10:00AM",
  "10:15AM",
  "10:30AM",
  "10:45AM",
  "11:00AM",
  "11:15AM",
  "11:30AM",
  "11:45AM",
  "10:00AM",
  "10:15AM",
  "10:30AM",
  "10:45AM",
  "11:00AM",
  "11:15AM",
  "11:30AM",
  "11:45AM",
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
  const [selectedOption, setSelectedOption] = useState(null);

  
  const handleRadioChange = (index) => {
    setSelectedOption(index);
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
            <div
              className="d-flex justify-content-between align-items-center flex-column"
              style={{
                backgroundColor: "#dae4ed",
                padding: "50px 50px 0 50px",
              }}
            >
              <section
                style={{
                  backgroundColor: "white",
                  // margin: "50px 50px 0 50px",
                  width: "100%",
                  borderRadius: "10px",
                }}
              >
                <div className="d-flex m-5">
                  <div>
                    <img
                      src={doctorSamplePhoto}
                      alt="doctorPhoto"
                      style={{
                        borderRadius: "0 20px 0 20px",
                        height: "350px",
                        width: "250px",
                      }}
                    />
                  </div>
                  <div className="ms-4">
                    <p style={{ fontSize: "2.5rem", color: "#4eafcb" }}>
                      {doctorDetails.doctorName}
                    </p>
                    <p style={{ fontSize: "1.5rem" }}>
                      {doctorDetails.qualification}
                    </p>
                    <p style={{ fontSize: "1.5rem" }}>
                      {doctorDetails.specialty}
                    </p>
                    <div className="d-flex">
                      <img
                        src={mobileSvg}
                        width="25px"
                        height="25px"
                        alt="mobile"
                        className="me-2"
                      />
                      <p style={{ fontSize: "1.2rem" }}>
                        {doctorDetails.contact?.phone}
                      </p>
                    </div>
                    <div className="d-flex">
                      <img
                        src={emailSvg}
                        width="25px"
                        height="25px"
                        alt="email"
                        className="me-2"
                      />
                      <p style={{ fontSize: "1.2rem" }}>
                        {doctorDetails.contact?.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-flex m-5 justify-content-around align-items-center">
                  <div className="d-flex" style={{ fontSize: "1.3rem" }}>
                    <div className="d-flex flex-column justify-content-end">
                      <p>Նույնականացման համար:</p>
                      <div className="separator-full m-0"></div>

                      <p>Լիցենզիայի համար:</p>
                      <div className="separator-full m-0"></div>

                      <p>Գրանցման ամսաթիվ:</p>
                      <div className="separator-full m-0"></div>

                      <p>Ծնվել է:</p>
                      <div className="separator-full m-0"></div>

                      <p>Սեռ:</p>
                      <div className="separator-full m-0"></div>

                      <p>Հասցե:</p>
                      <div className="separator-full m-0"></div>

                      <p>Լրացուցիչ կոնտակտ:</p>
                      <div className="separator-full m-0"></div>

                      <p>Լրացուցիչ կոնտակտի հեռախոս:</p>
                      <div className="separator-full m-0"></div>

                      <p>Ծածկանուն:</p>
                      <div className="separator-full m-0"></div>
                    </div>
                    <div className="ms-3">
                      <p>{doctorDetails.doctorId}</p>
                      <div className="separator-full m-0"></div>

                      <p>{doctorDetails.licenseNumber}</p>
                      <div className="separator-full m-0"></div>

                      <p>{doctorDetails.createdAt}</p>
                      <div className="separator-full m-0"></div>

                      <p>{doctorDetails.dateOfBirth}</p>
                      <div className="separator-full m-0"></div>

                      <p>{doctorDetails.gender}</p>
                      <div className="separator-full m-0"></div>

                      <p>
                        {doctorDetails.contact?.address?.city},{" "}
                        {doctorDetails.contact?.address?.street},{" "}
                        {doctorDetails.contact?.address?.zipCode}
                      </p>
                      <div className="separator-full m-0"></div>

                      <p>{doctorDetails.emergencyContactName}</p>
                      <div className="separator-full m-0"></div>

                      <p>{doctorDetails.emergencyContactNumber}</p>
                      <div className="separator-full m-0"></div>

                      <p>{doctorDetails?.username}</p>
                    </div>
                  </div>
                </div>
              </section>

              <div
                className="doctor_appointment d-flex justify-content-between "
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  marginTop: "1rem",
                  borderRadius: "10px",
                }}
              >
                <section
                  style={{
                    backgroundColor: "white",
                    margin: "10px 50px 50px 50px",
                    width: "100%",
                    borderRadius: "5px",
                    boxShadow: " 3px 3px  5px 3px #C5CDD4",
                    display:'flex'
                  }}
                >
                  <div className="d-flex justify-content-between p-2 flex-column">
                    <header className="d-flex justify-content-between">
                      <h3>November 06, 2023</h3>
                      <Button>Saturday</Button>
                    </header>
                    <div className="separator m-0"></div>

                    <main style={{display:'flex',flexWrap:'wrap'}}>
                      {customAppointData &&
                        customAppointData.map((el, index) => {
                          return (
                            <div key={index}
                              style={{
                                width: '80px',
              height: '25px',
              padding: '0 .2rem',
              backgroundColor:selectedOption === index ? '#d7da39' : '#074367',
              borderRadius: '.3rem',
              margin: '.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              alignItems: 'center',
              textDecoration: selectedOption === index ?'line-through':'none'
              
                              }}
                            >
                              <input type="radio"
                              style={{cursor:'pointer'}}
              checked={selectedOption === index}
              onChange={() => handleRadioChange(index)} />
                              <span
                                style={{
                                  color: "#fff" || "#000",
                                  fontSize: ".8rem",
                                }}
                              >
                                {el}
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
                            backgroundColor: "#074367",
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
                            backgroundColor: "#d7da39",
                            borderRadius: ".3rem",
                            marginRight: ".3rem",
                          }}
                        ></div>
                        <span>Հասանելի չէ</span>
                      </div>
                    </footer>
                  </div>
                </section>
                <section
                  style={{
                    backgroundColor: "white",
                    margin: "10px 50px 50px 50px",
                    width: "100%",
                    borderRadius: "5px",
                    boxShadow: " 3px 3px  5px 3px #C5CDD4",
                  }}
                >
                  <div className="d-flex justify-content-between p-2 flex-column">
                    <header className="d-flex justify-content-between ">
                      <h3>November 06, 2023</h3>
                      <Button>Saturday</Button>
                    </header>
                    <div className="separator m-0"></div>

                    <main>asdas</main>
                    <div className="separator m-0"></div>
                    <footer className="d-flex justify-content-center">
                      <div className="d-flex" style={{ marginRight: "30px" }}>
                        <div
                          className="square"
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: "#074367",
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
                            backgroundColor: "#d7da39",
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
            </div>
          </>
        )}
      </Suspense>
    </>
  );
}

export default DoctorDetails;
