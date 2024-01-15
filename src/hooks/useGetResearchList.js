import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import {
    reserchesList,
    selectResearches,
  } from "../redux/features/researches/researchesSlice"
  import { useDispatch,useSelector } from "react-redux";


export const useGetResearchList = (url) => {
    const axiosPrivate = useAxiosPrivate();  
    const navigate = useNavigate();  
    const location = useLocation();  
    const dispatch = useDispatch();
    const researchState = useSelector(selectResearches);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
      
        const getResearches = async () => {
          try {
            const response = await axiosPrivate.post(url, {
              signal: controller.signal,
            });
      
            isMounted && dispatch(reserchesList(response.data.jsonString));
          } catch (err) {
            console.error(err);
            navigate("/login", { state: { from: location }, replace: true });
          }
        };
      
        getResearches();
      
        return () => {
          isMounted = false;
          controller.abort();
        };
      }, [url]);

      return [researchState]
};
