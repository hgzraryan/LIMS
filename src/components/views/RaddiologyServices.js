/* eslint-disable jsx-a11y/anchor-is-valid */
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import React, { useEffect, useRef, useState } from 'react'
import { MEDICALSERVICES_URL, RADIOLOGYSERVICES_URL } from '../../utils/constants';
import useGetData from '../../hooks/useGetData';
import { Dropdown } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import useRefreshData from '../../hooks/useRefreshData';
import RaddiologyServicesTable from '../viewTables/RaddiologyServicesTable';
import AddRadiologyService from '../addViews/AddRadiologyService';

function RaddiologyServices() {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(Number(pageNumber));
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  //const [categoryModalisOpen, setCategoryModalisOpen] = useState(false);
  const confirmResearchRef = useRef("");
  const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
  const [searchCount,setSearchCount] = useState(null)
  const [searchId,setSearchId] = useState(null)
  const [searchTerms,setSearchTerms] = useState(null)
  
  const handleSearchPageCount = ({count,searchTerms,id}) =>{
    setSearchCount(count)
    setSearchTerms(searchTerms)
    setSearchId(id)
  }
  /*------------------ Create user Component --------------------*/
  const handleToggleCreateModal = (value) => {
    setIsOpen((prev) => value);
  };
  // const handleToggleCategoryCreateModal = (value) => {
  //   setCategoryModalisOpen((prev) => value);
  // };
  const {
      data: radiologyServices,
      setData: setRadiologyServices,
      dataReceived,
      dataCount
    } = useGetData(RADIOLOGYSERVICES_URL,currentPage,usersPerPage,searchCount,null,searchId,searchTerms);
    const pageCount = searchCount?Math.ceil(searchCount/usersPerPage) :searchCount===0? 0:Math.ceil(dataCount/usersPerPage)
    const { refreshData,data } = useRefreshData(RADIOLOGYSERVICES_URL, usersPerPage,pageNumber);
    useEffect(()=>{
        setRadiologyServices(data)
      },[data])
    const handleOpenModal = (user) => {
      setSelectedItemId(true);
      setSelectedItem((prev) => user);
    };
    const handleCloseModal = () => {
      setSelectedItemId(null);
    };
  
    /*------------------------------------------------*/
    // const { handleDeleteItem } = useDeleteData(
    //   RESEARCHLISTS_URL,
    //   confirmResearchRef,
    //   selectedItem,
    //   setSelectedItemId,
    //   researchList,
    //   setResearches,
    //   "researchName",
    //   refreshData 
    // );
      //-------------------------PAGINATION---------------------------//  
 useEffect(() => {
  setCurrentPage(Number(pageNumber));
}, [pageNumber]);
const handlePageClick = ({ selected: selectedPage }) => {
  navigate(`/setup/medicalServices/page/${selectedPage+1}`);
}
//--------------------------------------------------------------//
    //-------------------------
  
    const refreshPage = () => {
      refreshData()
      let paglink = document.querySelectorAll(".page-item");
      paglink[0]?.firstChild.click();
    };
    return (
      <HelmetProvider>
        <div>
          <div>
    
         <Helmet>
        <meta charSet="utf-8" />
        <title>Vteam LIMS | Radiology Services</title>
        <link rel="icon" type="image/x-icon" href="../dist/img/favicon.ico"></link>
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
                      <h1>Ծառայություններ</h1>
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
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="btn btn-sm btn-outline-secondary flex-shrink-0 dropdown-toggle d-lg-inline-block"
                      >
                        Ավելացնել նոր
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setIsOpen(true)}>
                      Ծառայություն
                        </Dropdown.Item>
                      {/* <Dropdown.Item onClick={() => setCategoryModalisOpen(true)}>
                          Դասակարգ
                        </Dropdown.Item> */}
                      </Dropdown.Menu>
                    </Dropdown>
                    
                    {isOpen && (
                      <AddRadiologyService
                      handleToggleCreateModal={handleToggleCreateModal}
                      refreshData={() => refreshData()}  
                      />
                    )}
                    {/* {categoryModalisOpen && (
                      <AddCategory
                      handleToggleCategoryCreateModal={handleToggleCategoryCreateModal}
                      getResearches={() => getResearches()}
                      researchState={researchList}
  
                      />
                    )} */}
                  </div>
                  
                </div>
                <div className="contact-options-wrap">
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
                           <RaddiologyServicesTable
                          confirmRef={confirmResearchRef}
                          selectedItem={selectedItem}
                          selectedItemId={selectedItemId}
                        //   handleDeleteItem={handleDeleteItem}
                          handleOpenModal={handleOpenModal}
                          handleCloseModal={handleCloseModal}
                          radiologyServices={radiologyServices}
                          setRadiologyServices={setRadiologyServices}
                          refreshData={refreshData}
                          dataReceived={dataReceived}
                          />
                        <ReactPaginate
                          previousLabel = {"Հետ"}    
                          nextLabel = {"Առաջ"}
                          pageCount = {pageCount}
                          onPageChange = {handlePageClick}
                          initialPage = {0}
                          pageRangeDisplayed={3}
                          containerClassName={"pagination"}
                          pageLinkClassName = {"page-link"}
                          pageClassName = {"page-item"}
                          previousLinkClassName={"page-link"}
                          nextLinkClassName={"page-link"}
                          disabledLinkClassName={"disabled"}
                          //activeLinkClassName={"active"}
                          activeClassName={"active"}
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

export default RaddiologyServices
