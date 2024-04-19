import React, { Suspense, useEffect, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import profileBgImg from "../../dist/img/profile-bg.jpg";
import FileDownload from "js-file-download";

function DoctorsVisitsDetails() {
  const navigate = useNavigate()
  const location = useLocation();

    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [research, setResearch] = useState([]);
    const [doctorsVisitsDetails, setDoctorsVisitsDetails] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [downloadFiles, setDownloadFiles] = useState(""); // State to hold the file name
    const [usersPerPage, setUsersPerPage] = useState(
      Math.round((window.innerHeight / 100) * 1.5)
    );
    const [activeLink, setActiveLink] = useState("tab_summery");

    const [pageTab, setPageTab] = useState("tab_summery");
    const pageCount = 1;
    //const pageCount = Math.ceil(useersCount/usersPerPage)
    const handleLinkClick = (linkId) => {
      setActiveLink(linkId);
      setPageTab(linkId);
    };
    const handleDownload = (data) => {
      axiosPrivate({
        url:`getExtFile/${data.fileId}`,
      method:'GET',
    responseType:'blob'
          })
          .then((res)=>{
            FileDownload(res.data,data.fileName)
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
          });
    };
    
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axiosPrivate.get(`/getVisitsByid/visit/${id}`);
          setDoctorsVisitsDetails((prevUsers) => response.data);
          setIsLoading(false);
          // setCurrentPage((prev) => prev = 1);
        } catch (err) {
          console.error(err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      };
      getData();
    }, []);
  
    return (
      <>
      <Suspense fallback={<LoadingSpinner />}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="hk-pg-body p-2">
            <div className="profile-wrap">
              <div className="profile-img-wrap">
                <img
                  className="img-fluid rounded-5"
                  src={profileBgImg}
                  alt="Description"
                />
              </div>
              {/* <div className="profile-intro">
                  <div className="card card-flush mw-400p bg-transparent">
                    <div className="card-body">
                      <div className="avatar avatar-xxl avatar-rounded position-relative mb-2">
                    
                        <span className="badge badge-indicator badge-success  badge-indicator-xl position-bottom-end-overflow-1 me-1"></span>
                      </div>
                      <h4>
                        {" "}
                        {doctorsVisitsDetails.doctorName}
                        <i
                          className="bi-check-circle-fill fs-6 text-blue"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title=""
                          data-bs-original-title="Top endorsed"
                        ></i>
                      </h4>

                      <ul className="list-inline fs-7 mt-2 mb-0">
                        <li className="list-inline-item d-sm-inline-block d-block mb-sm-0 mb-1 me-3">
                          <img
                            src={mobileSvg}
                            width="15px"
                            height="15px"
                            alt="mobile"
                            className="me-2"
                          />
                          <span style={{ fontSize: "1.1rem" }}>
                            {doctorsVisitsDetails?.contact?.phone || ""}
                          </span>
                        </li>

                        <li className="list-inline-item d-sm-inline-block d-block mb-sm-0 mb-1 me-3">
                          <img
                            src={emailSvg}
                            width="15px"
                            height="15px"
                            alt="email"
                            className="me-2"
                          />
                          <span style={{ fontSize: "1.1rem" }}>
                            {doctorsVisitsDetails?.contact?.email || ""}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
              <header className="profile-header">
                <ul className="nav nav-line nav-tabs nav-icon nav-light h-100 d-md-flex d-none">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeLink === "tab_summery" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("tab_summery")}
                      data-bs-toggle="tab"
                      href="#"
                    >
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <FeatherIcon icon="zap" />
                        </span>
                      </span>
                      <span className="nav-link-text">Գլխավոր</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="tab"
                      href="#"
                      className={`nav-link ${
                        activeLink === "tab_documents" ? "active" : ""
                      }`}
                      onClick={() => handleLinkClick("tab_documents")}
                    >
                      <span className="nav-icon-wrap">
                        <span className="nav-icon-wrap">
                          <span className="svg-icon">
                            <svg
                              fill="#000000"
                              width="23"
                              height="23"
                              viewBox="0 0 512 512"
                              id="Layer_1"
                              version="1.1"
                            >
                              <g>
                                <g>
                                  <g>
                                    <rect
                                      x="210.464"
                                      y="46.307"
                                      transform="matrix(-0.8935 -0.449 0.449 -0.8935 417.2299 376.1477)"
                                      width="85.498"
                                      height="184.595"
                                    />
                                    <rect
                                      x="83.863"
                                      y="313.827"
                                      width="134.1"
                                      height="34.2"
                                    />
                                    <path
                                      d="M405.663,277.327c0-60.6-31.9-113.9-79.7-143.8l-18.7,36.9c34.6,23,57.6,62.2,57.6,106.9c0,70.7-57.5,128.2-128.2,128.2
			c-34.6,0-65.7-13.6-88.6-35.7h-53.2c16.3,24.9,39.2,45.5,66.1,58.7h-38.1v61h225.8v-61h-35.7
			C367.563,400.927,405.663,343.427,405.663,277.327z"
                                    />

                                    <rect
                                      x="277.843"
                                      y="7.844"
                                      transform="matrix(-0.8935 -0.449 0.449 -0.8935 555.6599 173.8512)"
                                      width="41.199"
                                      height="26.399"
                                    />

                                    <rect
                                      x="216.894"
                                      y="240.196"
                                      transform="matrix(0.449 -0.8935 0.8935 0.449 -106.2222 341.1332)"
                                      width="13.2"
                                      height="32.999"
                                    />

                                    <rect
                                      x="158.474"
                                      y="225.818"
                                      transform="matrix(-0.8935 -0.4491 0.4491 -0.8935 225.362 525.2878)"
                                      width="33.001"
                                      height="20.2"
                                    />
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </span>
                        </span>
                      </span>
                      <span className="nav-link-text">Փաստաթղթեր</span>
                    </a>
                  </li>
                  {/* <li className="nav-item">
                <a 
                          className={`nav-link ${activeLink === 'tab_calendar' ? 'active' : ''}`}
                          onClick={() => handleLinkClick('tab_calendar')}
                           data-bs-toggle="tab" 
                           href="#">
                            <span className="nav-icon-wrap">
                              <span className="feather-icon">
                                <FeatherIcon icon='calendar' />
                              </span>
                            </span>
                            <span className="nav-link-text">Օրացույց</span>
                          </a>
								</li> */}
                </ul>
              </header>
              <div className="row">
                {pageTab === "tab_summery" && (
                  <>
                    <div className="col-lg-4 mb-lg-0 mb-3">
                      <div className="card card-border mb-lg-4 mb-3">
                        <div className="card-header card-header-action"></div>

                        <ul className="list-group list-group-flush">
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-credit-card-2-front-fill text-disabled me-2"></i>
                              <span className="text-muted">
                                Նույնականացման համար:
                              </span>
                            </span>
                            <span className="ms-2">
                              {doctorsVisitsDetails?.doctorsVisitId}
                            </span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-activity text-disabled me-2"></i>
                              <span className="text-muted">Հաճախորդի ID:</span>
                            </span>
                            <span className="ms-2">
                              {doctorsVisitsDetails?.clientId}
                            </span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-ui-checks text-disabled me-2"></i>
                              <span className="text-muted">Բժիշկ:</span>
                            </span>
                            <span className="ms-2">
                              {doctorsVisitsDetails?.doctorName}
                            </span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-calendar-month-fill text-disabled me-2"></i>
                              <span className="text-muted">
                                Գրանցման ամսաթիվ:
                              </span>
                            </span>
                            <span className="ms-2">
                              {doctorsVisitsDetails?.createdAt.split("T").join(', ').split('.')[0]}
                            </span>
                          </li>

                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-file-medical-fill text-disabled me-2"></i>
                              <span className="text-muted">Բժիշկ:</span>
                            </span>
                            <span className="ms-2">
                              {/* {doctorsVisitsDetails?.doctors && doctorsVisitsDetails?.doctors[0]} */}
                            </span>
                          </li>
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-currency-dollar text-disabled me-2"></i>
                              <span className="text-muted">
                                Ընդհանուր արժեք:
                              </span>
                            </span>
                            <span className="ms-2">
                              {doctorsVisitsDetails?.originalPrice}
                            </span>
                          </li>
                          {(doctorsVisitsDetails?.originalPrice>doctorsVisitsDetails?.totalPrice)?                          
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-currency-dollar text-disabled me-2"></i>
                              <span className="text-muted">
                                Զեղչված արժեք:
                              </span>
                            </span>
                            <span className="ms-2">
                              {doctorsVisitsDetails?.totalPrice}
                            </span>
                          </li>
                          :''}
                          <li className="list-group-item border-0">
                            <span>
                              <i className="bi bi-currency-dollar text-disabled me-2"></i>
                              <span className="text-muted">
                                Ընդհանուր վճարված:
                              </span>
                            </span>
                            <span className="ms-2">
                              {doctorsVisitsDetails?.totalPayed}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="card card-border card-profile-feed mb-lg-4 mb-3">
                        <div className="card-header card-header-action">
                          <div className="media align-items-center">
                            <p>Բուժ․ ծառայություններ</p>
                          </div>
                          <div className="card-action-wrap"></div>
                        </div>
                        <div className="card-body">
                          <div className="d-flex justify-content-center align-items-center ms-10 me-10">
                            <ol>
                              {doctorsVisitsDetails.medicalServices? doctorsVisitsDetails.medicalServices.map((el)=>{
                                  return <li>{el}</li>
                              }):'' }
                            </ol>
                          </div>
                        </div>
                        <div className="card-footer justify-content-between"></div>
                      </div>
                      <div className="card card-border card-profile-feed mb-lg-4 mb-3">
                        <div className="card-header card-header-action">
                          <div className="media align-items-center">
                            <p>Բուժ․ ծառայություններ</p>
                          </div>
                          <div className="card-action-wrap"></div>
                        </div>
                        <div className="card-body">
                          <div className="d-flex justify-content-center align-items-center ms-10 me-10">
                            <ol>
                              {doctorsVisitsDetails.medicalServices? doctorsVisitsDetails.medicalServices.map((el)=>{
                                  return <li>{el}</li>
                              }):'' }
                            </ol>
                          </div>
                        </div>
                        <div className="card-footer justify-content-between"></div>
                      </div>
                    </div>
                    
                  </>
                )}
                {pageTab === "tab_documents" && (
                  <>
                    <div className="col-lg-12">
                    

                    <div>
                      <div className="card-body">
                        <div className="card">
                          {/* <div className="card-header">
                           
                              <h5 className="mb-0">Վերբեռնված փաստաթղթեր</h5>
                            
                          </div> */}
                          <div id="fm_collapse_3" className="collapse show">
  <div className="row gx-3 row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 m-1 ">
    {downloadFiles.length > 0 ? (
      downloadFiles.map((el) => (
        <div className="col" key={el.fileId}>
          <div className="card file-compact-card card-border">
            <div className="card-body d-flex justify-content-between">
              <div className="media fmapp-info-trigger">
                <div className="media-head me-3">
                  <div className="avatar avatar-icon avatar-soft-danger avatar-sm">
                    <span className="initial-wrap">
                      <i className="ri-file-pdf-fill"></i>
                    </span>
                  </div>
                </div>
                <div className="media-body">
                  <div className="file-name">
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={(e) => handleDownload(el)}
                    >
                      {el?.fileName}
                    </p>
                  </div>
                  <div className="text-truncate fs-8 mb-2">
                    {/* {formatBytes(el.size)} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col d-flex justify-content-center align-items-center w-100"><p>Վերբեռնված փաստաթղթեր չկան</p></div>
    )}
  </div>
</div>
                        </div>
                      </div>
                    </div>
                  </div>
                    
                  </>
                )}
               
              </div>
            </div>
          </div>
         
        )}
      </Suspense>
    </>
    );
}

export default DoctorsVisitsDetails
