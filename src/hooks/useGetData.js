import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const useGetData = (url) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  
    const [usersPerPage, setUsersPerPage] = useState(12);
    const [hasMore, setHasMore] = useState(true);  
    const axiosPrivate = useAxiosPrivate();  
    const navigate = useNavigate();  
    const location = useLocation();    

    const pagesVisited = currentPage * usersPerPage;
    const currentUsers = data.slice(pagesVisited, pagesVisited + usersPerPage);
    const pageCount = Math.ceil(data.length / usersPerPage);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
    
        const getData = async () => {
          try {
            const response = await axiosPrivate.post(url, {
              signal: controller.signal,
              page: currentPage,
              onPage: Math.round((window.innerHeight / 100) * 1.5),
            });
            console.log(response);
            if (
              response.data.jsonString.length === 0 ||
              response.data.jsonString.length < 12
            ) {
              setHasMore(false);
            }
            isMounted &&
              setData((prevUsers) => response.data.jsonString);
            setCurrentPage((prev) => prev + 1);
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
      const getData = async (check='') => {
          try {
            const response = await axiosPrivate.post(url, {
              page: currentPage,
              onPage: usersPerPage,
            });
            setTimeout(() => {
              if (
                response.data.jsonString.length === 0 ||
                response.data.jsonString.length < 12
              ) {
                setHasMore(false);
              }
              switch (check) {
                case "check":
                  setData((prevUsers) => [
                    ...prevUsers,
                    ...response.data.jsonString,
                  ]);
                  break;
                case "update":
                  setData((prevUsers) => response.data.jsonString);
                  setCurrentPage((prev) => prev + 1);
                  break;
                default:
                  setData((prevUsers) => response.data.jsonString);
                  setCurrentPage((prev) => prev + 1);
              }
            }, 500);
          } catch (err) {
            console.error(err);
            navigate("/login", { state: { from: location }, replace: true });
          }
        };
      return {
        data,
        setData,
        hasMore,
        getData
    }
}
export default useGetData;