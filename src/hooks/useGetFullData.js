import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { checkPatients } from "../redux/features/patients/patientsSlice";
import { useDispatch } from "react-redux";

export const useGetFullData = (url,checkState) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const response = await axiosPrivate.get(url);

        isMounted && dispatch(checkState(response.data.jsonString));
        setData((prev) => response.data.jsonString);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);

  return [data];
};
