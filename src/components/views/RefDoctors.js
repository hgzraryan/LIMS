/* eslint-disable jsx-a11y/anchor-is-valid */
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import React, { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Dropdown } from "react-bootstrap";
import RefDoctorsTable from '../viewTables/RefDoctorsTable';
import AddRefDoctor from '../addViews/AddRefDoctor';
import { REFDOCTORS_URL } from '../../utils/constants';
import useGetData from '../../hooks/useGetData';
import useDeleteData from '../../hooks/useDeleteData';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import ExportData from '../ExportData';
import useRefreshData from '../../hooks/useRefreshData';

function RefDoctors() {
    const { pageNumber } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(Number(pageNumber));
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const confirmRefDoctorsRef = useRef(""); 
    const [usersPerPage, setUsersPerPage] = useState(Math.round((window.innerHeight / 100)));
    const [searchCount,setSearchCount] = useState(null)
    const [searchId,setSearchId] = useState(null)
    const [searchTerms,setSearchTerms] = useState(null)
    const [toggleExport, setToggleExport] = useState(false);

 const handleToggleExportModal = (value) => {
    setToggleExport((prev) => value);
  };
    const handleSearchPageCount = ({count,searchTerms,id}) =>{
      setSearchCount(count)
      setSearchTerms(searchTerms)
      setSearchId(id)
    }
     const {
       data: refDoctors,
       setData: setRefDoctors,
       dataReceived,
       dataCount
      } = useGetData(REFDOCTORS_URL,currentPage,usersPerPage,searchCount,null,searchId,searchTerms);
      const pageCount = searchCount?Math.ceil(searchCount/usersPerPage) :searchCount===0? 0:Math.ceil(dataCount/usersPerPage)
      const { refreshData,data } = useRefreshData(REFDOCTORS_URL, usersPerPage,pageNumber);
      useEffect(()=>{
        setRefDoctors(data)
        },[data])
      const handleCloseModal = () => {
      setSelectedItemId(null);
    };
    /*------------------ Create user Component --------------------*/
    const handleToggleCreateModal = (value) => {
      setIsOpen((prev) => value);
    };
  
    const { handleDeleteItem } = useDeleteData(
      REFDOCTORS_URL,
      confirmRefDoctorsRef,
      selectedItem,
      setSelectedItemId,
      refDoctors,
      setRefDoctors,
      'doctorName',
      refreshData
    );
    const handleOpenModal = (user) => {
        setSelectedItemId(true);
        setSelectedItem((prev) => user);
      };
      //-------------------------PAGINATION---------------------------//  
   useEffect(() => {
    setCurrentPage(Number(pageNumber));
  }, [pageNumber]);
  const handlePageClick = ({ selected: selectedPage }) => {
    navigate(`/doctors/refDoctors/page/${selectedPage+1}`);
}
  //--------------------------------------------------------------//
       const refreshPage = () => {
        let paglink = document.querySelectorAll(".page-item");
        paglink[0]?.firstChild.click();
        refreshData()
      };
  return (
    <HelmetProvider>
         <ExportData 
      handleToggleExportModal = {handleToggleExportModal}
      toggleExport={toggleExport}
      section='refDoctors'
      refDoctors={refDoctors}
      />
    <div>
      <div>

     <Helmet>
    <meta charSet="utf-8" />
    <title>Vteam LIMS | Ref Doctors</title>
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
                    <h1>Ուղղորդող բժիշկներ</h1>
                  </a>
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
                      Ողղորդող բժիշկ
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {isOpen && (
                    <AddRefDoctor
                      handleToggleCreateModal={handleToggleCreateModal}
                      refreshData={() => refreshData()}
                    />
                  )}
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
            </header>
            <div className="contact-body">
              <div data-simplebar className="nicescroll-bar">
                <div className="contact-list-view">
                  <div
                    id="scrollableDiv"
                    style={{overflow: "auto" }}
                  >
                      <RefDoctorsTable
                        confirmRef={confirmRefDoctorsRef}
                        selectedItem={selectedItem}
                        selectedItemId={selectedItemId}
                        handleDeleteItem={handleDeleteItem}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                        refDoctors={refDoctors}
                        setRefDoctors={setRefDoctors}
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

export default RefDoctors
