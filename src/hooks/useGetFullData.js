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
      
        const fetchData = async () => {
          try {
            const researchResponse = await axiosPrivate.get(RESEARCHLISTS_URL);
            dispatch(reserchesList(researchResponse.data.jsonString));
      
            const refDoctorsResponse = await axiosPrivate.get(REFDOCTORS_URL);
            dispatch(checkRefDoctors(refDoctorsResponse.data.jsonString));
          } catch (error) {
            console.error(error);
            navigate("/login", { state: { from: location }, replace: true });
          }
        };
      
        const timeoutId = setTimeout(() => {
          fetchData();
        }, 1000);
      
        return () => {
          clearTimeout(timeoutId);
          isMounted = false;
          controller.abort();
        };
      }, []);

  return [data];
};
