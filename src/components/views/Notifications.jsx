import ReactPaginate from 'react-paginate'
import React, { useEffect, useState} from "react";
import FeatherIcon from "feather-icons-react";
import { Dropdown } from "react-bootstrap";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ExportData from "../ExportData";
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useGetData from '../../hooks/useGetData';
import { NOTIFICATIONS_URL, RESEARCHLISTS_URL } from '../../utils/constants';
import NotificationsTable from '../viewTables/NotificationsTable';
import useRefreshData from '../../hooks/useRefreshData';

function Notifications() {
    const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(Number(pageNumber));
  const [toggleExport, setToggleExport] = useState(false);
  const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
  const [searchCount,setSearchCount] = useState(null)
  const [searchId,setSearchId] = useState(null)
  const [searchTerms,setSearchTerms] = useState(null)

  const handleToggleExportModal = (value) => {
    setToggleExport((prev) => value);
  };
  const {
    data: notifications,
    setData: setNotifications,
    dataReceived,
    dataCount 
  } = useGetData(NOTIFICATIONS_URL,currentPage,usersPerPage,searchCount,null,searchId,searchTerms);
  const { refreshData,data } = useRefreshData(NOTIFICATIONS_URL, usersPerPage,pageNumber);
  useEffect(()=>{
    setNotifications(data)
    },[data])
   //-------------------------PAGINATION---------------------------//  
  const pageCount = searchCount?Math.ceil(searchCount/usersPerPage) :searchCount===0? 0:Math.ceil(dataCount/usersPerPage)
  useEffect(() => {
    setCurrentPage(Number(pageNumber));
  }, [pageNumber]);
const handlePageClick = ({ selected: selectedPage }) => {
  console.log(selectedPage)
    navigate(`/setup/notifications/page/${selectedPage+1}`);
}
    //--------------------------------------------------------------//
  
    const refreshPage = () => {
      refreshData()
      let paglink = document.querySelectorAll(".page-item");
      paglink[0]?.firstChild.click();
    };
  return (
    <HelmetProvider>
    <ExportData 
    handleToggleExportModal = {handleToggleExportModal}
    toggleExport={toggleExport}
    section='notifications'
    />
  <div>
    <div>

   <Helmet>
  <meta charSet="utf-8" />
  <title>Vteam LIMS | Notifications</title>
  <link rel="icon" type="image/x-icon" href="dist/img/favicon.ico"></link>
  </Helmet>
    </div>
    <div className="contactapp-wrap" style={{height:'100%'}}>
      <div className="contactapp-content">
        <div className="contactapp-detail-wrap w-100">
          <header className="contact-header">
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <a
                  className="contactapp-title link-dark"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <h1>Ծանուցումներ</h1>
                </a>
                {/*
                  <div className={showUserMenu ? 'dropdown-menu show' : 'dropdown-menu'} >
                      <a className="dropdown-item" href="#"><span className="feather-icon dropdown-icon"><FeatherIcon icon="users" /></span><span>Users1</span></a>
                      <a className="dropdown-item" href="#"><span className="feather-icon dropdown-icon"><FeatherIcon icon="star" /></span><span>Users2</span></a>
                      <a className="dropdown-item" href="#"><span className="feather-icon dropdown-icon"><FeatherIcon icon="archive" /></span><span>Users3</span></a>
                      <a className="dropdown-item" href="#"><span className="feather-icon dropdown-icon"><FeatherIcon icon="edit" /></span><span>Users4</span></a>
                  </div>
                  */}
              </div>
              <div className="dropdown ms-3">
                {/* <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="btn btn-sm btn-outline-secondary flex-shrink-0 dropdown-toggle d-lg-inline-block"
                  >
                    Գրանցել նոր
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setIsOpen(true)}>
                      Այցելու
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
                
              </div>
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
          </header>
          <div className="contact-body">
            <div data-simplebar className="nicescroll-bar">
              <div className="contact-list-view">
                <div
                  id="scrollableDiv"
                  style={{overflow: "auto" }}
                >                    
                  <NotificationsTable
                  notifications={notifications}
                //   handleOpenModal={handleOpenModal}
                //   handleCloseModal={handleCloseModal}
                //   selectedItem={selectedItem}
                //   patients={patients}
                //   setPatients={setPatients}
                  refreshData={refreshData}
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
  )
}

export default Notifications
