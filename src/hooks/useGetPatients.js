import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import {
    checkPatients,
    patients,
  } from "../redux/features/patients/patientsSlice"
  import { useDispatch,useSelector } from "react-redux";


export const useGetPatients = (url) => {
    const axiosPrivate = useAxiosPrivate();  
    const navigate = useNavigate();  
    const location = useLocation();  
    const dispatch = useDispatch();
    const [patientsState,setPatientsState] = useState([]);
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
      
        const getPatients = async () => {
          try {
            const response = await axiosPrivate.post(url, {
              signal: controller.signal,
              page: 1,
              onPage: 84,
            });
      
            isMounted && 
            dispatch(checkPatients(response.data.jsonString));
            setPatientsState(prev=>response.data.jsonString)

          } catch (err) {
            console.error(err);
            navigate("/login", { state: { from: location }, replace: true });
          }
        };
      
        getPatients();
      
        return () => {
          isMounted = false;
          controller.abort();
        };
      }, [url]);

      return [patientsState]
};
