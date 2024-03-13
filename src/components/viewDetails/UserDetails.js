 /* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Checkbox } from "../Checkbox";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { ColumnFilter } from "../ColumnFilter";
import { BiSolidInfoCircle } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MissingAvatar from "../../dist/img/Missing.svg";
import mobileSvg from "../../dist/svg/mobileSvg.svg";
import emailSvg from "../../dist/svg/emailSvg.svg";
import LoadingSpinner from "../LoadingSpinner";
import userSamplePhoto from "../../dist/img/userSample.jpg";

function UserDetails() {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate();
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${id}`);
        setIsLoading(false);
       // setUserDetails((prevUsers) => response.data.jsonString);
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
      <section
        className="d-flex  flex-column "
        style={{ backgroundColor: "#e2f4ff",height:'95vh'  }}
      >
        <article
          className="main "
          style={{
            backgroundColor: "white",
            margin: "30px 30px 30px 30px ",
            borderRadius: "30px",
            padding: "20px",
            flex:'3',
            display:'flex'
          }}
        >
          
      <div>
      <img
                src={userSamplePhoto}
                alt="doctorPhoto"
                style={{
                  borderRadius: "30px 0 0 30px",
                  height: "250px",
                  width: "250px",
                }}
              />
      </div>
      <div style={{marginLeft:'20px'}}>
        <h1 style={{ fontSize: "2.5rem", color: "#4eafcb"}}>
            Սեդրակ Կարապետյան
        </h1>
        <h6 style={{ opacity:'0.3',marginBottom:0 }}>Էլ․ հասցե</h6>
        <p style={{marginBottom:'1rem' }}>Seto@geil.com</p>
        <h6 style={{ opacity:'0.3',marginBottom:0 }}>Հեռախոս</h6>
        <p style={{marginBottom:'1rem' }}>+37485965214</p>
        <h6 style={{ opacity:'0.3',marginBottom:0 }}>Հասցե</h6>
        <p style={{marginBottom:'1rem' }}>ք․ Երևան, Նալբանդյան 25-12</p>
      </div>
         
        </article>
        <article
          className="main "
          style={{
            backgroundColor: "white",
            margin: "0 30px 30px 30px ",
            borderRadius: "30px",
            padding: "20px",
            flex:'3',
            display:'flex'
          }}
        >
          <div className="d-flex flex-column justify-content-end" >
                <p>Նույնականացման համար:</p>
                <div className="separator-full m-0"></div>                  

                <p>Ծնվել է:</p>
                <div className="separator-full m-0"></div>   

                <p>Սեռ:</p>
                <div className="separator-full m-0"></div> 

                <p>Ընտանեկան կարգավիճակ:</p>
                <div className="separator-full m-0"></div>                  

                <p>Գրանցման ամսաթիվ:</p>
                <div className="separator-full m-0"></div> 

                <p>Պաշտոն:</p>
                <div className="separator-full m-0"></div>

                <p>Դեր:</p>
                <div className="separator-full m-0"></div>                  



                <p>Լրացուցիչ կոնտակտ:</p>
                <div className="separator-full m-0"></div>                  

                <p>Լրացուցիչ կոնտակտի հեռախոս:</p>
                <div className="separator-full m-0"></div>                  

                <p>Ծածկանուն:</p>
                <div className="separator-full m-0"></div>  
                
                <p>կարգավիճակ:</p>
                <div className="separator-full m-0"></div>                  

              </div>
              <div className="ms-3">
                <p>{userDetails.userId || '1526'} </p>
                <div className="separator-full m-0"></div>                  

                <p>{userDetails.dateOfBirth || '1985-03-25'}</p>
                <div className="separator-full m-0"></div>                    

                <p>{userDetails.gender || `Ար`}</p>
                <div className="separator-full m-0"></div>   

                <p>{userDetails.maritalStatus || 'Չամուսնացած'}</p>
                <div className="separator-full m-0"></div>   
                               
                <p>{userDetails.createdAt || '2024-01-25'}</p>
                <div className="separator-full m-0"></div>  
                                
                <p>{userDetails.position || 'Բժիշկ'}</p>
                <div className="separator-full m-0"></div>  

                <p>
                {['Admin','User'].map((el)=>{
                    return<span>{el}, </span>
                })}
                </p>                
                <div className="separator-full m-0"></div> 
                {/* <p>
                {Object.keys(userDetails?.roles).map((el)=>{
                    return<span>{el}, </span>
                })}
                </p>                
                <div className="separator-full m-0"></div> 
*/}
                <p>{userDetails?.emergencyContactName || 'Հրայր Պետրոսյան'}</p>
                <div className="separator-full m-0"></div>                  

                <p>{userDetails?.emergencyContactNumber || '+37485632220'}</p>
                <div className="separator-full m-0"></div>                  

                <p>{userDetails.username || 'user1526'}</p>
                <div className="separator-full m-0"></div> 

                <p>{userDetails.isActive || 'Ակտիվ'}</p>
                <div className="separator-full m-0"></div>                  

            
              </div> 
      
         
        </article>
        <article
          className="main "
          style={{
            backgroundColor: "white",
            margin: "0 30px 30px 30px ",
            borderRadius: "30px",
            padding: "20px",
            flex:'2'
          }}
        >
            <h4>Կենսագրություն</h4>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non id iure quaerat, in beatae nostrum excepturi tenetur ducimus, nemo minus iusto accusantium enim vitae dolor quos numquam quod quisquam adipisci. Ratione nemo quidem facilis perferendis quae explicabo, eum quas neque! Optio repudiandae mollitia natus debitis?
      
         
        </article>
      </section>  
    )}
    </Suspense>
    </>
  )
}

export default UserDetails
