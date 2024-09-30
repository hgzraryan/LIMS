/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import Loading from "../Loading";
import { Dropdown } from "react-bootstrap";
import useGetData from "../../hooks/useGetData";
import useDeleteData from "../../hooks/useDeleteData";
import DiagnosticsTable from "../viewTables/DiagnosticsTable";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

import AddDiagnostic from "../addViews/AddDiagnostic";
import { selectDiagnosticsCount} from "../../redux/features/diagnostics/diagnosticsCountSlice";
import { DIAGNOSTICS_URL, DIAGNOSTICS__SEARCH_URL, DOCTORS_URL } from "../../utils/constants";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ExportData from "../ExportData";
import useRefreshData from "../../hooks/useRefreshData";

const CurrentDoctorDiags = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(Number(pageNumber));
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const confirmDiagnosticRef = useRef("");
  const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
  const [doctors,setDoctors] = useState([]);
  const axiosPrivate =useAxiosPrivate()
  const [searchCount,setSearchCount] = useState(null)
  const [searchId,setSearchId] = useState(null)
  const [searchTerms,setSearchTerms] = useState(null)
  const [searchParams,setSearchParams] = useState(null)
  const [toggleExport, setToggleExport] = useState(false);
  const [diagnostics, setDiagnostics] = useState([]);
  const storedData = JSON.parse(localStorage.getItem('userData'));
  const location = useLocation();    

  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(null);
  const [dataReceived, setDataReceived] = useState(false);
const handleToggleExportModal = (value) => {
    setToggleExport((prev) => value);
  };
  const handleSearchPageCount = (data) =>{
    setSearchCount(data.count)
    setSearchParams(data.params)
  }
//   const {
//     data: diagnostics,
//     setData: setDiagnostics,
//     dataReceived,
//     dataCount
//   } = useGetData(DIAGNOSTICS_URL,currentPage,usersPerPage,searchCount,DIAGNOSTICS__SEARCH_URL,searchParams);
const pageCount = Math.ceil(dataCount/usersPerPage)
useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
if(!searchCount){

  const getData = async () => {
    try {
      const response = await axiosPrivate.get(`getDiagnosticsByDid/doctor/${storedData?.doctorId}`,{
        signal: controller.signal,
        page: currentPage===0?1:currentPage,
        onPage: usersPerPage,
      });
      //console.log(response);
      // if (
        //   response.data.jsonString.length === 0 ||
        //   response.data.jsonString.length < onPageCount
        // ) {
          //   setHasMore(false);
        // }
        isMounted &&
          setData((prevUsers) => response.data.jsonString);
          setDataCount(response.data.count)
          setDataReceived(true)
          //setCurrentPage((prev) => prev + 1);
        } catch (err) {
          console.error(err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      };
      
      getData();
      
    }
    // else{
    //   const getData = async () => {
    //   try {
    //     const response = await axiosPrivate.post(searchUrl, {
    //       params: searchParams,
    //       page: currentPage===0?1:currentPage,
    //       onPage: usersPerPage,
    //       signal: controller.signal
    //     });
    //     //console.log('get search data')
    //     setData(response.data.jsonString);
    //     setDataReceived(true)
    //     //setToggleSearchModal(false)  
    //     //handleSearchPageCount(response.data.count)    
    //   }catch (err) {
    //     console.error(err);
    //   }  
    // }; 
    // getData()
    // }
      return () => {
      isMounted = false;
      controller.abort();
    };
  }, [currentPage,searchCount]);

    //const { refreshData,data } = useRefreshData(DIAGNOSTICS_URL, usersPerPage,pageNumber);
  useEffect(()=>{
    setDiagnostics(data)
    },[data])
    //-------------------------PAGINATION---------------------------//  
    useEffect(() => {
      setCurrentPage(Number(pageNumber));
    }, [pageNumber]);
    const handlePageClick = ({ selected: selectedPage }) => {
      navigate(`/diagnostics/page/${selectedPage+1}`);
  }
   //--------------------------------------------------------------//

  useEffect(()=>{
    setTimeout(() => {      
      axiosPrivate.get(DOCTORS_URL).then((resp)=>{
        setDoctors(prev=>resp?.data?.jsonString)
     }).catch((err)=>{
       console.log(err)
     })
    }, 2000);
 },[])
  const handleOpenModal = (user) => {
    setSelectedItemId(true);
    setSelectedItem((prev) => user);
  };
  const handleCloseModal = () => {
    setSelectedItemId(null);
  };
  /*------------------------------------------------*/





  const refreshPage = () => {
    let paglink = document.querySelectorAll(".page-item");
    paglink[0]?.firstChild.click();
    //refreshData()
  };
  return (
    <HelmetProvider>
       <ExportData 
      handleToggleExportModal = {handleToggleExportModal}
      toggleExport={toggleExport}
      section='diagnostics'
      />
    <div>
      <div>

     <Helmet>
    <meta charSet="utf-8" />
    <title>Vteam LIMS | Diagnostics</title>
    <link rel="icon" type="image/x-icon" href="../dist/img/favicon.ico"></link>
    </Helmet>
      </div>
      <div className="contactapp-wrap" style={{height:'100%'}}>
        <div className="contactapp-content">
          <div className="contactapp-detail-wrap w-100">
            <div className="contact-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="contact-list-view">
                  <div
                    id="scrollableDiv"
                    style={{overflow: "auto" }}
                  >
                     
                      <DiagnosticsTable
                        confirmRef={confirmDiagnosticRef}
                        selectedItem={selectedItem}
                        selectedItemId={selectedItemId}
                        setSelectedItemId={setSelectedItemId}
                        setSelectedItem={setSelectedItem}
                        diagnostics={diagnostics}
                        handleDeleteItem={null}
                        setDiagnostics={setDiagnostics}
                        handleCloseModal={handleCloseModal}
                        handleOpenModal={handleOpenModal}
                        //refreshData={refreshData}
                        dataCount={dataCount}
                        handleSearchPageCount={(val)=>handleSearchPageCount(val)}
                        dataReceived={dataReceived}

                      />
                      <ReactPaginate
                        previousLabel = {"Հետ"}    
                        nextLabel = {"Առաջ"}
                        pageCount = {pageCount}
                        onPageChange = {handlePageClick}
                        //initialPage = {Number(pageNumber)}
                        containerClassName={"pagination"}
                        pageLinkClassName = {"page-link"}
                        pageClassName = {"page-item"}
                        previousLinkClassName={"page-link"}
                        nextLinkClassName={"page-link"}
                        disabledLinkClassName={"disabled"}
                        //activeLinkClassName={"active"}
                        activeClassName={"active"}
                        forcePage={currentPage - 1}
											/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </HelmetProvider>
  );
};
export default CurrentDoctorDiags
