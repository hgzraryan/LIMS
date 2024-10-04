/* eslint-disable jsx-a11y/anchor-is-valid */
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import DoctorsVisitsTable from '../viewTables/DoctorsVisitsTable';
import AddDoctorsVisit from '../addViews/AddDoctorsVisit';
import { DOCTORSVISITS_URL } from '../../utils/constants';
import useGetData from '../../hooks/useGetData';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ExportData from '../ExportData';
import useRefreshData from '../../hooks/useRefreshData';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import CurrentDoctorsVisitsTable from '../viewTables/CurrentDoctorsVisitsTable';

function CurrentDoctorVisits() {
    const { pageNumber } = useParams();
    const axiosPrivate = useAxiosPrivate();  
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [doctorsVisits, setDoctorsVisits] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [currentPage, setCurrentPage] = useState(Number(pageNumber));
    const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
    const [userRole, setUserRole] = useState('');
    const [toggleExport, setToggleExport] = useState(false);
    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(null);
    const [dataReceived, setDataReceived] = useState(false);
    const handleToggleExportModal = (value) => {
        setToggleExport((prev) => value);
      };
    const handleToggleCreateModal = (value) => {
      setIsOpen((prev) => value);
    };
    const [searchCount,setSearchCount] = useState(null)
    const [searchId,setSearchId] = useState(null)
    const [searchTerms,setSearchTerms] = useState(null)
    const location = useLocation();    

    const handleSearchPageCount = ({count,searchTerms,id}) =>{
      setSearchCount(count)
      setSearchTerms(searchTerms)
      setSearchId(id)
    }
    const storedData = JSON.parse(localStorage.getItem('userData'));

    // const {
    //   data: doctorsVisits,
    //   setData: setDoctorsVisits,
    //   dataReceived,
    //   dataCount  
    // } = useGetData(`getVisitsByid/doctor/${storedData?.doctorId}`,currentPage,usersPerPage);
     const pageCount = Math.ceil(dataCount/usersPerPage)
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
    if(!searchCount){

      const getData = async () => {
        try {
          const response = await axiosPrivate.get(`getVisitsByid/doctor/${storedData?.doctorId}`,{
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
    //const { refreshData ,data} = useRefreshData(`getVisitsByid/doctor/${storedData?.doctorId}`, usersPerPage,pageNumber);
    useEffect(()=>{
      setDoctorsVisits(data)
      },[data])
    useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('role'));
    if (storedData) {
      setUserRole(storedData.Role);
    }
  }, []);
  //-------------------------PAGINATION---------------------------//  
  useEffect(() => {
    setCurrentPage(Number(pageNumber));
  }, [pageNumber]);
  const handlePageClick = ({ selected: selectedPage }) => {
    navigate(`/doctorsVisits/page/${selectedPage+1}`);
}
     const handleOpenModal = (user) => {
      setSelectedItemId(true);
      setSelectedItem((prev) => user);
    };
    const handleCloseModal = () => {
      setSelectedItemId(null);
    };
    const refreshPage = () => {
        let paglink = document.querySelectorAll(".page-item");
        paglink[0]?.firstChild.click();
         //refreshData();
      };
      //-------------------
      return (
        <HelmetProvider>
          <ExportData 
      handleToggleExportModal = {handleToggleExportModal}
      toggleExport={toggleExport}
      section='doctorsVisits'
      />
        <div>
          <div>
    
         <Helmet>
        <meta charSet="utf-8" />
        <title>Vteam LIMS | Doctors visits</title>
        <link rel="icon" type="image/x-icon" href="../dist/img/favicon.ico"></link>
        </Helmet>
          </div>
          <div className="contactapp-wrap" style={{height:'100%'}}>
            <div className="contactapp-content">
              <div className="contactapp-detail-wrap w-100">
                {/* <header className="contact-header">
                  <div className="d-flex align-items-center">
                  </div>
                  <div className="contact-options-wrap">
                  <a
                  className="btn btn-icon btn-flush-dark flush-soft-hover dropdown-toggle no-caret active"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon"
                    onClick={handleToggleExportModal}>
                      <FeatherIcon icon="download" />
                    </span>
                  </span>
                </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a className="dropdown-item active" href="contact.html">
                        <span className="feather-icon dropdown-icon">
                          <FeatherIcon icon="list" />
                        </span>
                        <span>List View</span>
                      </a>
                      <a className="dropdown-item" href="contact-cards.html">
                        <span className="feather-icon dropdown-icon">
                          <FeatherIcon icon="grid" />
                        </span>
                        <span>Grid View</span>
                      </a>
                      <a className="dropdown-item" href="#">
                        <span className="feather-icon dropdown-icon">
                          <FeatherIcon icon="server" />
                        </span>
                        <span>Compact View</span>
                      </a>
                    </div>
    
                    <a
                      className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret d-sm-inline-block d-none"
                      href="#"
                      data-bs-toggle="tooltip"
                      data-placement="top"
                      onClick={refreshPage}
                      title=""
                      data-bs-original-title="Refresh"
                    >
                      <span className="icon">
                        <span className="feather-icon">
                          <FeatherIcon icon="refresh-cw" />
                        </span>
                      </span>
                    </a>
                  </div>
                </header> */}
                <div className="contact-body">
                  <div data-simplebar className="nicescroll-bar">
                    <div className="contact-list-view">
                      <div
                        id="scrollableDiv"
                        style={{overflow: "auto" }}
                      >
                        <CurrentDoctorsVisitsTable
                          //confirmRef={confirmDoctorsRef}
                          selectedItem={selectedItem}
                          selectedItemId={selectedItemId}
                          //handleDeleteItem={handleDeleteItem}
                          handleOpenModal={handleOpenModal}
                          handleCloseModal={handleCloseModal}
                          doctorsVisits={doctorsVisits}
                          setDoctorsVisits={setDoctorsVisits}
                          //refreshData={refreshData}
                          handleSearchPageCount={(val)=>handleSearchPageCount(val)}
                          dataReceived={dataReceived}
                        />
                        <ReactPaginate
                        previousLabel = {"Հետ"}    
                        nextLabel = {"Առաջ"}
                        pageCount = {1||pageCount}
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
}


export default CurrentDoctorVisits
