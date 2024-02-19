/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useMemo, useEffect } from "react";
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
import asd from "../../dist/img/doctorSamplePhoto.jpg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import mobileSvg from "../../dist/svg/mobileSvg.svg"
import emailSvg from "../../dist/svg/emailSvg.svg"
const customData = [
  {
    date: "15.06.2021",
    researches: [
      {
        researchName: "Կրեատինինկինազա",
        analysisResult: 8.88,
        referenceRange: "4.0-10.0",
        units: "10^9/L",
        shortName: "WBC",
      },
      {
        shortName: "RBC",
        researchName: "Էրիթրոցիտների ընդհանուր քանակ",
        analysisResult: 6.09,
        referenceRange: ["men 4.0-10.0", "women 4,6-6,2"],
        units: "10^9/L",
      },
    ],
  },
  {
    date: "04.11.2023",
    researches: [
      {
        shortName: "WBC",
        researchName: "Լեյկոցիտների ընդհանուր քանակ",
        analysisResult: 8.88,
        referenceRange: "4.0-10.0",
        units: "10^9/L",
      },
      {
        shortName: "RBC",
        researchName: "Էրիթրոցիտների ընդհանուր քանակ",
        analysisResult: 6.09,
        referenceRange: ["men 4.0-10.0", "women 4,6-6,2"],
        units: "10^9/L",
      },
      {
        shortName: "MCV ",
        researchName: "Էրիթրոցիտի միջին ծավալը փորձանմուշի  ընդհանուր ծավալում",
        analysisResult: 83.7,
        referenceRange: "80-100",
        units: "fl",
      },
      {
        shortName: "WBC",
        researchName: "Լեյկոցիտների ընդհանուր քանակ",
        analysisResult: 8.88,
        referenceRange: "4.0-10.0",
        units: "10^9/L",
      },
      {
        shortName: "WBC",
        researchName: "Լեյկոցիտների ընդհանուր քանակ",
        analysisResult: 8.88,
        referenceRange: "4.0-10.0",
        units: "10^9/L",
      },
      {
        shortName: "WBC",
        researchName: "Լեյկոցիտների ընդհանուր քանակ",
        analysisResult: 8.88,
        referenceRange: "4.0-10.0",
        units: "10^9/L",
      },
    ],
  },
];
function DoctorDetails() {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [research, setResearch] = useState([]);
  const [patientDetails, setPatientDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(
    Math.round((window.innerHeight / 100) * 1.5)
  );
  const pageCount = 1;
  //const pageCount = Math.ceil(useersCount/usersPerPage)
  const handleOpenModal = (data) => {
    setIsOpen(true);
    setResearch((prev) => data.researches);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(`/doctors/1`);

        console.log("**********");
        console.log("response", response);
        console.log("**********");

        setPatientDetails((prevUsers) => response.data.jsonString);
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
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#dae4ed",  }}
      >
        <section
          style={{
            backgroundColor: "white",
            margin: "50px",
            width: "100%",
            borderRadius:'10px'
          }}
        >
          <div className="d-flex m-5">
            <div>
              <img
                src={asd}
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
                Անահիտ Սիմոնյան Կարենի
              </p>
              <p style={{ fontSize: "1.5rem" }}>
                Բժշկական Գիտությունների թեկնածու
              </p>
              <p style={{ fontSize: "1.5rem" }}>Մաշկաբան</p>
              <div className="d-flex">
                <img src={mobileSvg} width='25px' height="25px" alt="mobile" className="me-2"/>
                <p style={{ fontSize: "1.2rem" }}>+37495887788</p>
              </div>
              <div className="d-flex">
              <img src={emailSvg} width='25px' height="25px" alt="email" className="me-2"/>
                <p style={{ fontSize: "1.2rem" }}>anahit.simonyan@example.com</p>
              </div>
            </div>
          </div>
          <div className="d-flex m-5 justify-content-around align-items-center">
            <div className="d-flex" style={{ fontSize: "1.3rem" }}>
              <div className="d-flex flex-column justify-content-end" >
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
              </div>
              <div className="ms-3">
                <p>1</p>
                <div className="separator-full m-0"></div>                  

                <p>789988</p>
                <div className="separator-full m-0"></div>                  

                <p>2024-01-24</p>
                <div className="separator-full m-0"></div>                  

                <p>1975-05-26</p>
                <div className="separator-full m-0"></div>                  

                <p>Իգական</p>
                <div className="separator-full m-0"></div>                  

                <p>Երևան, Բաբայան 15/2-1, 4875</p>
                <div className="separator-full m-0"></div>                  

                <p>Նարեկ Կարապետյան</p>
                <div className="separator-full m-0"></div>                  

                <p>+37495887788</p>
              </div>
              
              
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default DoctorDetails;
