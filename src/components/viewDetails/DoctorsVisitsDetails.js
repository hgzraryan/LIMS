import React, { Suspense, useEffect, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';

function DoctorsVisitsDetails() {
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
               
              </div>
              <div className="ms-4">
                
              </div>
            </div>
            <div className="d-flex m-5 justify-content-around align-items-center">
              <div className="d-flex" style={{ fontSize: "1.3rem" }}>
                
                <div className="ms-3">
                DoctorsVisitsDetails
                </div>
                
                
              </div>
            </div>
          </section>
        </div>      
      )}
      </Suspense>
      </>
    );
}

export default DoctorsVisitsDetails
