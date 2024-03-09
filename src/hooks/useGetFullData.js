import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  DOCTORS_URL, RESEARCHLISTS_URL, PATIENTS_URL, REFDOCTORS_URL } from "../utils/constants";
import { reserchesList } from "../redux/features/researches/researchesSlice";
import { checkDoctors } from "../redux/features/doctor/doctorsSlice";
import { checkRefDoctors } from "../redux/features/refDoctors/refDoctorsSlice";
export const useGetFullData = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    
    let isMounted = true;
    const controller = new AbortController();

     setTimeout(()=>{
          axiosPrivate.get(RESEARCHLISTS_URL)
          .then((response) => {
            dispatch(reserchesList(response.data.jsonString));
          }).then((url)=>{
          axiosPrivate.get(REFDOCTORS_URL)
          .then((response) => {
            dispatch(checkRefDoctors(response.data.jsonString));
          }).catch((err) => {
            console.error(err);
            navigate("/login", { state: { from: location }, replace: true });
          });
        })
        .catch((err) => {
          console.error(err);
          navigate("/login", { state: { from: location }, replace: true });
        });        
        
      },1000)
        
    
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return [data];
};
