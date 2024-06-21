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
import { useNavigate, useParams } from "react-router-dom";
import ExportData from "../ExportData";

const Diagnostics = () => {
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

const handleToggleExportModal = (value) => {
    setToggleExport((prev) => value);
  };
  const handleSearchPageCount = (data) =>{
    setSearchCount(data.count)
    setSearchParams(data.params)
  }
  const {
    data: diagnostics,
    setData: setDiagnostics,
    refreshData,
    dataCount
  } = useGetData(DIAGNOSTICS_URL,currentPage,usersPerPage,searchCount,DIAGNOSTICS__SEARCH_URL,searchParams);
  const pageCount = searchCount?Math.ceil(searchCount/usersPerPage) :searchCount===0? 0:Math.ceil(dataCount/usersPerPage)

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
  const handleToggleCreateModal = (value) => {
    setIsOpen((prev) => value);
  };

  const { handleDeleteItem } = useDeleteData(
    DIAGNOSTICS_URL,
    confirmDiagnosticRef,
    selectedItem,
    setSelectedItemId,
    diagnostics,
    setDiagnostics,
    "diagnosticsName"
  );


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
                    <h1>Ախտորոշումներ</h1>
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
                        Ախտորոշում
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {isOpen && (
                    <AddDiagnostic
                      handleToggleCreateModal={handleToggleCreateModal}
                      refreshData={() => refreshData()}
                      doctors={doctors}
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
                     
                      <DiagnosticsTable
                        confirmRef={confirmDiagnosticRef}
                        selectedItem={selectedItem}
                        selectedItemId={selectedItemId}
                        setSelectedItemId={setSelectedItemId}
                        setSelectedItem={setSelectedItem}
                        diagnostics={diagnostics}
                        handleDeleteItem={handleDeleteItem}
                        setDiagnostics={setDiagnostics}
                        handleCloseModal={handleCloseModal}
                        handleOpenModal={handleOpenModal}
                        refreshData={refreshData}
                        handleSearchPageCount={(val)=>handleSearchPageCount(val)}

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
export default Diagnostics;
